import { motion } from "framer-motion"
import { useParams, useNavigate } from "react-router-dom"
import { projects } from "@/data/projects"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Gamepad2, Rocket, Sparkles, FileText, Users, ExternalLink } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const project = projects.find(p => p.id === id)
  const contentRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)

  const [activeTab, setActiveTab] = useState<"descripcion" | "caracteristicas" | "multimedia" | "desarrollo">("descripcion")

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

        {/* Logo del proyecto */}
        <div className="flex justify-center mb-8">
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "back.out(1.7)" }}
            src={assets.logo}
            alt={project.title}
            className="h-24 md:h-32 w-auto"
          />
        </div>

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-blue-200 mb-6 leading-relaxed">
              {project.shortDescription}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-6 text-lg font-semibold shadow-lg shadow-cyan-500/50"
              >
                <Gamepad2 className="mr-2 h-5 w-5" /> Probar demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-8 py-6 text-lg font-semibold"
              >
                Ver más
              </Button>
            </div>
          </motion.div>

          {/* Imagen principal */}
          {assets.images.length > 0 && (
          <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl shadow-cyan-500/20"
          >
            <img
                src={assets.images[0]}
              alt={project.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </motion.div>
          )}
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex items-center gap-2 border-b border-blue-500/20 pb-4">
            {[
              { key: "descripcion", label: "Descripción", icon: Rocket },
              { key: "caracteristicas", label: "Características", icon: Sparkles },
              { key: "multimedia", label: "Multimedia", icon: Gamepad2 },
              ...(id === "interview-sim" ? [{ key: "desarrollo", label: "Desarrollo", icon: FileText }] : []),
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`relative px-6 py-3 rounded-t-lg transition-all flex items-center gap-2 ${
                  activeTab === key
                    ? "text-cyan-400 bg-blue-500/10"
                    : "text-blue-300 hover:text-blue-200 hover:bg-blue-500/5"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
                {activeTab === key && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
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
              <p className="text-blue-200 leading-relaxed text-lg whitespace-pre-line">
                {project.longDescription.trim()}
                </p>
              )}
              {activeTab === "caracteristicas" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, idx) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-start gap-3"
                  >
                    <Sparkles className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-200">{feature}</span>
                  </motion.div>
                  ))}
                </div>
              )}
              {activeTab === "multimedia" && (
              <div ref={imagesRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {assets.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="project-image relative group overflow-hidden rounded-xl border-2 border-cyan-500/30"
                  >
                    <img
                      src={img}
                      alt={`${project.title} - Imagen ${idx + 1}`}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white font-semibold">Vista {idx + 1}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "desarrollo" && id === "interview-sim" && (
              <div className="space-y-12">
                {/* Sección de Cuestionario */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <FileText className="h-6 w-6 text-blue-400" />
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      Cuestionario de Investigación
                    </h3>
                  </div>
                  <p className="text-blue-200 mb-6">
                    Durante el desarrollo de InterView, realizamos entrevistas exhaustivas con usuarios para entender sus necesidades y experiencias. 
                    El siguiente cuestionario fue utilizado para recopilar información sobre sus percepciones y necesidades.
                  </p>

                  <div className="space-y-6">
                    {/* Sobre Experiencia y Percepciones */}
                    <div>
                      <h4 className="text-xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Sobre Experiencia y Percepciones
                      </h4>
                      <ul className="space-y-2 text-blue-200">
                        <li>• ¿Cuándo ha sido su última entrevista laboral?</li>
                        <li>• ¿Qué sentías en tu primera entrevista de trabajo?</li>
                        <li>• ¿Tú cómo sentiste tu primera entrevista?</li>
                        <li>• ¿Cómo creen que se sentirían en su primera entrevista de trabajo?</li>
                      </ul>
                    </div>

                    {/* Sobre Habilidades Blandas */}
                    <div>
                      <h4 className="text-xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        Sobre Habilidades Blandas (Definición y Evaluación)
                      </h4>
                      <ul className="space-y-2 text-blue-200">
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
                    </div>

                    {/* Sobre Habilidades Blandas en Tecnología */}
                    <div>
                      <h4 className="text-xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
                        <Rocket className="h-5 w-5" />
                        Sobre Habilidades Blandas en Tecnología
                      </h4>
                      <ul className="space-y-2 text-blue-200">
                        <li>• ¿Creen que las habilidades blandas de programación o desarrollo de software son diferentes a las de otras áreas?</li>
                        <li>• ¿Consideran que en el área de tecnología las entrevistas son diferentes que en otras áreas?</li>
                        <li>• ¿Consideran que en el área de tecnología tienen menos habilidades blandas que en otras áreas?</li>
                        <li>• ¿Consideran que sus compañeros tienen buenas habilidades blandas?</li>
                      </ul>
                    </div>

                    {/* Sobre Preparación y Práctica */}
                    <div>
                      <h4 className="text-xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
                        <Gamepad2 className="h-5 w-5" />
                        Sobre Preparación y Práctica de Entrevistas
                      </h4>
                      <ul className="space-y-2 text-blue-200">
                        <li>• ¿Ustedes creen que es necesario practicar para una entrevista laboral?</li>
                        <li>• ¿Por qué?</li>
                        <li>• Si ustedes quisieran practicar entrevistas laborales... ¿de qué creen que es necesario practicar?</li>
                        <li>• ¿Consideran que el uso de herramientas virtuales para poder practicar es necesario hoy en día?</li>
                        <li>• Herramientas virtuales, ¿a qué te refieres?</li>
                        <li>• ¿Creen que las herramientas virtuales ayudan a poder mejorar para una entrevista oral?</li>
                        <li>• ¿Cómo serían esas herramientas virtuales?</li>
                      </ul>
                    </div>

                    {/* Sobre Escenarios de Entrevista */}
                    <div>
                      <h4 className="text-xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Sobre Escenarios de Entrevista (Preguntas y Mentiras)
                      </h4>
                      <ul className="space-y-2 text-blue-200">
                        <li>• ¿Cómo creen que se pueden reducir o evitar los nervios?</li>
                        <li>• ¿Consideran que están listos para responder la pregunta "por qué tendría que contratarte a ti sobre los demás"?</li>
                        <li>• ¿Consideras que es necesario mentir en una entrevista?</li>
                        <li>• ¿Pero en qué omitiste esa información?</li>
                        <li>• ¿Te contrataron?</li>
                      </ul>
                    </div>

                    {/* Sobre Escenarios Hipotéticos */}
                    <div>
                      <h4 className="text-xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        Sobre Escenarios Hipotéticos (Contratación)
                      </h4>
                      <ul className="space-y-2 text-blue-200">
                        <li>• Si tuvieran que elegir entre un gran programador pero con pocas habilidades blandas, o un pésimo programador pero que sabe hablar bien, ¿con quién quisieran trabajar?</li>
                        <li>• ¿Ustedes preferirían trabajar con alguien que tenga altas habilidades blandas pero que tenga poco conocimiento técnico, o con alto conocimiento técnico pero que tenga pocas habilidades blandas?</li>
                      </ul>
                    </div>

                    {/* Sobre Modalidad */}
                    <div>
                      <h4 className="text-xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
                        <Rocket className="h-5 w-5" />
                        Sobre Modalidad (Virtual vs. Presencial)
                      </h4>
                      <ul className="space-y-2 text-blue-200">
                        <li>• ¿Creen que las entrevistas van a ser presenciales o virtuales principalmente de acá en el futuro?</li>
                        <li>• ¿Consideran que es muy diferente una entrevista presencial a una virtual?</li>
                        <li>• ¿Consideran que hay diferencias entre entrevistas presenciales y virtuales?</li>
                        <li>• ¿Consideran que pueden expresar sus habilidades blandas virtualmente?</li>
                        <li>• ¿Crees que puedes expresar tus habilidades blandas mediante la forma virtual?</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Sección de Imágenes de Entrevistas */}
                <div>
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6 flex items-center gap-3">
                    <Users className="h-6 w-6" />
                    Entrevistas Realizadas
                  </h3>
                  <p className="text-blue-200 mb-8">
                    Durante el desarrollo, realizamos dos tipos de entrevistas: entrevistas del entrevistador a participantes para analizar el comportamiento de los usuarios, 
                    y entrevistas directas a usuarios para conocer sus perspectivas.
                  </p>

                  {/* Enlaces a Google Drive */}
                  <div className="mb-12 bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                    <h4 className="text-xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
                      <ExternalLink className="h-5 w-5" />
                      Acceso a Entrevistas Completas
                    </h4>
                    <p className="text-blue-200/80 mb-6 text-sm">
                      Accede a las grabaciones completas y material adicional de las entrevistas realizadas
                    </p>
                    
                    <div className="space-y-4">
                      {/* Entrevistas con Entrevistador Lynda */}
                      <div>
                        <h5 className="text-lg font-semibold text-blue-300 mb-3">Entrevistador Lynda</h5>
                        <div className="space-y-2">
                          <a
                            href="https://drive.google.com/drive/folders/1wTCgP2c-tQHs4SJ2wnXq2hIYgBLc2NrZ?usp=drive_link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors p-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span>Entrevista de usuario Lesly con entrevistador Lynda</span>
                          </a>
                          <a
                            href="https://drive.google.com/drive/folders/1BlU1Hp6VtS195zdhMUAtk5sVGDFtORY0?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors p-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span>Entrevista de usuario Maricielo con entrevistador Lynda</span>
                          </a>
                        </div>
                      </div>

                      {/* Entrevistas con Entrevistador Alexandro */}
                      <div>
                        <h5 className="text-lg font-semibold text-blue-300 mb-3">Entrevistador Alexandro</h5>
                        <div className="space-y-2">
                          <a
                            href="https://drive.google.com/drive/folders/1RIZZMh80O_8wS4g-TxU6sATfDzLOMPyJ?usp=drive_link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors p-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span>Entrevista de usuario Lesly con entrevistador Alexandro</span>
                          </a>
                        </div>
                      </div>

                      {/* Entrevistas Directas a Usuarios */}
                      <div>
                        <h5 className="text-lg font-semibold text-blue-300 mb-3">Entrevistas Directas a Usuarios</h5>
                        <div className="space-y-2">
                          <a
                            href="https://drive.google.com/drive/folders/11wYTn2iBzHknVdYW-nTgL5Iqu4m-uxDI?usp=drive_link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors p-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span>Entrevistas a usuarios - Material completo</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Entrevistador a Participantes */}
                  <div className="mb-12">
                    <h4 className="text-xl font-semibold text-blue-300 mb-4">
                      Entrevistador a Participantes
                    </h4>
                    <p className="text-blue-200/80 mb-6 text-sm">
                      Análisis del comportamiento de usuarios durante entrevistas simuladas
                    </p>
                    <div ref={imagesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {assets.interviewImages?.slice(0, 4).map((img, idx) => (
                        <div
                          key={idx}
                          className="project-image relative group overflow-hidden rounded-xl border-2 border-blue-500/30"
                        >
                          <img
                            src={img}
                            alt={`Entrevistador a Participantes ${idx + 1}`}
                            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Entrevistas a Usuarios */}
                  <div>
                    <h4 className="text-xl font-semibold text-blue-300 mb-4">
                      Entrevistas Directas a Usuarios
                    </h4>
                    <p className="text-blue-200/80 mb-6 text-sm">
                      Recopilación de perspectivas y experiencias de usuarios sobre entrevistas laborales
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {assets.interviewImages?.slice(4, 8).map((img, idx) => (
                        <div
                          key={idx + 4}
                          className="project-image relative group overflow-hidden rounded-xl border-2 border-blue-500/30"
                        >
                          <img
                            src={img}
                            alt={`Entrevista a Usuarios ${idx + 1}`}
                            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            </motion.div>
        </div>
      </div>
    </div>
  )
}
