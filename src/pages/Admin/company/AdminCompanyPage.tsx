import { useState, useMemo } from "react";
import { DUMMY_COMPANIES, type Company, type CompanyStatus } from "./types";
import CompanyStats from "./components/CompanyStats";
import CompanyFilters from "./components/CompanyFilters";
import CompanyTable from "./components/CompanyTable";

export default function AdminCompanyPage() {
  const [companies, setCompanies] = useState<Company[]>(DUMMY_COMPANIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const matchesSearch = company.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesIndustry =
        industryFilter === "all" || company.industry === industryFilter;
      const matchesStatus =
        statusFilter === "all" || company.status === statusFilter;

      return matchesSearch && matchesIndustry && matchesStatus;
    });
  }, [companies, searchQuery, industryFilter, statusFilter]);

  const handleUpdateStatus = (id: string, status: CompanyStatus) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c)),
    );
  };

  const handleToggleVerification = (id: string, isVerified: boolean) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isVerified } : c)),
    );
  };

  const handleToggleFeatured = (id: string, isFeatured: boolean) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFeatured } : c)),
    );
  };

  const handleDeleteCompany = (id: string) => {
    if (
      confirm(
        "Are you sure you want to delete this company? This will also remove all their associated job postings.",
      )
    ) {
      setCompanies((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setIndustryFilter("all");
    setStatusFilter("all");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Company Management
        </h1>
        <p className="text-muted-foreground">
          Monitor employers, verify business accounts, and manage company
          promotions.
        </p>
      </div>

      <CompanyStats companies={companies} />

      <CompanyFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        industryFilter={industryFilter}
        setIndustryFilter={setIndustryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onClearFilters={handleClearFilters}
      />

      <CompanyTable
        companies={filteredCompanies}
        onUpdateStatus={handleUpdateStatus}
        onToggleVerification={handleToggleVerification}
        onToggleFeatured={handleToggleFeatured}
        onDelete={handleDeleteCompany}
      />
    </div>
  );
}
