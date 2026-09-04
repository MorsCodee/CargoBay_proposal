import { useEffect, useRef } from 'react';

function TiltCard({ children, className }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(700px) rotateX(${py * -12}deg) rotateY(${px * 14}deg) translateZ(10px)`;
  };
  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  return (
    <div ref={ref} className={className} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </div>
  );
}

export default function CargobayExecutiveSummary() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const revealEls = root.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');

        .cbco-exec{
          --ink:#15181B;
          --steel:#3E5C76;
          --steel-dark:#28394A;
          --rust:#D9622B;
          --yellow:#F2B134;
          --paper:#EDEDE9;
          --white:#FAFAF8;
          --line: rgba(255,255,255,0.14);
          font-family:'Inter',sans-serif;
          background:var(--steel-dark);
          color:var(--paper);
          scroll-margin-top:90px;
        }
        .cbco-exec *{box-sizing:border-box; margin:0; padding:0;}
        @media (prefers-reduced-motion: reduce){ .cbco-exec *{animation:none !important; transition:none !important;} }

        .cbco-exec h2, .cbco-exec .display{
          font-family:'Oswald', sans-serif; text-transform:uppercase; letter-spacing:0.01em;
          font-weight:700; line-height:1.03;
        }
        .cbco-exec .mono{font-family:'JetBrains Mono', monospace; letter-spacing:0.04em;}

        .cbco-exec .inner{padding:110px 5vw;}
        .cbco-exec .top-grid{display:grid; grid-template-columns:1.2fr 0.8fr; gap:60px; align-items:center; margin-bottom:70px;}
        @media (max-width:960px){ .cbco-exec .top-grid{grid-template-columns:1fr;} }

        .cbco-exec .section-head .tag{font-family:'JetBrains Mono'; font-size:12.5px; letter-spacing:0.12em; text-transform:uppercase; color:var(--rust); display:block; margin-bottom:14px;}
        .cbco-exec .section-head h2{font-size:clamp(38px,5.6vw,66px); color:var(--white);}
        .cbco-exec .section-head p{margin-top:18px; color:#C7C9C4; font-size:17.5px; line-height:1.6; max-width:46ch;}

        .cbco-exec .photo-frame{
          position:relative; border-radius:4px; overflow:hidden;
          transform-style:preserve-3d;
          transition:transform .5s cubic-bezier(.2,.9,.25,1.1);
          box-shadow:0 40px 70px rgba(0,0,0,0.45);
          cursor:pointer;
        }
        .cbco-exec .photo-frame img{width:100%; height:340px; object-fit:cover; display:block;}
        .cbco-exec .photo-frame .cap{
          position:absolute; left:0; right:0; bottom:0; padding:18px 20px;
          background:linear-gradient(0deg, rgba(21,24,27,0.9), transparent);
          font-family:'JetBrains Mono'; font-size:11.5px; letter-spacing:0.06em; color:var(--yellow); text-transform:uppercase;
        }

        .cbco-exec .reveal{opacity:0; transform:translateY(30px); transition:opacity .7s ease, transform .7s ease;}
        .cbco-exec .reveal.in{opacity:1; transform:translateY(0);}

        .cbco-exec .exec-stats{display:grid; grid-template-columns:repeat(4,1fr); gap:22px;}
        @media (max-width:900px){ .cbco-exec .exec-stats{grid-template-columns:repeat(2,1fr);} }
        .cbco-exec .exec-stat{
          background:linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01));
          border:1px solid var(--line); padding:36px 24px;
          transform-style:preserve-3d;
          transition:transform .18s ease-out, border-color .3s, background .3s;
          will-change:transform;
        }
        .cbco-exec .exec-stat:hover{border-color:rgba(217,98,43,0.5); background:linear-gradient(160deg, rgba(217,98,43,0.12), rgba(255,255,255,0.02));}
        .cbco-exec .exec-stat .num{font-family:'Oswald'; font-size:clamp(36px,4.4vw,54px); color:var(--yellow); font-weight:700; transform:translateZ(24px);}
        .cbco-exec .exec-stat .label{margin-top:10px; font-family:'JetBrains Mono'; font-size:11.5px; letter-spacing:0.06em; text-transform:uppercase; color:#AEB2AC; line-height:1.5; transform:translateZ(18px);}

        .cbco-exec .exec-note{
          margin-top:40px; display:inline-flex; align-items:center; gap:10px;
          border:1px solid var(--line); padding:13px 20px; font-family:'JetBrains Mono'; font-size:12.5px; color:var(--yellow);
        }
        .cbco-exec .exec-note::before{content:"⚠"; color:var(--rust);}
      `}</style>

      <section className="cbco-exec" id="executive-summary">
        <div className="inner">
          <div className="top-grid">
            <div className="section-head reveal">
              <span className="tag">01 · Executive Summary</span>
              <h2>One forwarder. Every mode.</h2>
              <p>Cargobay AG plans and coordinates global shipments by air, sea, road and rail for importers, exporters, and manufacturers, without owning aircraft, ships, or trucks itself.</p>
            </div>
            <TiltCard className="photo-frame reveal">
              <img
                src="https://images.unsplash.com/photo-1571086291540-b137111fa1c7?w=1200&q=80&auto=format&fit=crop"
                alt="Cargo aircraft on tarmac"
              />
              <div className="cap">Zurich Airport · Air Freight Terminal</div>
            </TiltCard>
          </div>

          <div className="exec-stats">
            <TiltCard className="exec-stat reveal">
              <div className="num">2010</div>
              <div className="label">Founded, Swiss<br/>Commercial Register</div>
            </TiltCard>
            <TiltCard className="exec-stat reveal">
              <div className="num">ZRH</div>
              <div className="label">HQ at Zurich<br/>Airport</div>
            </TiltCard>
            <TiltCard className="exec-stat reveal">
              <div className="num">4</div>
              <div className="label">Modes - Air, Sea,<br/>Road, Rail</div>
            </TiltCard>
            <TiltCard className="exec-stat reveal">
              <div className="num">100%</div>
              <div className="label">Privately Held<br/>Swiss AG</div>
            </TiltCard>
          </div>

          <div className="exec-note reveal">No public financial disclosure — private Swiss SME</div>
        </div>
      </section>
    </div>
  );
}
