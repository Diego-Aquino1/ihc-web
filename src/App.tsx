import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { Navigation } from "@/components/Navigation"
import { Home } from "@/pages/Home"
import { ProjectDetail } from "@/pages/ProjectDetail"
import { ScrollToTop } from "@/components/ScrollToTop"
import { motion } from "framer-motion"

function AppShell() {
  const location = useLocation()
  const isHome = location.pathname === "/"

  return (
    <div className={isHome ? "min-h-screen bg-background" : "min-h-screen bg-background"}>
      <ScrollToTop />
      <Navigation />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
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
