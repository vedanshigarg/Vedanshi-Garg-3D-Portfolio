import React, { Suspense, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera, Stars } from '@react-three/drei'
import { motion, useReducedMotion } from 'framer-motion'
import * as THREE from 'three'
import './styles.css'

const nav = ['Home','About','Experience','Projects','Skills','Education','Contact']
const experiences = [
 {company:'Airtel Digital',role:'Senior Software Engineer',dates:'07/2025 – Present',items:['Scaled the recommendation service from 50 to 4K TPS (~80x) by optimizing Aerospike caching, tuning Kafka consumers, and autoscaling Kubernetes pods on OpenShift (OCP).','Cut real-time offer API response time from 5s+ to under 300ms (~95% faster) by building Spring Boot REST APIs serving 100K+ users.','Built a Recommendation Orchestration Platform with React.js, Spring Boot, and AWS S3, with 5+ role-based screens, sheet upload, and Keycloak/JWT access control, enabling self-serve rollouts across 6+ projects.','Synchronized sheet/release versions and go-live timelines across 4+ downstream systems with zero rule-mismatch errors.','Engineered a source-to-mart ETL pipeline using Airflow, dbt, and an internal job scheduler, cutting pipeline failures by 35%.','Developed a Python AI error-triage tool using Qdrant and LLMs to analyze Kibana/Elasticsearch logs and draft Bitbucket PRs, cutting repetitive-error triage effort by 70%+.','Cut incident response time by 35% with Kibana dashboards and alerting, backed by JUnit and REST Assured tests on every service built.','Mentored 4+ engineers through PR reviews and led sprint planning and daily standups.']},
 {company:'Freecharge',role:'Software Development Engineer – Backend',dates:'01/2025 – 06/2025',items:['Built Kotlin microservices with Spring WebFlux and reactive programming for the Business Loan domain, integrating 10+ systems.','Designed an event-driven asynchronous architecture on Apache Kafka, improving throughput by 35%.','Optimized MongoDB queries and storage design, achieving 25% faster data retrieval.','Automated CI/CD with Docker and Jenkins on AWS, reducing deployment time by 40%.']},
 {company:'Oracle Financial Services Software',role:'Associate Consultant',dates:'07/2022 – 11/2024',items:['Designed Java/Spring Boot microservices exposing REST and SOAP APIs that handled 100K+ requests/day.','Led architecture and design reviews for multiple modules, cutting feature delivery time by 25%.','Resolved production issues including JDK upgrades, JAR conflicts, and framework migrations, reducing incidents by 30%.','Tuned Oracle DB and Hibernate with multithreading and efficient data structures, improving response times by 35%.']}
]
const projects = [
 {title:'Recommendation Orchestration Platform',tag:'Full-stack platform',desc:'A self-serve platform for business teams to upload sheets, manage role-based access, synchronize releases and coordinate rollouts across 6+ projects.',stack:['React.js','Spring Boot','AWS S3','Keycloak','JWT'],metric:'6+ projects'},
 {title:'AI Error-Triage Tool',tag:'Developer productivity',desc:'A Python tool that analyzes Kibana/Elasticsearch logs, uses Qdrant + LLM inference to identify root causes, and drafts Bitbucket PRs.',stack:['Python','Qdrant','LLM','Elasticsearch','Kibana','Bitbucket'],metric:'70%+ less repetitive triage'},
 {title:'High-throughput Recommendation Service',tag:'Backend scale',desc:'Real-time recommendation and offer APIs optimized through Aerospike caching, Kafka consumer tuning and Kubernetes autoscaling.',stack:['Java','Spring Boot','Kafka','Aerospike','Kubernetes','OpenShift'],metric:'50 → 4K TPS'}
]
const skillGroups = [
 ['Backend',['Java 17/21','Spring Boot 3.5','Spring WebFlux','Microservices','RESTful APIs','Hibernate','Apache Kafka','Event-Driven Architecture','Multithreading','HLD/LLD']],
 ['Frontend',['React.js','TypeScript','JavaScript','HTML','CSS','REST API Integration']],
 ['Languages',['Java','Kotlin','Python','TypeScript','JavaScript','SQL','PL/SQL','Shell']],
 ['Data & Cloud',['PostgreSQL','Oracle','MongoDB','Aerospike','AWS (S3)','Docker','Kubernetes','OpenShift (OCP)']],
 ['Engineering',['Airflow','dbt','ETL','Elasticsearch','Kibana','Metabase','Jenkins (CI/CD)','Git','Bitbucket','Keycloak','JWT','JUnit','REST Assured','Code Review','Agile/Scrum']]
]

function Scene(){
 const group=useRef<THREE.Group>(null)
 useFrame((state)=>{ if(group.current){ group.current.rotation.y = state.pointer.x*0.12; group.current.rotation.x = -state.pointer.y*0.05 } })
 return <group ref={group}>
  <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.6}><mesh position={[1.8,0.4,-1.4]}><icosahedronGeometry args={[0.65,1]}/><meshStandardMaterial color="#7f3f62" metalness={0.65} roughness={0.25} transparent opacity={0.5}/></mesh></Float>
  <Float speed={0.9} rotationIntensity={0.12} floatIntensity={0.5}><mesh position={[-1.7,-0.7,-1.2]} rotation={[0.3,0.4,0.2]}><torusGeometry args={[0.55,0.06,16,64]}/><meshStandardMaterial color="#d9b6c7" metalness={0.8} roughness={0.2} transparent opacity={0.35}/></mesh></Float>
  <Stars radius={8} depth={5} count={700} factor={1.3} saturation={0} fade speed={0.35}/>
 </group>
}

function App(){
 const reduce=useReducedMotion(); const [menu,setMenu]=useState(false); const [active,setActive]=useState(0)
 const scrollTo=(id:string)=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setMenu(false)}
 const motionProps=reduce?{}:{initial:{opacity:0,y:18},whileInView:{opacity:1,y:0},viewport:{once:true,amount:0.2},transition:{duration:.7}}
 const stats=useMemo(()=>[['4+','years'],['4K','TPS peak'],['100K+','users'],['6+','projects']],[])
 return <div className="app">
  <div className="noise"/>
  <header className="nav"><button className="brand" onClick={()=>scrollTo('home')}>VG<span>.</span></button><nav>{nav.map((n,i)=><button key={n} className={active===i?'active':''} onClick={()=>{setActive(i);scrollTo(n.toLowerCase())}}>{n}</button>)}</nav><button className="menu" onClick={()=>setMenu(!menu)} aria-label="Open menu">☰</button></header>
  {menu&&<div className="mobile-nav">{nav.map((n,i)=><button key={n} onClick={()=>{setActive(i);scrollTo(n.toLowerCase())}}>{n}</button>)}</div>}

  <section id="home" className="hero section"><div className="hero-3d"><Canvas dpr={[1,1.5]}><PerspectiveCamera makeDefault position={[0,0,5]}/><ambientLight intensity={0.8}/><pointLight position={[3,2,3]} intensity={5} color="#d9b6c7"/><Suspense fallback={null}><Scene/></Suspense></Canvas></div>
   <motion.div className="hero-copy" {...(reduce?{}:{initial:{opacity:0,x:-25},animate:{opacity:1,x:0},transition:{duration:.9}})}><div className="eyebrow">SENIOR SOFTWARE ENGINEER · BACKEND</div><h1>Vedanshi<br/><em>Garg.</em></h1><p>Building high-throughput Java/Spring Boot systems, Kafka event-driven services, and practical full-stack platforms.</p><div className="hero-actions"><button className="primary" onClick={()=>scrollTo('projects')}>View My Work <span>↗</span></button><a className="secondary" href="/VedanshiGarg-Resume.pdf" download>Download Resume ↓</a></div></motion.div>
   <motion.div className="portrait-wrap" {...(reduce?{}:{initial:{opacity:0,scale:.96},animate:{opacity:1,scale:1},transition:{duration:1,delay:.15}})}><div className="portrait-glow"/><img src="/profile.jpg" alt="Vedanshi Garg"/></motion.div>
   <div className="scroll-hint">SCROLL TO EXPLORE <span>↓</span></div>
  </section>

  <section id="about" className="section content"><motion.div {...motionProps}><div className="section-label">01 / ABOUT</div><h2>Engineering with <span>scale</span> in mind.</h2><p className="lead">Senior Software Engineer with 4+ years building high-throughput Java/Spring Boot microservices, Kafka event-driven systems, and React.js interfaces. At Airtel, scaled a recommendation service from 50 to 4K TPS and shipped a full-stack orchestration platform used across 6+ projects.</p></motion.div><div className="stat-grid">{stats.map(([a,b])=><div className="stat" key={b}><strong>{a}</strong><span>{b}</span></div>)}</div></section>

  <section id="experience" className="section content"><motion.div {...motionProps}><div className="section-label">02 / EXPERIENCE</div><h2>Where I’ve <span>built.</span></h2></motion.div><div className="timeline">{experiences.map((e,i)=><motion.article className="experience" key={e.company} {...motionProps}><div className="timeline-dot">0{i+1}</div><div className="exp-head"><div><h3>{e.role}</h3><h4>{e.company}</h4></div><time>{e.dates}</time></div><ul>{e.items.map(x=><li key={x}>{x}</li>)}</ul></motion.article>)}</div></section>

  <section id="projects" className="section content"><motion.div {...motionProps}><div className="section-label">03 / PROJECTS</div><h2>Selected <span>work.</span></h2></motion.div><div className="project-grid">{projects.map((p,i)=><motion.article className="project" key={p.title} {...motionProps}><div className="project-num">0{i+1}</div><div className="project-tag">{p.tag}</div><h3>{p.title}</h3><p>{p.desc}</p><div className="project-bottom"><div className="chips">{p.stack.map(s=><span key={s}>{s}</span>)}</div><strong>{p.metric}</strong></div></motion.article>)}</div></section>

  <section id="skills" className="section content"><motion.div {...motionProps}><div className="section-label">04 / SKILLS</div><h2>Tools I <span>work with.</span></h2></motion.div><div className="skills-grid">{skillGroups.map(([name,items])=><motion.div className="skill-card" key={name} {...motionProps}><h3>{name}</h3><div>{(items as string[]).map(s=><span key={s}>{s}</span>)}</div></motion.div>)}</div></section>

  <section id="education" className="section content"><motion.div {...motionProps}><div className="section-label">05 / EDUCATION</div><h2>Foundation.</h2></motion.div><div className="edu-card"><div><span>B.Tech, Computer Science</span><h3>DIT University, Dehradun</h3></div><div className="edu-meta"><strong>8.43</strong><span>CGPA</span><small>08/2018 – 05/2022</small></div></div><div className="community"><span>COMMUNITY</span><p>Core organizing committee member, National Hackathon 2.0, coordinating logistics for 200+ participants.</p></div></section>

  <section id="contact" className="section contact"><div className="contact-orb"/><motion.div {...motionProps}><div className="section-label">06 / CONTACT</div><h2>Let’s build something <span>meaningful.</span></h2><p>Open to conversations about backend engineering, scalable systems, and senior software engineering opportunities.</p><a className="email" href="mailto:vedanshigarg13@gmail.com">vedanshigarg13@gmail.com <span>↗</span></a><div className="links"><a href="https://linkedin.com/in/vedanshi-garg-313410193" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="/VedanshiGarg-Resume.pdf" download>Resume ↓</a></div></motion.div></section>
  <footer><span>VEDANSHI GARG</span><span>JAVA · SPRING BOOT · KAFKA · SYSTEMS</span><span>© 2026</span></footer>
 </div>
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>)
