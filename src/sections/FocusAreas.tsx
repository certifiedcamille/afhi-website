import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FOCUS_CARDS = [
  {
    index: '01',
    title: 'Mental Health',
    description:
      'Using art therapy and creative expression to support mental wellbeing in underserved communities.',
    accentColor: '#E84627',
    image: '/images/event-09.jpg',
  },
  {
    index: '02',
    title: 'Maternal Care',
    description:
      'Visual storytelling and community theater to improve maternal and child health outcomes.',
    accentColor: '#D4A843',
    image: '/images/event-13.jpg',
  },
  {
    index: '03',
    title: 'Disease Prevention',
    description:
      'Murals, digital campaigns, and workshops on infectious diseases and antimicrobial resistance.',
    accentColor: '#4A9B8E',
    image: '/images/event-01.jpg',
  },
  {
    index: '04',
    title: 'Climate & Health',
    description:
      'Creative advocacy addressing the intersection of environmental change and public health.',
    accentColor: '#7B5EA7',
    image: '/images/event-15.jpg',
  },
];

export default function FocusAreas() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (headerRef.current) {
      const headerChildren = headerRef.current.children;
      gsap.fromTo(
        headerChildren,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="focus-areas"
      ref={sectionRef}
      style={{
        background: 'var(--ahi-bg-tertiary)',
        padding: 'clamp(80px, 12vh, 160px) 0',
      }}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <span
            className="label-text block mb-4"
            style={{ color: 'var(--ahi-coral)' }}
          >
            WHAT WE DO
          </span>
          <h2
            className="section-heading mb-4"
            style={{ color: 'var(--ahi-text-dark)' }}
          >
            Focus Areas
          </h2>
          <p
            className="body-large max-w-[600px]"
            style={{ color: 'var(--ahi-text-muted)' }}
          >
            We tackle critical health challenges through artistic interventions.
          </p>
        </div>

        {/* Card Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {FOCUS_CARDS.map((card) => (
            <div key={card.index} className="focus-card group">
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: card.accentColor }}
              />
              <span
                className="absolute top-4 right-5 font-extrabold text-5xl leading-none pointer-events-none select-none"
                style={{ color: 'rgba(26, 26, 46, 0.06)' }}
              >
                {card.index}
              </span>
              <div className="relative z-[1]">
                <h3
                  className="card-title mb-3"
                  style={{ color: 'var(--ahi-text-dark)' }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: 'var(--ahi-text-muted)' }}
                >
                  {card.description}
                </p>
              </div>
              <img
                src={card.image}
                alt={card.title}
                className="focus-card-image"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
