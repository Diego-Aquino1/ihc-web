import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Gamepad2, Clock } from "lucide-react"
import { Project } from "@/types/project"

interface ProjectCardProps {
  project: Project
  onClick?: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  if (project.status === "coming-soon") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto"
      >
        <Card className="h-full bg-gradient-to-br from-muted/50 to-muted border-2 border-dashed border-muted-foreground/30">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted-foreground/10 flex items-center justify-center">
              <Clock className="w-8 h-8 text-muted-foreground" />
            </div>
            <CardTitle className="text-xl text-muted-foreground">Próximamente...</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <CardDescription className="text-muted-foreground/70">
              Estamos trabajando en algo increíble. Mantente atento.
            </CardDescription>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
        <CardHeader className="pb-4">
          <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4 flex items-center justify-center">
            <Gamepad2 className="w-16 h-16 text-primary" />
          </div>
          <CardTitle className="group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {project.shortDescription}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pb-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="pt-0">
          <Button 
            onClick={onClick}
            className="w-full group-hover:bg-primary/90 transition-colors"
          >
            Compra ahora
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
