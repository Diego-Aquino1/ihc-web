import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Home, ChevronRight } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { projects } from "@/data/projects"

export function Navigation() {
  const location = useLocation()
  const pathname = location.pathname

  // Breadcrumbs básicos basados en la ruta actual
  let breadcrumbItems: Array<{ label: string; to?: string }> = []
  if (pathname === "/") {
    breadcrumbItems = [{ label: "Inicio", to: "/" }, { label: "Productos" }]
  } else if (pathname.startsWith("/project/")) {
    const id = pathname.split("/")[2]
    const project = projects.find((p) => p.id === id)
    breadcrumbItems = [
      { label: "Inicio", to: "/" },
      { label: "Productos", to: "/" },
      { label: project?.title || "Proyecto" },
    ]
  }

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
        {breadcrumbItems.length > 0 && (
          <div className="max-w-7xl mx-auto mt-2 text-sm text-blue-300 flex items-center gap-2">
            {breadcrumbItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {idx > 0 && <ChevronRight className="h-4 w-4" />}
                {item.to ? (
                  <Link to={item.to} className="hover:text-blue-200 transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className={idx === breadcrumbItems.length - 1 ? "text-white font-medium" : "text-blue-400"}>
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.nav>
  )
}
