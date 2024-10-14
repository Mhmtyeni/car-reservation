"use client";

import React from "react";
import { InfiniteMovingCards } from "./SliderCard";

export function InfiniteMovingCardsDemo() {
  const imageNames = ["/auto/carRedOn.png"];

  const testimonials = imageNames.map((name, index) => ({
    id: index,
    image: name,
  }));

  return (
    <div className="h-[24rem] rounded-md flex flex-col antialiased dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards items={testimonials} direction="left" speed="slow" />
    </div>
  );
}
