"use client";
import { Slider } from "@/app/(protected)/components/ui/slider";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../ui/hover-card";

const LevelSlider = () => {
  const [value, setValue] = useState([1]);
  const steps = ["A1", "A2", "B1", "B2", "C1", "C2"];

  return (
    <div className="grid gap-2 pt-2 w-full">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label>Level</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {steps[value[0]]}
              </span>
            </div>
            <Slider
              id="level"
              max={steps.length - 1}
              defaultValue={value}
              step={1}
              onValueChange={setValue}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Level"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          <p className="text-sm text-muted-foreground">
            Adjust the level of language complexity. Your text will be rephrased
            and paraphrased to match the selected level.
          </p>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default LevelSlider;

