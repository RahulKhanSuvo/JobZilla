import React from "react";

interface TimelineProps {
  children: React.ReactNode;
}

export function Timeline({ children }: TimelineProps) {
  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-3 md:ml-4">
      {children}
    </ol>
  );
}

interface TimelineItemProps {
  title: string;
  subtitle?: string;
  date: string;
  description?: string;
  icon?: React.ReactNode;
}

export function TimelineItem({
  title,
  subtitle,
  date,
  description,
  icon,
}: TimelineItemProps) {
  return (
    <li className="mb-8 ml-8">
      <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 bg-primary/10 text-primary dark:bg-primary/20">
        {icon || <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
      </span>
      <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      {subtitle && (
        <h4 className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {subtitle}
        </h4>
      )}
      <time className="block mb-2 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
        {date}
      </time>
      {description && (
        <p className="text-base font-normal text-gray-600 dark:text-gray-400">
          {description}
        </p>
      )}
    </li>
  );
}
