import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, ShieldCheck, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SpecialtyCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const SpecialtyCard = ({ icon, title, description, delay }: SpecialtyCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const iconEl = iconRef.current;
    if (!card || !iconEl) return;

    const ctx = gsap.context(() => {
      // Scroll trigger animation
      gsap.fromTo(
        card,
        { rotateY: -90, opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 0.8,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        iconEl,
        { scale: 0, rotate: -180 },
        {
          scale: 1,
          rotate: 0,
          duration: 0.6,
          delay: delay + 0.3,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, card);

    return () => ctx.revert();
  }, [delay]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX: -rotateX,
      rotateY: rotateY,
      translateZ: 40,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      translateZ: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="card-3d perspective-1000 preserve-3d cursor-pointer group"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        ref={iconRef}
        className="w-16 h-16 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-6 group-hover:bg-[#D4AF37]/20 transition-colors duration-300"
      >
        <div className="text-[#D4AF37] icon-glow">{icon}</div>
      </div>

      <h3 className="text-xl font-serif font-semibold text-[#1A1A1A] mb-3">
        {title}
      </h3>

      <p className="text-[#4A4A4A] text-sm leading-relaxed">{description}</p>

      {/* Hover border effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

const Especialidades = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const specialties = [
    {
      icon: <Briefcase className="w-8 h-8" strokeWidth={1.5} />,
      title: 'Direito Trabalhista',
      description:
        'Reclamações trabalhistas, rescisões contratuais, acidentes de trabalho, assédio moral e sexual, direitos dos trabalhadores.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8" strokeWidth={1.5} />,
      title: 'Direito do Consumidor',
      description:
        'Ações contra bancos, planos de saúde, operadoras de telefonia, produtos defeituosos e práticas abusivas.',
    },
    {
      icon: <TrendingUp className="w-8 h-8" strokeWidth={1.5} />,
      title: 'Direito Previdenciário',
      description:
        'Aposentadorias por idade, tempo de contribuição e invalidez, benefícios INSS, revisão de cálculos e concessões.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with split text effect
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: titleRef.current,
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
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="section-title">
            Áreas de <span className="gradient-gold">Atuação</span>
          </h2>
          <p className="text-[#4A4A4A] max-w-2xl mx-auto">
            Especialização técnica e experiência prática nas principais áreas do direito
            para oferecer a melhor solução para seu caso.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {specialties.map((specialty, index) => (
            <SpecialtyCard
              key={specialty.title}
              icon={specialty.icon}
              title={specialty.title}
              description={specialty.description}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-[#D4AF37]/10 rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-48 h-48 border border-[#D4AF37]/5 rounded-full pointer-events-none" />
    </section>
  );
};

export default Especialidades;
