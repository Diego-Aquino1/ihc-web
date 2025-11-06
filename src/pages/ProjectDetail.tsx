import { motion } from "framer-motion"
import { useParams, useNavigate } from "react-router-dom"
import { projects } from "@/data/projects"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Gamepad2,
  Rocket,
  Sparkles,
  FileText,
  Users,
  ExternalLink,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Star,
  Play,
  Monitor,
  Cpu,
  HardDrive,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Tooltip } from "@/components/ui/tooltip"
import { Accordion, AccordionItem } from "@/components/ui/accordion"

gsap.registerPlugin(ScrollTrigger)

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const project = projects.find((p) => p.id === id)
  const contentRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const [activeTab, setActiveTab] = useState<
    "descripcion" | "caracteristicas" | "multimedia" | "desarrollo" | "testimonios" | "faqs"
  >("descripcion")
  const [activeDevSubTab, setActiveDevSubTab] = useState<"cuestionario" | "entrevistas" | "material">(
    "cuestionario"
  )
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [showStickyCTA, setShowStickyCTA] = useState(false)
  const [visitedTabs, setVisitedTabs] = useState<Set<string>>(new Set(["descripcion"]))
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showRequirementsModal, setShowRequirementsModal] = useState(false)

  // Obtener imágenes y logo según el proyecto
  const getProjectAssets = () => {
    if (id === "vr-escape-room") {
      return {
        logo: "/spaceroomlogo.png",
        images: [
          "/imagenVideoJuego1.jpg",
          "/imagenVideoJuego2.jpg",
          "/imagenVideoJuego3.jpg",
        ],
        bgGradient: "from-slate-950 via-cyan-950 to-slate-950",
        accentColor: "cyan",
      }
    } else if (id === "interview-sim") {
      return {
        logo: "/interviewLogo.png",
        images: [],
        interviewImages: [
          "/EntrevistadorAParticipantes.jpg",
          "/EntrevistadorAParticipantes2.jpg",
          "/EntrevistadorAParticipantes3.jpg",
          "/EntrevistadorAParticipantes4.jpg",
          "/EntrevistaAUsuarios1.jpg",
          "/EntrevistaAUsuarios2.jpg",
          "/EntrevistaAUsuarios3.jpg",
          "/EntrevistaAUsuarios4.jpg",
        ],
        bgGradient: "from-slate-950 via-blue-950 to-purple-950",
        accentColor: "blue",
      }
    }
    return {
      logo: "/logomistilab.png",
      images: [],
      bgGradient: "from-slate-950 via-blue-950 to-slate-950",
      accentColor: "blue",
    }
  }

  const assets = getProjectAssets()

  // Detectar scroll para sticky CTA
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Marcar tabs visitados
  useEffect(() => {
    setVisitedTabs((prev) => new Set([...prev, activeTab]))
  }, [activeTab])

  // Animaciones GSAP
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        }
      )
    }

    if (imagesRef.current && assets.images.length > 0) {
      const images = imagesRef.current.querySelectorAll(".project-image")
      images.forEach((img, index) => {
        gsap.fromTo(
          img,
          {
            opacity: 0,
            scale: 0.9,
            y: 50,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [id, assets.images.length])

  // Navegación del carousel
  const nextImage = () => {
    if (assets.images.length > 0) {
      setCarouselIndex((prev) => (prev + 1) % assets.images.length)
    }
  }

  const prevImage = () => {
    if (assets.images.length > 0) {
      setCarouselIndex((prev) => (prev - 1 + assets.images.length) % assets.images.length)
    }
  }

  // Datos de testimonios (mock data - puedes reemplazar con datos reales)
  const testimonials = [
    {
      name: "María González",
      role: "Desarrolladora Frontend",
      rating: 5,
      text: "InterView me ayudó a prepararme para mi entrevista en Google. El feedback fue increíblemente útil.",
      product: "interview-sim",
    },
    {
      name: "Carlos Ramírez",
      role: "Estudiante de Ingeniería",
      rating: 5,
      text: "SpaceRoom es una experiencia increíble. Los puzzles son desafiantes y la inmersión es total.",
      product: "vr-escape-room",
    },
    {
      name: "Ana Martínez",
      role: "Product Manager",
      rating: 5,
      text: "Gracias a InterView, conseguí el trabajo de mis sueños. La práctica con escenarios reales fue clave.",
      product: "interview-sim",
    },
  ]

  // FAQs
  const faqs = [
    {
      question: "¿Cómo funciona SpaceRoom?",
      answer:
        "SpaceRoom es un escape room en realidad virtual donde debes resolver puzzles para escapar de una nave espacial. Compatible con Oculus Quest, HTC Vive y otros dispositivos VR.",
    },
    {
      question: "¿Necesito experiencia previa en VR?",
      answer:
        "No es necesario. SpaceRoom está diseñado para ser accesible tanto para principiantes como para usuarios avanzados de VR.",
    },
    {
      question: "¿Qué es InterView?",
      answer:
        "InterView es un preparador inteligente de entrevistas que te permite practicar con preguntas reales y recibir feedback inmediato sobre tu desempeño.",
    },
    {
      question: "¿InterView funciona para cualquier tipo de entrevista?",
      answer:
        "Sí, InterView tiene bancos de preguntas adaptados para diferentes roles y niveles de experiencia, desde entrevistas técnicas hasta entrevistas conductuales.",
    },
    {
      question: "¿Cuánto tiempo toma prepararse con InterView?",
      answer:
        "Depende de tu nivel actual. La mayoría de usuarios ven mejoras significativas después de 3-5 sesiones de práctica.",
    },
  ]

  // Requisitos del sistema para SpaceRoom
  const systemRequirements = {
    "vr-escape-room": {
      minimum: {
        os: "Windows 10 64-bit",
        processor: "Intel i5-4590 / AMD FX 8350",
        memory: "8 GB RAM",
        graphics: "NVIDIA GTX 970 / AMD Radeon R9 290",
        storage: "5 GB disponible",
        vr: "Oculus Rift, HTC Vive, o compatible",
      },
      recommended: {
        os: "Windows 11 64-bit",
        processor: "Intel i7-8700K / AMD Ryzen 5 3600",
        memory: "16 GB RAM",
        graphics: "NVIDIA GTX 1070 / AMD RX 580",
        storage: "10 GB disponible",
        vr: "Oculus Quest 2, Valve Index",
      },
    },
  }

  if (!project) {
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-to-b from-slate-950 to-blue-950 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Proyecto no encontrado</h1>
          <Button onClick={() => navigate("/")} className="bg-blue-600 hover:bg-blue-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Button>
        </div>
      </div>
    )
  }

  const tabConfig = [
    { key: "descripcion", label: "Descripción", icon: Rocket, count: null },
    { key: "caracteristicas", label: "Características", icon: Sparkles, count: project.features.length },
    { key: "multimedia", label: "Multimedia", icon: Gamepad2, count: assets.images.length },
    ...(id === "interview-sim"
      ? [{ key: "desarrollo", label: "Desarrollo", icon: FileText, count: null }]
      : []),
    { key: "testimonios", label: "Testimonios", icon: Users, count: testimonials.filter((t) => t.product === id).length },
    { key: "faqs", label: "Preguntas Frecuentes", icon: HelpCircle, count: faqs.length },
  ]

  return (
    <div className={`min-h-screen bg-gradient-to-b ${assets.bgGradient} text-white pt-20`}>
      {/* Contenido */}
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-blue-300 hover:text-blue-200 hover:bg-blue-500/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
          <div className="text-sm text-blue-300 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30">
            {project.category}
          </div>
        </div>

        

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3 text-white">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-blue-200 mb-8 leading-relaxed max-w-2xl">
              {project.shortDescription}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech) => (
                <Tooltip key={tech} content={`Tecnología utilizada: ${tech}`}>
                  <span className="px-4 py-2 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30 cursor-help">
                  {tech}
                </span>
                </Tooltip>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => setShowVideoModal(true)}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-6 text-lg font-semibold shadow-lg shadow-cyan-500/50"
              >
                <Play className="mr-2 h-5 w-5" /> Ver Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-400/30 text-blue-200 hover:bg-blue-400/10 px-8 py-6 text-lg font-semibold"
              >
                Ver más
              </Button>
              {id === "vr-escape-room" && (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setShowRequirementsModal(true)}
                  className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-6 py-6"
                >
                  <Monitor className="mr-2 h-5 w-5" />
                  Requisitos
                </Button>
              )}
            </div>
          </motion.div>

          {/* Imagen principal con carousel */}
          {assets.images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl shadow-cyan-500/20"
            >
              <div ref={carouselRef} className="relative">
                <img
                  src={assets.images[carouselIndex]}
                  alt={`${project.title} - Vista ${carouselIndex + 1}`}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Controles del carousel */}
                {assets.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                      aria-label="Siguiente imagen"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>

                    {/* Indicadores */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {assets.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCarouselIndex(idx)}
                          className={`h-2 rounded-full transition-all ${
                            idx === carouselIndex ? "w-8 bg-cyan-400" : "w-2 bg-white/50"
                          }`}
                          aria-label={`Ir a imagen ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
          </motion.div>
          )}
        </div>

        {/* Tabs con Progress Indicators */}
        <div className="mb-8">
          <div className="flex items-center gap-2 border-b border-blue-500/20 pb-4 overflow-x-auto">
            {tabConfig.map(({ key, label, icon: Icon, count }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`relative px-6 py-3 rounded-t-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === key
                    ? "text-cyan-400 bg-blue-500/10"
                    : "text-blue-300 hover:text-blue-200 hover:bg-blue-500/5"
                } ${visitedTabs.has(key) ? "" : "opacity-70"}`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
                {count !== null && (
                  <span className="ml-1 text-[10px] text-blue-400">
                    {count}
                  </span>
                )}
                {visitedTabs.has(key) && activeTab !== key && (
                  <span className="ml-1 text-xs text-cyan-400">✓</span>
                )}
                {activeTab === key && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                  />
                )}
              </button>
            ))}
          </div>

            <motion.div
              key={activeTab}
            initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 min-h-[200px]"
            >
              {activeTab === "descripcion" && (
              <div>
                <h2 className="text-2xl font-semibold text-blue-100 mb-3">Descripción</h2>
                <p className="text-blue-200 leading-relaxed text-lg whitespace-pre-line max-w-3xl">
                  {project.longDescription.trim()}
                </p>
              </div>
              )}

              {activeTab === "caracteristicas" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, idx) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/10 flex items-start gap-3"
                  >
                    <Sparkles className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100">{feature}</span>
                  </motion.div>
                  ))}
                </div>
              )}

              {activeTab === "multimedia" && (
              <div>
                {assets.images.length > 0 ? (
                  <div ref={imagesRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {assets.images.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className="project-image relative group overflow-hidden rounded-xl border-2 border-cyan-500/30 cursor-pointer"
                      >
                        <img
                          src={img}
                          alt={`${project.title} - Imagen ${idx + 1}`}
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="p-3 rounded-full bg-black/50 backdrop-blur-sm">
                            <Maximize2 className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white font-semibold">Vista {idx + 1}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-blue-300">
                    <Gamepad2 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>No hay imágenes disponibles</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "desarrollo" && id === "interview-sim" && (
              <div className="space-y-4">
                {/* Tabs internos para desarrollo */}
                <div className="flex items-center gap-2 border-b border-blue-500/20 pb-2">
                  {[
                    { key: "cuestionario", label: "Cuestionario", icon: FileText },
                    { key: "entrevistas", label: "Entrevistas", icon: Users },
                    { key: "material", label: "Material", icon: ExternalLink },
                  ].map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setActiveDevSubTab(key as any)}
                      className={`relative px-4 py-2 rounded-t-lg transition-all flex items-center gap-2 text-sm ${
                        activeDevSubTab === key
                          ? "text-cyan-400 bg-blue-500/10"
                          : "text-blue-300 hover:text-blue-200 hover:bg-blue-500/5"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                      {activeDevSubTab === key && (
                        <motion.div
                          layoutId="activeDevTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Contenido de sub-tabs */}
                <div className="mt-4">
                  {activeDevSubTab === "cuestionario" && (
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <FileText className="h-5 w-5 text-blue-400" />
                        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                          Cuestionario de Investigación
                        </h3>
                      </div>
                      <p className="text-blue-200/80 text-sm mb-4">
                        Cuestionario utilizado para recopilar información sobre percepciones y necesidades
                        de usuarios.
                      </p>

                      <Accordion>
                        <AccordionItem title="Experiencia y Percepciones" defaultOpen={true}>
                          <ul className="space-y-1.5 text-sm text-blue-200">
                            <li>• ¿Cuándo ha sido su última entrevista laboral?</li>
                            <li>• ¿Qué sentías en tu primera entrevista de trabajo?</li>
                            <li>• ¿Tú cómo sentiste tu primera entrevista?</li>
                            <li>• ¿Cómo creen que se sentirían en su primera entrevista de trabajo?</li>
                          </ul>
                        </AccordionItem>

                        <AccordionItem title="Habilidades Blandas (Definición y Evaluación)">
                          <ul className="space-y-1.5 text-sm text-blue-200">
                            <li>• ¿Qué consideran que son las habilidades blandas?</li>
                            <li>• ¿Ustedes consideran que tienen habilidades blandas?</li>
                            <li>• ¿Qué habilidades blandas tienen los que no han contado?</li>
                            <li>• ¿Consideran que las habilidades blandas son importantes para el trabajo?</li>
                            <li>• ¿Por qué razón?</li>
                            <li>• ¿Cuáles consideran que son las habilidades blandas más importantes?</li>
                            <li>• ¿Cómo han desarrollado sus habilidades blandas?</li>
                            <li>• ¿Qué consideran que desarrolla las habilidades blandas?</li>
                            <li>• Del 1 al 10, ¿cómo consideran sus habilidades blandas?</li>
                          </ul>
                        </AccordionItem>

                        <AccordionItem title="Habilidades Blandas en Tecnología">
                          <ul className="space-y-1.5 text-sm text-blue-200">
                            <li>
                              • ¿Creen que las habilidades blandas de programación o desarrollo de
                              software son diferentes a las de otras áreas?
                            </li>
                            <li>
                              • ¿Consideran que en el área de tecnología las entrevistas son diferentes
                              que en otras áreas?
                            </li>
                            <li>
                              • ¿Consideran que en el área de tecnología tienen menos habilidades blandas
                              que en otras áreas?
                            </li>
                            <li>• ¿Consideran que sus compañeros tienen buenas habilidades blandas?</li>
                          </ul>
                        </AccordionItem>

                        <AccordionItem title="Preparación y Práctica de Entrevistas">
                          <ul className="space-y-1.5 text-sm text-blue-200">
                            <li>• ¿Ustedes creen que es necesario practicar para una entrevista laboral?</li>
                            <li>• ¿Por qué?</li>
                            <li>
                              • Si ustedes quisieran practicar entrevistas laborales... ¿de qué creen que
                              es necesario practicar?
                            </li>
                            <li>
                              • ¿Consideran que el uso de herramientas virtuales para poder practicar es
                              necesario hoy en día?
                            </li>
                            <li>• Herramientas virtuales, ¿a qué te refieres?</li>
                            <li>
                              • ¿Creen que las herramientas virtuales ayudan a poder mejorar para una
                              entrevista oral?
                            </li>
                            <li>• ¿Cómo serían esas herramientas virtuales?</li>
                          </ul>
                        </AccordionItem>

                        <AccordionItem title="Escenarios de Entrevista (Preguntas y Mentiras)">
                          <ul className="space-y-1.5 text-sm text-blue-200">
                            <li>• ¿Cómo creen que se pueden reducir o evitar los nervios?</li>
                            <li>
                              • ¿Consideran que están listos para responder la pregunta "por qué tendría
                              que contratarte a ti sobre los demás"?
                            </li>
                            <li>• ¿Consideras que es necesario mentir en una entrevista?</li>
                            <li>• ¿Pero en qué omitiste esa información?</li>
                            <li>• ¿Te contrataron?</li>
                          </ul>
                        </AccordionItem>

                        <AccordionItem title="Escenarios Hipotéticos (Contratación)">
                          <ul className="space-y-1.5 text-sm text-blue-200">
                            <li>
                              • Si tuvieran que elegir entre un gran programador pero con pocas habilidades
                              blandas, o un pésimo programador pero que sabe hablar bien, ¿con quién
                              quisieran trabajar?
                            </li>
                            <li>
                              • ¿Ustedes preferirían trabajar con alguien que tenga altas habilidades
                              blandas pero que tenga poco conocimiento técnico, o con alto conocimiento
                              técnico pero que tenga pocas habilidades blandas?
                            </li>
                          </ul>
                        </AccordionItem>

                        <AccordionItem title="Modalidad (Virtual vs. Presencial)">
                          <ul className="space-y-1.5 text-sm text-blue-200">
                            <li>
                              • ¿Creen que las entrevistas van a ser presenciales o virtuales principalmente
                              de acá en el futuro?
                            </li>
                            <li>
                              • ¿Consideran que es muy diferente una entrevista presencial a una virtual?
                            </li>
                            <li>
                              • ¿Consideran que hay diferencias entre entrevistas presenciales y virtuales?
                            </li>
                            <li>
                              • ¿Consideran que pueden expresar sus habilidades blandas virtualmente?
                            </li>
                            <li>
                              • ¿Crees que puedes expresar tus habilidades blandas mediante la forma
                              virtual?
                            </li>
                          </ul>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  )}

                  {activeDevSubTab === "entrevistas" && (
                    <div>
                      <p className="text-blue-200/80 text-sm mb-4">
                        Dos tipos de entrevistas: entrevistador a participantes (análisis de comportamiento)
                        y entrevistas directas a usuarios (perspectivas).
                      </p>

                      {/* Entrevistador a Participantes */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-blue-300 mb-3">
                          Entrevistador a Participantes
                        </h4>
                        <div
                          ref={imagesRef}
                          className="grid grid-cols-2 md:grid-cols-4 gap-3"
                        >
                          {assets.interviewImages?.slice(0, 4).map((img, idx) => (
                            <div
                              key={idx}
                              onClick={() => setSelectedImageIndex(idx)}
                              className="project-image relative group overflow-hidden rounded-lg border-2 border-blue-500/30 cursor-pointer aspect-video"
                            >
                              <img
                                src={img}
                                alt={`Entrevistador a Participantes ${idx + 1}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="p-2 rounded-full bg-black/50 backdrop-blur-sm">
                                  <Maximize2 className="h-4 w-4 text-white" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Entrevistas a Usuarios */}
                      <div>
                        <h4 className="text-lg font-semibold text-blue-300 mb-3">
                          Entrevistas Directas a Usuarios
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {assets.interviewImages?.slice(4, 8).map((img, idx) => (
                            <div
                              key={idx + 4}
                              onClick={() => setSelectedImageIndex(idx + 4)}
                              className="project-image relative group overflow-hidden rounded-lg border-2 border-blue-500/30 cursor-pointer aspect-video"
                            >
                              <img
                                src={img}
                                alt={`Entrevista a Usuarios ${idx + 1}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="p-2 rounded-full bg-black/50 backdrop-blur-sm">
                                  <Maximize2 className="h-4 w-4 text-white" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDevSubTab === "material" && (
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <ExternalLink className="h-5 w-5 text-blue-400" />
                        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                          Acceso a Entrevistas Completas
                        </h3>
                      </div>
                      <p className="text-blue-200/80 text-sm mb-6">
                        Accede a las grabaciones completas y material adicional de las entrevistas
                        realizadas.
                      </p>

                      <div className="space-y-3">
                        {/* Entrevistas con Entrevistador Lynda */}
                        <div>
                          <h5 className="text-base font-semibold text-blue-300 mb-2">Entrevistador Lynda</h5>
                          <div className="space-y-2">
                            <a
                              href="https://drive.google.com/drive/folders/1wTCgP2c-tQHs4SJ2wnXq2hIYgBLc2NrZ?usp=drive_link"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors p-2.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-sm"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span>Entrevista de usuario Lesly con entrevistador Lynda</span>
                            </a>
                            <a
                              href="https://drive.google.com/drive/folders/1BlU1Hp6VtS195zdhMUAtk5sVGDFtORY0?usp=sharing"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors p-2.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-sm"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span>Entrevista de usuario Maricielo con entrevistador Lynda</span>
                            </a>
                          </div>
                        </div>

                        {/* Entrevistas con Entrevistador Alexandro */}
                        <div>
                          <h5 className="text-base font-semibold text-blue-300 mb-2">
                            Entrevistador Alexandro
                          </h5>
                          <div className="space-y-2">
                            <a
                              href="https://drive.google.com/drive/folders/1RIZZMh80O_8wS4g-TxU6sATfDzLOMPyJ?usp=drive_link"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors p-2.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-sm"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span>Entrevista de usuario Lesly con entrevistador Alexandro</span>
                            </a>
                          </div>
                        </div>

                        {/* Entrevistas Directas a Usuarios */}
                        <div>
                          <h5 className="text-base font-semibold text-blue-300 mb-2">
                            Entrevistas Directas a Usuarios
                          </h5>
                          <div className="space-y-2">
                            <a
                              href="https://drive.google.com/drive/folders/11wYTn2iBzHknVdYW-nTgL5Iqu4m-uxDI?usp=drive_link"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors p-2.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-sm"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span>Entrevistas a usuarios - Material completo</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "testimonios" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials
                  .filter((t) => t.product === id)
                  .map((testimonial, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-6 rounded-xl bg-blue-500/5 border border-blue-500/10"
                    >
                      <div className="flex items-center gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < testimonial.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-400"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-blue-200 mb-4 italic">"{testimonial.text}"</p>
                      <div>
                        <p className="font-semibold text-blue-100">{testimonial.name}</p>
                        <p className="text-sm text-blue-300">{testimonial.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

            {activeTab === "faqs" && (
              <Accordion>
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} title={faq.question} defaultOpen={idx === 0}>
                    {faq.answer}
                  </AccordionItem>
                ))}
              </Accordion>
            )}
            </motion.div>
        </div>
      </div>

      {/* Sticky CTA Button */}
      {showStickyCTA && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            size="lg"
            onClick={() => setShowVideoModal(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-6 text-lg font-semibold shadow-lg shadow-cyan-500/50 rounded-full"
          >
            <Play className="mr-2 h-5 w-5" />
            Probar Demo
          </Button>
        </motion.div>
      )}

      {/* Image Zoom Modal */}
      <Dialog
        open={selectedImageIndex !== null}
        onOpenChange={(open) => !open && setSelectedImageIndex(null)}
      >
        {selectedImageIndex !== null && (
          <>
            <DialogClose onClose={() => setSelectedImageIndex(null)} />
            <DialogHeader>
              <DialogTitle>
                {project.title} - Vista {selectedImageIndex + 1}
              </DialogTitle>
            </DialogHeader>
            <DialogContent>
              <div className="relative">
                <img
                  src={
                    id === "interview-sim"
                      ? assets.interviewImages?.[selectedImageIndex] || ""
                      : assets.images[selectedImageIndex]
                  }
                  alt={`${project.title} - Imagen ampliada`}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                />
                {((id === "interview-sim" && assets.interviewImages) || assets.images).length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setSelectedImageIndex(
                          (selectedImageIndex - 1 + ((id === "interview-sim" && assets.interviewImages) || assets.images).length) %
                            ((id === "interview-sim" && assets.interviewImages) || assets.images).length
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black/90 text-white transition-colors"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() =>
                        setSelectedImageIndex(
                          (selectedImageIndex + 1) %
                            ((id === "interview-sim" && assets.interviewImages) || assets.images).length
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black/90 text-white transition-colors"
                      aria-label="Siguiente imagen"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* Video Preview Modal */}
      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogClose onClose={() => setShowVideoModal(false)} />
        <DialogHeader>
          <DialogTitle>Demo de {project.title}</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <div className="aspect-video bg-black/20 rounded-lg flex items-center justify-center">
            <p className="text-blue-300">
              {id === "vr-escape-room"
                ? "Video demo de SpaceRoom - Próximamente"
                : "Video demo de InterView - Próximamente"}
            </p>
            {/* Aquí puedes insertar un iframe de YouTube/Vimeo cuando tengas el video */}
          </div>
        </DialogContent>
      </Dialog>

      {/* System Requirements Modal */}
      {id === "vr-escape-room" && systemRequirements[id] && (
        <Dialog open={showRequirementsModal} onOpenChange={setShowRequirementsModal}>
          <DialogClose onClose={() => setShowRequirementsModal(false)} />
          <DialogHeader>
            <DialogTitle>Requisitos del Sistema - SpaceRoom</DialogTitle>
          </DialogHeader>
          <DialogContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-300 mb-4 flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Requisitos Mínimos
                </h3>
                <div className="space-y-2 text-blue-200">
                  <div className="flex items-start gap-2">
                    <Cpu className="h-5 w-5 mt-0.5 text-cyan-400" />
                    <div>
                      <span className="font-semibold">Procesador: </span>
                      {systemRequirements[id].minimum.processor}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <HardDrive className="h-5 w-5 mt-0.5 text-cyan-400" />
                    <div>
                      <span className="font-semibold">Memoria: </span>
                      {systemRequirements[id].minimum.memory}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Monitor className="h-5 w-5 mt-0.5 text-cyan-400" />
                    <div>
                      <span className="font-semibold">Gráficos: </span>
                      {systemRequirements[id].minimum.graphics}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <HardDrive className="h-5 w-5 mt-0.5 text-cyan-400" />
                    <div>
                      <span className="font-semibold">Almacenamiento: </span>
                      {systemRequirements[id].minimum.storage}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Gamepad2 className="h-5 w-5 mt-0.5 text-cyan-400" />
                    <div>
                      <span className="font-semibold">VR: </span>
                      {systemRequirements[id].minimum.vr}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-300 mb-4 flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Requisitos Recomendados
                </h3>
                <div className="space-y-2 text-blue-200">
                  <div className="flex items-start gap-2">
                    <Cpu className="h-5 w-5 mt-0.5 text-cyan-400" />
                    <div>
                      <span className="font-semibold">Procesador: </span>
                      {systemRequirements[id].recommended.processor}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <HardDrive className="h-5 w-5 mt-0.5 text-cyan-400" />
                    <div>
                      <span className="font-semibold">Memoria: </span>
                      {systemRequirements[id].recommended.memory}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Monitor className="h-5 w-5 mt-0.5 text-cyan-400" />
                    <div>
                      <span className="font-semibold">Gráficos: </span>
                      {systemRequirements[id].recommended.graphics}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <HardDrive className="h-5 w-5 mt-0.5 text-cyan-400" />
                    <div>
                      <span className="font-semibold">Almacenamiento: </span>
                      {systemRequirements[id].recommended.storage}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Gamepad2 className="h-5 w-5 mt-0.5 text-cyan-400" />
                    <div>
                      <span className="font-semibold">VR: </span>
                      {systemRequirements[id].recommended.vr}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
