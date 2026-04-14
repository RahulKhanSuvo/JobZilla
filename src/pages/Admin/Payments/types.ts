export type PaymentStatus = "paid" | "pending" | "failed" | "refunded";
export type PaymentMethod = "Credit Card" | "PayPal" | "Bank Transfer";

export interface Payment {
  id: string;
  transactionId: string;
  payer: {
    name: string;
    email: string;
    avatar?: string;
  };
  planName: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  date: string;
}

export interface RevenueData {
  month: string;
  revenue: number;
}

export const DUMMY_PAYMENTS: Payment[] = [
  {
    id: "p1",
    transactionId: "TXN-88291029",
    payer: {
      name: "Acme Corp",
      email: "billing@acme.com",
    },
    planName: "Gold Plan (Yearly)",
    amount: 1200,
    currency: "USD",
    status: "paid",
    paymentMethod: "Credit Card",
    date: "2024-03-12T10:00:00Z",
  },
  {
    id: "p2",
    transactionId: "TXN-11928374",
    payer: {
      name: "John Smith",
      email: "john@techhub.io",
    },
    planName: "Silver Plan (Monthly)",
    amount: 99,
    currency: "USD",
    status: "paid",
    paymentMethod: "PayPal",
    date: "2024-03-14T14:30:00Z",
  },
  {
    id: "p3",
    transactionId: "TXN-55667788",
    payer: {
      name: "Future Labs",
      email: "finance@futurelabs.com",
    },
    planName: "Enterprise Plan",
    amount: 5000,
    currency: "USD",
    status: "pending",
    paymentMethod: "Bank Transfer",
    date: "2024-03-15T09:00:00Z",
  },
  {
    id: "p4",
    transactionId: "TXN-99001122",
    payer: {
      name: "Creative Studio",
      email: "hello@creativestudio.com",
    },
    planName: "Silver Plan (Monthly)",
    amount: 99,
    currency: "USD",
    status: "failed",
    paymentMethod: "Credit Card",
    date: "2024-03-15T16:45:00Z",
  },
  {
    id: "p5",
    transactionId: "TXN-33445566",
    payer: {
      name: "Sarah Parker",
      email: "sarah.p@freelance.com",
    },
    planName: "Basic Plan",
    amount: 49,
    currency: "USD",
    status: "refunded",
    paymentMethod: "Credit Card",
    date: "2024-03-10T11:20:00Z",
  },
  {
    id: "p6",
    transactionId: "TXN-77889900",
    payer: {
      name: "BuildIt LLC",
      email: "admin@buildit.com",
    },
    planName: "Gold Plan (Monthly)",
    amount: 149,
    currency: "USD",
    status: "paid",
    paymentMethod: "Credit Card",
    date: "2024-03-08T08:15:00Z",
  },
];

export const REVENUE_CHART_DATA: RevenueData[] = [
  { month: "Oct", revenue: 15400 },
  { month: "Nov", revenue: 18900 },
  { month: "Dec", revenue: 22000 },
  { month: "Jan", revenue: 19500 },
  { month: "Feb", revenue: 28400 },
  { month: "Mar", revenue: 32000 },
];
