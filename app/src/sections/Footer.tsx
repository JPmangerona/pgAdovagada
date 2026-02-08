import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Border line draw animation
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: lineRef.current,
              start: 'top 95%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Content fade in
      if (contentRef.current) {
        const children = contentRef.current.children;
        gsap.fromTo(
          children,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 95%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSocialHover = (e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => {
    const target = e.currentTarget;
    gsap.to(target, {
      y: enter ? -3 : 0,
      color: enter ? '#D4AF37' : '#4A4A4A',
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  return (
    <footer ref={footerRef} className="relative w-full py-8 bg-[#FFFBF5]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Top border line */}
        <div
          ref={lineRef}
          className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-8 origin-left"
        />

        {/* Footer content */}
        <div
          ref={contentRef}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Copyright */}
          <p className="text-sm text-[#4A4A4A] text-center md:text-left">
            © 2026 Dra. Jéssica Lima. Todos os direitos reservados.
          </p>

          {/* OAB */}
          <p className="text-sm text-[#4A4A4A] font-medium">OAB/PR 95.212</p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/adv.jessicalimaa/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4A4A4A] transition-colors"
              onMouseEnter={(e) => handleSocialHover(e, true)}
              onMouseLeave={(e) => handleSocialHover(e, false)}
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
