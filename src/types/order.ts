type Money = {
  amount: number;
  currency: string;
};

type Tax = {
  uid: string;
  catalog_object_id: string;
  catalog_version: number;
  name: string;
  percentage: string;
  type: string;
  applied_money: Money;
  scope: string;
};

type LineItem = {
  uid: string;
  quantity: string;
  base_price_money: Money;
  gross_sales_money: Money;
  total_tax_money: Money;
  total_discount_money: Money;
  total_money: Money;
  variation_total_price_money: Money;
  applied_taxes: {
    uid: string;
    tax_uid: string;
    applied_money: Money;
  }[];
  item_type: string;
  total_service_charge_money: Money;
};

type Tender = {
  id: string;
  location_id: string;
  transaction_id: string;
  created_at: string;
  amount_money: Money;
  processing_fee_money: Money;
  customer_id: string;
  type: string;
  cash_details?: {
    buyer_tendered_money: Money;
    change_back_money: Money;
  };
};

export type Order = {
  id: string;
  location_id: string;
  line_items: LineItem[];
  taxes: Tax[];
  created_at: string;
  updated_at: string;
  state: string;
  total_tax_money: Money;
  total_discount_money: Money;
  total_tip_money: Money;
  total_money: Money;
  closed_at: string;
  tenders: Tender[];
  total_service_charge_money: Money;
  return_amounts: {
    total_money: Money;
    tax_money: Money;
    discount_money: Money;
    tip_money: Money;
    service_charge_money: Money;
  };
  net_amounts: {
    total_money: Money;
    tax_money: Money;
    discount_money: Money;
    tip_money: Money;
    service_charge_money: Money;
  };
  rounding_adjustment: {
    uid: string;
    amount_money: Money;
  };
  source: Record<string, unknown>;
  customer_id: string;
  net_amount_due_money: Money;
};

export type SquareOrders = {
  orders: Order[];
};
