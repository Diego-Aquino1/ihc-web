export interface Project {
  id: string
  title: string
  shortDescription: string
  longDescription: string
  technologies: string[]
  status: "available" | "coming-soon"
  features: string[]
  screenshots: string[]
  category: string
}
