import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionItemProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <div className="border-b border-blue-500/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-blue-500/5 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-blue-300">{title}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-blue-400 transition-transform duration-200",
            isOpen && "transform rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isOpen ? "max-h-none opacity-100 overflow-visible" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <div className="p-4 text-blue-200">{children}</div>
      </div>
    </div>
  )
}

interface AccordionProps {
  children: React.ReactNode
  className?: string
}

export function Accordion({ children, className }: AccordionProps) {
  return (
    <div className={cn("border border-blue-500/20 rounded-lg overflow-hidden", className)}>
      {children}
    </div>
  )
}

