// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Customer, SquareCustomer } from "@/types/customers";
import { Order, SquareOrders } from "@/types/order";
import { api } from "@/utils/api";
import Spline from "@splinetool/react-spline";
import React, { useState } from "react";
import QRCode from "react-qr-code";

const CouponCard = (props: { index: number; coupon_id: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="flex w-full flex-col items-center p-4">
                  <h1 className="text-bold mb-12 text-[32px]">
                    Montrez-moi au kisoque
                  </h1>
                  <QRCode
                    className="mb-8 border-spacing-2 rounded-xl border-4 border-dashed border-green-500 p-4"
                    value={`https://boba-loyalty.vercel.app/verify/${props.coupon_id}`}
                  />
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(!isModalOpen);
                    }}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all hover:bg-red-500 hover:text-white sm:mt-0 sm:w-auto"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="m-4 w-[350px] rounded-xl bg-green-500 p-4 hover:scale-105">
        <div className="flex flex-col items-start">
          <div>
            <h1 className="font-mono text-8xl font-bold text-white">Boba</h1>
          </div>
          <div className="flex w-full flex-row">
            <div className="ml-4 pt-4">
              <svg
                width="46"
                height="67"
                viewBox="0 0 46 67"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28.8331 67.0011C22.9747 67.0011 19.3437 64.3648 17.1701 61.7368C15.8738 59.494 11.7485 49.6394 7.76008 40.1091C5.16215 33.9046 2.70825 28.043 1.60742 25.6537L3.42138 24.892C4.53389 27.3103 6.99402 33.186 9.59739 39.4054C13.381 48.4433 17.6683 58.6869 18.8159 60.6969C21.3344 63.7184 26.4111 66.8686 35.7962 63.955C41.3572 61.4839 43.9606 57.775 44.0244 55.2124C43.3728 47.6392 43.0474 17.3418 43.0341 16.0557L45.0147 16.0371C45.0186 16.351 45.3534 47.5529 46.0011 55.1588C45.9084 59.099 42.1848 63.2022 36.5179 65.7127C33.607 66.6202 31.0597 67.0011 28.8331 67.0011Z"
                  fill="white"
                />
                <path
                  d="M27.1956 63.594C28.5371 63.594 29.6246 62.5949 29.6246 61.3624C29.6246 60.13 28.5371 59.1309 27.1956 59.1309C25.8541 59.1309 24.7666 60.13 24.7666 61.3624C24.7666 62.5949 25.8541 63.594 27.1956 63.594Z"
                  fill="white"
                />
                <path
                  d="M37.0081 61.3635C38.3496 61.3635 39.4371 60.3644 39.4371 59.132C39.4371 57.8995 38.3496 56.9004 37.0081 56.9004C35.6666 56.9004 34.5791 57.8995 34.5791 59.132C34.5791 60.3644 35.6666 61.3635 37.0081 61.3635Z"
                  fill="white"
                />
                <path
                  d="M40.6302 56.5413C41.9717 56.5413 43.0591 55.5422 43.0591 54.3097C43.0591 53.0772 41.9717 52.0781 40.6302 52.0781C39.2887 52.0781 38.2012 53.0772 38.2012 54.3097C38.2012 55.5422 39.2887 56.5413 40.6302 56.5413Z"
                  fill="white"
                />
                <path
                  d="M25.3108 55.5589C26.6523 55.5589 27.7398 54.5597 27.7398 53.3273C27.7398 52.0948 26.6523 51.0957 25.3108 51.0957C23.9693 51.0957 22.8818 52.0948 22.8818 53.3273C22.8818 54.5597 23.9693 55.5589 25.3108 55.5589Z"
                  fill="white"
                />
                <path
                  d="M34.9085 53.8655C36.25 53.8655 37.3375 52.8664 37.3375 51.6339C37.3375 50.4015 36.25 49.4023 34.9085 49.4023C33.567 49.4023 32.4795 50.4015 32.4795 51.6339C32.4795 52.8664 33.567 53.8655 34.9085 53.8655Z"
                  fill="white"
                />
                <path
                  d="M21.7776 60.5589C23.1191 60.5589 24.2066 59.5597 24.2066 58.3273C24.2066 57.0948 23.1191 56.0957 21.7776 56.0957C20.4361 56.0957 19.3486 57.0948 19.3486 58.3273C19.3486 59.5597 20.4361 60.5589 21.7776 60.5589Z"
                  fill="white"
                />
                <path
                  d="M31.013 58.7737C32.3545 58.7737 33.442 57.7746 33.442 56.5421C33.442 55.3097 32.3545 54.3105 31.013 54.3105C29.6715 54.3105 28.584 55.3097 28.584 56.5421C28.584 57.7746 29.6715 58.7737 31.013 58.7737Z"
                  fill="white"
                />
                <path
                  d="M17.8583 5.02173C16.4056 5.02173 15.3304 4.41176 15.0517 3.43061C14.6765 2.1006 15.926 0.70363 17.9572 0.177722C19.9206 -0.330333 21.814 0.285582 22.183 1.58287C22.5582 2.91289 21.3087 4.30985 19.2775 4.83576C18.8003 4.95999 18.3223 5.02173 17.8583 5.02173ZM16.9684 2.96124C16.9957 2.96124 17.2604 3.12935 17.8583 3.12935C18.1448 3.12935 18.4562 3.0877 18.7598 3.00959C19.7789 2.74626 20.2507 2.21887 20.2686 2.05448C20.2608 2.04778 20.0171 1.88562 19.3772 1.88562C19.0907 1.88562 18.7793 1.92728 18.4757 2.00464C17.4581 2.26871 16.9848 2.79685 16.9669 2.96198C16.9669 2.96198 16.9669 2.96124 16.9684 2.96124Z"
                  fill="white"
                />
                <path
                  d="M21.0202 18.3874C19.8984 18.3874 18.8536 18.0237 18.2176 17.3676L18.0315 17.1742L15.0342 3.46488L16.9719 3.07881L19.8462 16.2183C20.2487 16.4638 21.0008 16.591 21.7801 16.4043C22.2269 16.2972 22.9852 16.0071 23.2865 15.2558C22.5726 12.1152 20.3772 2.53356 20.3772 2.53356L22.311 2.12891C22.311 2.12891 24.6302 12.2469 25.2764 15.0988L25.327 15.319L25.2686 15.5362C24.9051 16.8818 23.8105 17.8667 22.2651 18.2401C21.8501 18.3391 21.4305 18.3874 21.0202 18.3874Z"
                  fill="white"
                />
                <path
                  d="M17.6482 31.2014C13.4333 31.2014 10.1066 30.5721 8.67727 30.0983C3.77258 28.4722 -1.03246 24.7916 0.193715 19.3391C2.70445 11.8581 12.3231 7.2633 16.5917 6.19512L17.0947 8.0265C13.1686 9.00765 4.33857 13.1844 2.10499 19.8271C0.92864 25.0802 7.3351 27.651 9.32734 28.3115C13.0238 29.5359 30.3264 31.8746 41.1595 19.7742C42.5406 18.1363 43.7512 15.1899 42.5578 12.3476C41.2717 9.28362 37.5892 7.28785 31.906 6.57672C27.9122 6.03519 22.8791 6.73367 22.3201 6.81624L21.8717 6.88096L21.5135 6.59903L22.0165 4.94618C22.612 4.85915 27.9153 4.12868 32.1731 4.7022C40.293 5.71756 43.302 9.0374 44.3951 11.6431C45.6384 14.6067 44.9673 18.2731 42.6831 20.9823C35.2949 29.2369 25.0885 31.2014 17.6482 31.2014Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="ml-10 flex flex-col justify-between">
              <h1 className="text-[45px] font-extrabold text-emerald-700">
                GRATUIT
              </h1>
              <button
                className="rounded-lg border-2 border-green-700 bg-slate-900 p-2 text-2xl font-bold text-white hover:animate-pulse hover:cursor-pointer"
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                Utiliser 👈
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ClaimFreeBoba = (props: { customer: unknown }) => {
  const { customer } = props;

  type Bundle = {
    data: {
      customer: Customer;
      orders: Order[];
    };
  };

  const customerVouchers = api.customer.get_free_boba_claims.useQuery({
    cid: (customer as Bundle)?.data?.customer?.id || "",
  });

  const num_vouchers = customerVouchers.data?.filter(
    (voucher) => !voucher.used,
  ).length;

  return (
    <>
      {num_vouchers > 0 ? (
        <div className="mt-8 flex flex-col items-center p-4">
          <h1 className="mt-8 text-2xl font-bold">Tes récompenses</h1>
          {num_vouchers > 0 &&
            customerVouchers.data?.map((voucher, index) => {
              if (!voucher.used) {
                return (
                  <CouponCard
                    key={index}
                    index={index}
                    coupon_id={voucher.id}
                  />
                );
              }
            })}
        </div>
      ) : (
        <div className="mt-20 flex flex-col items-center p-4">
          <h1 className=" text-2xl">Pas de boba à réclamer :(</h1>
          <Spline
            style={{ height: "300px" }}
            scene="https://prod.spline.design/Jh1UFzqccFhPMyBJ/scene.splinecode"
          />
        </div>
      )}
    </>
  );
};

export default ClaimFreeBoba;
