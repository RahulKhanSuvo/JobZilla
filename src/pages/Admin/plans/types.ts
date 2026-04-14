export interface Plan {
  id: string;
  name: string;
  price: number;
  interval: "monthly" | "yearly";
  description: string;
  features: string[];
  status: "active" | "inactive";
  popular?: boolean;
  createdAt: string;
}

export const DUMMY_PLANS: Plan[] = [
  {
    id: "plan_1",
    name: "Free",
    price: 0,
    interval: "monthly",
    description:
      "Perfect for students and casual job seekers looking to get started.",
    features: [
      "Up to 5 job applications per month",
      "Basic profile visibility",
      "Standard support",
      "Job alerts",
    ],
    status: "active",
    createdAt: "2024-01-01T10:00:00Z",
  },
  {
    id: "plan_2",
    name: "Professional",
    price: 29,
    interval: "monthly",
    description:
      "Designed for active job seekers who want to stand out from the crowd.",
    features: [
      "Unlimited job applications",
      "Priority profile visibility",
      "2 premium resumes",
      "Advanced job search filters",
      "Priority support",
    ],
    status: "active",
    popular: true,
    createdAt: "2024-01-05T12:00:00Z",
  },
  {
    id: "plan_3",
    name: "Enterprise",
    price: 299,
    interval: "yearly",
    description: "Best for recruitment agencies and corporate hiring teams.",
    features: [
      "Advanced hiring dashboard",
      "Bulk candidate messaging",
      "Applicant tracking system integration",
      "Dedicated account manager",
      "Custom branding",
    ],
    status: "active",
    createdAt: "2024-02-10T09:30:00Z",
  },
  {
    id: "plan_4",
    name: "Legacy Basic",
    price: 15,
    interval: "monthly",
    description: "Old basic plan for existing users only.",
    features: ["10 job applications per month", "Basic profile"],
    status: "inactive",
    createdAt: "2023-06-15T15:00:00Z",
  },
];
