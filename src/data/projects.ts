import { Project } from "@/types/project"

export const projects: Project[] = [
  {
    id: "vr-escape-room",
    title: "SpaceRoom",
    shortDescription: "VR Escape Adventure - Una experiencia inmersiva de escape room en realidad virtual ambientada en una nave espacial.",
    longDescription: `
      Sumérgete en una aventura espacial única con SpaceRoom, nuestro escape room en realidad virtual. 
      Ambientado en una nave espacial futurista, este juego te desafía a resolver puzzles 
      complejos y escapar de situaciones peligrosas usando solo tu ingenio y las herramientas 
      disponibles en tu entorno.
      
      La experiencia combina elementos de ciencia ficción con mecánicas de juego tradicionales 
      de escape room, creando una aventura inmersiva que te hará sentir como un verdadero 
      astronauta en apuros. Explora diferentes salas de la nave, desde el cockpit hasta los 
      corredores espaciales, mientras resuelves misterios y escapas del peligro.
    `,
    technologies: ["Unity", "C#", "VR", "Oculus", "SteamVR"],
    status: "available",
    features: [
      "Experiencia completamente inmersiva en VR",
      "Múltiples salas con puzzles únicos",
      "Física realista y objetos interactivos",
      "Sistema de pistas inteligente",
      "Modo multijugador cooperativo",
      "Sistema de progreso y logros",
      "Adaptable a diferentes dispositivos VR"
    ],
    screenshots: [
      "/api/placeholder/600/400",
      "/api/placeholder/600/400", 
      "/api/placeholder/600/400"
    ],
    category: "Realidad Virtual"
  },
  {
    id: "interview-sim",
    title: "InterView",
    shortDescription: "Preparador de Entrevistas - Entrena entrevistas reales con feedback inmediato y escenarios adaptativos.",
    longDescription: `
      Supera el miedo escénico y mejora tu desempeño con InterView, nuestro preparador de entrevistas 
      que replica preguntas, presión de tiempo y evaluación por competencias. 
      Obtén feedback accionable sobre tu lenguaje, claridad, estructura STAR y tiempos.
      
      Practica con escenarios realistas adaptados a diferentes roles y niveles de experiencia. 
      Nuestro sistema de IA analiza tu desempeño en tiempo real y te proporciona recomendaciones 
      personalizadas para mejorar tus habilidades de entrevista.
    `,
    technologies: ["React", "TypeScript", "NLP", "WebRTC"],
    status: "available",
    features: [
      "Bancos de preguntas por rol y seniority",
      "Feedback en tiempo real y análisis post-sesión",
      "Modo práctica y modo evaluación",
      "Simulación de entrevista técnica y conductual",
      "Historial y métricas de progreso"
    ],
    screenshots: [
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ],
    category: "Talento / Capacitación"
  }
]
