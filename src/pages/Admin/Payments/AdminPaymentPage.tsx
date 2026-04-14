import { useState, useMemo } from "react";
import { type Payment, DUMMY_PAYMENTS } from "./types";
import PaymentStats from "./components/PaymentStats";
import PaymentFilters from "./components/PaymentFilters";
import PaymentTable from "./components/PaymentTable";

export default function AdminPaymentPage() {
  const [payments, setPayments] = useState<Payment[]>(DUMMY_PAYMENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchesSearch =
        payment.transactionId
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        payment.payer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.payer.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || payment.status === statusFilter;
      const matchesMethod =
        methodFilter === "all" || payment.paymentMethod === methodFilter;

      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [payments, searchQuery, statusFilter, methodFilter]);

  const handleUpdateStatus = (id: string, status: Payment["status"]) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p)),
    );
  };

  const handleViewInvoice = (payment: Payment) => {
    alert(
      `Generating invoice for ${payment.transactionId}...\n\nCustomer: ${payment.payer.name}\nAmount: ${payment.amount} ${payment.currency}\nDate: ${new Date(payment.date).toLocaleDateString()}`,
    );
  };

  const handleExport = () => {
    alert("Exporting financial records to CSV... (Simulated)");
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setMethodFilter("all");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-slate-100 uppercase">
          Financial Management
        </h1>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          Monitor revenue, manage transactions, and oversee platform billing.
        </p>
      </div>

      <PaymentStats payments={payments} />

      <div className="space-y-4">
        <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-slate-100 uppercase">
          Transaction History
        </h2>

        <PaymentFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          methodFilter={methodFilter}
          setMethodFilter={setMethodFilter}
          onClearFilters={handleClearFilters}
          onExport={handleExport}
        />

        <PaymentTable
          payments={filteredPayments}
          onUpdateStatus={handleUpdateStatus}
          onViewInvoice={handleViewInvoice}
        />
      </div>
    </div>
  );
}
