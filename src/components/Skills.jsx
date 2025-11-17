import React from 'react'


const skills = [
'Kubernetes','Docker','Linux','Windows','NetApp','VMware','CI/CD','Git','PowerShell','Bash','Python','Networking'
]


export default function Skills(){
return (
<section id='skills'>
<h2>Skills</h2>
<div className='pills'>
{skills.map(s => <div className='dev-badge' key={s}>{s}</div>)}
</div>
</section>
)
}