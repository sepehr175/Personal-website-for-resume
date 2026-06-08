import { useState, useEffect, useRef, useCallback } from "react";

// ── Utility ──────────────────────────────────────────────────────────────────
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const useCountUp = (target, duration = 2000, active = false) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
};

// ── Data ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  "About",
  "Skills",
  "Projects",
  "Services",
  "Experience",
  "Contact",
];

const SKILLS = {
  Frontend: [
    { name: "HTML", pct: 95, icon: "⬡" },
    { name: "CSS", pct: 92, icon: "✦" },
    { name: "JavaScript", pct: 90, icon: "◈" },
    { name: "React", pct: 88, icon: "⬡" },
    { name: "React Native", pct: 75, icon: "◉" },
  ],
  Backend: [
    { name: "Python", pct: 85, icon: "◈" },
    { name: "Node.js", pct: 82, icon: "⬡" },
    { name: "MongoDB", pct: 78, icon: "◉" },
    { name: "C#", pct: 70, icon: "✦" },
  ],
  Design: [
    { name: "Figma", pct: 90, icon: "✦" },
    { name: "Photoshop", pct: 80, icon: "◈" },
    { name: "Illustrator", pct: 75, icon: "⬡" },
  ],
  "Dev Tools": [
    { name: "Git", pct: 92, icon: "◉" },
    { name: "GitHub", pct: 90, icon: "✦" },
  ],
  Marketing: [
    { name: "SEO", pct: 80, icon: "◈" },
    { name: "WordPress", pct: 85, icon: "⬡" },
  ],
  AI: [{ name: "Machine Learning", pct: 78, icon: "◉" }],
};

const PROJECTS = [
  {
    title: "Snapp Clone",
    desc: "A pixel-perfect redesign of the Snapp ride-hailing website featuring 3D CSS effects, Tailwind CSS, full responsiveness, and smooth interactive animations.",
    tags: ["HTML", "CSS", "Tailwind", "JavaScript"],
    color: "#4DA6FF",
    stats: { stars: 4, forks: 1 },
    href: "https://sepehr175.github.io/project-snap/",
    repo: "https://github.com/sepehr175/project-snap",
    image: "/imag/snap.webp",
  },
  {
    title: "Armin Project",
    desc: "A modern HTML/CSS landing page built with Tailwind CSS, featuring a clean component structure, responsive design, and optimized local development workflow.",
    tags: ["HTML", "Tailwind CSS", "PostCSS"],
    color: "#7C6FFF",
    stats: { stars: 2, forks: 0 },
    href: null,
    repo: "https://github.com/sepehr175/armin-project",
    image: "/imag/gym.webp",
  },
  {
    title: "CNN Clone",
    desc: "A full clone of the CNN news website with multiple sections — header, economy, sports, weather, streaming, and footer — each with dedicated CSS and responsive layout.",
    tags: ["HTML", "CSS", "JavaScript"],
    color: "#FF6B9D",
    stats: { stars: 3, forks: 1 },
    href: null,
    repo: "https://github.com/sepehr175/cnn",
    image: "/imag/cnn.webp",
  },
  {
    title: "AI Agent GenUnitAI",
    desc: "An intelligent AI-powered presentation builder that automatically generates beautiful slides with content. Features natural language processing, smart layout suggestions, and export to multiple formats.",
    tags: ["Python", "AI", "NLP", "React"],
    color: "#00D2AA",
    stats: { stars: 11, forks: 3 },
    href: null,
    repo: "https://github.com/sepehr175/ai-powerpoint-slider",
    image: "/imag/ai agent.webp",
  },
  {
    title: "Monster Energy Website",
    desc: "A bold and dynamic website clone for Monster Energy drink featuring stunning visuals, cinematic animations, high-energy design, and an immersive user experience with WebGL effects.",
    tags: ["HTML", "CSS", "JavaScript", "WebGL"],
    color: "#00D41A",
    stats: { stars: 7, forks: 2 },
    href: null,
    repo: "https://github.com/sepehr175",
    image: "/imag/shop monster.webp",
  },
  {
    title: "Law Firm Website",
    desc: "A professional and trustworthy website for a law firm, featuring practice areas, attorney profiles, case consultation forms, client testimonials, and a modern responsive interface.",
    tags: ["HTML", "CSS", "JavaScript", "PHP"],
    color: "#0A5C4D",
    stats: { stars: 9, forks: 4 },
    href: null,
    repo: "https://github.com/sepehr175",
    image: "/imag/law firm.webp",
  },
];

const SERVICES = [
  {
    title: "Full Stack Development",
    desc: "End-to-end web applications, APIs, and cloud infrastructure built for scale.",
    icon: "⬡",
    color: "#4DA6FF",
  },
  {
    title: "Frontend Development",
    desc: "Pixel-perfect, high-performance UIs with buttery-smooth animations.",
    icon: "✦",
    color: "#7C6FFF",
  },
  {
    title: "Backend Development",
    desc: "Robust server architectures, microservices, and database design.",
    icon: "◈",
    color: "#00D2AA",
  },
  {
    title: "Machine Learning",
    desc: "Custom ML models, computer vision, NLP, and intelligent automation pipelines.",
    icon: "◉",
    color: "#FF6B9D",
  },
  {
    title: "UI/UX Design",
    desc: "Research-driven design systems, wireframes, and interactive prototypes.",
    icon: "✦",
    color: "#FF9500",
  },
  {
    title: "SEO Optimization",
    desc: "Technical SEO audits, Core Web Vitals, and growth strategies.",
    icon: "⬡",
    color: "#4DA6FF",
  },
  {
    title: "WordPress Dev",
    desc: "Custom themes, plugins, and performance-optimized WordPress solutions.",
    icon: "◉",
    color: "#7C6FFF",
  },
  {
    title: "Mobile Apps",
    desc: "Cross-platform React Native apps for iOS and Android.",
    icon: "◈",
    color: "#00D2AA",
  },
];

const TIMELINE = [
  {
    year: "2024",
    role: "Senior Full Stack Engineer",
    company: "TechVision Labs",
    desc: "Led a team of 8 engineers shipping ML-powered SaaS products to 50k+ users.",
  },
  {
    year: "2023",
    role: "ML Engineer & UI Lead",
    company: "DataCore AI",
    desc: "Designed and trained NLP models, built the front-end for real-time inference dashboards.",
  },
  {
    year: "2022",
    role: "Full Stack Developer",
    company: "Freelance & Open Source",
    desc: "Delivered 20+ client projects, contributed to 15 open-source repositories.",
  },
  {
    year: "2021",
    role: "Frontend Developer",
    company: "Pixel Agency",
    desc: "Crafted high-performance marketing sites and React applications for global brands.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "CTO, NovaTech",
    text: "Absolute wizard. Delivered a production-grade ML pipeline in half the estimated time, with flawless documentation. I'd hire again in a heartbeat.",
    avatar: "SC",
  },
  {
    name: "Marcus Webb",
    role: "Founder, Launchpad.io",
    text: "The most design-aware engineer I've worked with. He doesn't just build — he makes things beautiful and fast. Our conversion rate jumped 34% after the redesign.",
    avatar: "MW",
  },
  {
    name: "Aisha Patel",
    role: "Product Lead, Gridline",
    text: "Incredible attention to detail. The portfolio site he built for us won an Awwwards honorable mention. Clients still comment on it.",
    avatar: "AP",
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

const Cursor = () => {
  const dot = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;
    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${mx - 5}px,${my - 5}px)`;
      }
    };
    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ring.current)
        ring.current.style.transform = `translate(${rx - 18}px,${ry - 18}px)`;
      requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    loop();
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div
        ref={dot}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          background: "#4DA6FF",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "transform 0.05s linear",
        }}
      />
      <div
        ref={ring}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          border: "1.5px solid rgba(77,166,255,0.5)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />
    </>
  );
};

const Particles = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > c.width) p.vx *= -1;
        if (p.y < 0 || p.y > c.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(77,166,255,0.4)";
        ctx.fill();
      });
      pts.forEach((a, i) =>
        pts.slice(i + 1).forEach((b) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(77,166,255,${0.12 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }),
      );
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    />
  );
};

const TypingText = ({ words }) => {
  const [idx, setIdx] = useState(0);
  const [char, setChar] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const t = setTimeout(
      () => {
        if (!del) {
          if (char < words[idx].length) setChar((c) => c + 1);
          else setTimeout(() => setDel(true), 1400);
        } else {
          if (char > 0) setChar((c) => c - 1);
          else {
            setDel(false);
            setIdx((i) => (i + 1) % words.length);
          }
        }
      },
      del ? 45 : 80,
    );
    return () => clearTimeout(t);
  }, [char, del, idx, words]);
  return (
    <span
      className="typing-text"
      style={{
        color: "#4DA6FF",
        display: "inline-block",
        whiteSpace: "nowrap",
        overflowWrap: "normal",
        wordBreak: "keep-all",
      }}
    >
      {words[idx].slice(0, char)}
      <span
        style={{
          borderRight: "2px solid #4DA6FF",
          marginLeft: 1,
          animation: "blink 1s steps(2) infinite",
        }}
      >
        &#8203;
      </span>
    </span>
  );
};

const SkillBar = ({ name, pct, icon, active }) => {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (active) setTimeout(() => setW(pct), 100);
  }, [active, pct]);
  return (
    <div style={{ marginBottom: 18 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
          fontSize: 13,
          color: "#94a3b8",
        }}
      >
        <span style={{ color: "#e2e8f0" }}>
          {icon} {name}
        </span>
        <span style={{ color: "#4DA6FF" }}>{w}%</span>
      </div>
      <div
        style={{
          height: 4,
          background: "rgba(255,255,255,0.07)",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${w}%`,
            background: "linear-gradient(90deg,#4DA6FF,#7C6FFF)",
            borderRadius: 4,
            transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
    </div>
  );
};

const ProjectCard = ({ p, i }) => {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "rgba(15,23,42,0.7)",
        border: `1px solid rgba(77,166,255,${hov ? 0.4 : 0.1})`,
        borderRadius: 16,
        overflow: "hidden",
        transform: inView
          ? "translateY(0) scale(1)"
          : "translateY(40px) scale(0.97)",
        opacity: inView ? 1 : 0,
        transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${i * 0.08}s`,
        cursor: "pointer",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          height: 180,
          background: `linear-gradient(135deg, ${p.color}22, ${p.color}44)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 30% 50%, ${p.color}33, transparent 60%)`,
            zIndex: 1,
          }}
        />

        {/* Image or Fallback Icon */}
        {p.image && !imgError ? (
          <img
            src={p.image}
            alt={p.title}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s ease",
              transform: hov ? "scale(1.1)" : "scale(1)",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              position: "relative",
              zIndex: 2,
            }}
          >
            <span style={{ filter: "blur(0)" }}>◈</span>
          </div>
        )}

        {/* Image overlay on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to top, ${p.color}99, transparent)`,
            opacity: hov ? 1 : 0,
            transition: "opacity 0.3s",
            zIndex: 2,
          }}
        />

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`,
            opacity: hov ? 1 : 0,
            transition: "opacity 0.3s",
            zIndex: 3,
          }}
        />
      </div>
      <div style={{ padding: "20px 24px" }}>
        <h3
          style={{
            margin: "0 0 8px",
            fontSize: 17,
            fontWeight: 600,
            color: "#f1f5f9",
            fontFamily: "'Syne', sans-serif",
          }}
        >
          {p.title}
        </h3>
        <p
          style={{
            margin: "0 0 16px",
            fontSize: 13,
            color: "#64748b",
            lineHeight: 1.65,
          }}
        >
          {p.desc}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 16,
          }}
        >
          {p.tags.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 11,
                padding: "3px 10px",
                borderRadius: 20,
                background: `${p.color}18`,
                color: p.color,
                border: `1px solid ${p.color}33`,
                fontWeight: 500,
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
            fontSize: 12,
            color: "#475569",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span>★ {p.stats.stars}</span>
          <span>⑂ {p.stats.forks}</span>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            {p.href && (
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 11,
                  padding: "4px 12px",
                  borderRadius: 20,
                  background: `${p.color}18`,
                  color: p.color,
                  border: `1px solid ${p.color}33`,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = `${p.color}35`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = `${p.color}18`)
                }
              >
                Live →
              </a>
            )}
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 11,
                  padding: "4px 12px",
                  borderRadius: 20,
                  background: "rgba(255,255,255,0.05)",
                  color: "#94a3b8",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
                }
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, suffix = "+", active }) => {
  const n = useCountUp(value, 2000, active);
  return (
    <div
      style={{
        background: "rgba(77,166,255,0.06)",
        border: "1px solid rgba(77,166,255,0.15)",
        borderRadius: 16,
        padding: "28px 24px",
        textAlign: "center",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          fontSize: 38,
          fontWeight: 700,
          color: "#4DA6FF",
          fontFamily: "'Syne', sans-serif",
          lineHeight: 1,
        }}
      >
        {n}
        {suffix}
      </div>
      <div
        style={{
          fontSize: 13,
          color: "#64748b",
          marginTop: 8,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
};

// ── Sections ──────────────────────────────────────────────────────────────────

const Hero = ({ scrollTo }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg,#020817 0%,#0a1628 50%,#020817 100%)",
      }}
    >
      <Particles />
      {/* Blobs */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(77,166,255,0.12) 0%,transparent 70%)",
          top: "10%",
          left: "-10%",
          animation: "blob 8s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(124,111,255,0.1) 0%,transparent 70%)",
          bottom: "10%",
          right: "-8%",
          animation: "blob 10s ease-in-out infinite reverse",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: 860,
          padding: "0 24px",
          transform: loaded ? "translateY(0)" : "translateY(30px)",
          opacity: loaded ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 18px",
            border: "1px solid rgba(77,166,255,0.3)",
            borderRadius: 24,
            fontSize: 12,
            color: "#4DA6FF",
            marginBottom: 32,
            letterSpacing: "0.1em",
            background: "rgba(77,166,255,0.06)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#4DA6FF",
              display: "inline-block",
              animation: "pulse 2s infinite",
            }}
          />
          AVAILABLE FOR HIRE
        </div>

        {/* Profile */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            margin: "0 auto 32px",
            border: "2px solid rgba(77,166,255,0.4)",
            background: "linear-gradient(135deg,#1e3a5f,#0f172a)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            boxShadow: "0 0 40px rgba(77,166,255,0.25)",
            position: "relative",
          }}
        >
          <span>👨‍💻</span>
          <div
            style={{
              position: "absolute",
              inset: -4,
              borderRadius: "50%",
              border: "1px solid rgba(77,166,255,0.2)",
              animation: "spinSlow 8s linear infinite",
            }}
          />
        </div>

        <h1
          style={{
            fontSize: "clamp(32px,6vw,68px)",
            fontWeight: 700,
            lineHeight: 1.1,
            margin: "0 0 20px",
            color: "#f8fafc",
            fontFamily: "'Syne', sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          Full Stack Developer &<br />
          <TypingText
            words={[
              "Machine Learning Engineer",
              "UI/UX Designer",
              "Open Source Builder",
              "Digital Experience Maker",
            ]}
          />
        </h1>

        <p
          style={{
            fontSize: "clamp(15px,2vw,19px)",
            color: "#64748b",
            maxWidth: 600,
            margin: "0 auto 40px",
            lineHeight: 1.75,
          }}
        >
          I build scalable web applications, intelligent systems,
          <br />
          and exceptional digital experiences.
        </p>

        <div
          className="hero-actions"
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => scrollTo("projects")}
            style={{
              padding: "14px 34px",
              background: "linear-gradient(135deg,#4DA6FF,#7C6FFF)",
              border: "none",
              borderRadius: 50,
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 8px 30px rgba(77,166,255,0.35)",
              transition: "all 0.3s",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) =>
              (e.target.style.transform = "scale(1.05) translateY(-2px)")
            }
            onMouseLeave={(e) =>
              (e.target.style.transform = "scale(1) translateY(0)")
            }
          >
            View Projects →
          </button>
          <button
            onClick={() => scrollTo("contact")}
            style={{
              padding: "14px 34px",
              background: "transparent",
              border: "1px solid rgba(77,166,255,0.4)",
              borderRadius: 50,
              color: "#4DA6FF",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              transition: "all 0.3s",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(77,166,255,0.1)";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.transform = "scale(1)";
            }}
          >
            Contact Me
          </button>
        </div>

        {/* Scroll indicator */}
        <div style={{ marginTop: 64, animation: "bounce 2s infinite" }}>
          <div
            style={{
              width: 24,
              height: 40,
              border: "2px solid rgba(77,166,255,0.3)",
              borderRadius: 12,
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              paddingTop: 6,
            }}
          >
            <div
              style={{
                width: 3,
                height: 8,
                background: "#4DA6FF",
                borderRadius: 2,
                animation: "scrollDot 2s infinite",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const [ref, inView] = useInView();
  const stats = [
    { label: "Years of Learning", value: 5 },
    { label: "Projects Completed", value: 60 },
    { label: "Technologies Mastered", value: 17 },
    { label: "Open Source Contributions", value: 200 },
  ];
  return (
    <section
      id="about"
      style={{ padding: "100px 24px", background: "#020817" }}
    >
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 60,
            alignItems: "center",
          }}
        >
          <div
            style={{
              transform: inView ? "translateX(0)" : "translateX(-40px)",
              opacity: inView ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <p
              style={{
                color: "#4DA6FF",
                fontSize: 12,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 16,
                fontWeight: 600,
              }}
            >
              ABOUT ME
            </p>
            <h2
              style={{
                fontSize: "clamp(28px,4vw,44px)",
                fontWeight: 700,
                color: "#f1f5f9",
                fontFamily: "'Syne', sans-serif",
                margin: "0 0 24px",
                lineHeight: 1.2,
              }}
            >
              Crafting the future
              <br />
              one commit at a time
            </h2>
            <p
              style={{
                color: "#64748b",
                lineHeight: 1.8,
                marginBottom: 20,
                fontSize: 15,
              }}
            >
              I'm a Full Stack Developer and Machine Learning Engineer
              passionate about building products that sit at the intersection of
              elegant design and intelligent systems. With experience spanning
              React, Python, Node.js, and TensorFlow, I turn ambitious ideas
              into production-grade software.
            </p>
            <p style={{ color: "#64748b", lineHeight: 1.8, fontSize: 15 }}>
              I thrive in fast-moving environments, love open-source
              collaboration, and obsess over performance, accessibility, and
              developer experience. When I'm not coding, I'm designing,
              learning, or contributing to the community.
            </p>
            <div
              style={{
                marginTop: 32,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              {["React", "Python", "Node.js", "ML", "Figma", "C#"].map((t) => (
                <span
                  key={t}
                  style={{
                    padding: "5px 14px",
                    border: "1px solid rgba(77,166,255,0.25)",
                    borderRadius: 20,
                    fontSize: 12,
                    color: "#4DA6FF",
                    background: "rgba(77,166,255,0.06)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              transform: inView ? "translateX(0)" : "translateX(40px)",
              opacity: inView ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.4,0,0.2,1) 0.2s",
            }}
          >
            {stats.map((s) => (
              <StatCard
                key={s.label}
                label={s.label}
                value={s.value}
                active={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const [ref, inView] = useInView();
  const [active, setActive] = useState("Frontend");
  const cats = Object.keys(SKILLS);
  return (
    <section
      id="skills"
      style={{ padding: "100px 24px", background: "#030d1a" }}
    >
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: 60,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            opacity: inView ? 1 : 0,
            transition: "all 0.7s",
          }}
        >
          <p
            style={{
              color: "#4DA6FF",
              fontSize: 12,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            EXPERTISE
          </p>
          <h2
            style={{
              fontSize: "clamp(28px,4vw,44px)",
              fontWeight: 700,
              color: "#f1f5f9",
              fontFamily: "'Syne', sans-serif",
              margin: "12px 0 0",
            }}
          >
            Skills & Technologies
          </h2>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
            marginBottom: 48,
          }}
        >
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              style={{
                padding: "8px 22px",
                borderRadius: 30,
                border: `1px solid ${active === c ? "#4DA6FF" : "rgba(255,255,255,0.08)"}`,
                background:
                  active === c ? "rgba(77,166,255,0.15)" : "transparent",
                color: active === c ? "#4DA6FF" : "#64748b",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s",
                fontFamily: "inherit",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: 24,
          }}
        >
          {SKILLS[active].map((s, i) => (
            <div
              key={s.name}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
                padding: "24px 28px",
                transform: inView ? "translateY(0)" : "translateY(20px)",
                opacity: inView ? 1 : 0,
                transition: `all 0.5s ease ${i * 0.07}s`,
              }}
            >
              <SkillBar
                name={s.name}
                pct={s.pct}
                icon={s.icon}
                active={inView}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const [ref, inView] = useInView();
  return (
    <section
      id="projects"
      style={{ padding: "100px 24px", background: "#020817" }}
    >
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: 60,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            opacity: inView ? 1 : 0,
            transition: "all 0.7s",
          }}
        >
          <p
            style={{
              color: "#4DA6FF",
              fontSize: 12,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            PORTFOLIO
          </p>
          <h2
            style={{
              fontSize: "clamp(28px,4vw,44px)",
              fontWeight: 700,
              color: "#f1f5f9",
              fontFamily: "'Syne', sans-serif",
              margin: "12px 0 0",
            }}
          >
            Featured Projects
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 24,
          }}
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const [ref, inView] = useInView();
  return (
    <section
      id="services"
      style={{ padding: "100px 24px", background: "#030d1a" }}
    >
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: 60,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            opacity: inView ? 1 : 0,
            transition: "all 0.7s",
          }}
        >
          <p
            style={{
              color: "#4DA6FF",
              fontSize: 12,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            WHAT I DO
          </p>
          <h2
            style={{
              fontSize: "clamp(28px,4vw,44px)",
              fontWeight: 700,
              color: "#f1f5f9",
              fontFamily: "'Syne', sans-serif",
              margin: "12px 0 0",
            }}
          >
            Services
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: 20,
          }}
        >
          {SERVICES.map((s, i) => {
            const [hov, setHov] = useState(false);
            return (
              <div
                key={s.title}
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => setHov(false)}
                style={{
                  background: `rgba(255,255,255,${hov ? 0.05 : 0.02})`,
                  border: `1px solid rgba(255,255,255,${hov ? 0.12 : 0.06})`,
                  borderRadius: 16,
                  padding: "28px 24px",
                  transform: inView ? `translateY(0)` : "translateY(30px)",
                  opacity: inView ? 1 : 0,
                  transition: `all 0.6s ease ${i * 0.06}s`,
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(circle at 0 0,${s.color}10,transparent 60%)`,
                    opacity: hov ? 1 : 0,
                    transition: "opacity 0.4s",
                  }}
                />
                <div style={{ fontSize: 28, marginBottom: 16 }}>{s.icon}</div>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#e2e8f0",
                    margin: "0 0 10px",
                    fontFamily: "'Syne', sans-serif",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "#475569",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const [ref, inView] = useInView();
  return (
    <section
      id="experience"
      style={{ padding: "100px 24px", background: "#020817" }}
    >
      <div ref={ref} style={{ maxWidth: 800, margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: 60,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            opacity: inView ? 1 : 0,
            transition: "all 0.7s",
          }}
        >
          <p
            style={{
              color: "#4DA6FF",
              fontSize: 12,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            CAREER
          </p>
          <h2
            style={{
              fontSize: "clamp(28px,4vw,44px)",
              fontWeight: 700,
              color: "#f1f5f9",
              fontFamily: "'Syne', sans-serif",
              margin: "12px 0 0",
            }}
          >
            Experience Timeline
          </h2>
        </div>
        <div style={{ position: "relative", paddingLeft: 36 }}>
          <div
            style={{
              position: "absolute",
              left: 8,
              top: 0,
              bottom: 0,
              width: 2,
              background:
                "linear-gradient(to bottom,#4DA6FF,rgba(77,166,255,0.1))",
              transform: inView ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "top",
              transition: "transform 1.2s ease 0.3s",
            }}
          />
          {TIMELINE.map((t, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                marginBottom: 40,
                transform: inView ? "translateX(0)" : "translateX(-20px)",
                opacity: inView ? 1 : 0,
                transition: `all 0.6s ease ${i * 0.15}s`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: -32,
                  top: 4,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: "#020817",
                  border: "2px solid #4DA6FF",
                  boxShadow: "0 0 12px rgba(77,166,255,0.5)",
                }}
              />
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 14,
                  padding: "20px 24px",
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    color: "#4DA6FF",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                  }}
                >
                  {t.year}
                </span>
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 600,
                    color: "#f1f5f9",
                    margin: "6px 0 2px",
                    fontFamily: "'Syne', sans-serif",
                  }}
                >
                  {t.role}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "#4DA6FF",
                    margin: "0 0 10px",
                    fontWeight: 500,
                  }}
                >
                  {t.company}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "#475569",
                    margin: 0,
                    lineHeight: 1.7,
                  }}
                >
                  {t.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [ref, inView] = useInView();
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % TESTIMONIALS.length),
      4000,
    );
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[idx];
  return (
    <section style={{ padding: "100px 24px", background: "#030d1a" }}>
      <div
        ref={ref}
        style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}
      >
        <div
          style={{
            transform: inView ? "translateY(0)" : "translateY(30px)",
            opacity: inView ? 1 : 0,
            transition: "all 0.7s",
          }}
        >
          <p
            style={{
              color: "#4DA6FF",
              fontSize: 12,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: 40,
            }}
          >
            TESTIMONIALS
          </p>
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(77,166,255,0.15)",
              borderRadius: 24,
              padding: "48px 40px",
              backdropFilter: "blur(12px)",
              minHeight: 220,
              transition: "all 0.5s",
            }}
          >
            <p
              style={{
                fontSize: 17,
                color: "#cbd5e1",
                lineHeight: 1.8,
                marginBottom: 32,
                fontStyle: "italic",
              }}
            >
              "{t.text}"
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#4DA6FF,#7C6FFF)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#fff",
                }}
              >
                {t.avatar}
              </div>
              <div style={{ textAlign: "left" }}>
                <div
                  style={{ fontWeight: 600, color: "#f1f5f9", fontSize: 15 }}
                >
                  {t.name}
                </div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{t.role}</div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "center",
              marginTop: 24,
            }}
          >
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                style={{
                  width: i === idx ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === idx ? "#4DA6FF" : "rgba(255,255,255,0.2)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ── Config ────────────────────────────────────────────────────────────────────
// برای Vercel: API به صورت خودکار روی /api/send-message قرار می‌گیره
// در حالت Development: http://localhost:3000/api/send-message
// در حالت Production: https://your-domain.vercel.app/api/send-message
const BACKEND_URL = window.location.origin; // از همون دامین فعلی استفاده می‌کنه

const SOCIAL_LINKS = [
  {
    icon: (
      <span
        style={{
          width: 20,
          height: 20,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: 20, height: 20 }}
        >
          <path d="M22 2 11 13" />
          <path d="m22 2-7 20-4-9-9-4 20-7Z" />
        </svg>
      </span>
    ),
    label: "Telegram",
    href: "https://t.me/S0phr",
    color: "#29b6f6",
  },
  {
    icon: (
      <span
        style={{
          width: 20,
          height: 20,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: 20, height: 20 }}
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <path d="M17.5 6.5h.01" />
        </svg>
      </span>
    ),
    label: "Instagram",
    href: "https://www.instagram.com/sepcode1?igsh=dXZkb29iY3VkczMw",
    color: "#e1306c",
  },
  {
    icon: (
      <span
        style={{
          width: 20,
          height: 20,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: 20, height: 20 }}
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3" />
          <path d="M16 19c0 1.38-.84 2.5-2 2.5s-2-1.12-2-2.5" />
          <path d="M12 7c-3.31 0-6 2.69-6 6 0 1.92.95 3.63 2.4 4.72" />
          <path d="M12 7c3.31 0 6 2.69 6 6 0 1.92-.95 3.63-2.4 4.72" />
          <path d="M8 9.5c.5-.34 1.16-.5 1.83-.5" />
          <path d="M15 9.5c-.5-.34-1.16-.5-1.83-.5" />
        </svg>
      </span>
    ),
    label: "GitHub",
    href: "https://github.com/sepehr175",
    color: "#94a3b8",
  },
  {
    icon: (
      <span
        style={{
          width: 20,
          height: 20,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: 20, height: 20 }}
        >
          <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
          <path d="M8 11h3v9" />
          <path d="M8 8h.01" />
          <path d="M16 11h3v5" />
          <path d="M16 8h.01" />
        </svg>
      </span>
    ),
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sepehr-karimi-53a29837b",
    color: "#0a66c2",
  },
];

const Contact = () => {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errMsg, setErrMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrMsg("");

    try {
      const res = await fetch(`${BACKEND_URL}/api/send-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" }); // ← clear form

        // Show warning message if fallback was used
        if (data.fallback && data.warning) {
          setErrMsg(data.warning);
        }

        setTimeout(() => {
          setStatus("idle");
          setErrMsg("");
        }, 8000);
      } else {
        setErrMsg(data.error || "Something went wrong.");
        setStatus("error");
        setTimeout(() => {
          setStatus("idle");
          setErrMsg("");
        }, 8000);
      }
    } catch {
      setErrMsg("Cannot reach the server. Make sure the backend is running.");
      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
        setErrMsg("");
      }, 8000);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12,
    color: "#f1f5f9",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const btnBg =
    status === "sent"
      ? "linear-gradient(135deg,#00D2AA,#00a886)"
      : status === "error"
        ? "linear-gradient(135deg,#ef4444,#b91c1c)"
        : status === "sending"
          ? "linear-gradient(135deg,#334155,#1e293b)"
          : "linear-gradient(135deg,#4DA6FF,#7C6FFF)";

  const btnLabel =
    status === "sent"
      ? "✅ Message Sent!"
      : status === "error"
        ? "✗ Try Again"
        : status === "sending"
          ? "Sending…"
          : "Send Message →";

  return (
    <section
      id="contact"
      style={{ padding: "100px 24px", background: "#030d1a" }}
    >
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* ── Header ── */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 60,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            opacity: inView ? 1 : 0,
            transition: "all 0.7s",
          }}
        >
          <p
            style={{
              color: "#4DA6FF",
              fontSize: 12,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            GET IN TOUCH
          </p>
          <h2
            style={{
              fontSize: "clamp(28px,4vw,44px)",
              fontWeight: 700,
              color: "#f1f5f9",
              fontFamily: "'Syne', sans-serif",
              margin: "12px 0 0",
            }}
          >
            Contact Me
          </h2>
        </div>

        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          {/* ── Left info panel ── */}
          <div
            className="contact-left"
            style={{
              transform: inView ? "translateY(0)" : "translateY(20px)",
              opacity: inView ? 1 : 0,
              transition: "all 0.7s 0.1s",
            }}
          >
            <h3
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: "#f1f5f9",
                fontFamily: "'Syne', sans-serif",
                marginBottom: 16,
              }}
            >
              Let's build something great together
            </h3>
            <p
              style={{
                fontSize: 15,
                color: "#64748b",
                lineHeight: 1.8,
                marginBottom: 36,
              }}
            >
              Have a project in mind? Fill in the form and your message will be
              sent directly to my Telegram — I usually reply within a few hours.
            </p>
            <div
              className="contact-links"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginBottom: 36,
              }}
            >
              {[
                {
                  icon: (
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ width: 20, height: 20 }}
                      >
                        <path d="M22 2 11 13" />
                        <path d="m22 2-7 20-4-9-9-4 20-7Z" />
                      </svg>
                    </span>
                  ),
                  label: "Telegram",
                  val: "@S0phr",
                  href: "https://t.me/S0phr",
                },
                {
                  icon: (
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ width: 20, height: 20 }}
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        />
                        <circle cx="12" cy="12" r="4" />
                        <path d="M17.5 6.5h.01" />
                      </svg>
                    </span>
                  ),
                  label: "Instagram",
                  val: "@sepcode1",
                  href: "https://www.instagram.com/sepcode1?igsh=dXZkb29iY3VkczMw",
                },
                {
                  icon: (
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ width: 20, height: 20 }}
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3" />
                        <path d="M16 19c0 1.38-.84 2.5-2 2.5s-2-1.12-2-2.5" />
                        <path d="M12 7c-3.31 0-6 2.69-6 6 0 1.92.95 3.63 2.4 4.72" />
                        <path d="M12 7c3.31 0 6 2.69 6 6 0 1.92-.95 3.63-2.4 4.72" />
                        <path d="M8 9.5c.5-.34 1.16-.5 1.83-.5" />
                        <path d="M15 9.5c-.5-.34-1.16-.5-1.83-.5" />
                      </svg>
                    </span>
                  ),
                  label: "GitHub",
                  val: "sepehr175",
                  href: "https://github.com/sepehr175",
                },
                {
                  icon: (
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ width: 20, height: 20 }}
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="2"
                          ry="2"
                        />
                        <path d="M6 9h4v12H6z" />
                        <path d="M6 7h4V5H6z" />
                        <path d="M16 11c1.66 0 3 1.34 3 3v7h-4v-6c0-1.1-.9-2-2-2s-2 .9-2 2v6h-4v-12h4v2.5c.9-1.5 3-1.6 4-1.2" />
                      </svg>
                    </span>
                  ),
                  label: "LinkedIn",
                  val: "Sepehr Karimi",
                  href: "https://www.linkedin.com/in/sepehr-karimi-53a29837b",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 18px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 14,
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(77,166,255,0.06)";
                    e.currentTarget.style.borderColor = "rgba(77,166,255,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.07)";
                  }}
                >
                  {item.icon}
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#475569",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{ fontSize: 14, color: "#94a3b8", marginTop: 2 }}
                    >
                      {item.val}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ── Right form panel ── */}
          <div
            className="contact-right"
            style={{
              transform: inView ? "translateY(0)" : "translateY(20px)",
              opacity: inView ? 1 : 0,
              transition: "all 0.7s 0.2s",
            }}
          >
            {/* Success banner — appears above form after send */}
            {status === "sent" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "18px 22px",
                  background: "rgba(0,210,170,0.09)",
                  border: "1px solid rgba(0,210,170,0.35)",
                  borderRadius: 14,
                  marginBottom: 20,
                  animation: "fadeIn 0.5s ease",
                }}
              >
                <span style={{ fontSize: 26 }}>✅</span>
                <div>
                  <p
                    style={{
                      margin: 0,
                      color: "#00D2AA",
                      fontWeight: 700,
                      fontSize: 15,
                    }}
                  >
                    Message sent!
                  </p>
                  <p
                    style={{
                      margin: "4px 0 0",
                      color: "#64748b",
                      fontSize: 13,
                    }}
                  >
                    {errMsg ||
                      "Sepehr received it on Telegram. He'll reply soon!"}
                  </p>
                </div>
              </div>
            )}

            <form
              className="contact-form"
              onSubmit={submit}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <div
                className="contact-inputs"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                <input
                  required
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#4DA6FF")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                />
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#4DA6FF")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                />
              </div>
              <textarea
                required
                rows={6}
                placeholder="Tell me about your project…"
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                className="contact-message"
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) => (e.target.style.borderColor = "#4DA6FF")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                }
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="contact-submit"
                style={{
                  padding: "15px",
                  background: btnBg,
                  border: "none",
                  borderRadius: 12,
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.4s",
                  boxShadow: "0 8px 30px rgba(77,166,255,0.2)",
                  opacity: status === "sending" ? 0.7 : 1,
                }}
              >
                {btnLabel}
              </button>

              {/* Error message */}
              {status === "error" && errMsg && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "14px 18px",
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    borderRadius: 12,
                    animation: "fadeIn 0.4s ease",
                  }}
                >
                  <span>⚠️</span>
                  <p style={{ margin: 0, fontSize: 13, color: "#f87171" }}>
                    {errMsg}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ scrollTo }) => (
  <footer
    style={{
      padding: "48px 24px 32px",
      background: "#030d1a",
      borderTop: "1px solid rgba(255,255,255,0.06)",
    }}
  >
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 24,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#f1f5f9",
            fontFamily: "'Syne', sans-serif",
          }}
        >
          dev<span style={{ color: "#4DA6FF" }}>.</span>io
        </div>
        <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l.toLowerCase())}
              style={{
                background: "none",
                border: "none",
                color: "#64748b",
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#4DA6FF")}
              onMouseLeave={(e) => (e.target.style.color = "#64748b")}
            >
              {l}
            </button>
          ))}
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1px solid rgba(77,166,255,0.3)",
            background: "rgba(77,166,255,0.08)",
            color: "#4DA6FF",
            cursor: "pointer",
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(77,166,255,0.2)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(77,166,255,0.08)")
          }
        >
          ↑
        </button>
      </div>

      {/* social icons row */}
      <div
        style={{
          display: "flex",
          gap: 14,
          justifyContent: "center",
          marginBottom: 28,
        }}
      >
        {SOCIAL_LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            title={l.label}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: `1px solid ${l.color}33`,
              background: `${l.color}11`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              textDecoration: "none",
              color: l.color,
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${l.color}28`;
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${l.color}11`;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {l.icon}
          </a>
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          color: "#334155",
          fontSize: 13,
          paddingTop: 20,
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        © 2025 Sepehr Karimi · Built with React & ♥
      </div>
    </div>
  </footer>
);

// ── Navbar ────────────────────────────────────────────────────────────────────
const Navbar = ({ scrollTo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav
      className="main-nav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "16px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: scrolled ? "rgba(2,8,23,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s",
      }}
    >
      <div
        className="logo"
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: "#f1f5f9",
          fontFamily: "'Syne', sans-serif",
          cursor: "pointer",
        }}
        onClick={() => scrollTo("hero")}
      >
        dev<span style={{ color: "#4DA6FF" }}>.</span>io
      </div>

      <div
        className="nav-content"
        style={{ display: "flex", gap: 32, alignItems: "center" }}
      >
        <div style={{ display: "flex", gap: 32 }} className="desk-nav">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l.toLowerCase())}
              style={{
                background: "none",
                border: "none",
                color: "#94a3b8",
                fontSize: 13,
                cursor: "pointer",
                fontWeight: 500,
                fontFamily: "inherit",
                letterSpacing: "0.02em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#f1f5f9")}
              onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}
            >
              {l}
            </button>
          ))}
        </div>

        <button
          className="hire-btn"
          onClick={() => scrollTo("contact")}
          style={{
            padding: "9px 22px",
            background: "linear-gradient(135deg,#4DA6FF,#7C6FFF)",
            border: "none",
            borderRadius: 30,
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Hire Me
        </button>

        {/* Mobile menu toggle */}
        <button
          aria-label="Menu"
          onClick={() => setOpen((s) => !s)}
          className="mobile-menu-btn"
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "#94a3b8",
            fontSize: 20,
            cursor: "pointer",
            marginLeft: 8,
          }}
        >
          ☰
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="mobile-nav-dropdown"
          style={{
            position: "absolute",
            top: 64,
            left: 0,
            right: 0,
            background: "rgba(2,8,23,0.95)",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            zIndex: 1001,
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => {
                setOpen(false);
                scrollTo(l.toLowerCase());
              }}
              style={{
                background: "none",
                border: "none",
                color: "#cbd5e1",
                textAlign: "left",
                padding: "12px 8px",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

// ── Loading Screen ────────────────────────────────────────────────────────────
const Loader = ({ onDone }) => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setPct((p) => {
        if (p >= 100) {
          clearInterval(t);
          setTimeout(onDone, 300);
          return 100;
        }
        return p + 4;
      });
    }, 40);
    return () => clearInterval(t);
  }, [onDone]);
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#020817",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: "#f1f5f9",
          fontFamily: "'Syne', sans-serif",
          marginBottom: 40,
        }}
      >
        dev<span style={{ color: "#4DA6FF" }}>.</span>io
      </div>
      <div
        style={{
          width: 200,
          height: 2,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: "linear-gradient(90deg,#4DA6FF,#7C6FFF)",
            transition: "width 0.1s linear",
          }}
        />
      </div>
      <div
        style={{
          marginTop: 16,
          fontSize: 12,
          color: "#334155",
          letterSpacing: "0.1em",
        }}
      >
        {pct}%
      </div>
    </div>
  );
};

// ── App ───────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id) || document.getElementById("hero");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        body { font-family:'DM Sans',sans-serif; background:#020817; color:#f1f5f9; overflow-x:hidden; cursor:none; }
        @keyframes blob { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(20px,-20px) scale(1.05)} 66%{transform:translate(-15px,15px) scale(0.95)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
        @keyframes scrollDot { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(12px);opacity:0} }
        @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        ::-webkit-scrollbar { width:4px }
        ::-webkit-scrollbar-track { background:#020817 }
        ::-webkit-scrollbar-thumb { background:rgba(77,166,255,0.3); border-radius:2px }
        section { scroll-margin-top: 80px; }
        /* Mobile-only contact layout adjustments */
        @media (max-width: 640px) {
          #contact .contact-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 24px;
            align-items: center;
          }
          #contact .contact-left {
            width: 100%;
            max-width: 760px;
            text-align: center;
          }
          #contact .contact-links {
            flex-direction: row !important;
            flex-wrap: wrap;
            justify-content: center;
            gap: 12px;
          }
          #contact .contact-right {
            width: 100%;
            max-width: 820px;
          }
          #contact .contact-form {
            width: 96%;
            padding: 18px;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(2,8,23,0.6);
            background: rgba(255,255,255,0.02);
          }
          #contact .contact-inputs {
            grid-template-columns: 1fr !important;
            width: 100%;
          }
          /* move message textarea above inputs */
          #contact .contact-message {
            order: -1;
            min-height: 160px;
            margin-bottom: 6px;
          }
          /* make submit full width and larger on mobile */
          #contact .contact-submit {
            width: 100% !important;
            padding: 16px !important;
            font-size: 16px !important;
            border-radius: 12px !important;
          }
        }

        @media (max-width: 450px) {
          body {
            overflow-x: hidden;
          }
          section {
            padding-left: 12px !important;
            padding-right: 12px !important;
          }
          #hero {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          #hero h1 {
            font-size: clamp(20px, 6vw, 30px) !important;
            line-height: 1.05 !important;
            margin-bottom: 16px !important;
          }
          #hero p {
            max-width: 100% !important;
            font-size: 12px !important;
            line-height: 1.5 !important;
          }
          #hero .typing-text {
            white-space: nowrap !important;
            display: inline !important;
            font-size: 0.95em !important;
          }
          #hero .typing-text span {
            white-space: nowrap !important;
          }
          .main-nav {
            padding: 12px 14px !important;
          }
          .main-nav .logo {
            font-size: 18px !important;
          }
          .main-nav .nav-content {
            gap: 10px !important;
          }
          .main-nav .hire-btn {
            padding: 9px 18px !important;
          }
        }

        /* Navbar responsive adjustments */
        @media (max-width: 900px) {
          .main-nav {
            padding: 12px 18px;
          }
          .main-nav .desk-nav {
            display: none !important;
          }
          .main-nav .mobile-menu-btn {
            display: inline-block !important;
            color: #cbd5e1;
          }
          .main-nav button[aria-label="Menu"] {
            font-size: 22px;
          }
          .main-nav > div {
            gap: 12px;
          }
        }

        @media (min-width: 901px) and (max-width: 1100px) {
          /* Tablet: reduce gap and allow wrapping to avoid overlap */
          .main-nav {
            padding: 14px 22px;
            justify-content: space-between;
          }
          .main-nav .logo {
            position: static;
            left: auto;
          }
          .main-nav .nav-content {
            gap: 18px;
          }
          .main-nav .desk-nav {
            gap: 18px;
          }
          .main-nav .hire-btn {
            padding: 8px 14px;
          }
        }

        @media (min-width: 1101px) {
          .main-nav {
            justify-content: space-between;
            position: relative;
          }
          .main-nav .logo {
            position: absolute;
            left: 32px;
          }
          .main-nav .nav-content {
            width: 100%;
            position: relative;
            justify-content: center;
          }
          .main-nav .desk-nav {
            margin: 0 auto;
            gap: 28px;
          }
          .main-nav .hire-btn {
            position: absolute;
            right: 32px;
            top: 50%;
            transform: translateY(-50%);
            padding: 9px 22px;
          }
        }

      `}</style>

      {loading && <Loader onDone={() => setLoading(false)} />}

      <div style={{ opacity: loading ? 0 : 1, transition: "opacity 0.5s" }}>
        <Cursor />
        <Navbar scrollTo={scrollTo} />
        <Hero scrollTo={scrollTo} />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Experience />
        <Testimonials />
        <Contact />
        <Footer scrollTo={scrollTo} />
      </div>
    </>
  );
}
