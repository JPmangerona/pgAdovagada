import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Phone, Instagram, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contato = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
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

      // Info cards animation
      if (infoRef.current) {
        const items = infoRef.current.querySelectorAll('.contact-item');
        gsap.fromTo(
          items,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: infoRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Map animation
      if (mapRef.current) {
        gsap.fromTo(
          mapRef.current,
          { scale: 0.95, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: mapRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactItems = [
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Endereço',
      value: 'Av. Duque de Caxias, 770',
      href: null,
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Telefone',
      value: '(43) 99856-8226',
      href: 'https://wa.me/5543998568226',
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'E-mail',
      value: 'jessicallima.adv@gmail.com',
      href: 'mailto:jessicallima.adv@gmail.com',
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      label: 'Instagram',
      value: '@adv.jessicalimaa',
      href: 'https://www.instagram.com/adv.jessicalimaa/',
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: 'Horário de Atendimento',
      value: 'Seg - Sex: 8h às 18h',
      href: null,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-[#FFFBF5]"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 ref={titleRef} className="section-title">
            Entre em <span className="gradient-gold">Contato</span>
          </h2>
          <p className="text-[#4A4A4A] max-w-2xl mx-auto mt-4">
            Estou à disposição para atender você. Entre em contato pelos canais abaixo
            ou visite o escritório.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div ref={infoRef} className="space-y-4">
            {contactItems.map((item, index) => (
              <div
                key={index}
                className="contact-item flex items-center gap-4 p-4 rounded-xl bg-white border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 hover:shadow-md transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                  <div className="text-[#D4AF37]">{item.icon}</div>
                </div>
                <div>
                  <p className="text-xs text-[#4A4A4A] uppercase tracking-wide">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-[#1A1A1A] font-medium hover:text-[#D4AF37] transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-[#1A1A1A] font-medium">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* OAB Info */}
            <div className="contact-item p-4 rounded-xl bg-gradient-to-r from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20">
              <p className="text-sm text-[#4A4A4A]">
                <span className="font-semibold text-[#1A1A1A]">OAB/PR 95.212</span>
                {' '}— Inscrita na Ordem dos Advogados do Brasil
              </p>
            </div>
          </div>

          {/* Google Maps */}
          <div
            ref={mapRef}
            className="relative rounded-2xl overflow-hidden shadow-xl border border-[#D4AF37]/20 h-[400px] lg:h-auto min-h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.878473104279!2d-51.15035108262925!3d-23.333820748291746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94eb431229a17c8f%3A0x80b7fbfd1a499e6c!2sAv.%20Duque%20de%20Caxias%2C%20770%20-%20Igap%C3%B3%2C%20Londrina%20-%20PR%2C%2086010-085!5e0!3m2!1spt-BR!2sbr!4v1769994508906!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do Escritório"
              className="absolute inset-0"
            />
            
            {/* Map overlay with address */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-[#D4AF37]/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A]">Escritório Dra. Jéssica Lima</p>
                  <p className="text-xs text-[#4A4A4A]">Av. Duque de Caxias, 770</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 border border-[#D4AF37]/10 rounded-full pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-24 h-24 border border-[#D4AF37]/5 rounded-full pointer-events-none" />
    </section>
  );
};

export default Contato;
