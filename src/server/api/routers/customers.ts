import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import axios, { AxiosRequestConfig } from "axios";
import type { SquareCustomer } from "@/types/customers";
import { SquareOrders } from "@/types/order";

export const customerRouter = createTRPCRouter({
  get_by_school_ID: publicProcedure
    .input(z.object({ sid: z.string() }))
    .query(async ({ input }) => {
      const { sid } = input;

      const customer_url = "https://connect.squareup.com/v2/customers/search";
      const email = `${sid}@jeaneudes.net`;

      const headers = {
        "Square-Version": "2024-01-18",
        Authorization: `Bearer ${process.env.SQUARE_SECRET}`,
        "Content-Type": "application/json",
      };

      const customer_data = {
        query: {
          filter: {
            email_address: {
              exact: email,
            },
          },
        },
      };

      const config: AxiosRequestConfig = {
        method: "post",
        url: customer_url,
        headers,
        data: customer_data,
      };

      try {
        const customer_request = await axios(config);
        const customer_result = customer_request.data as SquareCustomer | null;

        console.log(customer_result);

        if (customer_result?.customers[0] !== undefined) {
          const cid = customer_result?.customers[0].id;

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
          const order_result = order_request.data as SquareOrders | null;

          console.log(order_result);

          return {
            customer: customer_result?.customers[0],
            orders: order_result?.orders,
          };
        } else {
          console.log("No customer found");
          return {
            customer: {},
            orders: {},
          };
        }
      } catch (error) {
        //console.log(error);
        console.log("Some fucking error");
        return {
          customer: {},
          orders: {},
        };
      }
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
