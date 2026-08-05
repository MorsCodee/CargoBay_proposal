import { useEffect, useState, useRef } from 'react';

export default function CargobayHeader() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = ''; };
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (open && menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  const scrollToId = (e, id) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="cbco-header">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');

        .cbco-header{
          --ink:#15181B;
          --steel:#3E5C76;
          --steel-dark:#28394A;
          --rust:#D9622B;
          --yellow:#F2B134;
          --paper:#EDEDE9;
          --white:#FAFAF8;
          --line: rgba(255,255,255,0.14);
          font-family:'Inter',sans-serif;
        }
        .cbco-header *{box-sizing:border-box; margin:0; padding:0;}

        .cbco-header header{
          position:fixed; top:0; left:0; right:0; z-index:200;
          display:flex; align-items:center; justify-content:space-between;
          padding:18px 5vw;
          background:rgba(21,24,27,0.78);
          backdrop-filter:blur(10px);
          border-bottom:1px solid var(--line);
        }
        .cbco-header .logo{display:flex; align-items:center; gap:10px;}
        .cbco-header .logo .mark{
          width:36px; height:36px; background:var(--rust);
          display:flex; align-items:center; justify-content:center;
          font-family:'Oswald'; font-weight:700; color:var(--ink); font-size:17px;
          transform:perspective(200px) rotateY(-18deg) skew(-4deg);
          box-shadow:6px 4px 0 rgba(0,0,0,0.35);
          transition:transform .35s ease;
        }
        .cbco-header .logo .mark img{
          width:100%;
          height:100%;
          object-fit:contain;
        }
        .cbco-header .logo:hover .mark{transform:perspective(200px) rotateY(0deg) skew(0deg);}
        .cbco-header .logo .word{font-family:'Oswald'; font-weight:700; font-size:19px; letter-spacing:0.02em; text-transform:uppercase; color:var(--paper);}
        .cbco-header .logo .word span{color:var(--rust);}
        .cbco-header .logo .word small{display:block; font-family:'JetBrains Mono'; font-size:9.5px; letter-spacing:0.16em; color:#9A9C97; text-transform:uppercase; margin-top:1px;}

        /* hamburger / 3-dot trigger */
        .cbco-header .menu-wrap{position:relative;}
        .cbco-header .trigger{
          display:flex; flex-direction:column; gap:5px; align-items:flex-end;
          background:none; border:1px solid var(--line); cursor:pointer; padding:12px 14px;
          transition:border-color .25s, background .25s; border-radius:2px;
        }
        .cbco-header .trigger:hover{border-color:var(--rust); background:rgba(217,98,43,0.08);}
        .cbco-header .trigger .bar{
          height:2px; background:var(--paper); transition:all .35s cubic-bezier(.4,0,.2,1);
        }
        .cbco-header .trigger .bar.b1{width:22px;}
        .cbco-header .trigger .bar.b2{width:16px;}
        .cbco-header .trigger .bar.b3{width:22px;}
        .cbco-header .trigger.is-open .bar.b1{width:22px; transform:translateY(7px) rotate(45deg); background:var(--rust);}
        .cbco-header .trigger.is-open .bar.b2{opacity:0; transform:translateX(10px);}
        .cbco-header .trigger.is-open .bar.b3{width:22px; transform:translateY(-7px) rotate(-45deg); background:var(--rust);}

        /* 3D dropdown menu */
        .cbco-header .menu-panel{
          position:absolute; top:calc(100% + 14px); right:0;
          width:300px;
          background:linear-gradient(160deg, var(--steel-dark), var(--ink));
          border:1px solid var(--line);
          box-shadow:0 40px 80px rgba(0,0,0,0.55);
          transform-origin:top right;
          transform:perspective(900px) rotateX(-70deg) translateY(-10px);
          opacity:0;
          pointer-events:none;
          transition:transform .45s cubic-bezier(.2,.9,.25,1.2), opacity .3s ease;
          padding:10px;
        }
        .cbco-header .menu-panel.open{
          transform:perspective(900px) rotateX(0deg) translateY(0);
          opacity:1;
          pointer-events:auto;
        }
        .cbco-header .menu-item{
          display:flex; align-items:center; justify-content:space-between; gap:10px;
          padding:16px 16px; border-bottom:1px solid var(--line);
          background:none; border-left:none; border-right:none; border-top:none;
          color:var(--paper); font-family:'Oswald'; font-size:14.5px; text-transform:uppercase;
          letter-spacing:0.03em; cursor:pointer; width:100%; text-align:left;
          transition:background .2s, padding-left .2s, color .2s;
        }
        .cbco-header .menu-item:hover{background:rgba(217,98,43,0.12); padding-left:22px; color:var(--yellow);}
        .cbco-header .menu-item .idx{font-family:'JetBrains Mono'; font-size:11px; color:var(--rust);}
        .cbco-header .menu-item:last-of-type{border-bottom:none;}
        .cbco-header .menu-cta{
          margin-top:10px; width:100%; background:var(--rust); color:var(--ink); font-weight:700;
          text-transform:uppercase; letter-spacing:0.05em; font-size:12.5px; padding:14px 16px; border:none; cursor:pointer;
          font-family:'Oswald'; transition:background .2s, transform .2s;
        }
        .cbco-header .menu-cta:hover{background:var(--yellow); transform:translateY(-2px);}
      `}</style>

      <header>
        <div className="logo">
          <div className="mark">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6I4RlFEBHXdCbIIRuJQqEFeZAt5yaTzlQLxNRHl6PXQ&s=10" alt="CargoBay mark" />
          </div>
          <div className="word">CARGO<span>BAY</span><small>AG · ZURICH</small></div>
        </div>

        <div className="menu-wrap" ref={menuRef}>
          <button
            className={`trigger${open ? ' is-open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <span className="bar b1"></span>
            <span className="bar b2"></span>
            <span className="bar b3"></span>
          </button>

          <div className={`menu-panel${open ? ' open' : ''}`}>
            <button className="menu-item" onClick={(e) => scrollToId(e, 'hero')}>
              <span>Overview</span><span className="idx">00</span>
            </button>
            <button className="menu-item" onClick={(e) => scrollToId(e, 'executive-summary')}>
              <span>Executive Summary</span><span className="idx">01</span>
            </button>
            <button className="menu-item" onClick={(e) => scrollToId(e, 'company-intro')}>
              <span>Company Introduction</span><span className="idx">02</span>
            </button>
            <button className="menu-cta">Get a Quote</button>
          </div>
        </div>
      </header>
    </div>
  );
}
