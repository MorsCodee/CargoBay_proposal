import { useEffect, useRef } from 'react';

export default function CargobayHero() {
  const sceneRef = useRef(null);
  const planeRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const handleMove = (e) => {
      const rect = scene.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;

      if (planeRef.current) {
        planeRef.current.style.transform =
          `translate3d(${px * 40}px, ${py * 30}px, 0) rotateZ(${px * 6}deg)`;
      }
      if (bgRef.current) {
        bgRef.current.style.transform =
          `scale(1.08) translate3d(${px * -18}px, ${py * -14}px, 0)`;
      }
    };
    scene.addEventListener('mousemove', handleMove);
    return () => scene.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');

        .cbco-hero{
          --ink:#15181B;
          --steel:#3E5C76;
          --steel-dark:#28394A;
          --rust:#D9622B;
          --yellow:#F2B134;
          --paper:#EDEDE9;
          --white:#FAFAF8;
          --line: rgba(255,255,255,0.14);
          font-family:'Inter',sans-serif;
          background:var(--ink);
          color:var(--paper);
          scroll-margin-top:0;
        }
        .cbco-hero *{box-sizing:border-box; margin:0; padding:0;}
        @media (prefers-reduced-motion: reduce){ .cbco-hero *{animation:none !important; transition:none !important;} }

        .cbco-hero h1{
          font-family:'Oswald', sans-serif; text-transform:uppercase; letter-spacing:0.01em;
          font-weight:700; line-height:1.0;
        }
        .cbco-hero .mono{font-family:'JetBrains Mono', monospace; letter-spacing:0.04em;}

        .cbco-hero .scene{
          position:relative;
          min-height:100vh;
          display:flex; flex-direction:column; justify-content:center;
          padding:120px 5vw 90px;
          overflow:hidden;
          perspective:1200px;
        }
        .cbco-hero .bg-photo{
          position:absolute; inset:-6%; z-index:0;
          background-image:url('https://images.unsplash.com/photo-1670121180530-cfcba4438038?w=1920&q=80&auto=format&fit=crop');
          background-size:cover; background-position:center;
          transform:scale(1.08);
          transition:transform .2s ease-out;
          filter:saturate(1.05) contrast(1.05);
        }
        .cbco-hero .bg-overlay{
          position:absolute; inset:0; z-index:1;
          background:
            linear-gradient(180deg, rgba(21,24,27,0.55) 0%, rgba(21,24,27,0.88) 65%, rgba(21,24,27,0.98) 100%),
            linear-gradient(90deg, rgba(21,24,27,0.75) 0%, rgba(21,24,27,0.15) 45%, rgba(21,24,27,0.5) 100%);
        }

        .cbco-hero .plane-layer{
          position:absolute; right:2vw; top:16%; z-index:2; width:min(46vw, 560px);
          transition:transform .15s ease-out;
          animation:floaty 5s ease-in-out infinite;
          filter:drop-shadow(0 30px 40px rgba(0,0,0,0.55));
        }
        .cbco-hero .plane-layer img{
          width:100%; display:block; border-radius:4px;
          clip-path:polygon(4% 0, 100% 6%, 96% 100%, 0% 92%);
          box-shadow:0 0 0 1px rgba(255,255,255,0.12);
        }
        @keyframes floaty{ 0%,100%{transform:translateY(0px) rotateZ(0deg);} 50%{transform:translateY(-16px) rotateZ(1.2deg);} }

        .cbco-hero .hero-inner{position:relative; z-index:3; max-width:1200px;}
        .cbco-hero .eyebrow{
          display:inline-flex; align-items:center; gap:10px;
          font-family:'JetBrains Mono'; font-size:12.5px; letter-spacing:0.12em; text-transform:uppercase;
          color:var(--yellow); margin-bottom:22px;
          opacity:0; animation:riseIn .7s ease forwards; animation-delay:.15s;
        }
        .cbco-hero .eyebrow::before{content:""; width:26px; height:2px; background:var(--yellow); display:inline-block;}
        .cbco-hero h1{
          font-size:clamp(46px, 8.4vw, 112px);
          max-width:15ch;
          opacity:0; animation:riseIn .8s ease forwards; animation-delay:.3s;
          text-shadow:0 10px 40px rgba(0,0,0,0.5);
        }
        .cbco-hero h1 em{font-style:normal; color:var(--rust);}
        .cbco-hero p.lead{
          margin-top:26px; max-width:600px; font-size:18.5px; line-height:1.6; color:#DADBD7;
          opacity:0; animation:riseIn .8s ease forwards; animation-delay:.45s;
        }
        .cbco-hero .hero-actions{
          margin-top:38px; display:flex; gap:16px; align-items:center; flex-wrap:wrap;
          opacity:0; animation:riseIn .8s ease forwards; animation-delay:.6s;
        }
        .cbco-hero .btn-ghost{
          border:1px solid rgba(255,255,255,0.3); color:var(--paper); background:rgba(21,24,27,0.3);
          backdrop-filter:blur(4px);
          padding:15px 28px; font-family:'Oswald'; text-transform:uppercase; letter-spacing:0.04em;
          font-size:13.5px; cursor:pointer; transition:transform .25s ease, border-color .25s;
        }
        .cbco-hero .btn-ghost:hover{border-color:var(--rust); transform:translateY(-3px) perspective(400px) rotateX(4deg);}
        .cbco-hero .btn-primary-lg{
          background:var(--rust); color:var(--ink); font-family:'Oswald'; font-weight:700;
          text-transform:uppercase; letter-spacing:0.04em; font-size:13.5px; padding:15px 32px; border:none; cursor:pointer;
          clip-path: polygon(5% 0, 100% 0, 95% 100%, 0% 100%);
          transition:transform .25s ease, box-shadow .25s ease;
          box-shadow:0 14px 30px rgba(217,98,43,0.3);
        }
        .cbco-hero .btn-primary-lg:hover{transform:translateY(-4px) perspective(400px) rotateX(6deg); box-shadow:0 20px 40px rgba(217,98,43,0.45);}
        @keyframes riseIn{ from{opacity:0; transform:translateY(24px);} to{opacity:1; transform:translateY(0);} }

        .cbco-hero .ticker-wrap{
          background:var(--rust); overflow:hidden; white-space:nowrap; padding:12px 0; position:relative; z-index:4;
        }
        .cbco-hero .ticker{display:inline-block; padding-left:100%; animation:ticker 24s linear infinite; font-family:'JetBrains Mono'; font-size:13px; font-weight:600; color:var(--ink); letter-spacing:0.05em;}
        .cbco-hero .ticker span{margin:0 26px;}
        @keyframes ticker{ from{transform:translateX(0);} to{transform:translateX(-100%);} }

        @media (max-width:900px){ .cbco-hero .plane-layer{display:none;} }
      `}</style>

      <div className="cbco-hero">
        <section className="scene" id="hero" ref={sceneRef}>
          <div className="bg-photo" ref={bgRef}></div>
          <div className="bg-overlay"></div>

          <div className="plane-layer" ref={planeRef}>
            <img
              src="https://images.unsplash.com/photo-1530545124313-ce5e8eae55af?w=1200&q=80&auto=format&fit=crop"
              alt="Cargo aircraft in flight"
            />
          </div>

          <div className="hero-inner">
            <span className="eyebrow">Zurich Airport, Switzerland — Since 2010</span>
            <h1>Freight, moved <em>your way.</em></h1>
            <p className="lead">Cargobay AG organizes air, sea, road and rail transport for importers and exporters worldwide — one point of contact, every mode, no fleet of its own.</p>
            <div className="hero-actions">
              <button className="btn-primary-lg">Get a Quote</button>
              <button className="btn-ghost">See Services</button>
            </div>
          </div>
        </section>

        <div className="ticker-wrap">
          <div className="ticker">
            <span>ZURICH AIRPORT HQ</span>•<span>FOUNDED 2010</span>•<span>ASSET-LIGHT MULTIMODAL FORWARDER</span>•<span>PRIVATELY HELD SWISS AG</span>•<span>AIR · SEA · ROAD · RAIL</span>•<span>ZURICH AIRPORT HQ</span>•<span>FOUNDED 2010</span>•<span>ASSET-LIGHT MULTIMODAL FORWARDER</span>•<span>PRIVATELY HELD SWISS AG</span>•<span>AIR · SEA · ROAD · RAIL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
