"use client";

import { CarProps } from "../../types";
import { cn } from "../../utils/cn";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface CarCardProps {
  groupedCars: { [key: string]: CarProps[] };
  className?: string;
  buttonLabel?: (label: string) => string;
}

export const HoverEffect = ({
  groupedCars,
  className,
  buttonLabel = (label) => `${label}`,
}: CarCardProps) => {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleGroupClick = (group: string) => {
    setExpandedGroup(expandedGroup === group ? null : group);
  };

  return (
    <div className={cn("py-10", className)}>
      <div className="flex mb-8 justify-between">
        {Object.keys(groupedCars).map((group) => (
          <button
            key={group}
            className="button flex-1 mx-2"
            onClick={() => handleGroupClick(group)}
          >
            {buttonLabel(group)}
          </button>
        ))}
      </div>
      {Object.keys(groupedCars).map((group) => (
        <div key={group}>
          {expandedGroup === group && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedCars[group].map((car, idx) => (
                <div
                  key={car.id}
                  className="relative group block p-2"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <AnimatePresence>
                    {hoveredIndex === idx && (
                      <motion.span
                        className="absolute inset-0 bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                        layoutId="hoverBackground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.15 } }}
                        exit={{
                          opacity: 0,
                          transition: { duration: 0.15, delay: 0.2 },
                        }}
                      />
                    )}
                  </AnimatePresence>
                  <CarCard car={car} />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return date.toLocaleString("tr-TR", options);
};
const CarCard = ({ car }: { car: CarProps }) => (
  <div className="relative group block p-2 cursor-help">
    <Card>
      <CardTitle>{car.carLicensePlate}</CardTitle>
      <CardDescription>{formatDateTime(car.endDateTime) || ""}</CardDescription>
      <CardDescription>{car.locationName}</CardDescription>
      <CardDescription>{car.carIMEI}</CardDescription>
    </Card>
  </div>
);

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "rounded-3xl w-62 h-36 items-center text-center flex justify-center overflow-hidden  bg-darkGrayColor/10 border text-darkColor shadow-xl border-[#c23031]/[0.2] group-hover:border-[#c23031] transition-all relative z-20",
      className
    )}
  >
    <div className="relative z-50">
      <div className="p-4">{children}</div>
    </div>
  </div>
);

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <h4
    className={cn(
      "text-darkColor text-sm hover:text-[#c23031] tracking-wide font-bold uppercase font-titleTextType",
      className
    )}
  >
    {children}
  </h4>
);

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <p
    className={cn(
      "text-darkColor tracking-wide leading-relaxed hover:text-[#c23031] font-bold font-textTextType",
      className
    )}
  >
    {children}
  </p>
);
