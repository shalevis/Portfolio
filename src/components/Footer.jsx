import React from 'react'
export default function Footer(){
return (
<footer>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:20,flexWrap:'wrap'}}>
<div>
<strong>Shalev Issachar</strong><br/>
DevOps & Infrastructure Engineer<br/>
<a href='mailto:shalevi55344@gmail.com'>shalevi55344@gmail.com</a> · 054-5534483
</div>
<div style={{textAlign:'right'}}>
<div><a href='http://linkedin.com/in/shalev-issachar-b8681a383' target='_blank' rel='noreferrer'>LinkedIn</a></div>
<div><a href='https://github.com/shalevis' target='_blank' rel='noreferrer'>GitHub</a></div>
</div>
</div>
</footer>
)
}