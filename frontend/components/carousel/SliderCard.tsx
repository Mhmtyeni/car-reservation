//Home/index.jsx sayfadında gösterilen slider component .

"use client";

import { cn } from "../../utils/cn";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  items: {
    id: number;
    image: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  useEffect(() => {
    if (scrollerRef.current && !start) {
      const itemsArray = Array.from(scrollerRef.current.children);
      itemsArray.forEach((item) => {
        const clonedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(clonedItem);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }, [start]);

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "300s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        " scroller lg:max-w-7xl md:max-w-2xl sm:max-w-xl max-w-md md:h-[80px] sm:h-[60px] h-[40px] py-5 backdrop-blur-lg bg-white/50 border-darkGrayColor/80 border-y-[1px] shadow-sm flex justify-center items-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li className=" relative overflow-hidden items-center " key={item.id}>
            <div className="relative z-20 flex flex-row mx-10 justify-center items-center">
              <div className="relative overflow-hidden md:h-[40px] h-[30px] md:w-[100px] w-[70px] flex justify-center items-center transition duration-500">
                <Image
                  alt=""
                  src={item.image}
                  sizes="(min-width: 1200px) 600px, (min-width: 640px) 50vw, 100vw"
                  style={{ objectFit: "contain" }}
                  fill
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
