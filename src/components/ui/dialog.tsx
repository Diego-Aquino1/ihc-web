import * as React from "react"
import { useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={() => onOpenChange(false)}
    >
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className={cn(
          "relative z-50 max-w-4xl w-full mx-4 max-h-[90vh] overflow-auto",
          "bg-slate-900 border border-blue-500/30 rounded-xl shadow-2xl"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 p-6 pb-4", className)} {...props} />
)

const DialogTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn("text-2xl font-semibold leading-none tracking-tight text-white", className)}
    {...props}
  />
)

const DialogDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-blue-200", className)} {...props} />
)

const DialogContent = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-6", className)} {...props}>
    {children}
  </div>
)

const DialogClose = ({ onClose, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { onClose: () => void }) => (
  <button
    onClick={onClose}
    className={cn(
      "absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity",
      "text-white hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500",
      className
    )}
    {...props}
  >
    <X className="h-5 w-5" />
    <span className="sr-only">Cerrar</span>
  </button>
)

export { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogClose }

