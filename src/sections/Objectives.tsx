import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OBJECTIVES = [
  {
    title: 'Health Education',
    body: 'We promote health education and awareness using visual, performing, and digital arts across diverse communities.',
  },
  {
    title: 'Behavior Change',
    body: 'We support behavior change communication on key public health issues — from mental health to infectious diseases.',
  },
  {
    title: 'Community Engagement',
    body: 'We organize exhibitions, workshops, and creative campaigns that make health information accessible and actionable.',
  },
  {
    title: 'Youth Empowerment',
    body: 'We empower young artists and communicators with the skills to use their talents for health advocacy.',
  },
  {
    title: 'Policy & Research',
    body: 'We produce creative educational materials and support policy dialogue on innovative public health communication.',
  },
];

export default function Objectives() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const slides = slidesRef.current;
    const progress = progressRef.current;
    const indexDisplay = indexRef.current;
    if (!section || !container || !slides || !progress || !indexDisplay) return;

    const slideElements = slides.querySelectorAll('.objective-slide');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=300%',
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          // Update progress bar
          gsap.set(progress, { width: `${self.progress * 100}%` });

          // Update index display
          const activeIdx = Math.min(
            Math.floor(self.progress * OBJECTIVES.length),
            OBJECTIVES.length - 1
          );
          indexDisplay.textContent = `${String(activeIdx + 1).padStart(2, '0')} / ${String(OBJECTIVES.length).padStart(2, '0')}`;
        },
      },
    });

    // Each slide gets 20% of timeline: 5% enter, 10% hold, 5% exit
    const slideDuration = 0.2;
    const enterDuration = 0.05;
    const exitDuration = 0.05;

    slideElements.forEach((slide, i) => {
      const start = i * slideDuration;

      // Entrance
      tl.fromTo(
        slide,
        { opacity: 0, y: 40, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: enterDuration,
          ease: 'none',
        },
        start
      );

      // Exit
      tl.to(
        slide,
        {
          opacity: 0,
          y: -30,
          duration: exitDuration,
          ease: 'none',
        },
        start + slideDuration - exitDuration
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="objectives"
      ref={sectionRef}
      className="relative"
      style={{
        background: 'var(--ahi-bg-secondary)',
        minHeight: '100vh',
      }}
    >
      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(232, 70, 39, 0.08) 0%, transparent 70%)',
        }}
      />

      <div
        ref={containerRef}
        className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      >
        {/* Label */}
        <span
          className="label-text absolute top-20 left-1/2 -translate-x-1/2"
          style={{ color: 'var(--ahi-coral)' }}
        >
          OUR OBJECTIVES
        </span>

        {/* Slides */}
        <div ref={slidesRef} className="relative w-full h-full">
          {OBJECTIVES.map((obj, i) => (
            <div key={i} className="objective-slide">
              <div className="text-center px-6 max-w-[800px] mx-auto">
                <h2
                  className="section-heading mb-6"
                  style={{ color: 'var(--ahi-text-light)' }}
                >
                  {obj.title}
                </h2>
                <p
                  className="body-large max-w-[640px] mx-auto"
                  style={{ color: 'var(--ahi-text-muted-light)' }}
                >
                  {obj.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Index Display */}
        <div
          ref={indexRef}
          className="label-text absolute bottom-20 left-1/2 -translate-x-1/2"
          style={{ color: 'var(--ahi-text-muted-light)', opacity: 0.5 }}
        >
          01 / 05
        </div>

        {/* Progress Bar */}
        <div
          className="absolute bottom-32 left-1/2 -translate-x-1/2 w-[200px] h-0.5 rounded-full overflow-hidden"
          style={{ background: 'rgba(250, 246, 238, 0.2)' }}
        >
          <div
            ref={progressRef}
            className="h-full rounded-full"
            style={{
              background: 'var(--ahi-coral)',
              width: '0%',
            }}
          />
        </div>
      </div>
    </section>
  );
}
