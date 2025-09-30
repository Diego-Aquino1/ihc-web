import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navigation } from "@/components/Navigation"
import { Home } from "@/pages/Home"
import { ProjectDetail } from "@/pages/ProjectDetail"
import { motion } from "framer-motion"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
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
    </Router>
  )
}

export default App
