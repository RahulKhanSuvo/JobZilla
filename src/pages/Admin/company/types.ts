export type CompanyStatus = "active" | "suspended" | "pending";

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  email: string;
  status: CompanyStatus;
  isVerified: boolean;
  isFeatured: boolean;
  totalJobs: number;
  joinedDate: string;
  location: string;
}

export const DUMMY_COMPANIES: Company[] = [
  {
    id: "c1",
    name: "TechCorp Solutions",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=TechCorp",
    industry: "Software Development",
    email: "hr@techcorp.com",
    status: "active",
    isVerified: true,
    isFeatured: true,
    totalJobs: 12,
    joinedDate: "2024-01-10",
    location: "San Francisco, CA",
  },
  {
    id: "c2",
    name: "Global Finance Group",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=GlobalFinance",
    industry: "Finance",
    email: "contact@globalfinance.com",
    status: "active",
    isVerified: true,
    isFeatured: false,
    totalJobs: 8,
    joinedDate: "2024-02-15",
    location: "New York, NY",
  },
  {
    id: "c3",
    name: "Eco-Friendly Logistics",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=EcoLogistics",
    industry: "Logistics",
    email: "jobs@ecologistics.com",
    status: "suspended",
    isVerified: false,
    isFeatured: false,
    totalJobs: 4,
    joinedDate: "2024-03-01",
    location: "Denver, CO",
  },
  {
    id: "c4",
    name: "Creative Design Hub",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=DesignHub",
    industry: "Design",
    email: "info@designhub.com",
    status: "active",
    isVerified: true,
    isFeatured: true,
    totalJobs: 6,
    joinedDate: "2024-03-20",
    location: "Austin, TX",
  },
  {
    id: "c5",
    name: "HealthLink Systems",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=HealthLink",
    industry: "Healthcare",
    email: "support@healthlink.com",
    status: "pending",
    isVerified: false,
    isFeatured: false,
    totalJobs: 0,
    joinedDate: "2024-04-05",
    location: "Seattle, WA",
  },
  {
    id: "c6",
    name: "Urban Retailers",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=UrbanRetail",
    industry: "Retail",
    email: "careers@urbanretail.com",
    status: "active",
    isVerified: false,
    isFeatured: false,
    totalJobs: 15,
    joinedDate: "2024-01-25",
    location: "Chicago, IL",
  },
];
