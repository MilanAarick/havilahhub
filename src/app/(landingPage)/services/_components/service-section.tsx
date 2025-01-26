import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ServiceSectionProps {
  title: string;
  options: {
    value: string;
    label: string;
  }[];
  value?: string;
  onChange: (value: string) => void;
}

export function ServiceSection({
  title,
  options,
  value,
  onChange,
}: ServiceSectionProps) {
  return (
    <div className="space-y-4 rounded-lg border bg-white p-6">
      <h2 className="font-medium">{title}</h2>
      <RadioGroup value={value} onValueChange={onChange}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value}
              id={`${title}-${option.value}`}
            />
            <Label htmlFor={`${title}-${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
