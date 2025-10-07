import { ReactNode } from "react";

interface ControlSectionProps {
  label: string;
  children: ReactNode;
}

export default function ControlSection({
  label,
  children,
}: ControlSectionProps) {
  return (
    <div className="flex items-start space-x-4 p-4">
      <label className="text-sm w-40 shrink-0 pt-2">{label}</label>
      {children}
    </div>
  );
}
