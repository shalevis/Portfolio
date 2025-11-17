import React from 'react'


const repos = [
{ name:'devops-pipelines', stars:32, updated:'3 days ago', desc:'Reusable Jenkins + K8s Pipelines' },
{ name:'infra-automation', stars:18, updated:'17 days ago', desc:'PowerShell + Bash Automation Tools' },
]


export default function Projects(){
return (
<section id='projects'>
<h2>Projects</h2>
<div className='grid'>
{repos.map(r => (
<div className='repo-card' key={r.name}>
<div className='repo-title'>📦 {r.name}</div>
<div className='repo-meta'>{r.desc}</div>
<div className='repo-meta'>★ {r.stars} ⟳ Updated {r.updated}</div>
</div>
))}
</div>
</section>
)
}