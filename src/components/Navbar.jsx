import React from 'react'
export default function Navbar({theme,setTheme}){
return (
<nav className='nav'>
<div className='logo'>Shalev Issachar</div>
<div className='links'>
<a href='#about'>About</a>
<a href='#skills'>Skills</a>
<a href='#projects'>Projects</a>
<a href='#experience'>Experience</a>
</div>


<select
value={theme}
onChange={(e)=>setTheme(e.target.value)}
style={{padding:'6px 12px', borderRadius:8, background:'var(--surface)', border:'1px solid var(--border)'}}
>
<option value='light'>Apple Light</option>
<option value='dark'>VSCode Dark</option>
<option value='neon'>Cyberpunk Neon</option>
</select>
</nav>
)
}