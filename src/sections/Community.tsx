import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const COMMUNITY_IMAGES = [
  '/images/event-03.jpg',
  '/images/event-05.jpg',
  '/images/event-06.jpg',
  '/images/event-07.jpg',
  '/images/event-08.jpg',
  '/images/event-10.jpg',
  '/images/event-11.jpg',
  '/images/event-12.jpg',
  '/images/event-14.jpg',
  '/images/event-16.jpg',
  '/images/event-17.jpg',
  '/images/event-18.jpg',
  '/images/event-19.jpg',
  '/images/event-02.jpg',
  '/images/event-04.jpg',
];

export default function Community() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
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

    if (gridRef.current) {
      const items = gridRef.current.children;
      Array.from(items).forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: i * 0.06,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }

    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          delay: 0.3,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="community"
      ref={sectionRef}
      style={{
        background: 'var(--ahi-bg-primary)',
        padding: 'clamp(80px, 12vh, 160px) 0 60px',
      }}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <span
            className="label-text block mb-4"
            style={{ color: 'var(--ahi-coral)' }}
          >
            OUR COMMUNITY
          </span>
          <h2
            className="section-heading"
            style={{ color: 'var(--ahi-text-dark)' }}
          >
            Real stories, real impact
          </h2>
        </div>

        {/* Image Grid - Masonry Style */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-12"
        >
          {COMMUNITY_IMAGES.map((img, i) => (
            <div
              key={i}
              className={`rounded-lg overflow-hidden ${
                i % 5 === 0 ? 'aspect-square' :
                i % 5 === 1 ? 'aspect-[3/4]' :
                i % 5 === 2 ? 'aspect-square' :
                i % 5 === 3 ? 'aspect-[3/4]' :
                'aspect-square'
              }`}
            >
              <img
                src={img}
                alt={`AFHI community event ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-400 hover:scale-[1.04]"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div ref={ctaRef} className="text-center mt-12" style={{ opacity: 0 }}>
          <p
            className="body-large mb-6"
            style={{ color: 'var(--ahi-text-muted)' }}
          >
            Follow our journey and join our community of artists, health workers, and changemakers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.instagram.com/artforhealthinitiative"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[28px] border text-sm font-semibold tracking-wide transition-all duration-300 hover:bg-ahi-text-dark hover:text-ahi-bg-primary hover:border-ahi-text-dark"
              style={{ borderColor: 'var(--ahi-text-dark)', color: 'var(--ahi-text-dark)' }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              Instagram
            </a>
            <a
              href="https://twitter.com/afh_initiative"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[28px] border text-sm font-semibold tracking-wide transition-all duration-300 hover:bg-ahi-text-dark hover:text-ahi-bg-primary hover:border-ahi-text-dark"
              style={{ borderColor: 'var(--ahi-text-dark)', color: 'var(--ahi-text-dark)' }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Twitter/X
            </a>
            <a
              href="mailto:ARTFORHEALTHINITIATIVE@GMAIL.COM"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[28px] bg-ahi-coral text-white text-sm font-semibold tracking-wide hover:bg-red-700 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
