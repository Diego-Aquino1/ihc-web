import { motion } from "framer-motion"
import { ProjectCard } from "@/components/ProjectCard"
import { projects } from "@/data/projects"
import { useNavigate } from "react-router-dom"
import { Rocket, Star, Users } from "lucide-react"

export function Home() {
  const navigate = useNavigate()

  const handleProjectClick = (projectId: string) => {
    if (projectId !== "project-2") {
      navigate(`/project/${projectId}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <Rocket className="w-16 h-16 mx-auto mb-4 text-primary" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Proyectos de Realidad Virtual
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Descubre experiencias inmersivas que combinan tecnología de vanguardia 
            con diseño centrado en el usuario para crear aventuras únicas.
          </p>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto mb-16"
          >
            <div className="text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">5★</div>
              <div className="text-sm text-muted-foreground">Calificación promedio</div>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">1000+</div>
              <div className="text-sm text-muted-foreground">Usuarios satisfechos</div>
            </div>
            <div className="text-center">
              <Rocket className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">VR</div>
              <div className="text-sm text-muted-foreground">Tecnología líder</div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nuestros Proyectos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada proyecto está diseñado pensando en la experiencia del usuario, 
            aplicando principios de usabilidad y accesibilidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            >
              <ProjectCard
                project={project}
                onClick={() => handleProjectClick(project.id)}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="bg-muted/50 py-16"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Principios de Diseño
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nuestros proyectos siguen las mejores prácticas de usabilidad y experiencia de usuario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Visibilidad",
                description: "Interfaz clara que comunica inmediatamente el propósito y estado del sistema.",
                icon: "👁️"
              },
              {
                title: "Feedback",
                description: "Respuestas inmediatas y animaciones suaves que confirman las acciones del usuario.",
                icon: "💬"
              },
              {
                title: "Affordance",
                description: "Elementos interactivos claramente identificables y predecibles.",
                icon: "🎯"
              },
              {
                title: "Constraints",
                description: "Limitaciones inteligentes que guían al usuario sin confundirlo.",
                icon: "🚧"
              },
              {
                title: "Mapeamiento",
                description: "Navegación intuitiva que responde a las expectativas del usuario.",
                icon: "🗺️"
              },
              {
                title: "Accesibilidad",
                description: "Diseño inclusivo que funciona para todos los usuarios.",
                icon: "♿"
              }
            ].map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                className="bg-background rounded-lg p-6 shadow-sm border"
              >
                <div className="text-3xl mb-4">{principle.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{principle.title}</h3>
                <p className="text-muted-foreground">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  )
}
