import React from 'react'
const projects = [
{name:'DevOps Pipeline Templates', desc:'Reusable Jenkins + Kubernetes templates for CI/CD'},
{name:'Infrastructure Automation', desc:'PowerShell & Bash tooling for infra management'},
{name:'Monitoring & Alerts', desc:'Prometheus & Grafana dashboards and alerts'}
]
export default function Projects(){
return (
<section id='projects'>
<h2>Projects</h2>
<div className='card'>
<ul className='project-list'>
{projects.map(p => (
<li className='project-item' key={p.name}>
<div>
<strong>{p.name}</strong>
<div className='project-meta'>{p.desc}</div>
</div>
<div style={{display:'flex',gap:8}}>
<a href='https://github.com/shalevis' target='_blank' rel='noreferrer'>Code</a>
<a href='http://linkedin.com/in/shalev-issachar-b8681a383' target='_blank' rel='noreferrer'>Details</a>
</div>
</li>
))}
</ul>
</div>
</section>
)
}