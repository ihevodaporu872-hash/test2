"use client"

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  ReactCompareSliderHandle,
} from "react-compare-slider"

import { cn } from "@/lib/utils"

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
}: BeforeAfterSliderProps) {
  return (
    <div className={cn("relative rounded-lg overflow-hidden", className)}>
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={beforeImage}
            alt={beforeLabel}
            style={{ objectFit: "cover" }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={afterImage}
            alt={afterLabel}
            style={{ objectFit: "cover" }}
          />
        }
        handle={
          <ReactCompareSliderHandle
            buttonStyle={{
              backdropFilter: "none",
              background: "white",
              border: 0,
              color: "#333",
              width: 40,
              height: 40,
              borderRadius: "50%",
              boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
            }}
            linesStyle={{
              width: 2,
              background: "white",
              opacity: 0.8,
            }}
          />
        }
        className="w-full aspect-video"
      />

      {/* Labels */}
      <div className="absolute top-4 left-4 z-10">
        <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-black/60 text-white rounded-full backdrop-blur-sm">
          {beforeLabel}
        </span>
      </div>
      <div className="absolute top-4 right-4 z-10">
        <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-black/60 text-white rounded-full backdrop-blur-sm">
          {afterLabel}
        </span>
      </div>
    </div>
  )
}
