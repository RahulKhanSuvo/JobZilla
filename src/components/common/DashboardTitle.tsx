export default function DashboardTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-primary h-8 w-2 rounded" />
      <h1 className="text-2xl font-semibold">{children}</h1>
    </div>
  );
}
