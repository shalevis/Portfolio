import React from 'react'
export default function Navbar({dark,setDark}){
return (
<nav className='nav' role='navigation' aria-label='main'>
<div className='logo'>Shalev Issachar</div>
<div style={{display:'flex',alignItems:'center',gap:12}}>
<div className='links' aria-hidden>
<a href='#about'>About</a>
<a href='#skills'>Skills</a>
<a href='#projects'>Projects</a>
<a href='#experience'>Experience</a>
<a href='#education'>Education</a>
</div>
<div className='toggle' onClick={() => setDark(!dark)} title='Toggle dark mode' aria-pressed={dark}>
<div style={{opacity:0.85, fontWeight:600}}>{dark ? 'Dark' : 'Light'}</div>
<div className='dot' style={{transform: dark ? 'translateX(0)' : 'translateX(0)'}}></div>
</div>
</div>
</nav>
)
}