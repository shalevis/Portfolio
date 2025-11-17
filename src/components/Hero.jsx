import React from 'react'
export default function Hero(){
return (
<section className='hero'>
<div className='hero-card' style={{flex:2}}>
<h1 className='hero-title'>DevOps & Infrastructure Engineer</h1>
<p className='hero-sub'>Building scalable CI/CD, Kubernetes, automation & enterprise infra — focused on reliability and automation.</p>
<div className='contact-pill' role='contentinfo'>
<div>📧 shalevi55344@gmail.com</div>
<div>•</div>
<div>📞 054-5534483</div>
</div>
</div>
<div style={{flex:1}}>
<div className='card'>
<h3>Quick Links</h3>
<div style={{display:'flex',flexDirection:'column',gap:8}}>
<a href='http://linkedin.com/in/shalev-issachar-b8681a383' target='_blank' rel='noreferrer'>LinkedIn</a>
<a href='https://github.com/shalevis' target='_blank' rel='noreferrer'>GitHub</a>
</div>
</div>
<div className='card' style={{marginTop:16}}>
<h4>Role</h4>
<div style={{color:'var(--muted)'}}>DevOps & Infrastructure Engineer — Israeli Air Force (2022–Present)</div>
</div>
</div>
</section>
)
}