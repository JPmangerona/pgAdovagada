import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Phone, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CTAFinal = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Glass card animation
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, backdropFilter: 'blur(0px)' },
          {
            opacity: 1,
            backdropFilter: 'blur(20px)',
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Headline animation
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            delay: 0.3,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Subtext animation
      if (subtextRef.current) {
        gsap.fromTo(
          subtextRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: subtextRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // CTA button animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            delay: 0.7,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Contact info typewriter effect
      if (contactRef.current) {
        gsap.fromTo(
          contactRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            delay: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contactRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Subtle parallax effect
    gsap.to(card, {
      rotateX: (y - rect.height / 2) / 50,
      rotateY: (rect.width / 2 - x) / 50,
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
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="w-full h-full opacity-30"
          viewBox="0 0 1440 600"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="ctaPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="#D4AF37" opacity="0.3" />
              <path d="M30 0 L30 60 M0 30 L60 30" stroke="#D4AF37" strokeWidth="0.5" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ctaPattern)" />
          <circle cx="200" cy="300" r="150" fill="#D4AF37" opacity="0.03" />
          <circle cx="1200" cy="200" r="200" fill="#D4AF37" opacity="0.02" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[600px] mx-auto px-6">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="glass-card text-center perspective-1000 preserve-3d float-animation"
        >
          <h2
            ref={headlineRef}
            className="text-3xl md:text-4xl font-serif font-semibold text-[#1A1A1A] mb-4"
          >
            Pronto para resolver{' '}
            <span className="gradient-gold">sua causa?</span>
          </h2>

          <p ref={subtextRef} className="text-[#4A4A4A] mb-8">
            Entre em contato e agende sua consulta inicial. Vamos analisar seu caso
            e encontrar a melhor solução jurídica.
          </p>

          <a
            ref={ctaRef}
            href="https://wa.me/5543998568226"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
            className="btn-primary inline-flex items-center gap-3 group relative overflow-hidden glow-pulse"
          >
            {/* Ripple effects */}
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className="absolute rounded-full bg-[#D4AF37]/30 animate-ping"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: 20,
                  height: 20,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}
            <MessageCircle className="w-5 h-5 relative z-10 transition-transform group-hover:scale-110" />
            <span className="relative z-10">Falar no WhatsApp</span>
          </a>

          <div ref={contactRef} className="mt-8 pt-6 border-t border-[#D4AF37]/20 space-y-3">
            <div className="flex items-center justify-center gap-2 text-[#4A4A4A]">
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-medium">(43) 99856-8226</span>
            </div>
            <a 
              href="mailto:jessicallima.adv@gmail.com"
              className="flex items-center justify-center gap-2 text-[#4A4A4A] hover:text-[#D4AF37] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-medium">jessicallima.adv@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAFinal;
