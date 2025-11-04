import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipProps {
  content: string
  children: React.ReactNode
  side?: "top" | "bottom" | "left" | "right"
}

export function Tooltip({ content, children, side = "top" }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false)

  const sideClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-blue-600",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-blue-600",
    left: "left-full top-1/2 -translate-y-1/2 border-l-blue-600",
    right: "right-full top-1/2 -translate-y-1/2 border-r-blue-600",
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            "absolute z-50 px-3 py-2 text-sm text-white bg-blue-600 rounded-lg shadow-lg whitespace-nowrap",
            "animate-in fade-in-0 zoom-in-95 duration-200",
            sideClasses[side]
          )}
          role="tooltip"
        >
          {content}
          <div
            className={cn(
              "absolute w-0 h-0 border-4 border-transparent",
              arrowClasses[side]
            )}
          />
        </div>
      )}
    </div>
  )
}

