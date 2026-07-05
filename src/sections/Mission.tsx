import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function FloatingStatPill() {
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pill = document.querySelector('.stat-pill');
    if (!pill) return;

    gsap.to(pill, {
      y: -10,
      duration: 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    return () => {
      gsap.killTweensOf('.stat-pill');
    };
  }, []);

  return (
    <div ref={pillRef} className="stat-pill mx-auto lg:mx-0">
      <div className="pill-bg-circle" />
      <div className="relative z-[1] text-center">
        <div className="pill-stat">120+</div>
        <div className="pill-label">
          Community health campaigns launched across Nigeria
        </div>
      </div>
    </div>
  );
}

export default function Mission() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = [eyebrowRef.current, headingRef.current, bodyRef.current, buttonRef.current];

    gsap.fromTo(
      elements.filter(Boolean),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    if (pillRef.current) {
      gsap.fromTo(
        pillRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative"
      style={{
        background: 'var(--ahi-bg-primary)',
        padding: 'clamp(80px, 12vh, 160px) 0',
      }}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-6">
            <span
              ref={eyebrowRef}
              className="label-text block"
              style={{ color: 'var(--ahi-coral)', opacity: 0 }}
            >
              OUR MISSION
            </span>

            <h2
              ref={headingRef}
              className="section-heading"
              style={{ color: 'var(--ahi-text-dark)', opacity: 0 }}
            >
              Bridging health and creativity
            </h2>

            <p
              ref={bodyRef}
              className="body-large"
              style={{ color: 'var(--ahi-text-muted)', opacity: 0 }}
            >
              AFHI is a non-profit media organization dedicated to promoting public
              health awareness through creative expression. We organize exhibitions,
              workshops, and community campaigns that make health information
              accessible, relatable, and actionable.
            </p>

            <a
              ref={buttonRef}
              href="#focus-areas"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('focus-areas')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center px-8 py-3 rounded-[28px] border text-sm font-semibold tracking-wide transition-all duration-300 hover:bg-ahi-text-dark hover:text-ahi-bg-primary hover:border-ahi-text-dark"
              style={{
                borderColor: 'var(--ahi-text-dark)',
                color: 'var(--ahi-text-dark)',
                opacity: 0,
              }}
            >
              Learn More
            </a>
          </div>

          {/* Right Column - Stat Pill */}
          <div ref={pillRef} className="flex justify-center lg:justify-end" style={{ opacity: 0 }}>
            <FloatingStatPill />
          </div>
        </div>
      </div>
    </section>
  );
}
