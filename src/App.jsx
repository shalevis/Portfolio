import React, {useState} from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Pipeline from './components/Pipeline'
import About from './components/About'
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact' 
import Pipeline from './components/Pipeline'


export default function App(){
const [theme,setTheme] = useState('light')


return (
<div className={`theme-${theme}`}>
<Navbar theme={theme} setTheme={setTheme} />
<Hero />
<Skills />
<Projects />
<Pipeline />
<About />
<Experience />
<Education />
<Contact />
</div>
)
}