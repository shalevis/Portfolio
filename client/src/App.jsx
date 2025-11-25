import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
function PageTransition({ children, route }) {
  return (
    <div
      key={route}
      className="page-transition"
    >
      {children}
    </div>
  );
}
export default function App() {
  const [route, setRoute] = useState(() => window.location.hash.replace('#','') || 'home');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace('#','') || 'home');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);



  const navigate = (to) => {
    window.location.hash = to;
    // smooth scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

return (
  <div className="h-screen  font-sans">
    <StyleBlock />
    <Navbar route={route} navigate={navigate} theme={theme} setTheme={setTheme} profile={profile} />
   <main className="transition-wrapper">
  <PageTransition route={route}>
    {route === 'home' && <Home navigate={navigate} profile={profile} />}
    {route === 'about' && <About />}
    {route === 'projects' && <Projects />}
    {route === 'experience' && <Experience />}
    {route === 'contact' && <Contact />}
  </PageTransition>
</main>
    <Footer />
  </div>
);
}

function Navbar({ route, navigate, theme, setTheme, profile }){
  return (
    <nav className="fixed top-0 left-0 w-full z-50 nav-bg">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="logo">SI</div>
          <div>
            <div className="font-bold">{profile?.name || 'Shalev Issachar'}</div>
            <div className="text-xs text-muted">{profile?.title || 'DevOps & Infrastructure Engineer'}</div>
          </div>
        </div>

        <ul className="hidden md:flex items-center gap-6">
          <li className={route==='home'? 'active-link':''} onClick={()=>navigate('home')}>Home</li>
          <li className={route==='about'? 'active-link':''} onClick={()=>navigate('about')}>About</li>
          <li className={route==='projects'? 'active-link':''} onClick={()=>navigate('projects')}>Projects</li>
          <li className={route==='experience'? 'active-link':''} onClick={()=>navigate('experience')}>Experience</li>
          <li className={route==='contact'? 'active-link':''} onClick={()=>navigate('contact')}>Contact</li>
          <li>
            <button className="theme-btn" onClick={()=>setTheme(t=> t==='light' ? 'dark' : 'light')}>
              {theme==='light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </li>
        </ul>

        <div className="md:hidden">
          <button className="theme-btn" onClick={()=>setTheme(t=> t==='light' ? 'dark' : 'light')}>{theme==='light' ? '🌙' : '☀️'}</button>
        </div>
      </div>
    </nav>
  );
}
function Home({ navigate, profile }) {
  return (
    <section
  className="relative w-full bg-cover bg-center flex items-center"
  style={{
    height: 'calc(100vh - 120px)',
    minHeight: 'calc(100vh - 120px)',
    marginTop: '80px',
    overflow: 'hidden',
    backgroundImage: "url('./nature_landing_bg.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
  aria-label="Home"
>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/30 via-transparent to-black/80" aria-hidden="true"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto p-8 grid md:grid-cols-2 gap-8 items-center">
        {/* Left text section */}
        <div>
          <h1 className="text-5xl font-extrabold mb-4 text-green-300 drop-shadow-lg">
            {profile?.name || "Shalev Issachar"}
          </h1>

          <p className="text-lg text-green-200/90 mb-6 drop-shadow-md">
            DevOps & Infrastructure Engineer — Kubernetes, CI/CD, Hybrid Infrastructure
          </p>

          <div className="flex gap-4">
            <button
              className="cta"
              onClick={() => navigate("projects")}
              style={{ background: "linear-gradient(90deg,#22c55e,#065f46)" }}
            >
              See Projects
            </button>

            <button
              className="cta outline"
              onClick={() => navigate("about")}
              style={{ borderColor: "rgba(34,197,94,0.4)", color: "rgba(255,255,255,0.9)" }}
            >
              About Me
            </button>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center text-green-200">
              <div className="text-2xl font-bold">3+</div>
              <div className="text-xs opacity-80">Years Experience</div>
            </div>

            <div className="text-center text-green-200">
              <div className="text-2xl font-bold">K8s</div>
              <div className="text-xs opacity-80">Platform</div>
            </div>

            <div className="text-center text-green-200">
              <div className="text-2xl font-bold">CI/CD</div>
              <div className="text-xs opacity-80">Automation</div>
            </div>
          </div>
        </div>

        {/* Right photo card */}
        
      </div>

      {/* Bottom gradient bar */}
      <div className="absolute left-0 right-0 bottom-8 flex justify-center z-20 pointer-events-none">
        <div style={{ width: 120, height: 8, borderRadius: 6, background: "linear-gradient(90deg,#22c55e,#065f46)" }} />
      </div>
    </section>
  );
}


function About(){
  const skills = ['Kubernetes','Docker','Helm','ArgoCD','Jenkins','VMware ESXi','NetApp','GitOps workflows','Networking','firewall','Trivy','Secret management','Vault','Python','Bash','PowerShell','Terraform'];

  return (
    <section className="max-w-5xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold mb-6 mt-5">About Me</h2>
      <p className="text-lg text-muted mb-6">
       DevOps & Infrastructure Engineer specializing in Kubernetes, CI/CD automation, and secure on-prem systems. Experienced in building scalable pipelines, migrating legacy applications into containerized environments, automating infrastructure with scripts and IaC, and maintaining hybrid Linux/Windows ecosystems. Strong background in VMware virtualization, NetApp storage, and enterprise-grade security controls.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="font-semibold mb-3">Core Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map(s => <span key={s} className="tag">{s}</span>)}
          </div>
        </div>

        <div className="card p-6 md:col-span-2">
          <h3 className="font-semibold mb-3">Experience Timeline</h3>
          <div className="timeline">
            <TimelineItem year="2024 – Present" title="DevOps & Infrastructure Engineer" desc={["Managed hybrid on‑prem Linux + Windows Server environments.", "Migrated systems to Kubernetes and built CI/CD pipelines (Jenkins, GitLab, ArgoCD).", "VMware ESXi/vCenter & NetApp storage integrations."]} />

            <TimelineItem year="2023 – 2024" title="Systems Engineer" desc={["Maintained enterprise servers and automation scripts.", "Provisioning, backups, monitoring and security hardening."]} />

            <TimelineItem year="2022 – 2023" title="Junior Sysadmin" desc={["Support for Linux/Windows servers, networking, and storage."]} />
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ year, title, desc }){
  return (
    <div className="timeline-item">
      <div className="timeline-year">{year}</div>
      <div>
        <div className="font-semibold">{title}</div>
        <ul className="mt-2 list-disc list-inside text-muted">
          {desc.map((d,i) => <li key={i}>{d}</li>)}
        </ul>
      </div>
    </div>
  );
}

function Projects() {
  const [projects, setProjects] = useState([]);

  // Hard-coded project you requested
  const localProjects = [
    {
      id: "local-1",
      title: "Portfolio App — Jenkins Pipeline, ArgoCD & Trivy",
      desc: "A production-ready CI/CD pipeline for deploying a React portfolio application. Jenkins automates builds and tests, Trivy performs vulnerability scanning, and ArgoCD manages GitOps-based Kubernetes deployments with progressive delivery.",
      tech: [
        "React", "Node.js", "Docker", "Kubernetes",
        "Jenkins", "ArgoCD", "Trivy", "GitOps"
      ]
    },

    // 👉 Add any other hard-coded projects here:
    {
      id: "local-2",
      title: "Infrastructure Automation Toolkit",
      desc: "A full automation suite for provisioning Linux/Windows servers, deploying services, managing storage, handling backups and automating CI/CD flows across hybrid infrastructure.",
      tech: [
        "Python", "Bash", "PowerShell",
        "Terraform", "Ansible", "VMware", "NetApp"
      ]
    },
    {
     id: "local-3",
      title: "Kubernetes Migration",
      desc: "Migrated legacy on-prem workloads into a production-ready Kubernetes cluster with automated CI/CD.",
      tech: ["Kubernetes", "Docker", "ArgoCD", "Helm"]
    },
    {
      id: "local-4",
      title: "CI/CD Automation",
      desc: "Built multi-stage Jenkins pipelines with Trivy scanning, secret rotation, and automated deployments.",
      tech: ["Jenkins", "Terraform", "Trivy"]
    },
      {
      id: "local-5",
      title: "Enterprise Git Migration & Repository Standardization",
      desc: "Led a complete migration of legacy Git servers into a unified Git platform. Included repo restructuring, access control redesign, automated import/export pipelines, branch strategy standardization, and integration with Jenkins/ArgoCD workflows.",
      tech: [
        "Git", "GitLab", "Python",
        "Linux",  "Automation"
      ]
    }
  ];

  // Fetch existing projects from your API (optional)


  const mergedProjects = [...localProjects, ...projects];

  return (
    <section className="max-w-6xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold mb-8 mt-5">Projects</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {mergedProjects.map((p) => (
          <article key={p.id} className="card p-6">
            <h3 className="text-2xl font-semibold">{p.title}</h3>
            <p className="text-muted mt-2">{p.desc}</p>

            <div className="mt-4 flex gap-2 flex-wrap">
              {p.tech?.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


function Experience() {
  return (
    <section className="max-w-5xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold mb-6 mt-5">Experience</h2>

      <div className="space-y-6">

        {/* MAIN ROLE */}
        <div className="card p-6">
          <h3 className="font-semibold text-2xl">DevOps & Infrastructure Engineer</h3>
          <div className="text-muted mt-2">Israeli Air Force | 2022 – Present</div>

          <ul className="mt-4 list-disc list-inside text-muted space-y-1.5">
            <li>Managed hybrid on-prem infrastructure across Linux, Windows Server, VMware ESXi/vCenter, and NetApp storage.</li>
            <li>Migrated legacy systems into containerized architectures using Kubernetes and Docker.</li>
            <li>Implemented and maintained CI/CD pipelines using Jenkins & ArgoCD, reducing deployment time significantly.</li>
            <li>Automated repetitive tasks using Python, Bash, and PowerShell, improving operational efficiency.</li>
            <li>Integrated security best practices, including Trivy scanning, RBAC hardening, and secrets management.</li>
            <li>Designed monitoring and alerting using Prometheus, Grafana, and Elastic Stack.</li>
            <li>Supported production, dev, and test environments with high availability and minimal downtime.</li>
            <li>Developed Infrastructure as Code using Terraform to standardize deployments.</li>
            <li>Built internal dashboards and tooling to improve team workflows and reduce manual processes.</li>
          </ul>
        </div>

        {/* OPTIONAL EXTRA EXPERIENCE CARD */}
        <div className="card p-6">
          <h3 className="font-semibold text-2xl">Freelance DevOps / Automation</h3>
          <div className="text-muted mt-2">Self-Employed | 2024 – Present</div>

          <ul className="mt-4 list-disc list-inside text-muted space-y-1.5">
            <li>Built small-scale CI/CD pipelines for client web applications using Jenkins.</li>
            <li>Set up cloud environments on AWS and zap for demo and production apps.</li>
          </ul>
        </div>

      </div>
    </section>
  );
}


function Contact() {
  return (
    <section className="max-w-4xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold mb-10 mt-5">Contact</h2>

      <div className="card p-8 flex flex-col gap-6">

        {/* Email */}
        <div className="flex items-center gap-4">
          <Mail className="w-7 h-7 text-green-500" />
          <div>
            <h3 className="font-semibold">Email</h3>
            <a
              href="mailto:shalevi55344@gmail.com"
              className="text-muted hover:underline"
            >
              shalevi55344@gmail.com
            </a>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-4">
          <Phone className="w-7 h-7 text-green-500" />
          <div>
            <h3 className="font-semibold">Phone</h3>
            <a
                          className="text-muted hover:underline"
            >
              +972 054-5534483
            </a>
          </div>
        </div>

        {/* LinkedIn */}
        <div className="flex items-center gap-4">
          <Linkedin className="w-7 h-7 text-blue-500" />
          <div>
            <h3 className="font-semibold">LinkedIn</h3>
            <a
              href="https://www.linkedin.com/in/shalev-issachar-b8681a383"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:underline"
            >
              https://www.linkedin.com/in/shalev-issachar-b8681a383
            </a>
          </div>
        </div>

        {/* GitHub */}
        <div className="flex items-center gap-4">
          <Github className="w-7 h-7 text-gray-300" />
          <div>
            <h3 className="font-semibold">GitHub</h3>
            <a
              href="https://github.com/shalevis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:underline"
            >
              https://github.com/shalevis
            </a>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-4">
          <MapPin className="w-7 h-7 text-red-400" />
          <div>
            <h3 className="font-semibold">Location</h3>
            <p className="text-muted">Israel</p>
          </div>
        </div>

      </div>
    </section>
  );
}
function Footer(){
  return (
<footer className="fixed bottom-0 left-0 w-full h-10 flex items-center justify-center 
text-xs  backdrop-blur-md  border-t border-white/10 z-[9999]">
  © {new Date().getFullYear()} Shalev Issachar — DevOps Engineer
</footer>


  );
}

function StyleBlock(){
  return (
    <style>{`
      :root{ --bg:#f6f7fb; --panel:#ffffff; --text:#0b1220; --muted:#6b7280; --glass: rgba(255,255,255,0.6); --accent-start:#10b981; --accent-end:#065f46; }
      [data-theme='dark']{ --bg:#0b0e14; --panel:#0f1724; --text:#d4d4d4; --muted:#94a3b8; --glass: rgba(10,14,24,0.6); --accent-start:#22c55e; --accent-end:#065f46; }
html, body, div, span, p, h1, h2, h3, h4, h5, h6 {
  caret-color: transparent !important;
}

      html,body,#root{ height:100%; }
      
      body{  cursor: pointer; background: var(--bg); color: var(--text); font-family: Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue'; }
      .nav-bg{ background: linear-gradient(to right, rgba(255,255,255,0.85), rgba(255,255,255,0.7)); backdrop-filter: blur(6px); transition: background 0.3s ease; }
      [data-theme='dark'] .nav-bg{ background: linear-gradient(to right, rgba(12,14,20,0.85), rgba(12,14,20,0.75)); }

      .logo{ width:48px; height:48px; border-radius:10px; background:var(--panel); display:flex; align-items:center; justify-content:center; font-weight:700; box-shadow: 0 6px 22px rgba(2,6,23,0.12); }
      .text-muted{ color:var(--muted); }
      .card{ background:var(--panel); border-radius:12px; box-shadow:0 10px 30px rgba(2,6,23,0.06); padding:18px; transition: transform 0.25s ease, box-shadow 0.25s ease; }
      .card:hover{ transform: translateY(-6px); box-shadow:0 18px 40px rgba(2,6,23,0.12); }

      .hero{ display:flex; align-items:center; justify-content:center; }
      .glass{ background:var(--glass); border-radius:14px; padding:2.5rem; }
      .hero-title{ font-size:42px; font-weight:800; margin-bottom:8px; color:var(--text); }
      .hero-sub{ color:var(--muted); font-size:18px; }

      .cta{ background:linear-gradient(90deg,var(--accent-start),var(--accent-end)); color:white; padding:10px 18px; border-radius:10px; font-weight:600; border:none; cursor:pointer; box-shadow:0 10px 30px rgba(2,6,23,0.12); transition: transform 0.18s ease; }
      .cta:hover{ transform: translateY(-3px); }
      .cta.outline{ background:transparent; color:var(--text); border:1px solid rgba(15,23,42,0.06); }

      .stats-grid{ display:flex; gap:20px; justify-content:flex-start; margin-top:22px; }
      .stat{ text-align:left; }
      .stat-num{ font-weight:700; font-size:18px; }
      .stat-label{ color:var(--muted); font-size:13px; }

      .tag{ background:transparent; border:1px solid rgba(15,23,42,0.06); padding:6px 10px; border-radius:8px; font-size:14px; }

      .timeline{ border-left:3px solid rgba(34,197,94,0.12); padding-left:18px; }
      .timeline-item{ display:flex; gap:14px; margin-bottom:18px; }
      .timeline-year{ min-width:110px; color:var(--muted); font-weight:700; }

      .chip{ background:transparent; border:1px solid rgba(15,23,42,0.06); padding:6px 8px; border-radius:8px; font-size:12px; }

      .input{ width:100%; padding:10px 12px; border-radius:8px; border:1px solid rgba(15,23,42,0.06); background:var(--panel); color:var(--text); }

      .active-link{ font-weight:700; position:relative; }
      .active-link::after{ content:''; position:absolute; left:0; bottom:-8px; width:100%; height:3px; background:linear-gradient(90deg,var(--accent-start),var(--accent-end)); border-radius:4px; }

      .theme-btn{ background:transparent; border:none; padding:6px 8px; border-radius:8px; cursor:pointer; }

      .bg-footer{ background: linear-gradient(90deg, rgba(15,23,42,0.06), rgba(15,23,42,0.02)); padding-top:8px; padding-bottom:8px; }

      @media (max-width:768px){ .stats-grid{ flex-direction:column; } .hero-title{ font-size:32px;
      
      } }
    `}</style>
  );
}
