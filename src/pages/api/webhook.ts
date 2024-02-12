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
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const event = req.body as OrderCreatedEvent;

    const signature = req.headers["x-square-hmacsha256-signature"] as string;

    if (event?.type === "order.created") {
      const headers = {
        "Square-Version": "2024-01-18",
        Authorization: `Bearer ${process.env.SQUARE_SECRET}`,
        "Content-Type": "application/json",
      };

      const order_id = "ukTtcEYCrQio77xW0h3reygeV"; // event.data.id;
      console.log("got the orderid", order_id);
      const url = `https://connect.squareup.com/v2/orders/${order_id}`;

      const config: AxiosRequestConfig = {
        method: "get",
        url: url,
        headers,
      };

      console.log("config", config);

      const res = await axios(config);
      console.log("res", res);
      const order = res.data as Order;
      console.log("order", order);

      console.log(order);
    }

    return res.status(200).json({ message: "Hello" });
  } catch (error) {
    console.log("error", error);
    return res.status(405).json({ message: error });
  }
}
