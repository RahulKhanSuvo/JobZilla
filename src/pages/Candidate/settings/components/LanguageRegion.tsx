import { useState } from "react";
import { Globe } from "lucide-react";
import { Section } from "./ui/Section";

export default function LanguageRegion() {
  const [language, setLanguage] = useState("English (United States)");
  const [timezone, setTimezone] = useState("(GMT +06:00) Dhaka");

  return (
    <Section icon={<Globe className="w-5 h-5" />} title="Language & Region">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="interface-language"
            className="block text-xs font-medium text-gray-500 mb-1"
          >
            Interface Language
          </label>
          <select
            id="interface-language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B6E6F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
            }}
          >
            <option>English (United States)</option>
            <option>English (United Kingdom)</option>
            <option>Bangla (Bangladesh)</option>
            <option>Hindi (India)</option>
            <option>French (France)</option>
            <option>Spanish (Spain)</option>
            <option>German (Germany)</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="timezone"
            className="block text-xs font-medium text-gray-500 mb-1"
          >
            Time Zone
          </label>
          <select
            id="timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B6E6F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
            }}
          >
            <option>(GMT +06:00) Dhaka</option>
            <option>(GMT +00:00) UTC</option>
            <option>(GMT -05:00) Eastern Time</option>
            <option>(GMT -08:00) Pacific Time</option>
            <option>(GMT +01:00) London</option>
            <option>(GMT +05:30) Mumbai</option>
            <option>(GMT +08:00) Singapore</option>
            <option>(GMT +09:00) Tokyo</option>
          </select>
        </div>
      </div>
    </Section>
  );
}
