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
  CreditCard
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
  <div className={`relative ${className}`} style={{ width: size, height: size }}>
     <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl filter contrast-125">
       {/* Base do Baú */}
       <path d="M10 40H90V85C90 87.7614 87.7614 90 85 90H15C12.2386 90 10 87.7614 10 85V40Z" fill="url(#chestGradient)" stroke="#8B5E3C" strokeWidth="2"/>
       
       {/* Tampa do Baú */}
       <path d="M10 40C10 25 28 15 50 15C72 15 90 25 90 40V45H10V40Z" fill="url(#lidGradient)" stroke="#8B5E3C" strokeWidth="2"/>
       
       {/* Detalhes Dourados */}
       <rect x="42" y="35" width="16" height="20" rx="2" fill="#D4AF37" stroke="#FFE5A0" strokeWidth="1"/>
       <path d="M10 45H90" stroke="#5E4B25" strokeWidth="2"/>
       <path d="M10 40H90" stroke="#FFE5A0" strokeWidth="1" opacity="0.5"/>
       
       {/* Brilho */}
       <circle cx="50" cy="45" r="5" fill="#FFE5A0" className="animate-pulse"/>
       
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

/* --- MAIN COMPONENT --- */
const CPAElite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState(14);
  const WHATSAPP_LINK = "https://chat.whatsapp.com/I4eVoSjkpnQ2uZsvBDpAoI";
  // Fallback para a logo caso o ambiente não carregue a imagem local
  const LOGO_URL = "LOGO CPA ELITE.jpeg"; 
  const CLIENT_REF_URL = "REFERENCIA BAU CLIENTE.jpeg"; 

  useEffect(() => {
    const timer = setInterval(() => {
      setSpotsLeft((prev) => (prev > 3 ? prev - 1 : 3));
    }, 45000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#02050A] text-blue-50 font-sans selection:bg-[#D4AF37] selection:text-[#02050A] overflow-x-hidden font-body relative">
      
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
      `}</style>

      {/* --- BACKGROUND AMBIENTE --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-blue-900/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>
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
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] border border-[#D4AF37]/30 px-5 py-2 rounded hover:bg-[#D4AF37] hover:text-[#02050A] transition-all">
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
            <a href={WHATSAPP_LINK} className="text-[#D4AF37] uppercase tracking-widest text-sm font-bold">Acesso Liberado</a>
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
              <h1 className="text-5xl md:text-7xl font-brand font-bold text-white mb-6 leading-[1.1]">
                Desbloqueie <br/>
                <span className="gold-gradient-text relative inline-block">
                  Recompensas
                  <span className="absolute -bottom-2 left-0 w-full h-8 bg-[#D4AF37]/20 blur-xl rounded-full"></span>
                </span> <br/>
                em Euro (€)
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
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center">
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

      {/* --- CARDS DE RECOMPENSAS --- */}
      <section id="recompensas" className="py-24 bg-[#010306] relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
             <h2 className="text-3xl md:text-5xl font-brand font-bold text-white mb-4">Recompensas Reais</h2>
             <p className="text-blue-200/50">Nada de tiro no escuro, escale sua operação.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn delay={100}>
              <div className="bg-navy-glass p-8 rounded-2xl border border-white/5 relative group hover:border-[#D4AF37]/30 transition-all hover:-translate-y-2">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#02050A] rounded-full border border-white/10 flex items-center justify-center text-blue-400 shadow-lg z-10">
                   <Gift size={20} />
                </div>
                <div className="text-center pt-6">
                   <span className="text-xs uppercase tracking-widest text-blue-200/40 block mb-2">Recompensa Inicial</span>
                   <span className="text-4xl font-brand font-bold text-white block mb-2">€ 20,00</span>
                   <span className="text-xs text-blue-200/30">Aprox. R$ 130,00</span>
                   <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="mt-6 block py-3 bg-white/5 rounded border border-white/5 text-xs text-blue-100 uppercase tracking-wider group-hover:bg-[#D4AF37] group-hover:text-black transition-colors font-bold">
                     Desbloquear
                   </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="bg-gradient-to-b from-[#0e1a33] to-[#040B1C] p-8 rounded-2xl border border-[#D4AF37]/40 relative group transform md:-translate-y-4 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#B69143] rounded-full flex items-center justify-center text-[#02050A] shadow-[0_0_20px_rgba(212,175,55,0.4)] z-10">
                   <Key size={24} />
                </div>
                <div className="text-center pt-8">
                   <span className="text-xs uppercase tracking-widest text-[#D4AF37] block mb-2 font-bold">Plataforma Ativa</span>
                   <span className="text-5xl font-brand font-bold text-white block mb-2 drop-shadow-lg">€ 1.823,00</span>
                   <span className="text-xs text-[#D4AF37]/60">Aprox. R$ 11.500,00</span>
                   <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="mt-8 block py-4 bg-[#D4AF37] rounded shadow-lg text-xs text-[#02050A] uppercase tracking-wider font-bold animate-pulse">
                     Participar do Grupo
                   </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="bg-navy-glass p-8 rounded-2xl border border-white/5 relative group hover:border-[#D4AF37]/30 transition-all hover:-translate-y-2">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#02050A] rounded-full border border-white/10 flex items-center justify-center text-emerald-400 shadow-lg z-10">
                   <Box size={20} />
                </div>
                <div className="text-center pt-6">
                   <span className="text-xs uppercase tracking-widest text-blue-200/40 block mb-2">Recompensa Semanal</span>
                   <span className="text-4xl font-brand font-bold text-white block mb-2">€ 500,00</span>
                   <span className="text-xs text-blue-200/30">Aprox. R$ 3.200,00</span>
                   <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="mt-6 block py-3 bg-white/5 rounded border border-white/5 text-xs text-blue-100 uppercase tracking-wider group-hover:bg-emerald-500 group-hover:text-black transition-colors font-bold">
                     Desbloquear
                   </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- FLUXO FINANCEIRO --- */}
      <section id="metodo" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
           <div className="flex items-center gap-4 mb-12 opacity-80">
              <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
              <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">Fluxo Financeiro</span>
           </div>

           <div className="space-y-4">
              {[
                { 
                  icon: Lock, 
                  title: "Acesso ao Grupo VIP", 
                  desc: "Você entra em um grupo exclusivo e começa a ser operador de CPA ativo através do link oficial.", 
                  val: "Etapa 1" 
                },
                { 
                  icon: Key, 
                  title: "Prática Operacional", 
                  desc: "Utilize o script validado para simular acessos e começar a acumular saldo em Euro sigilosamente.", 
                  val: "Etapa 2" 
                },
                { 
                  icon: Wallet, 
                  title: "Saque em Euro via PIX", 
                  desc: "Efetue saques direto para sua conta. A liquidante converte para R$ automaticamente com taxa mínima.", 
                  val: "Etapa 3" 
                }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <div className="flex items-center gap-6 p-6 bg-[#040914] border border-white/5 rounded-xl hover:border-[#D4AF37]/20 transition-colors group">
                     <div className="w-12 h-12 rounded-full bg-[#02050A] border border-white/10 flex items-center justify-center text-blue-200 group-hover:text-[#D4AF37] group-hover:border-[#D4AF37] transition-all">
                        <item.icon size={20} />
                     </div>
                     <div className="flex-1">
                        <h3 className="text-white font-bold text-lg">{item.title}</h3>
                        <p className="text-blue-200/40 text-sm">{item.desc}</p>
                     </div>
                  </div>
                </FadeIn>
              ))}
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

            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full block py-6 bg-[#D4AF37] hover:bg-[#c5a028] text-[#02050A] font-bold uppercase tracking-[0.25em] rounded-lg shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] transition-all transform hover:scale-[1.01] active:scale-95">
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