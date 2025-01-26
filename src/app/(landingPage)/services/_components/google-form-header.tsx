interface FormHeaderProps {
  title: string;
  subtitle?: string;
}

export function FormHeader({ title, subtitle }: FormHeaderProps) {
  return (
    <div className="border-b bg-secondary p-6 text-white rounded-md">
      <h1 className="text-xl font-medium">{title}</h1>
      {subtitle && <p className="mt-1 text-sm opacity-90">{subtitle}</p>}
    </div>
  );
}
