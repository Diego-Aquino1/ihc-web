import { motion } from "framer-motion"
import { useParams, useNavigate } from "react-router-dom"
import { projects } from "@/data/projects"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Gamepad2, CheckCircle, Star, Users, Clock } from "lucide-react"
import { Breadcrumbs } from "@/components/Breadcrumbs"

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const project = projects.find(p => p.id === id)

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Proyecto no encontrado</h1>
        <Button onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al inicio
        </Button>
      </div>
    )
  }

  if (project.status === "coming-soon") {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Clock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-3xl font-bold mb-4">Próximamente...</h1>
          <p className="text-muted-foreground mb-8">
            Estamos trabajando en algo increíble. Mantente atento para más información.
          </p>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Button>
        </motion.div>
      </div>
    )
  }

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: project.title, isCurrentPage: true }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a proyectos
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {project.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {project.shortDescription}
              </p>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-background rounded-lg border">
                  <Star className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-xl font-bold">4.9</div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
                <div className="text-center p-4 bg-background rounded-lg border">
                  <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-xl font-bold">500+</div>
                  <div className="text-xs text-muted-foreground">Players</div>
                </div>
                <div className="text-center p-4 bg-background rounded-lg border">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-xl font-bold">45m</div>
                  <div className="text-xs text-muted-foreground">Duration</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-24 h-24 text-primary" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle>Descripción del Proyecto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-gray max-w-none">
                {project.longDescription.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground mb-4">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6">Características Principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                className="flex items-center p-4 bg-background rounded-lg border"
              >
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Screenshots */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6">Capturas del Juego</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.screenshots.map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center border"
              >
                <span className="text-muted-foreground">Captura {index + 1}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center py-12"
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">¿Listo para la aventura?</CardTitle>
              <CardDescription className="text-base">
                Experimenta la emoción de escapar de una nave espacial en realidad virtual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Gamepad2 className="mr-2 h-5 w-5" />
                  Descargar Demo
                </Button>
                <Button variant="outline" size="lg">
                  Ver Trailer
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  )
}
