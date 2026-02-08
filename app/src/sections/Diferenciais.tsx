import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hand, Zap, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DifferentialItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const DifferentialItem = ({ icon, title, description, delay }: DifferentialItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        item,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, item);

    return () => ctx.revert();
  }, [delay]);

  const handleMouseEnter = () => {
    const item = itemRef.current;
    const iconEl = iconRef.current;
    if (!item || !iconEl) return;

    gsap.to(item, {
      x: 10,
      backgroundColor: 'rgba(212, 175, 55, 0.05)',
      duration: 0.3,
      ease: 'power2.out',
    });

    gsap.to(iconEl, {
      scale: 1.2,
      duration: 0.4,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  const handleMouseLeave = () => {
    const item = itemRef.current;
    const iconEl = iconRef.current;
    if (!item || !iconEl) return;

    gsap.to(item, {
      x: 0,
      backgroundColor: 'transparent',
      duration: 0.3,
      ease: 'power2.out',
    });

    gsap.to(iconEl, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={itemRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex items-start gap-5 p-5 rounded-xl transition-colors cursor-pointer"
    >
      <div
        ref={iconRef}
        className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center"
      >
        <div className="text-[#D4AF37]">{icon}</div>
      </div>
      <div>
        <h3 className="text-lg font-serif font-semibold text-[#1A1A1A] mb-2">
          {title}
        </h3>
        <p className="text-[#4A4A4A] text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const Diferenciais = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  const differentials = [
    {
      icon: <Hand className="w-6 h-6" strokeWidth={1.5} />,
      title: 'Atendimento Personalizado',
      description:
        'Cada caso é único e recebe atenção individualizada. Análise detalhada da sua situação com estratégias sob medida.',
    },
    {
      icon: <Zap className="w-6 h-6" strokeWidth={1.5} />,
      title: 'Agilidade nos Processos',
      description:
        'Compromisso com prazos e resultados eficientes. Acompanhamento próximo de todas as etapas do seu processo.',
    },
    {
      icon: <Eye className="w-6 h-6" strokeWidth={1.5} />,
      title: 'Transparência Total',
      description:
        'Comunicação clara e direta em todas as etapas. Você sempre será informado sobre o andamento do seu caso.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Divider line animation
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            delay: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: dividerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Visual circle animation
      if (visualRef.current) {
        gsap.fromTo(
          visualRef.current,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            delay: 0.5,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: visualRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-[#FFFBF5]"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <h2 ref={titleRef} className="section-title mb-8">
              Por que me <span className="gradient-gold">escolher?</span>
            </h2>

            <div
              ref={dividerRef}
              className="h-px w-24 bg-gradient-to-r from-[#D4AF37] to-transparent mb-8 origin-left"
            />

            <div className="space-y-4">
              {differentials.map((item, index) => (
                <DifferentialItem
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  delay={0.4 + index * 0.2}
                />
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="flex justify-center lg:justify-end">
            <div ref={visualRef} className="relative">
              {/* Central circle with gradient */}
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-[#D4AF37]/20 via-[#D4AF37]/10 to-transparent flex items-center justify-center relative">
                {/* Inner circle */}
                <div className="w-48 h-48 md:w-60 md:h-60 rounded-full bg-gradient-to-br from-[#D4AF37]/30 to-[#D4AF37]/10 flex items-center justify-center animate-pulse">
                  <div className="text-center">
                    <p className="text-4xl md:text-5xl font-serif font-bold text-[#D4AF37]">8</p>
                    <p className="text-sm text-[#4A4A4A] mt-1">Anos de</p>
                    <p className="text-sm text-[#4A4A4A]">Experiência</p>
                  </div>
                </div>

                {/* Orbiting icons */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-[#D4AF37]/20">
                    <BriefcaseIcon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                </div>
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-[#D4AF37]/20">
                    <ScaleIcon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                </div>
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '30s' }}>
                  <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-[#D4AF37]/20">
                    <AwardIcon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                </div>
              </div>

              {/* Decorative rings */}
              <div className="absolute -inset-8 border border-[#D4AF37]/10 rounded-full pointer-events-none" />
              <div className="absolute -inset-16 border border-[#D4AF37]/5 rounded-full pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Simple icon components for orbit
const BriefcaseIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const ScaleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="M7 21h10" />
    <path d="M12 3v18" />
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
  </svg>
);

const AwardIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

export default Diferenciais;
