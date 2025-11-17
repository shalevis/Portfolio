import React, {useState} from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Experience from './components/Experience.jsx'
import Education from './components/Education.jsx'
import Projects from './components/Projects.jsx'
import Footer from './components/Footer.jsx'


export default function App(){
const [dark, setDark] = useState(false)
return (
<div className={dark ? 'theme-dark app' : 'theme-light app'}>
<Navbar dark={dark} setDark={setDark} />
<main>
<Hero />
<About />
<Skills />
<Projects />
<Experience />
<Education />
</main>
<Footer />
</div>
)
}