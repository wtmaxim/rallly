"use client";

import type { SelectProps } from "@radix-ui/react-select";
import { cn } from "@rallly/ui";
import { Badge } from "@rallly/ui/badge";
import { Button } from "@rallly/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@rallly/ui/command";
import { useDialog } from "@rallly/ui/dialog";
import { Icon } from "@rallly/ui/icon";
import dayjs from "dayjs";
import { CheckIcon, GlobeIcon } from "lucide-react";
import React from "react";

import { Trans } from "@/components/trans";
import { useTranslation } from "@/i18n/client";
import { groupedTimeZones } from "@/utils/grouped-time-zone";

interface TimeZoneCommandProps {
  value?: string;
  onSelect?: (value: string) => void;
}

export const TimeZoneCommand = ({ onSelect, value }: TimeZoneCommandProps) => {
  const { t } = useTranslation();
  return (
    <Command>
      <CommandInput
        placeholder={t("timeZoneSelect__inputPlaceholder", {
          defaultValue: "Search…",
        })}
      />
      <CommandList className="max-h-[300px] w-[var(--radix-popover-trigger-width)] max-w-[var(--radix-popover-content-available-width)] overflow-y-auto">
        <CommandEmpty>
          <Trans
            i18nKey="timeZoneSelect__noOption"
            defaults="No option found"
          />
        </CommandEmpty>
        {Object.entries(groupedTimeZones).map(([region, timeZones]) => (
          <CommandGroup heading={region} key={region}>
            {timeZones.map(({ timezone, city }) => {
              return (
                <CommandItem
                  key={timezone}
                  onSelect={() => onSelect?.(timezone)}
                  className="flex min-w-0 gap-x-2.5"
                >
                  <div className="w-6 shrink-0">
                    {value === timezone ? (
                      <Icon>
                        <CheckIcon />
                      </Icon>
                    ) : null}
                  </div>
                  <span className="min-w-0 grow truncate">{city}</span>
                  <Badge>{dayjs().tz(timezone).format("z")}</Badge>
                </CommandItem>
              );
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </Command>
  );
};

export const TimeZoneSelect = React.forwardRef<
  HTMLButtonElement,
  SelectProps & { className?: string }
>(({ value, onValueChange, className, disabled }, ref) => {
  const dialog = useDialog();
  return (
    <>
      <CommandDialog {...dialog.dialogProps}>
        <TimeZoneCommand
          value={value}
          onSelect={(newValue) => {
            onValueChange?.(newValue);
            dialog.dismiss();
          }}
        />
      </CommandDialog>
      <Button
        ref={ref}
        disabled={disabled}
        className={cn("justify-start text-left", className)}
        onClick={() => {
          dialog.trigger();
        }}
      >
        <Icon>
          <GlobeIcon />
        </Icon>
        <span className="flex-1">{value}</span>
      </Button>
    </>
  );
});

TimeZoneSelect.displayName = "TimeZoneSelect";
