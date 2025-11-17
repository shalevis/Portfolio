import React from 'react'
const skills = [
'Teamwork','Effective Communication','Automation','DevOps','Programming',
'Infrastructure','Storage','Networking','Kubernetes','Jenkins','Git',
'Virtualization','Linux & Windows servers','NetApp','Veeam','Trelix','Jira'
]
export default function Skills(){
return (
<section id='skills'>
<h2>Skills</h2>
<div className='card'>
<div className='pills'>{skills.map(s => <div className='pill' key={s}>{s}</div>)}</div>
</div>
</section>
)
}