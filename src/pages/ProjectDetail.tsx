import { motion } from "framer-motion"
import { useParams, useNavigate } from "react-router-dom"
import { projects } from "@/data/projects"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Gamepad2 } from "lucide-react"
import { useState } from "react"

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const project = projects.find(p => p.id === id)

  const [activeTab, setActiveTab] = useState<"descripcion" | "caracteristicas" | "multimedia">("descripcion")

  if (!project) {
    return (
      <div className="h-screen w-screen overflow-hidden grid place-items-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Proyecto no encontrado</h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-background">
      {/* Fondo animado sutil */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_-10%,hsl(var(--primary)/0.10),transparent_60%),radial-gradient(800px_400px_at_20%_110%,hsl(var(--primary)/0.06),transparent_60%)]" />
        <motion.div
          className="absolute -inset-32 opacity-[0.06]"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, hsl(var(--primary)/0.08) 90deg, transparent 180deg, hsl(var(--primary)/0.08) 270deg, transparent 360deg)",
          }}
        />
      </motion.div>

      {/* Contenido */}
      <div className="relative z-10 h-full w-full flex flex-col">
        {/* Header minimal */}
        <div className="flex items-center justify-between px-6 pt-6">
          <Button variant="ghost" onClick={() => navigate("/")}> 
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
          <div className="text-sm text-muted-foreground">{project.category}</div>
        </div>

        {/* Hero */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3">
              {project.title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-5">
              {project.shortDescription}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button size="lg" className="px-6">
                <Gamepad2 className="mr-2 h-5 w-5" /> Probar demo
              </Button>
              <Button size="lg" variant="outline" className="px-6">
                Ver más
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="relative h-[48vh] lg:h-[58vh] rounded-xl overflow-hidden border"
          >
            <img
              src="/gameimage.jpeg"
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{ boxShadow: "inset 0 0 0 1px hsl(var(--primary)/0.18)" }}
            />
          </motion.div>
        </div>

        {/* Tabs inline sin scroll */}
        <div className="px-8 pb-8">
          <div className="flex items-center gap-2 text-sm">
            {[
              { key: "descripcion", label: "Descripción" },
              { key: "caracteristicas", label: "Características" },
              { key: "multimedia", label: "Multimedia" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`relative px-3 py-1 rounded-md transition-colors ${
                  activeTab === key ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {label}
                {activeTab === key && (
                  <motion.span
                    layoutId="pill"
                    className="absolute inset-0 -z-10 rounded-md bg-primary/10 border border-primary/20"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="mt-4 h-[18vh] lg:h-[16vh] overflow-hidden relative">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="h-full"
            >
              {activeTab === "descripcion" && (
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-5">
                  {project.longDescription.replace(/\n+/g, " ").trim()}
                </p>
              )}
              {activeTab === "caracteristicas" && (
                <div className="flex flex-wrap gap-2 text-xs">
                  {project.features.map((feature) => (
                    <span key={feature} className="px-2 py-1 rounded border bg-background">
                      {feature}
                    </span>
                  ))}
                </div>
              )}
              {activeTab === "multimedia" && (
                <div className="grid grid-cols-3 gap-3 h-full">
                  {project.screenshots.slice(0, 3).map((_, idx) => (
                    <div key={idx} className="rounded-md border bg-muted/20" />
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
