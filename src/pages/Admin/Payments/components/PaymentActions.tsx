import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  FileText,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import type { Payment } from "../types";

interface PaymentActionsProps {
  payment: Payment;
  onUpdateStatus: (id: string, status: Payment["status"]) => void;
  onViewInvoice: (payment: Payment) => void;
}

export default function PaymentActions({
  payment,
  onUpdateStatus,
  onViewInvoice,
}: PaymentActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 hover:bg-muted font-bold"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Billing Actions</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => onViewInvoice(payment)}>
          <FileText className="mr-2 h-4 w-4 text-blue-600" />
          <span>View Invoice</span>
        </DropdownMenuItem>

        {payment.status === "pending" && (
          <DropdownMenuItem onClick={() => onUpdateStatus(payment.id, "paid")}>
            <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
            <span>Verify Payment</span>
          </DropdownMenuItem>
        )}

        {payment.status === "paid" && (
          <DropdownMenuItem
            onClick={() => onUpdateStatus(payment.id, "refunded")}
          >
            <RotateCcw className="mr-2 h-4 w-4 text-orange-600" />
            <span>Process Refund</span>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <ExternalLink className="mr-2 h-4 w-4" />
          <span>Payment Source</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Delete/Void for Failed */}
        {payment.status === "failed" && (
          <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
            <AlertCircle className="mr-2 h-4 w-4" />
            <span>Void Transaction</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
