import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { gsap } from "gsap"
import { motion } from "framer-motion"
import { ArrowRight, ChevronRight } from "lucide-react"

export function Home() {
  const navigate = useNavigate()
  const spaceRoomRef = useRef<HTMLDivElement>(null)
  const interviewRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const [hoveredSection, setHoveredSection] = useState<"space" | "interview" | null>(null)

  useEffect(() => {
    // Animación del logo MistiLab
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      )
    }

    // Animación de entrada para las secciones split
    if (spaceRoomRef.current && interviewRef.current) {
      gsap.fromTo(
        [spaceRoomRef.current, interviewRef.current],
        {
          clipPath: "inset(0% 50% 0% 50%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.1,
        }
      )

      // Animación de las imágenes de fondo
      gsap.fromTo(
        spaceRoomRef.current.querySelector(".bg-image"),
        {
          scale: 1.2,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
        }
      )
    }

    // Animación de las estrellas de fondo
    const stars = document.querySelectorAll(".star")
    stars.forEach((star, index) => {
      gsap.to(star, {
        opacity: gsap.utils.random(0.3, 1),
        duration: gsap.utils.random(1, 3),
        repeat: -1,
        yoyo: true,
        delay: index * 0.1,
      })
    })
  }, [])

  const handleSectionClick = (section: "space" | "interview") => {
    if (section === "space") {
      // Animación antes de navegar
      if (spaceRoomRef.current) {
        const tl = gsap.timeline({
          onComplete: () => navigate("/project/vr-escape-room"),
        })
        tl.to(spaceRoomRef.current, {
          scale: 1.05,
          opacity: 0.9,
          duration: 0.3,
        }).to(spaceRoomRef.current, {
          scale: 1.1,
          opacity: 0,
          duration: 0.2,
        })
      } else {
        navigate("/project/vr-escape-room")
      }
    } else {
      // Animación antes de navegar
      if (interviewRef.current) {
        const tl = gsap.timeline({
          onComplete: () => navigate("/project/interview-sim"),
        })
        tl.to(interviewRef.current, {
          scale: 1.05,
          opacity: 0.9,
          duration: 0.3,
        }).to(interviewRef.current, {
          scale: 1.1,
          opacity: 0,
          duration: 0.2,
        })
      } else {
        navigate("/project/interview-sim")
      }
    }
  }

  const handleSectionHover = (section: "space" | "interview") => {
    setHoveredSection(section)
    if (section === "space" && spaceRoomRef.current) {
      gsap.to(spaceRoomRef.current, {
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out",
      })
      gsap.to(spaceRoomRef.current.querySelector(".bg-image"), {
        scale: 1.1,
        duration: 0.4,
        ease: "power2.out",
      })
    } else if (section === "interview" && interviewRef.current) {
      gsap.to(interviewRef.current, {
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out",
      })
    }
  }

  const handleSectionLeave = () => {
    setHoveredSection(null)
    if (spaceRoomRef.current) {
      gsap.to(spaceRoomRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      })
      gsap.to(spaceRoomRef.current.querySelector(".bg-image"), {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      })
    }
    if (interviewRef.current) {
      gsap.to(interviewRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      })
    }
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden relative">
      {/* Estrellas de fondo animadas */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="star absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      {/* Header con logo centrado */}
      <header className="absolute top-0 left-0 right-0 z-50 px-8 py-6">
        <div className="relative h-full flex items-center justify-center">
          <div ref={logoRef} className="absolute left-1/2 transform -translate-x-1/2">
            <img
              src="/logomistilab.png"
              alt="MistiLab"
              className="h-10 md:h-12 w-auto brightness-0 invert"
            />
          </div>
          
        </div>
      </header>

      {/* Split Screen - Dos productos */}
      <div className="h-full w-full flex relative">
        {/* SpaceRoom - Lado Izquierdo */}
        <div
          ref={spaceRoomRef}
          onClick={() => handleSectionClick("space")}
          onMouseEnter={() => handleSectionHover("space")}
          onMouseLeave={handleSectionLeave}
          className="relative w-1/2 h-full cursor-pointer overflow-hidden group"
        >
          {/* Imagen de fondo */}
          <div className="absolute inset-0">
            <img
              src="/imagenVideoJuego1.jpg"
              alt="SpaceRoom"
              className="bg-image w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/80 via-cyan-800/60 to-transparent" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* Contenido */}
          <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <img
                src="/spaceroomlogo.png"
                alt="SpaceRoom"
                className="w-48 md:w-64 h-auto mb-4 drop-shadow-2xl"
              />
              <h2 className="text-3xl md:text-5xl font-bold mb-3 text-white drop-shadow-lg">
                VR Escape Adventure
              </h2>
              <p className="text-blue-200 text-sm md:text-base mb-6 max-w-md drop-shadow-md">
                Sumérgete en una aventura espacial única. Resuelve puzzles, escapa de peligros y
                vive una experiencia inmersiva en realidad virtual.
              </p>
              <div className="flex items-center gap-2 text-cyan-300 font-semibold group-hover:gap-4 transition-all duration-300">
                <span>Explorar</span>
                <ChevronRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </motion.div>
          </div>

          {/* Indicador de hover */}
          <div
            className={`absolute top-1/2 right-8 transform -translate-y-1/2 transition-opacity duration-300 ${
              hoveredSection === "space" ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-cyan-500/30 backdrop-blur-sm border-2 border-cyan-400 flex items-center justify-center">
              <ArrowRight className="h-6 w-6 text-cyan-300" />
            </div>
          </div>
        </div>

        {/* InterView - Lado Derecho */}
        <div
          ref={interviewRef}
          onClick={() => handleSectionClick("interview")}
          onMouseEnter={() => handleSectionHover("interview")}
          onMouseLeave={handleSectionLeave}
          className="relative w-1/2 h-full cursor-pointer overflow-hidden group border-l border-blue-500/20"
        >
          {/* Fondo con gradiente */}
          <div className="absolute inset-0 bg-gradient-to-l from-blue-900/90 via-purple-800/70 to-blue-900/90">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
            {/* Patrón de fondo sutil */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Contenido */}
          <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <img
                src="/interviewLogo.png"
                alt="InterView"
                className="w-48 md:w-64 h-auto mb-4 drop-shadow-2xl"
              />
              <h2 className="text-3xl md:text-5xl font-bold mb-3 text-white drop-shadow-lg">
                Prepara tus Entrevistas
              </h2>
              <p className="text-blue-200 text-sm md:text-base mb-6 max-w-md drop-shadow-md">
                Entrena con escenarios reales y obtén feedback instantáneo. Supera el miedo escénico
                y mejora tu desempeño.
              </p>
              <div className="flex items-center gap-2 text-blue-300 font-semibold group-hover:gap-4 transition-all duration-300">
                <span>Explorar</span>
                <ChevronRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </motion.div>
          </div>

          {/* Indicador de hover */}
          <div
            className={`absolute top-1/2 left-8 transform -translate-y-1/2 transition-opacity duration-300 ${
              hoveredSection === "interview" ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-blue-500/30 backdrop-blur-sm border-2 border-blue-400 flex items-center justify-center">
              <ArrowRight className="h-6 w-6 text-blue-300 rotate-180" />
            </div>
          </div>
        </div>
      </div>

      {/* Línea divisoria animada */}
      <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent z-40" />
    </div>
  )
}
