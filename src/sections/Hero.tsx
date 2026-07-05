import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

function LetterSplitter({
  text,
  delay,
  className,
}: {
  text: string;
  delay: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [letters, setLetters] = useState<string[]>([]);

  useEffect(() => {
    setLetters(text.split(''));
  }, [text]);

  useEffect(() => {
    if (!containerRef.current || letters.length === 0) return;

    const spans = containerRef.current.querySelectorAll('.letter');
    gsap.fromTo(
      spans,
      {
        opacity: 0,
        x: (i: number) => (i % 2 === 0 ? '-60vw' : '60vw'),
      },
      {
        opacity: 1,
        x: '0',
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.08,
        delay: delay,
      }
    );
  }, [letters, delay]);

  return (
    <span ref={containerRef} className={className}>
      {letters.map((char, i) => (
        <span
          key={i}
          className="letter inline-block"
          style={{ willChange: 'transform, opacity' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const sublineRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sublineRef.current) {
      gsap.fromTo(
        sublineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 1.4 }
      );
    }
    if (scrollIndicatorRef.current) {
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 2 }
      );
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--ahi-bg-primary)' }}
    >
      {/* Typography Grid */}
      <div className="flex flex-col items-center justify-center gap-0 pt-20 pb-10 px-4">
        <LetterSplitter text="ART" delay={0.4} className="hero-row" />
        <LetterSplitter text="FOR" delay={0.7} className="hero-row" />
        <LetterSplitter text="HEALTH" delay={1.0} className="hero-row" />

        {/* Subline with actual logo */}
        <div
          ref={sublineRef}
          className="flex items-center gap-4 mt-6"
          style={{ opacity: 0 }}
        >
          <div className="w-11 h-11 rounded-full overflow-hidden bg-ahi-coral flex items-center justify-center shrink-0 shadow-md">
            <img 
              src="/images/ahi-logo-red.jpg" 
              alt="AFHI Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className="font-semibold tracking-tight"
            style={{
              fontSize: 'clamp(18px, 2.5vw, 32px)',
              color: 'var(--ahi-text-dark)',
              letterSpacing: '-0.01em',
            }}
          >
            INITIATIVE
          </span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <div className="scroll-indicator-line">
          <div className="scroll-indicator-dot" />
        </div>
      </div>
    </section>
  );
}
