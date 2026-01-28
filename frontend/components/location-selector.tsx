"use client"

import * as React from "react"
import { Check, ChevronsUpDown, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"

// 40 UK locations for Street League
const locations = [
  "Aberdeen", "Birmingham", "Bradford", "Brighton", "Bristol",
  "Cambridge", "Cardiff", "Coventry", "Derby", "Dundee",
  "Edinburgh", "Exeter", "Glasgow", "Hull", "Leeds",
  "Leicester", "Liverpool", "London - Camden", "London - Hackney", "London - Islington",
  "London - Lambeth", "London - Southwark", "London - Tower Hamlets", "Manchester", "Middlesbrough",
  "Newcastle", "Norwich", "Nottingham", "Oxford", "Plymouth",
  "Portsmouth", "Reading", "Sheffield", "Southampton", "Stoke-on-Trent",
  "Sunderland", "Swansea", "Wolverhampton", "York", "Belfast"
]

interface LocationSelectorProps {
  value?: string
  onValueChange: (value: string) => void
}

export function LocationSelector({ value, onValueChange }: LocationSelectorProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[280px] justify-between"
        >
          <div className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" />
            <span className="truncate">
              {value || "Select location..."}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search locations..." />
          <CommandList>
            <CommandEmpty>No location found.</CommandEmpty>
            <CommandGroup>
              {locations.map((location) => (
                <CommandItem
                  key={location}
                  value={location}
                  onSelect={() => {
                    onValueChange(location)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      value === location ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {location}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
