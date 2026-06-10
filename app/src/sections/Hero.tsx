import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MessageCircle } from 'lucide-react';
import jessicaLima from '@/assets/jessica-lima.png';


const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Decorative lines draw animation
      if (decorRef.current) {
        const paths = decorRef.current.querySelectorAll('path');
        paths.forEach((path) => {
          const length = (path as SVGPathElement).getTotalLength?.() || 200;
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          tl.to(path, { strokeDashoffset: 0, duration: 1.5 }, 0.5);
        });
      }

      // Headline words animation
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
          0.2
        );
      }

      // Highlight text shimmer
      tl.fromTo(
        '.highlight-text',
        { backgroundPosition: '-200% center' },
        { backgroundPosition: '200% center', duration: 2, ease: 'power2.inOut' },
        0.8
      );

      // Subheadline fade with blur
      tl.fromTo(
        subheadlineRef.current,
        { opacity: 0, filter: 'blur(10px)' },
        { opacity: 1, filter: 'blur(0px)', duration: 0.8 },
        1
      );

      // CTA button scale and glow
      tl.fromTo(
        ctaRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
        1.2
      );

      // Image mask reveal
      tl.fromTo(
        imageRef.current,
        { clipPath: 'circle(0% at 50% 50%)', opacity: 0 },
        { clipPath: 'circle(100% at 50% 50%)', opacity: 1, duration: 1.4, ease: 'power3.inOut' },
        0.4
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(${scrollY * -0.1}px)`;
      }
      if (headlineRef.current) {
        headlineRef.current.style.transform = `translateY(${scrollY * -0.05}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden mesh-gradient"
    >
      {/* Decorative SVG Lines */}
      <svg
        ref={decorRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-100 200 Q 400 100, 800 300 T 1600 200"
          stroke="#D4AF37"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M-100 400 Q 300 300, 700 500 T 1500 400"
          stroke="#D4AF37"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
        <path
          d="M200 900 Q 400 600, 600 700 T 1000 600"
          stroke="#D4AF37"
          strokeWidth="1"
          fill="none"
          opacity="0.2"
        />
      </svg>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-semibold text-[#1A1A1A] leading-tight mb-6"
            >
              <span className="word inline-block">Defendendo</span>{' '}
              <span className="word inline-block">seus</span>{' '}
              <span className="word inline-block">direitos</span>{' '}
              <span className="word inline-block">com</span>{' '}
              <span className="word inline-block highlight-text gradient-gold bg-[length:200%_auto]">
                excelência
              </span>
            </h1>

            <p
              ref={subheadlineRef}
              className="text-lg md:text-xl text-[#4A4A4A] max-w-xl mx-auto lg:mx-0 mb-10 font-light"
            >
              Especialista em direito trabalhista, consumidor e previdenciário.
              <br />
              Atendimento personalizado e resultados eficientes.
            </p>

            <a
              ref={ctaRef}
              href="https://wa.me/5543998568226"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-3 group"
            >
              <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>Agende sua Consulta</span>
            </a>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div
              ref={imageRef}
              className="relative w-[280px] sm:w-[350px] md:w-[400px] lg:w-[450px]"
            >
              {/* Gold ring decoration */}
              <div className="absolute -inset-4 border border-[#D4AF37]/30 rounded-full animate-pulse" />
              <div className="absolute -inset-8 border border-[#D4AF37]/10 rounded-full" />
              
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={jessicaLima}
                  alt="Dra. Jéssica Lima - Advogada"
                  className="w-full h-auto object-cover"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/10 to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-3 shadow-lg border border-[#D4AF37]/20">
                <p className="text-sm font-semibold text-[#1A1A1A]">Dra. Jéssica Lima</p>
                <p className="text-xs text-[#4A4A4A]">OAB/PR 95.212</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FFFBF5] to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
