import React from 'react'
export default function About(){
return (
<section id='about'>
<h2>About Me</h2>
<div className='grid'>
<div className='card'>
<p>DevOps & Infrastructure Engineer with hands-on experience managing Kubernetes clusters, building CI/CD pipelines, and maintaining enterprise infrastructure in hybrid Linux/Windows environments. Strong background in server administration, virtualization (VMware ESXi/vCenter), and storage management (NetApp). Proficient in automation and scripting with PowerShell, Bash, Python, and JavaScript.</p>
</div>
<div className='card'>
<h4>Core strengths</h4>
<ul>
<li>CI/CD (Jenkins, Docker, SonarQube, ArgoCD, Trivy)</li>
<li>Kubernetes clusters & orchestration</li>
<li>Automation & scripting (PowerShell, Bash, Python)</li>
<li>VMware, NetApp & enterprise storage</li>
</ul>
</div>
</div>
</section>
)
}