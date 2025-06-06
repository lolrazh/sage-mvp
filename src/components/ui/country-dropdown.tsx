"use client";

import React, { useCallback, useState, forwardRef, useEffect } from "react";
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
import { cn } from "@/lib/utils";
import { ChevronDown, CheckIcon } from "lucide-react";
import { countries } from "country-data-list";

export interface Country {
  alpha2: string;
  alpha3: string;
  countryCallingCodes: string[];
  currencies: string[];
  emoji?: string;
  ioc: string;
  languages: string[];
  name: string;
  status: string;
}

interface CountryDropdownProps {
  options?: Country[];
  onChange?: (country: Country) => void;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
}

const CountryDropdownComponent = (
  {
    options = countries.all.filter(
      (country: Country) =>
        country.emoji && country.status !== "deleted" && country.ioc !== "PRK"
    ),
    onChange,
    defaultValue,
    disabled = false,
    placeholder = "select your country",
    ...props
  }: CountryDropdownProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(undefined);
  const listRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultValue) {
      const initialCountry = options.find(
        (country) => country.name === defaultValue
      );
      if (initialCountry) {
        setSelectedCountry(initialCountry);
      } else {
        setSelectedCountry(undefined);
      }
    } else {
      setSelectedCountry(undefined);
    }
  }, [defaultValue, options]);

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [open]);

  const handleSelect = useCallback(
    (country: Country) => {
      setSelectedCountry(country);
      onChange?.(country);
      setOpen(false);
    },
    [onChange]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        ref={ref}
        className="w-full max-w-[280px] mx-auto bg-transparent border border-foreground/50 rounded-full px-4 h-12 text-base focus-visible:ring-0 placeholder:text-foreground/30 text-center flex items-center justify-between whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 lowercase cursor-pointer hover:border-foreground/70 transition-colors"
        disabled={disabled}
        {...props}
      >
        <span className="flex-1">
          {selectedCountry ? selectedCountry.name.toLowerCase() : placeholder}
        </span>
        <ChevronDown size={16} className="opacity-50 shrink-0 ml-2" />
      </PopoverTrigger>
      <PopoverContent
        collisionPadding={10}
        side="bottom"
        align="center"
        className="min-w-[280px] p-0 bg-background rounded-[24px] border border-foreground/10"
      >
        <Command className="w-full max-h-[300px] overflow-hidden rounded-[24px]">
          <CommandList ref={listRef} className="[&_[cmdk-list-sizer]]:!py-2 [&_[cmdk-list]]:!px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-foreground/10 scrollbar-track-foreground/5 hover:scrollbar-thumb-foreground/20">
            <div className="sticky top-0 z-10 bg-background border-b border-foreground/10 mx-2 mb-2">
              <CommandInput 
                placeholder="search country..." 
                className="lowercase h-12 px-2 border-none focus-visible:ring-0"
              />
            </div>
            <CommandEmpty className="lowercase text-sm py-6 text-center text-foreground/50">no country found.</CommandEmpty>
            <CommandGroup className="pt-2">
              {options
                .filter((x) => x.name)
                .map((option, key: number) => (
                  <CommandItem
                    key={key}
                    onSelect={() => handleSelect(option)}
                    className={cn(
                      "flex items-center w-full gap-2 py-2 px-2 lowercase text-sm rounded-lg cursor-pointer transition-colors",
                      "data-[selected=true]:bg-foreground data-[selected=true]:text-background",
                      "hover:bg-foreground/10",
                      "focus:bg-foreground/10 focus:outline-none"
                    )}
                  >
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                      {option.name.toLowerCase()}
                    </span>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-3 w-3 shrink-0",
                        option.name === selectedCountry?.name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      <style jsx global>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: var(--scrollbar-width);
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: var(--scrollbar-track-bg);
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: var(--scrollbar-thumb-bg);
          border-radius: 20px;
        }
        .scroll-top {
          scroll-behavior: auto;
          scroll-padding-top: 0;
        }
      `}</style>
    </Popover>
  );
};

CountryDropdownComponent.displayName = "CountryDropdownComponent";

export const CountryDropdown = forwardRef(CountryDropdownComponent); 