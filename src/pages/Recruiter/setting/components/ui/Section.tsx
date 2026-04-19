import React from "react";

export function Section({
  icon,
  title,
  children,
  danger,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <div
      className={`bg-white border rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md ${
        danger ? "border-red-100" : "border-slate-100"
      }`}
    >
      <div
        className={`flex items-center gap-3 px-6 py-4 border-b ${
          danger
            ? "border-red-50 bg-red-50/30"
            : "border-slate-50 bg-slate-50/30"
        }`}
      >
        <div
          className={`p-2 rounded-lg border flex items-center justify-center ${
            danger
              ? "bg-red-50 border-red-100 text-red-500"
              : "bg-primary/10 border-primary/20 text-primary"
          }`}
        >
          {icon}
        </div>
        <h2
          className={`font-semibold text-base ${
            danger ? "text-red-600" : "text-slate-900"
          }`}
        >
          {title}
        </h2>
      </div>
      <div className="px-6 py-6 font-sans">{children}</div>
    </div>
  );
}
