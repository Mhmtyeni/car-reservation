import React from "react";

function Loading() {
  return (
    <div className="fixed w-screen h-screen top-0 left-0 z-50">
      <div className="loading-page h-full w-full ">
        <svg
          id="loading-svg"
          width="235"
          height="364"
          viewBox="0 0 235 364"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M234.66 52.57L141.95 183.29L234.67 311.28V268.8L153.9 181.03L234.67 92.44V52.57H234.66Z"
            fill="#D62027"
          />
          <mask
            id="mask0_21_9"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="141"
            y="52"
            width="94"
            height="260"
          >
            <path
              d="M234.66 52.57L141.95 183.29L234.67 311.28V268.8L153.9 181.03L234.67 92.44V52.57H234.66Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_21_9)">
            <path
              d="M234.601 50.9856L107.131 52.6097L110.447 312.869L237.917 311.244L234.601 50.9856Z"
              fill="#D62027"
            />
          </g>
          <path
            d="M234.67 92.44L185.56 121.8L153.9 181.03L234.67 92.44Z"
            fill="#EE3E4C"
          />
          <path
            d="M234.67 311.28L194.29 224.91L141.95 183.29L234.67 311.28Z"
            fill="#EE3E4C"
          />
          <path
            d="M0.0100002 0L130.4 183.84L0 363.85V304.1L113.59 180.67L0 56.07V0H0.0100002Z"
            fill="#D62027"
          />
          <mask
            id="mask1_21_9"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="131"
            height="364"
          >
            <path
              d="M0.01 0L130.4 183.84L0 363.85V304.1L113.59 180.67L0 56.07V0H0.01Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask1_21_9)">
            <path
              d="M0.0778715 -2.24238L-4.58594 363.788L174.68 366.072L179.343 0.04175L0.0778715 -2.24238Z"
              fill="#D62027"
            />
          </g>
          <path
            d="M0 56.07L69.06 97.36L113.59 180.67L0 56.07Z"
            fill="#EE3E4C"
          />
          <path
            d="M0 363.85L56.79 242.38L130.4 183.84L0 363.85Z"
            fill="#EE3E4C"
          />
        </svg>
        <div className="mt-10 flex flex-col gap-10 items-center">
          <p className="loading-name md:text-sm text-xs md:tracking-[1.1rem] tracking-[0.8rem] ">
            YÜKLENİYOR
          </p>
          <div className="loading-name md:text-sm text-xs md:tracking-[1.1rem] tracking-[0.8rem] ">
            idari işler portalı
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
