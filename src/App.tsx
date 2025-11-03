import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { Navigation } from "@/components/Navigation"
import { Home } from "@/pages/Home"
import { ProjectDetail } from "@/pages/ProjectDetail"
import { motion } from "framer-motion"

function AppShell() {
  const location = useLocation()
  const isHome = location.pathname === "/"

  return (
    <div className={isHome ? "h-screen bg-background overflow-hidden" : "min-h-screen bg-background"}>
      {!isHome && <Navigation />}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={isHome ? "h-full" : undefined}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </motion.main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  )
}

export default App
