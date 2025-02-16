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

export interface ComboboxOption<T extends string> {
  value: T;
  label: string;
}

interface ComboboxProps<T extends string> {
  options: ComboboxOption<T>[];
  value: T | "";
  onValueChange: (value: T | "") => void;
  placeholder?: string;
  emptyText?: string;
  searchPlaceholder?: string;
  buttonClassName?: string;
  renderItem?: (item: ComboboxOption<T>) => React.ReactNode;
  popoverClassName?: string;
  commandClassName?: string;
  commandGroupClassName?: string;
  commandItemClassName?: string;
}

export function Combobox<T extends string>({
  options,
  value,
  onValueChange,
  placeholder = "Select an option...",
  emptyText = "No option found.",
  searchPlaceholder = "Search...",
  buttonClassName,
  popoverClassName,
  renderItem,
  commandClassName,
  commandGroupClassName,
  commandItemClassName,
}: ComboboxProps<T>) {
  const [open, setOpen] = React.useState(false);

  console.log(placeholder);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between ", buttonClassName)}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0", popoverClassName)}>
        <Command className={commandClassName}>
          <CommandInput placeholder={searchPlaceholder}/>
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup className={commandGroupClassName}>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  className={commandItemClassName}
                  onSelect={(currentValue:string) => {
                    onValueChange(
                      currentValue === value ? "" : (currentValue as T)
                    );
                    setOpen(false);
                  }}
                >
                  {renderItem ? (
                    renderItem(option)
                  ) : (
                    <>
                      {option.label}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
