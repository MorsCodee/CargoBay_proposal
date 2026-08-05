import { useEffect, useRef } from 'react';

export default function CargobayCompanyIntro() {
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

  const services = [
    { num: '01', title: 'Air Freight', front: 'Worldwide, door-to-door.', back: 'Airport-to-airport & door-to-door shipping through Zurich Airport and global partner hubs.' },
    { num: '02', title: 'Sea Freight', front: 'FCL & LCL container.', back: 'Full and less-than-container-load ocean freight, booked through direct carrier partnerships.' },
    { num: '03', title: 'Road Transport', front: 'Domestic & cross-Europe.', back: 'Domestic and international trucking across Europe, including rapid-response pickups.' },
    { num: '04', title: 'Rail Freight', front: 'Cross-border cargo.', back: 'Cross-border rail cargo transportation as a lower-cost, lower-emission alternative to road.' },
    { num: '05', title: 'Customs & Docs', front: 'E-Dec, ATA, NCTS.', back: 'Full customs clearance and documentation: E-Dec, Carnet ATA, NCTS, air waybills, bills of lading.' },
    { num: '06', title: 'Warehousing', front: 'Storage & insurance.', back: 'Temporary storage, labeling, cargo insurance, and cash-on-delivery handling.' },
  ];

  return (
    <div ref={rootRef}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');

        .cbco-intro{
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
          scroll-margin-top:90px;
        }
        .cbco-intro *{box-sizing:border-box; margin:0; padding:0;}
        @media (prefers-reduced-motion: reduce){ .cbco-intro *{animation:none !important; transition:none !important;} }

        .cbco-intro h2, .cbco-intro h3, .cbco-intro .display{
          font-family:'Oswald', sans-serif; text-transform:uppercase; letter-spacing:0.01em;
          font-weight:700; line-height:1.03;
        }
        .cbco-intro .mono{font-family:'JetBrains Mono', monospace; letter-spacing:0.04em;}

        .cbco-intro .inner{padding:110px 5vw;}
        .cbco-intro .top-grid{display:grid; grid-template-columns:0.85fr 1.15fr; gap:60px; align-items:center; margin-bottom:70px;}
        @media (max-width:960px){ .cbco-intro .top-grid{grid-template-columns:1fr;} }

        .cbco-intro .section-head .tag{font-family:'JetBrains Mono'; font-size:12.5px; letter-spacing:0.12em; text-transform:uppercase; color:var(--rust); display:block; margin-bottom:14px;}
        .cbco-intro .section-head h2{font-size:clamp(38px,5.6vw,66px); color:var(--white);}
        .cbco-intro .section-head p{margin-top:18px; color:#C7C9C4; font-size:17.5px; line-height:1.6;}

        .cbco-intro .photo-frame{
          position:relative; border-radius:4px; overflow:hidden;
          box-shadow:0 40px 70px rgba(0,0,0,0.5);
          transform:perspective(900px) rotateY(-6deg);
          transition:transform .5s cubic-bezier(.2,.9,.25,1.1);
        }
        .cbco-intro .photo-frame:hover{transform:perspective(900px) rotateY(0deg);}
        .cbco-intro .photo-frame img{width:100%; height:100%; min-height:320px; object-fit:cover; display:block;}
        .cbco-intro .photo-frame .cap{
          position:absolute; left:0; right:0; bottom:0; padding:18px 20px;
          background:linear-gradient(0deg, rgba(21,24,27,0.92), transparent);
          font-family:'JetBrains Mono'; font-size:11.5px; letter-spacing:0.06em; color:var(--yellow); text-transform:uppercase;
        }

        .cbco-intro .reveal{opacity:0; transform:translateY(30px); transition:opacity .7s ease, transform .7s ease;}
        .cbco-intro .reveal.in{opacity:1; transform:translateY(0);}

        .cbco-intro .snap-card{border:1px solid var(--line); background:rgba(255,255,255,0.02); padding:6px 0; margin-top:10px;}
        .cbco-intro .snap-row{display:flex; justify-content:space-between; gap:16px; padding:14px 24px; border-bottom:1px solid var(--line);}
        .cbco-intro .snap-row:last-child{border-bottom:none;}
        .cbco-intro .snap-row .k{font-family:'JetBrains Mono'; font-size:10.5px; letter-spacing:0.06em; text-transform:uppercase; color:var(--rust);}
        .cbco-intro .snap-row .v{font-family:'Oswald'; font-size:14.5px; color:var(--white); text-align:right; letter-spacing:0.01em;}

        .cbco-intro .svc-heading{font-size:clamp(24px,3vw,32px); color:var(--white); margin-bottom:28px;}
        .cbco-intro .svc-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:20px;}
        @media (max-width:900px){ .cbco-intro .svc-grid{grid-template-columns:repeat(2,1fr);} }
        @media (max-width:600px){ .cbco-intro .svc-grid{grid-template-columns:1fr;} }

        /* 3D flip cards */
        .cbco-intro .flip-outer{perspective:1200px; height:190px;}
        .cbco-intro .flip-inner{
          position:relative; width:100%; height:100%;
          transform-style:preserve-3d;
          transition:transform .7s cubic-bezier(.2,.9,.25,1.05);
        }
        .cbco-intro .flip-outer:hover .flip-inner{transform:rotateY(180deg);}
        .cbco-intro .flip-face{
          position:absolute; inset:0; backface-visibility:hidden;
          border:1px solid var(--line); padding:24px; display:flex; flex-direction:column; justify-content:space-between;
        }
        .cbco-intro .flip-front{background:var(--steel-dark);}
        .cbco-intro .flip-back{background:var(--rust); color:var(--ink); transform:rotateY(180deg);}
        .cbco-intro .flip-face .num{font-family:'JetBrains Mono'; font-size:11.5px; letter-spacing:0.1em; opacity:0.85;}
        .cbco-intro .flip-front .num{color:var(--rust);}
        .cbco-intro .flip-face h3{font-size:19px; color:var(--white);}
        .cbco-intro .flip-back h3{color:var(--ink);}
        .cbco-intro .flip-face p{font-size:13px; line-height:1.5; color:#AEB2AC;}
        .cbco-intro .flip-back p{color:rgba(21,24,27,0.85); font-weight:500;}
        .cbco-intro .flip-face .hint{font-family:'JetBrains Mono'; font-size:10px; letter-spacing:0.08em; text-transform:uppercase; color:#7D8489;}
      `}</style>

      <section className="cbco-intro" id="company-intro">
        <div className="inner">
          <div className="top-grid">
            <div className="photo-frame reveal">
              <img
                src="https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200&q=80&auto=format&fit=crop"
                alt="Cargo ship at sea"
              />
              <div className="cap">Sea Freight · FCL &amp; LCL</div>
            </div>
            <div className="reveal">
              <div className="section-head">
                <span className="tag">02 · Company Introduction</span>
                <h2>Who runs it, what it moves.</h2>
                <p>Freight forwarding built around picking the right carrier for the job — not the fleet in the yard.</p>
              </div>
              <div className="snap-card">
                <div className="snap-row"><span className="k">Legal Name</span><span className="v">Cargobay AG</span></div>
                <div className="snap-row"><span className="k">Founded</span><span className="v">2010</span></div>
                <div className="snap-row"><span className="k">HQ</span><span className="v">Zurich Airport</span></div>
                <div className="snap-row"><span className="k">Managing Director</span><span className="v">Iris Juchli</span></div>
                <div className="snap-row"><span className="k">Ownership</span><span className="v">Private Swiss AG</span></div>
                <div className="snap-row"><span className="k">Business Type</span><span className="v">Asset-Light Forwarder</span></div>
              </div>
            </div>
          </div>

          <h3 className="svc-heading reveal">Six Services, Flip To Explore</h3>
          <div className="svc-grid">
            {services.map((s) => (
              <div className="flip-outer reveal" key={s.num}>
                <div className="flip-inner">
                  <div className="flip-face flip-front">
                    <span className="num">{s.num}</span>
                    <div>
                      <h3>{s.title}</h3>
                      <p>{s.front}</p>
                    </div>
                    <span className="hint">Hover to read more</span>
                  </div>
                  <div className="flip-face flip-back">
                    <span className="num">{s.num}</span>
                    <div>
                      <h3>{s.title}</h3>
                      <p>{s.back}</p>
                    </div>
                    <span className="hint">Cargobay AG</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
