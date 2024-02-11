import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import type { SquareOrders } from "@/types/order";

export const orderRouter = createTRPCRouter({
  get_by_customer: publicProcedure
    .input(z.object({ cid: z.string() }))
    .query(async ({ input }) => {
      const { cid } = input;

      const url = "https://connect.squareup.com/v2/orders/search";

      const headers = {
        "Square-Version": "2024-01-18",
        Authorization: `Bearer ${process.env.SQUARE_SECRET}`,
        "Content-Type": "application/json",
      };

      const data = {
        query: {
          filter: {
            customer_filter: {
              customer_ids: ["P1XX1ASTX6W76BBJ268T3GN2SG"],
            },
          },
        },
        location_ids: ["L1H7VMTG37EV8"],
      };

      const config: AxiosRequestConfig = {
        method: "post",
        url,
        headers,
        data,
      };

      try {
        const res = await axios(config);
        const data = res.data as SquareOrders | null;

        return {
          orders: data?.orders,
        };
      } catch (error) {
        console.log(error);
        return {
          orders: {},
        };
      }
    }),
});
