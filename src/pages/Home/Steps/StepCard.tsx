type Step = {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  label: string;
  description: string;
  color?: string;
};

interface StepCardProps {
  step: Step;
}

export default function StepCard({ step }: StepCardProps) {
  const Icon = step.icon;
  const color = step.color ?? "#ccc";

  return (
    <div className="p-4 flex flex-col items-center text-center">
      <div
        className="p-4 rounded-[10px] mb-3"
        style={{
          backgroundColor: color,
          boxShadow: `0 6px 10px ${color}55`,
        }}
      >
        <Icon size={32} color="white" />
      </div>
      <h3 className="font-semibold text-lg mb-1">{step.label}</h3>
      <p className="text-gray-600 text-sm">{step.description}</p>
    </div>
  );
}
