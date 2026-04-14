import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSettings,
  FiBriefcase,
  FiCreditCard,
  FiBell,
  FiShare2,
  FiShield,
  FiChevronRight,
} from "react-icons/fi";

import { cn } from "@/lib/utils";
import { GeneralSettings } from "./components/GeneralSettings";
import { JobSettings } from "./components/JobSettings";
import { PaymentSettings } from "./components/PaymentSettings";
import { NotificationSettings } from "./components/NotificationSettings";
import { SocialSettings } from "./components/SocialSettings";
import { SecuritySettings } from "./components/SecuritySettings";
import DashboardTitle from "@/components/common/DashboardTitle";

const SETTING_TABS = [
  {
    id: "general",
    label: "General",
    icon: FiSettings,
    component: GeneralSettings,
  },
  { id: "job", label: "Job Portal", icon: FiBriefcase, component: JobSettings },
  {
    id: "payment",
    label: "Payments",
    icon: FiCreditCard,
    component: PaymentSettings,
  },
  {
    id: "notification",
    label: "Notifications",
    icon: FiBell,
    component: NotificationSettings,
  },
  {
    id: "social",
    label: "Social Links",
    icon: FiShare2,
    component: SocialSettings,
  },
  {
    id: "security",
    label: "Security",
    icon: FiShield,
    component: SecuritySettings,
  },
];

export default function AdminSettingPage() {
  const [activeTab, setActiveTab] = useState("general");

  const ActiveComponent =
    SETTING_TABS.find((tab) => tab.id === activeTab)?.component ||
    GeneralSettings;

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <DashboardTitle>Admin Settings</DashboardTitle>
          <p className="text-muted-foreground text-sm mt-1">
            Configure and manage your job portal's core functionalities.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <nav className="flex flex-col gap-1">
            {SETTING_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        "text-lg",
                        isActive
                          ? "text-white"
                          : "group-hover:scale-110 transition-transform",
                      )}
                    />
                    <span className="font-medium">{tab.label}</span>
                  </div>
                  {isActive && (
                    <motion.div layoutId="active-indicator">
                      <FiChevronRight />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Setting Content Area */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="bg-background rounded-2xl">
                <ActiveComponent />
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
