import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Menu,
  X,
  Gift,
  Key,
  Unlock,
  Box,
  Zap,
  CheckCircle2,
  Wallet,
  TrendingUp,
  CreditCard,
  Users,
  Bell,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

/* --- UTILS --- */
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    });
    const { current } = domRef;
    if (current) observer.observe(current);
    return () => current && observer.unobserve(current);
  }, []);

  return [domRef, isVisible];
};

const FadeIn = ({ children, delay = 0 }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* --- ASSETS VISUAIS (CSS PURE) --- */
const EuroBill = ({ className, rotate = 0 }) => (
  <div 
    className={`absolute w-32 h-16 bg-gradient-to-br from-[#0f1f45] to-[#040B1C] border border-[#D4AF37]/30 rounded shadow-2xl flex items-center justify-center overflow-hidden backdrop-blur-md ${className}`}
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
    <div className="absolute -right-4 -top-4 w-12 h-12 bg-[#D4AF37]/20 rounded-full blur-xl"></div>
    <span className="font-brand font-bold text-[#D4AF37] text-xl z-10">€ 50</span>
    <div className="absolute bottom-1 left-2 text-[6px] text-[#D4AF37]/50 uppercase tracking-widest">CPA Protocol</div>
  </div>
);

const GoldCoin = ({ className, size = 12 }) => (
  <div className={`absolute rounded-full bg-gradient-to-b from-[#FFE5A0] to-[#B69143] shadow-[0_4px_10px_rgba(0,0,0,0.5)] border border-[#FFE5A0]/50 flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <div className="w-[70%] h-[70%] rounded-full border border-[#A67C00]/30 flex items-center justify-center">
      <span className="text-[8px] font-serif font-bold text-[#7a5c00]">€</span>
    </div>
  </div>
);

const GoldChest = ({ className, size = 40 }) => (
  <div className={`relative group/chest cursor-pointer ${className}`} style={{ width: size, height: size }}>
     <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl filter contrast-125 overflow-visible">
       {/* Brilho de Fundo (Aparece no Hover) */}
       <circle cx="50" cy="50" r="30" className="fill-[#D4AF37] opacity-0 group-hover/chest:opacity-40 transition-opacity duration-500 blur-xl" />

       {/* Base do Baú */}
       <path d="M10 40H90V85C90 87.7614 87.7614 90 85 90H15C12.2386 90 10 87.7614 10 85V40Z" fill="url(#chestGradient)" stroke="#8B5E3C" strokeWidth="2"/>
       
       {/* Moedas dentro (Inicialmente escondidas pela tampa) */}
       <g className="opacity-0 group-hover/chest:opacity-100 transition-opacity duration-300 delay-100">
          <circle cx="30" cy="35" r="5" fill="#FFE5A0" stroke="#B69143" className="animate-bounce" style={{animationDelay: '0ms'}} />
          <circle cx="50" cy="30" r="6" fill="#D4AF37" stroke="#B69143" className="animate-bounce" style={{animationDelay: '100ms'}} />
          <circle cx="70" cy="35" r="5" fill="#FFE5A0" stroke="#B69143" className="animate-bounce" style={{animationDelay: '200ms'}} />
       </g>

       {/* Tampa do Baú (Animada) */}
       <g className="origin-[10px_40px] transition-transform duration-500 ease-in-out group-hover/chest:-rotate-[25deg]">
         <path d="M10 40C10 25 28 15 50 15C72 15 90 25 90 40V45H10V40Z" fill="url(#lidGradient)" stroke="#8B5E3C" strokeWidth="2"/>
         <rect x="42" y="35" width="16" height="20" rx="2" fill="#D4AF37" stroke="#FFE5A0" strokeWidth="1"/>
         <path d="M10 45H90" stroke="#5E4B25" strokeWidth="2"/>
         <path d="M10 40H90" stroke="#FFE5A0" strokeWidth="1" opacity="0.5"/>
       </g>
       
       <defs>
         <linearGradient id="chestGradient" x1="50" y1="40" x2="50" y2="90" gradientUnits="userSpaceOnUse">
           <stop stopColor="#D4AF37" />
           <stop offset="1" stopColor="#8B5E3C" />
         </linearGradient>
         <linearGradient id="lidGradient" x1="50" y1="15" x2="50" y2="45" gradientUnits="userSpaceOnUse">
           <stop stopColor="#FFE5A0" />
           <stop offset="1" stopColor="#D4AF37" />
         </linearGradient>
       </defs>
     </svg>
  </div>
);

/* --- SIMULADOR DE GANHOS (Interactive) --- */
const RevenueSimulator = () => {
  const [hours, setHours] = useState(2);
  const [daily, setDaily] = useState(0);
  
  // Cálculo: Base + (horas * taxa variável)
  // Ex: 1h = 45€, 2h = 90€...
  useEffect(() => {
    const val = hours * 42.50; // Valor aproximado por hora
    setDaily(val);
  }, [hours]);

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-[#040914]/80 backdrop-blur-xl border border-[#D4AF37]/20 rounded-2xl relative overflow-hidden group hover:border-[#D4AF37]/40 transition-colors">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50"></div>
      
      <h3 className="text-center font-brand text-xl text-white mb-6">Simulador de Ganhos</h3>
      
      <div className="mb-8">
        <div className="flex justify-between text-xs text-blue-200/50 uppercase tracking-widest mb-2">
          <span>Tempo Disponível</span>
          <span className="text-[#D4AF37] font-bold">{hours} Horas/Dia</span>
        </div>
        <input 
          type="range" 
          min="1" 
          max="8" 
          step="0.5"
          value={hours} 
          onChange={(e) => setHours(parseFloat(e.target.value))}
          className="w-full h-2 bg-[#02050A] rounded-lg appearance-none cursor-pointer accent-[#D4AF37] hover:accent-[#FFE5A0] transition-all"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-4 rounded-xl bg-[#02050A] border border-white/5">
          <span className="block text-[10px] uppercase text-blue-200/40 mb-1">Diário</span>
          <span className="text-2xl font-brand font-bold text-white">€ {daily.toFixed(2)}</span>
        </div>
        <div className="p-4 rounded-xl bg-[#02050A] border border-[#D4AF37]/20 relative overflow-hidden">
           <div className="absolute inset-0 bg-[#D4AF37]/5 animate-pulse"></div>
           <span className="block text-[10px] uppercase text-[#D4AF37]/60 mb-1">Mensal (30 dias)</span>
           <span className="text-2xl font-brand font-bold text-[#D4AF37]">€ {(daily * 30).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

/* --- TOAST NOTIFICATION --- */
const ToastNotification = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({ name: '', amount: '' });
  
  const names = ["Carlos S.", "Ana P.", "João M.", "Lucas R.", "Beatriz L.", "Fernanda C.", "Pedro H."];
  const amounts = ["45,00", "82,50", "120,00", "65,00", "210,00", "50,00"];

  useEffect(() => {
    const trigger = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
      setData({ name: randomName, amount: randomAmount });
      setShow(true);
      setTimeout(() => setShow(false), 4000);
    };

    const interval = setInterval(trigger, 8000 + Math.random() * 5000); // Aleatório entre 8s e 13s
    setTimeout(trigger, 3000); // Primeiro trigger rápido

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed bottom-6 left-6 z-50 transition-all duration-500 transform ${show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
       <div className="flex items-center gap-4 bg-[#040914]/90 backdrop-blur-md border border-[#D4AF37]/30 p-4 rounded-lg shadow-2xl min-w-[280px]">
          <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center border border-[#D4AF37]/50 text-[#D4AF37]">
             <Bell size={18} className="fill-current animate-bounce" />
          </div>
          <div>
             <p className="text-white text-xs font-bold">{data.name} sacou</p>
             <p className="text-[#D4AF37] font-brand font-bold text-sm">€ {data.amount} <span className="text-[10px] text-white/40 font-sans ml-1">via PIX</span></p>
          </div>
       </div>
    </div>
  );
};

/* --- CUSTOM CURSOR (OPTIMIZED LERP) --- */
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailerRef = useRef(null);

  useEffect(() => {
    // Variáveis para armazenar posição sem acionar re-render do React
    let mouseX = 0;
    let mouseY = 0;
    let trailerX = 0;
    let trailerY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Atualiza o cursor principal instantaneamente
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const animateTrailer = () => {
      // Interpolação Linear (LERP) para suavidade física
      // 0.15 = velocidade do seguidor (quanto menor, mais suave/lento)
      const ease = 0.15;
      
      trailerX += (mouseX - trailerX) * ease;
      trailerY += (mouseY - trailerY) * ease;

      if (trailerRef.current) {
        trailerRef.current.style.transform = `translate3d(${trailerX}px, ${trailerY}px, 0) translate(-50%, -50%)`;
      }

      requestAnimationFrame(animateTrailer);
    };

    window.addEventListener('mousemove', onMouseMove);
    const animationFrameId = requestAnimationFrame(animateTrailer);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Main Dot (Instant) */}
      <div 
        ref={cursorRef}
        className="fixed w-2 h-2 bg-[#D4AF37] rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{ willChange: 'transform' }}
      />
      
      {/* Fluid Trailer (Smooth) */}
      <div
        ref={trailerRef} 
        className="fixed w-8 h-8 border border-[#D4AF37]/50 rounded-full pointer-events-none z-[9998] mix-blend-screen backdrop-blur-[1px]"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};

/* --- TILT CARD (3D Effect) --- */
const TiltCard = ({ children, className }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Inverted for tilt effect
    const rotateY = ((x - centerX) / centerX) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    
    // Glare Effect
    const glare = card.querySelector('.glare');
    if (glare) {
      glare.style.opacity = '1';
      glare.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    
    const glare = cardRef.current.querySelector('.glare');
    if (glare) glare.style.opacity = '0';
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out preserve-3d ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="glare absolute w-64 h-64 bg-white/10 blur-[50px] rounded-full pointer-events-none opacity-0 transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2 z-50 mix-blend-overlay"></div>
      {children}
    </div>
  );
};

/* --- FAQ SECTION --- */
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 last:border-0">
      <button 
        className="w-full py-6 flex items-center justify-between text-left group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-sm md:text-base font-bold transition-colors ${isOpen ? 'text-[#D4AF37]' : 'text-white group-hover:text-[#D4AF37]/80'}`}>
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
          isOpen ? 'bg-[#D4AF37] border-[#D4AF37] text-black' : 'border-white/10 text-white/50 group-hover:border-[#D4AF37]/50'
        }`}>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-48 opacity-100 mb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-blue-200/50 text-sm leading-relaxed pr-8">
          {answer}
        </p>
      </div>
    </div>
  );
};

/* --- MAIN COMPONENT --- */
const CPAElite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState(14);
  const [activeOperators, setActiveOperators] = useState(164); // Valor inicial entre 150 e 180
  const WHATSAPP_LINK = "https://chat.whatsapp.com/I4eVoSjkpnQ2uZsvBDpAoI";
  // Fallback para a logo caso o ambiente não carregue a imagem local
  const LOGO_URL = "LOGO CPA ELITE.jpeg"; 
  const CLIENT_REF_URL = "REFERENCIA BAU CLIENTE.jpeg"; 

  useEffect(() => {
    // Timer para vagas (spotsLeft)
    const timer = setInterval(() => {
      setSpotsLeft((prev) => (prev > 3 ? prev - 1 : 3));
    }, 45000);

    // Timer para operadores ativos (variando entre 150 e 180)
    const operatorsTimer = setInterval(() => {
        setActiveOperators(prev => {
            const change = Math.floor(Math.random() * 5) - 2; // -2 a +2
            let newValue = prev + change;
            if (newValue > 180) newValue = 180;
            if (newValue < 150) newValue = 150;
            return newValue;
        });
    }, 3000); // Atualiza a cada 3 segundos

    return () => {
        clearInterval(timer);
        clearInterval(operatorsTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#02050A] text-blue-50 font-sans selection:bg-[#D4AF37] selection:text-[#02050A] overflow-x-hidden font-body relative cursor-none">
      
      {/* --- ESTILOS --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=Cinzel:wght@500;700;900&display=swap');
        
        .font-brand { font-family: 'Cinzel', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        
        .gold-gradient-text {
          background: linear-gradient(to bottom, #FFE5A0, #D4AF37);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .gold-bg-gradient {
          background: linear-gradient(135deg, #D4AF37 0%, #B69143 100%);
        }

        .bg-navy-glass {
          background: rgba(4, 11, 28, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        /* Animação de Flutuação */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 8s ease-in-out infinite 2s; }
        
        /* Brilho da Moeda */
        @keyframes shine {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        .shine-effect {
          position: relative;
          overflow: hidden;
        }
        .shine-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
          transform: skewX(-20deg);
          animation: shine 3s infinite;
        }

        /* Aurora / Mesh Gradient Animation */
        @keyframes aurora {
          0% { background-position: 50% 50%, 50% 50%; }
          33% { background-position: 100% 0%, 0% 100%; }
          66% { background-position: 0% 100%, 100% 0%; }
          100% { background-position: 50% 50%, 50% 50%; }
        }

        .aurora-bg {
          background-color: #02050A;
          background-image: 
            radial-gradient(at 0% 0%, rgba(212, 175, 55, 0.15) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(4, 11, 28, 0.5) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(212, 175, 55, 0.1) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(2, 5, 10, 0.8) 0px, transparent 50%);
          background-size: 100% 100%;
        }
        
        .aurora-blob {
          position: absolute;
          filter: blur(80px);
          opacity: 0.4;
          animation: aurora 20s infinite alternate linear;
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
        }

        /* Noise Texture */
        .noise-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* --- BACKGROUND AMBIENTE (AURORA) --- */}
      <div className="fixed inset-0 pointer-events-none aurora-bg overflow-hidden">
        {/* Blobs Animados para Efeito Aurora */}
        <div className="aurora-blob w-[60vw] h-[60vw] bg-[#D4AF37] top-[-10%] left-[-10%] animate-float"></div>
        <div className="aurora-blob w-[50vw] h-[50vw] bg-blue-900 top-[20%] right-[-10%] animate-float-delayed" style={{animationDelay: '2s'}}></div>
        <div className="aurora-blob w-[40vw] h-[40vw] bg-[#B69143] bottom-[-10%] left-[20%] animate-float" style={{animationDelay: '5s'}}></div>
      </div>

      {/* Noise Overlay para Textura Premium */}
      <div className="noise-overlay"></div>
      
      {/* Custom Cursor */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      {/* --- HEADER --- */}
      <header className="fixed top-0 w-full z-50 bg-[#02050A]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-gradient-to-br from-[#1a2b4e] to-[#040B1C] rounded-lg border border-[#D4AF37]/30 flex items-center justify-center shadow-lg overflow-hidden">
                <img 
                  src={LOGO_URL} 
                  alt="Logo CPA Elite" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://img.icons8.com/ios-filled/50/d4af37/shield.png"; // Fallback visual
                  }}
                />
             </div>
             <div>
               <span className="font-brand font-bold text-white text-lg tracking-wide block leading-none uppercase">CPA<span className="text-[#D4AF37]">ELITE</span></span>
               <span className="text-[9px] uppercase tracking-[0.25em] text-blue-200/40">Protocolo VIP</span>
             </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-200/60">
            <a href="#metodo" className="hover:text-white transition-colors">Método</a>
            <a href="#recompensas" className="hover:text-white transition-colors">Ganhos</a>
            
            {/* Live Pulse Badge */}
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full animate-pulse">
               <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
               <span className="text-[9px] text-red-400 font-bold tracking-widest">AO VIVO: {spotsLeft} VAGAS</span>
            </div>

            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] border border-[#D4AF37]/30 px-5 py-2 rounded hover:bg-[#D4AF37] hover:text-[#02050A] transition-all" onClick={() => { if(typeof window.fbq === 'function') window.fbq('track', 'Contact'); }}>
              Acesso Liberado
            </a>
          </nav>
          
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#02050A] border-b border-white/10 p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
            <a href="#metodo" className="text-white uppercase tracking-widest text-sm" onClick={() => setIsMenuOpen(false)}>Método</a>
            <a href="#recompensas" className="text-white uppercase tracking-widest text-sm" onClick={() => setIsMenuOpen(false)}>Ganhos</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] uppercase tracking-widest text-sm font-bold" onClick={() => { if(typeof window.fbq === 'function') window.fbq('track', 'Contact'); }}>Acesso Liberado</a>
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <EuroBill className="top-32 left-10 opacity-20 animate-float hidden md:flex" rotate={-15} />
        <EuroBill className="top-40 right-10 opacity-20 animate-float-delayed hidden md:flex" rotate={10} />

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="text-left">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold mb-8">
                <Zap size={12} fill="currentColor" /> Método de Auto-Indicação Ativo
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <h1 className="text-5xl md:text-7xl font-brand font-bold text-white mb-6 leading-[1.1] flex flex-col items-start">
                <span>Desbloqueie</span>
                <span className="gold-gradient-text relative inline-block">
                  Recompensas
                  <span className="absolute -bottom-2 left-0 w-full h-8 bg-[#D4AF37]/20 blur-xl rounded-full"></span>
                </span>
                <span className="flex items-center gap-4">
                  em Euro <div className="inline-block transform translate-y-2"><GoldChest size={60} /></div>
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={400}>
              <p className="text-blue-100/60 text-lg mb-10 leading-relaxed max-w-lg font-light">
                Esqueça a sorte. Utilize nosso protocolo para validar recompensas de indicação nas plataformas Europeias trabalhando em casa.
                <span className="block mt-4 text-white font-medium flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#D4AF37]" /> Método Validado • Sem custo inicial
                </span>
              </p>
            </FadeIn>

            <FadeIn delay={600}>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center" onClick={() => { if(typeof window.fbq === 'function') window.fbq('track', 'Lead'); }}>
                <div className="absolute inset-0 bg-[#D4AF37] blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500 rounded-lg"></div>
                <button className="relative px-10 py-5 bg-gradient-to-r from-[#D4AF37] to-[#B69143] rounded-lg text-[#02050A] font-bold uppercase tracking-widest text-sm hover:scale-[1.02] transition-transform shadow-xl flex items-center gap-4 shine-effect">
                  <Unlock size={20} />
                  Liberar Acesso Agora
                </button>
              </a>
              <p className="mt-4 text-[10px] text-blue-200/30 uppercase tracking-widest ml-1">
                Acesso restrito a {spotsLeft} membros disponíveis hoje
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={300}>
            <div className="relative w-full aspect-square flex items-center justify-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#D4AF37]/10 blur-[80px] rounded-full"></div>
              
              <div className="relative w-64 h-64 md:w-80 md:h-80 group cursor-pointer perspective-1000">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a2b4e] to-[#040B1C] rounded-2xl border border-[#D4AF37]/40 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center z-20 group-hover:-translate-y-4 transition-transform duration-700 overflow-hidden">
                   <img src={LOGO_URL} alt="CPA Elite Logo" className="absolute opacity-20 w-full h-full object-cover scale-150 grayscale mix-blend-overlay" />
                   
                   {/* Logo Central */}
                   <div className="w-24 h-24 bg-[#02050A]/80 backdrop-blur-sm rounded-full border border-[#D4AF37] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)] mb-4 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all z-10 relative">
                      <img src={LOGO_URL} className="w-full h-full object-cover rounded-full opacity-90" alt="Icon" />
                   </div>
                   <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold z-10">CPA Elite</span>
                </div>
                
                {/* Card Flutuante com Baú */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-auto py-4 bg-gradient-to-br from-[#23365e] to-[#0a152e] rounded-xl border border-[#D4AF37]/30 z-30 transform -rotate-6 group-hover:-translate-y-2 transition-transform duration-700 shadow-2xl flex flex-col items-center justify-center backdrop-blur-md">
                   <GoldChest size={60} className="-mt-8 mb-2" />
                   <div className="text-center leading-none">
                     <span className="text-[10px] uppercase text-blue-200/50 tracking-widest block mb-1">Ganhos</span>
                     <span className="font-brand font-bold text-[#D4AF37] text-2xl">€ 500+</span>
                   </div>
                </div>

                {/* Referência do Cliente (Phone Mockup) */}
                <div className="absolute -bottom-12 -right-16 w-40 md:w-48 z-40 transform rotate-12 group-hover:rotate-6 transition-all duration-700 hover:scale-105">
                  <div className="relative rounded-[2rem] border-4 border-[#1a1a1a] bg-[#02050A] overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#1a1a1a] rounded-b-xl z-20"></div>
                    <img src={CLIENT_REF_URL} alt="Prova Social" className="w-full h-auto opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02050A] via-transparent to-transparent opacity-50"></div>
                  </div>
                </div>
                
                <GoldCoin className="top-0 -right-4 animate-bounce" size={40} />
                <GoldCoin className="bottom-10 -left-6 animate-pulse" size={32} />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- SIMULADOR SECTION --- */}
      <section className="relative -mt-10 z-20 px-6">
         <FadeIn delay={800}>
            <RevenueSimulator />
         </FadeIn>
      </section>

      {/* --- CARDS DE RECOMPENSAS (BENTO GRID) --- */}
      <section id="recompensas" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
             <h2 className="text-3xl md:text-5xl font-brand font-bold text-white mb-4">Recompensas Reais</h2>
             <p className="text-blue-200/50">Ecossistema validado de alta performance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[500px]">
            {/* Card 1: Principal (Big Square) */}
            <TiltCard className="md:col-span-2 md:row-span-2 h-full">
            <div className="bg-gradient-to-b from-[#0e1a33] to-[#040B1C] p-8 rounded-3xl border border-[#D4AF37]/30 relative group overflow-hidden flex flex-col justify-between h-full">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] uppercase font-bold tracking-widest mb-4">
                     <Key size={12} /> Plataforma Oficial
                  </div>
                  <h3 className="text-4xl md:text-6xl font-brand font-bold text-white drop-shadow-xl tracking-tight">
                    € 1.823<span className="text-[#D4AF37]">,00</span>
                  </h3>
                  <p className="text-white/40 text-sm mt-2">Pagamento Total Vitalício</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#02050A]/50 border border-white/5 backdrop-blur-sm">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500"><CheckCircle2 size={14} /></div>
                        <span className="text-xs text-white/80">Saques Aprovados</span>
                     </div>
                     <span className="text-white font-bold">100%</span>
                  </div>
                  
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full block py-4 bg-[#D4AF37] text-[#02050A] text-center font-bold uppercase tracking-widest rounded-xl hover:bg-[#c5a028] transition-colors" onClick={() => { if(typeof window.fbq === 'function') window.fbq('track', 'Lead'); }}>
                     Acessar Plataforma
                  </a>
                </div>
            </div>
            </TiltCard>

            {/* Card 2: Inicial (Tall or Wide) */}
            <div className="md:col-span-1 md:row-span-2 bg-navy-glass p-6 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center relative group hover:border-[#D4AF37]/30 transition-all">
               <div className="w-16 h-16 bg-[#02050A] rounded-full border border-white/10 flex items-center justify-center text-blue-400 shadow-xl mb-6 group-hover:scale-110 transition-transform">
                  <Gift size={28} />
               </div>
               <span className="text-xs uppercase tracking-widest text-blue-200/40 mb-2">Comissão CPA</span>
               <span className="text-3xl font-brand font-bold text-white mb-1">€ 20,00</span>
               <span className="text-[10px] text-emerald-400 mb-8 font-bold bg-emerald-500/10 px-2 py-1 rounded">No 1º Depósito</span>
               
               <div className="w-full h-[1px] bg-white/5 mb-8"></div>
               
               <div className="flex -space-x-2 justify-center">
                 <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-8 h-8 rounded-full border-2 border-[#040B1C]" alt="User" />
                 <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-8 h-8 rounded-full border-2 border-[#040B1C]" alt="User" />
                 <img src="https://randomuser.me/api/portraits/men/85.jpg" className="w-8 h-8 rounded-full border-2 border-[#040B1C]" alt="User" />
                 <div className="w-8 h-8 rounded-full bg-[#D4AF37] border-2 border-[#040B1C] flex items-center justify-center text-[10px] font-bold text-black">+80</div>
               </div>
               <span className="text-[10px] text-white/40 mt-2">Membros ativos hoje</span>
            </div>

            {/* Card 3: Semanal (Small) */}
            <div className="bg-navy-glass p-6 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
               <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                     <TrendingUp size={20} />
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">Semanal</span>
               </div>
               <span className="text-2xl font-brand font-bold text-white block">€ 500,00</span>
               <span className="text-[10px] text-white/40">Meta Recorrente</span>
               <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" onClick={() => { if(typeof window.fbq === 'function') window.fbq('track', 'Contact'); }}></a>
            </div>

            {/* Card 4: Extra (Small) */}
            <div className="bg-navy-glass p-6 rounded-3xl border border-white/5 relative group hover:border-[#D4AF37]/30 transition-all">
               <div className="flex items-center gap-3 mb-4">
                  <Users size={20} className="text-[#D4AF37]" />
                  <span className="text-xs font-bold text-white">Operadores Ativos</span>
               </div>
               <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-white transition-all duration-500">{activeOperators}</span>
                  <span className="text-[10px] text-green-400 mb-1 flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-green-400"></div> Online Agora
                  </span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TOASTS --- */}
      <ToastNotification />

      {/* --- FLUXO FINANCEIRO (SVG ANIMADO) --- */}
      <section id="metodo" className="py-24 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative">
           
           <div className="text-center mb-16">
              <span className="inline-block py-1 px-3 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">Como Funciona</span>
              <h2 className="text-3xl md:text-5xl font-brand font-bold text-white">Fluxo Financeiro</h2>
           </div>

           {/* Linha de Conexão (Desktop) */}
           <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 hidden md:block z-0"></div>
           <svg className="absolute top-1/2 left-0 w-full h-20 -translate-y-1/2 hidden md:block z-0 overflow-visible pointer-events-none">
              <path 
                d="M 0,40 Q 250,40 500,40 T 1000,40" 
                fill="none" 
                stroke="#D4AF37" 
                strokeWidth="2" 
                strokeDasharray="10 10" 
                className="opacity-30"
              />
              <circle r="4" fill="#D4AF37" className="animate-ping">
                 <animateMotion 
                    dur="3s" 
                    repeatCount="indefinite"
                    path="M 0,40 Q 250,40 500,40 T 1000,40"
                 />
              </circle>
           </svg>

           <div className="grid md:grid-cols-3 gap-12 relative z-10">
              {[
                { 
                  icon: Lock, 
                  title: "Acesso ao Grupo", 
                  desc: "Você entra em um grupo exclusivo e começa a ser operador de CPA ativo.", 
                  step: "01" 
                },
                { 
                  icon: Key, 
                  title: "Prática Operacional", 
                  desc: "Utilize da estratégia validada para simular acessos nas casas europeias começando a extrair euros.", 
                  step: "02" 
                },
                { 
                  icon: Wallet, 
                  title: "Saque em Euro via PIX", 
                  desc: "Efetue saques direto para sua conta. A liquidante converte automaticamente.", 
                  step: "03" 
                }
              ].map((item, i) => (
                <TiltCard key={i} className="group">
                  <div className="bg-[#040914] p-8 rounded-2xl border border-white/5 hover:border-[#D4AF37]/40 transition-all h-full flex flex-col items-center text-center relative">
                     <div className="absolute -top-5 bg-[#02050A] text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1 rounded text-xs font-bold font-brand tracking-widest shadow-xl">
                        ETAPA {item.step}
                     </div>
                     
                     <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1a2b4e] to-[#02050A] border border-white/10 flex items-center justify-center text-blue-200 mb-6 group-hover:text-[#D4AF37] group-hover:border-[#D4AF37] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all">
                        <item.icon size={28} />
                     </div>
                     
                     <h3 className="text-white font-bold text-xl mb-4">{item.title}</h3>
                     <p className="text-blue-200/40 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </TiltCard>
              ))}
           </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 px-6 relative bg-[#010203]">
         <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
               <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] font-bold mb-4 block">Tira-Dúvidas</span>
               <h2 className="text-3xl md:text-4xl font-brand font-bold text-white">Perguntas Frequentes</h2>
            </div>

            <div className="bg-navy-glass rounded-3xl border border-white/5 p-8 md:p-12">
               <FAQItem 
                 question="Preciso aparecer ou vender algo?" 
                 answer="Não. O protocolo é baseado em CPA (Custo por Ação) e atividades internas. Você atua nos bastidores, validando ações em plataformas europeias sem precisar expor sua imagem ou vender produtos." 
               />
               <FAQItem 
                 question="Funciona apenas pelo celular?" 
                 answer="Sim. Todo o ecossistema foi desenvolvido para ser operado 100% via mobile (Android ou iOS) ou computador, exigindo apenas conexão com a internet." 
               />
               <FAQItem 
                 question="Como recebo os pagamentos?" 
                 answer="Os valores acumulados em Euro são convertidos automaticamente pela processadora de pagamentos e enviados via PIX para sua conta bancária brasileira cadastrada." 
               />
               <FAQItem 
                 question="Preciso saber falar inglês?" 
                 answer="Não. O script e as ferramentas fornecidas traduzem e automatizam as interações necessárias. O suporte e a comunidade são totalmente em português." 
               />
               <FAQItem 
                 question="Tenho garantia se não conseguir?" 
                 answer="Absolutamente. Se você seguir o passo-a-passo e não obtiver retorno, você está protegido pela nossa garantia incondicional de 7 dias." 
               />
            </div>
         </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section id="join" className="py-32 px-6 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 to-transparent"></div>
        
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="mb-8 inline-block relative">
               <div className="absolute inset-0 bg-[#D4AF37] blur-[30px] opacity-20 animate-pulse"></div>
               <img 
                 src={LOGO_URL} 
                 alt="Logo Final" 
                 className="w-24 h-24 mx-auto rounded-2xl border-2 border-[#D4AF37] relative z-10 shadow-2xl"
                 onError={(e) => {e.target.style.display='none'}}
               />
            </div>

            <h2 className="text-4xl md:text-5xl font-brand font-bold text-white mb-8">
              Protocolo de Segurança Ativo
            </h2>
            
            <div className="bg-[#0A1124] p-8 rounded-xl border border-white/10 mb-8">
               <div className="flex justify-between items-center text-sm text-blue-200/60 mb-4">
                  <span>Vagas Disponíveis</span>
                  <span className="text-white font-bold">{spotsLeft}/50</span>
               </div>
               <div className="w-full h-2 bg-[#02050A] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FFE5A0]" 
                    style={{ width: `${(spotsLeft/50)*100}%`, transition: 'width 1s ease' }}
                  ></div>
               </div>
            </div>

            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full block py-6 bg-[#D4AF37] hover:bg-[#c5a028] text-[#02050A] font-bold uppercase tracking-[0.25em] rounded-lg shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] transition-all transform hover:scale-[1.01] active:scale-95" onClick={() => { if(typeof window.fbq === 'function') window.fbq('track', 'Lead'); }}>
              Quero ser um operador
            </a>
          </FadeIn>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 bg-[#010203] border-t border-white/5 text-center relative z-10">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center gap-4 mb-6">
              <img src={LOGO_URL} alt="Logo" className="w-10 opacity-50 grayscale hover:grayscale-0 transition-all" />
              <span className="font-brand font-bold text-white text-xl tracking-widest block">CPA ELITE</span>
            </div>
            <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">
              © 2024 CPA Elite Protocol. Sistema de recompensas via indicação direta.
            </p>
         </div>
      </footer>

    </div>
  );
};

export default CPAElite;