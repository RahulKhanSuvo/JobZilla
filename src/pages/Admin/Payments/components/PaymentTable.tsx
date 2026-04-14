import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreditCard, Wallet, Landmark } from "lucide-react";
import type { Payment } from "../types";
import PaymentActions from "./PaymentActions";
import { format } from "date-fns";

interface PaymentTableProps {
  payments: Payment[];
  onUpdateStatus: (id: string, status: Payment["status"]) => void;
  onViewInvoice: (payment: Payment) => void;
}

export default function PaymentTable({
  payments,
  onUpdateStatus,
  onViewInvoice,
}: PaymentTableProps) {
  const getStatusBadge = (status: Payment["status"]) => {
    switch (status) {
      case "paid":
        return (
          <Badge
            variant="outline"
            className="text-green-600 border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900/30 font-bold uppercase text-[10px]"
          >
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900/30 font-bold uppercase text-[10px]"
          >
            Pending
          </Badge>
        );
      case "refunded":
        return (
          <Badge
            variant="outline"
            className="text-orange-600 border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-900/30 font-bold uppercase text-[10px]"
          >
            Refunded
          </Badge>
        );
      case "failed":
        return (
          <Badge
            variant="outline"
            className="text-red-600 border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900/30 font-bold uppercase text-[10px]"
          >
            Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  const getMethodIcon = (method: Payment["paymentMethod"]) => {
    switch (method) {
      case "Credit Card":
        return <CreditCard className="h-3.5 w-3.5 text-slate-400" />;
      case "PayPal":
        return <Wallet className="h-3.5 w-3.5 text-slate-400" />;
      case "Bank Transfer":
        return <Landmark className="h-3.5 w-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded shadow overflow-hidden border-none mb-8">
      <Table>
        <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
          <TableRow className="hover:bg-transparent border-none">
            <TableHead className="w-[150px] font-black py-4 uppercase text-[10px] tracking-widest text-slate-400">
              Transaction ID
            </TableHead>
            <TableHead className="w-[250px] font-black py-4 uppercase text-[10px] tracking-widest text-slate-400">
              Payer
            </TableHead>
            <TableHead className="font-black py-4 uppercase text-[10px] tracking-widest text-slate-400">
              Plan
            </TableHead>
            <TableHead className="font-black py-4 uppercase text-[10px] tracking-widest text-slate-400 text-center">
              Amount
            </TableHead>
            <TableHead className="font-black py-4 uppercase text-[10px] tracking-widest text-slate-400 text-center">
              Status
            </TableHead>
            <TableHead className="font-black py-4 uppercase text-[10px] tracking-widest text-slate-400 text-center">
              Date
            </TableHead>
            <TableHead className="text-right font-black py-4 uppercase text-[10px] tracking-widest text-slate-400">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-48 text-center text-slate-400 font-bold italic"
              >
                No financial records found.
              </TableCell>
            </TableRow>
          ) : (
            payments.map((payment) => (
              <TableRow
                key={payment.id}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 border-slate-50 dark:border-slate-800"
              >
                <TableCell className="py-5 font-mono text-[11px] font-black text-slate-500">
                  {payment.transactionId}
                </TableCell>
                <TableCell className="py-5">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border-2 border-slate-100 dark:border-slate-800">
                      <AvatarImage src={payment.payer.avatar} />
                      <AvatarFallback className="bg-primary/5 text-primary text-[10px] font-black">
                        {payment.payer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 dark:text-slate-100 leading-tight">
                        {payment.payer.name}
                      </span>
                      <span className="text-[10px] font-black text-slate-400">
                        {payment.payer.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-5 font-bold text-sm text-slate-700 dark:text-slate-300">
                  {payment.planName}
                </TableCell>
                <TableCell className="py-5 text-center">
                  <div className="flex flex-col items-center">
                    <span className="font-black text-slate-900 dark:text-slate-100">
                      ${payment.amount.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-1 mt-1">
                      {getMethodIcon(payment.paymentMethod)}
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                        {payment.paymentMethod}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-5 text-center">
                  {getStatusBadge(payment.status)}
                </TableCell>
                <TableCell className="py-5 text-center text-[11px] font-black text-slate-500">
                  {format(new Date(payment.date), "MMM dd, yyyy")}
                </TableCell>
                <TableCell className="text-right py-5">
                  <PaymentActions
                    payment={payment}
                    onUpdateStatus={onUpdateStatus}
                    onViewInvoice={onViewInvoice}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
