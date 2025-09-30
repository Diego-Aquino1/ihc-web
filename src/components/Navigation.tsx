import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Home, Gamepad2 } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export function Navigation() {
  const location = useLocation()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Gamepad2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">IHC Projects</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Button
              asChild
              variant={location.pathname === "/" ? "default" : "ghost"}
              size="sm"
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
