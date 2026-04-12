export function Checkbox({
  checked,
  onChange,
  id,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  id: string;
}) {
  return (
    <button
      id={id}
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`size-5 rounded flex items-center justify-center border-2 transition-colors shrink-0 ${
        checked ? "bg-primary border-primary" : "bg-white border-gray-300"
      }`}
    >
      {checked && (
        <svg className="size-3 text-white" viewBox="0 0 12 10" fill="none">
          <path
            d="M1 5l3.5 3.5L11 1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
