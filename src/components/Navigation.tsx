import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export function Navigation() {
  const location = useLocation()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-50 bg-slate-950/80 backdrop-blur-md supports-[backdrop-filter]:bg-slate-950/60 border-b border-blue-500/20"
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img
              src="/logomistilab.png"
              alt="MistiLab"
              className="h-8 w-auto"
            />
          </Link>
          
          <div className="flex items-center space-x-4">
            <Button
              asChild
              variant={location.pathname === "/" ? "default" : "ghost"}
              size="sm"
              className={location.pathname === "/" ? "bg-blue-600 hover:bg-blue-700" : "text-blue-300 hover:text-blue-200"}
            >
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Inicio
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
