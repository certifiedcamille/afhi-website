import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VIDEOS = [
  {
    id: 'FhNnR3VQMrk',
    title: 'AFHI Event Highlight',
  },
  {
    id: 'ppdn7qFkL6M',
    title: 'Art For Health Initiative Campaign',
  },
];

export default function Videos() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="videos"
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
            MEDIA
          </span>
          <h2
            className="section-heading mb-4"
            style={{ color: 'var(--ahi-text-dark)' }}
          >
            Watch Our Impact
          </h2>
          <p
            className="body-large max-w-[600px]"
            style={{ color: 'var(--ahi-text-muted)' }}
          >
            See how we bridge health and creativity through our campaigns and community events.
          </p>
        </div>

        {/* Video Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {VIDEOS.map((video) => (
            <div key={video.id} className="group">
              <div
                className="relative rounded-2xl overflow-hidden bg-black aspect-video shadow-lg"
              >
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                />
              </div>
              <h3
                className="card-title mt-4"
                style={{ color: 'var(--ahi-text-dark)' }}
              >
                {video.title}
              </h3>
            </div>
          ))}
        </div>

        {/* YouTube Channel Link */}
        <div className="mt-10 text-center">
          <a
            href="https://www.youtube.com/watch?v=FhNnR3VQMrk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-[28px] border text-sm font-semibold tracking-wide transition-all duration-300 hover:bg-ahi-text-dark hover:text-ahi-bg-primary hover:border-ahi-text-dark"
            style={{ borderColor: 'var(--ahi-text-dark)', color: 'var(--ahi-text-dark)' }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            View More on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
