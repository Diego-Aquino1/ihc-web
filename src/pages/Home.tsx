import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export function Home() {
  const navigate = useNavigate()

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
          className="absolute -inset-32 opacity-[0.07]"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, hsl(var(--primary)/0.08) 90deg, transparent 180deg, hsl(var(--primary)/0.08) 270deg, transparent 360deg)",
          }}
        />
      </motion.div>

      {/* Contenido principal: dos productos en vista única */}
      <div className="relative z-10 h-full grid grid-cols-1 md:grid-cols-2">
        {/* Panel: Escape Room VR */}
        <Panel
          title="Escape Room VR"
          subtitle="Nave espacial. Puzzles. Inmersión total."
          ctaPrimaryLabel="Probar demo"
          ctaSecondaryLabel="Adquirir experiencia"
          onPrimary={() => navigate("/project/vr-escape-room")}
          onSecondary={() => navigate("/project/vr-escape-room")}
          accent="primary"
        />

        {/* Panel: Simulador de entrevistas */}
        <Panel
          title="Simulador de Entrevistas"
          subtitle="Prepárate con escenarios reales y feedback instantáneo."
          ctaPrimaryLabel="Probar demo"
          ctaSecondaryLabel="Adquirir experiencia"
          onPrimary={() => navigate("/project/interview-sim")}
          onSecondary={() => navigate("/project/interview-sim")}
          accent="secondary"
        />
      </div>
    </div>
  )
}

type PanelProps = {
  title: string
  subtitle: string
  ctaPrimaryLabel: string
  ctaSecondaryLabel: string
  onPrimary?: () => void
  onSecondary?: () => void
  accent: "primary" | "secondary"
  disabled?: boolean
}

function Panel({
  title,
  subtitle,
  ctaPrimaryLabel,
  ctaSecondaryLabel,
  onPrimary,
  onSecondary,
  accent,
  disabled,
}: PanelProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="group relative h-full w-full overflow-hidden"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        className="flex h-full flex-col items-center justify-center gap-6 px-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="mt-3 text-base md:text-lg text-muted-foreground">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <Button
            size="lg"
            onClick={onPrimary}
            disabled={disabled || !onPrimary}
            className={
              accent === "primary"
                ? "px-6"
                : "px-6"
            }
          >
            {ctaPrimaryLabel}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={onSecondary}
            disabled={disabled || !onSecondary}
            className="px-6"
          >
            {ctaSecondaryLabel}
          </Button>
        </motion.div>
      </motion.div>

      {/* Acento de borde y resplandor sutil */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          boxShadow:
            accent === "primary"
              ? "inset 0 0 0 1px hsl(var(--primary)/0.18), 0 0 120px hsl(var(--primary)/0.06)"
              : "inset 0 0 0 1px hsl(var(--muted-foreground)/0.14), 0 0 120px hsl(var(--muted-foreground)/0.04)",
        }}
      />
    </motion.section>
  )
}
