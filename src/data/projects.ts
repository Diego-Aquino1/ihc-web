import { Project } from "@/types/project"

export const projects: Project[] = [
  {
    id: "vr-escape-room",
    title: "Escape Room VR - Nave Espacial",
    shortDescription: "Una experiencia inmersiva de escape room en realidad virtual ambientada en una nave espacial.",
    longDescription: `
      Sumérgete en una aventura espacial única con nuestro escape room en realidad virtual. 
      Ambientado en una nave espacial futurista, este juego te desafía a resolver puzzles 
      complejos y escapar de situaciones peligrosas usando solo tu ingenio y las herramientas 
      disponibles en tu entorno.
      
      La experiencia combina elementos de ciencia ficción con mecánicas de juego tradicionales 
      de escape room, creando una aventura inmersiva que te hará sentir como un verdadero 
      astronauta en apuros.
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
    id: "project-2",
    title: "Próximo Proyecto",
    shortDescription: "Algo increíble está por venir...",
    longDescription: "Estamos trabajando en nuestro próximo proyecto. Mantente atento para más información.",
    technologies: [],
    status: "coming-soon",
    features: [],
    screenshots: [],
    category: "Próximamente"
  }
]
