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
      className={`bg-white border ${
        danger ? "border-red-200" : "border-gray-100"
      }`}
    >
      <div
        className={`flex items-center gap-3 px-6 py-4 border-b bg-gray-50/50 rounded-t-xl ${
          danger ? "border-red-100" : "border-gray-100"
        }`}
      >
        <div
          className={`p-2 rounded-lg border ${
            danger
              ? "bg-red-50 border-red-100 text-red-500"
              : "bg-primary/10 border-primary/20 text-primary"
          }`}
        >
          {icon}
        </div>
        <h2
          className={`font-semibold text-base ${
            danger ? "text-red-600" : "text-gray-900"
          }`}
        >
          {title}
        </h2>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}
