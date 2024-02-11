export type Customer = {
  id: string;
  given_name: string;
  family_name: string;
  email_address: string;
  address: {
    address_line_1: string;
    address_line_2: string;
    locality: string;
    administrative_district_level_1: string;
    postal_code: string;
    country: string;
  };
  phone_number: string;
  reference_id: string;
  note: string;
  birthday: string;
  created_at: string;
  updated_at: string;
};

export type SquareCustomer = {
  customers: Customer[];
};
