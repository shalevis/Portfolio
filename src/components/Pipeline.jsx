import React from 'react'
export default function Pipeline(){
return (
<section>
<h2>DevOps Pipeline</h2>
<div className='pipeline'>
<div className='pipe-node'>CI</div>
<div className='pipe-arrow'>→</div>
<div className='pipe-node'>Build</div>
<div className='pipe-arrow'>→</div>
<div className='pipe-node'>Test</div>
<div className='pipe-arrow'>→</div>
<div className='pipe-node'>Docker</div>
<div className='pipe-arrow'>→</div>
<div className='pipe-node'>Deploy</div>
<div className='pipe-arrow'>→</div>
<div className='pipe-node'>K8s</div>
</div>
</section>
)
}