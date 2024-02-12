import { Order } from "@/types/order";
import axios, { AxiosRequestConfig } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const event = req.body as OrderCreatedEvent;

    if (event?.type === "order.created") {
      console.log("Order created", event.data.object.order_created.order_id);

      const headers = {
        "Square-Version": "2024-01-18",
        Authorization: `Bearer ${process.env.SQUARE_SECRET}`,
        "Content-Type": "application/json",
      };

      const order_id = event.data.id;
      const url = `https://connect.squareup.com/v2/orders/${order_id}`;

      const config: AxiosRequestConfig = {
        method: "get",
        url: url,
        headers,
      };

      const res = await axios(config);
      const order = res.data as Order;

      console.log(order);
    }

    return res.status(200).json({ message: "Hello" });
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
