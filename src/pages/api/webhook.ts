import { db } from "@/server/db";
import type { Order, SquareOrders } from "@/types/order";
import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { WebhooksHelper } from "square";

type OrderCreatedEvent = {
  merchant_id: string;
  type: string;
  event_id: string;
  created_at: string;
  data: {
    type: string;
    id: string;
    object: {
      order_created: {
        created_at: string;
        location_id: string;
        order_id: string;
        state: string;
        version: number;
      };
    };
  };
};

// isFromSquare generates a signature from the url and body and compares it to the Square signature header.
const isFromSquare = (signature: string, body: string) => {
  return WebhooksHelper.isValidWebhookEventSignature(
    signature,
    body,
    process.env.WH_SIGNATURE_KEY ? process.env.WH_SIGNATURE_KEY : "",
    process.env.NOTIFICATION_URL ? process.env.NOTIFICATION_URL : "",
  );
};

const get_order_by_id = async (order_id: string): Promise<Order> => {
  const headers = {
    "Square-Version": "2024-01-18",
    Authorization: `Bearer ${process.env.SQUARE_SECRET}`,
    "Content-Type": "application/json",
  };

  const url = `https://connect.squareup.com/v2/orders/${order_id}`;

  const config: AxiosRequestConfig = {
    method: "get",
    url: url,
    headers,
  };

  const res = await axios(config);
  const order = res.data as Order;

  return order;
};

const create_free_boba = async (cid: string) => {
  await db.freeBobaClaim.create({
    data: {
      customerId: cid,
      used: false,
    },
  });
};

const get_orders_by_customer = async (cid: string): Promise<SquareOrders> => {
  const headers = {
    "Square-Version": "2024-01-18",
    Authorization: `Bearer ${process.env.SQUARE_SECRET}`,
    "Content-Type": "application/json",
  };

  //check the number of orders the customer has
  const order_url = "https://connect.squareup.com/v2/orders/search";

  const order_data = {
    query: {
      filter: {
        customer_filter: {
          customer_ids: [cid],
        },
      },
    },
    location_ids: ["L1H7VMTG37EV8"],
  };

  const config: AxiosRequestConfig = {
    method: "post",
    url: order_url,
    headers,
    data: order_data,
  };

  const order_request = await axios(config);
  const order_result = order_request.data as SquareOrders;

  return order_result;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const event = req.body as OrderCreatedEvent;
    const signature = req.headers["x-square-hmacsha256-signature"] as string;

    // verify the signature
    if (!isFromSquare(signature, JSON.stringify(event))) {
      return res.status(401).json({ message: "Invalid signature" });
    }

    // check if event is order.created
    if (event?.type === "order.created") {
      //given the order id from the event get the order
      const order_id = "ukTtcEYCrQio77xW0h3reygeV"; //TODO remove this event.data.id;
      console.log("got the orderid", order_id);

      const order = await get_order_by_id(order_id);
      console.log("order cid", order.customer_id);

      // verify if the order has a customer
      if (order.customer_id) {
        const cid = order.customer_id;

        //get all the orders by said customer
        const data = await get_orders_by_customer(cid);

        //if the number of orders is a multiple of 5 then send a free boba
        const num_orders = data?.orders.length ?? 0;

        if (num_orders % 5 === 0) {
          console.log("send a free boba");
          await create_free_boba(cid);
        } else {
          const boba_left = 5 - (num_orders % 5);
          console.log("no free boba.  Left:", boba_left);
        }
      }
    }

    return res.status(200).json({ message: "Hello" });
  } catch (error) {
    console.log("error", error);
    return res.status(405).json({ message: error });
  }
}
