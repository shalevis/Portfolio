import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Skills from './pages/Skills.jsx';
import Projects from './pages/Projects.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "20px", display: "flex", gap: "20px", background: "#111", color: "#fff" }}>
        <Link to="/" style={{ color: "#61dafb" }}>Home</Link>
        <Link to="/skills" style={{ color: "#61dafb" }}>Skills</Link>
        <Link to="/projects" style={{ color: "#61dafb" }}>Projects</Link>
        <Link to="/about" style={{ color: "#61dafb" }}>About</Link>
        <Link to="/contact" style={{ color: "#61dafb" }}>Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
