import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import axios, { AxiosRequestConfig } from "axios";
import type { Customer, SquareCustomer } from "@/types/customers";
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

  get_by_id: publicProcedure
    .input(z.object({ coupon_id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { coupon_id } = input;

      try {
        const free_boba = await ctx.db.freeBobaClaim.findUnique({
          where: {
            id: coupon_id,
          },
        });

        const cid = free_boba?.customerId;
        const customer_url = `https://connect.squareup.com/v2/customers/${cid}`;

        const headers = {
          "Square-Version": "2024-01-18",
          Authorization: `Bearer ${process.env.SQUARE_SECRET}`,
          "Content-Type": "application/json",
        };

        const config: AxiosRequestConfig = {
          method: "get",
          url: customer_url,
          headers,
        };

        const customer_request = await axios(config);
        const customer_result = customer_request.data as {
          customer: Customer;
        } | null;

        console.log(customer_result);

        return {
          customer: customer_result?.customer,
          coupon: free_boba,
        };
      } catch (error) {
        //console.log(error);
        console.log("Some fucking error xox");
        return {
          customer: {},
          coupon: {},
        };
      }
    }),
  get_free_boba_claims: publicProcedure
    .input(z.object({ cid: z.string() }))
    .query(async ({ ctx, input }) => {
      const { cid } = input;
      return await ctx.db.freeBobaClaim.findMany({
        where: {
          customerId: cid,
        },
      });
    }),

  redeem_voucher: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      return await ctx.db.freeBobaClaim.update({
        where: {
          id: id,
        },
        data: {
          used: true,
        },
      });
    }),
});
