"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface TimeDurationSelectProps {
  value: number;
  onChange: (value: number) => void;
}

const presetDurations = [
  { label: "1 hour", value: 1 },
  { label: "1.5 hours", value: 1.5 },
  { label: "2 hours", value: 2 },
];

export function TimeDurationSelect({
  value,
  onChange,
}: TimeDurationSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [customDuration, setCustomDuration] = React.useState("");

  const handleSelect = (selectedValue: number) => {
    onChange(selectedValue);
    setOpen(false);
  };

  const handleCustomDurationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomDuration(e.target.value);
  };

  const handleCustomDurationSubmit = () => {
    const parsedValue = Number.parseFloat(customDuration);
    if (!isNaN(parsedValue)) {
      onChange(Math.round(parsedValue * 2) / 2); // Round to nearest 0.5
    }
    setOpen(false);
  };

  return (
    <main>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? `${value} hour${value !== 1 ? "s" : ""}`
              : "Select duration"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search duration..." />
            <CommandList>
              <CommandEmpty>No duration found.</CommandEmpty>
              <CommandGroup>
                {presetDurations.map((duration) => (
                  <CommandItem
                    key={duration.value}
                    onSelect={() => handleSelect(duration.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === duration.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {duration.label}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandGroup>
                <div className="flex items-center px-2 py-1">
                  <Input
                    type="number"
                    placeholder="Custom duration"
                    value={customDuration}
                    onChange={handleCustomDurationChange}
                    step="0.5"
                    min="1"
                    max="2"
                    className="mr-2"
                  />
                  <Button onClick={handleCustomDurationSubmit} size="sm">
                    Add
                  </Button>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </main>
  );
}
