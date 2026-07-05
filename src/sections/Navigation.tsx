import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const NAV_LINKS = [
  { label: 'Mission', href: '#mission' },
  { label: 'Focus Areas', href: '#focus-areas' },
  { label: 'Objectives', href: '#objectives' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Community', href: '#community' },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.fromTo(
      nav,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );

    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-4 left-0 right-0 z-[1000] px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
        scrolled ? 'nav-glass-scrolled' : ''
      }`}
      style={{ opacity: 0 }}
    >
      <div className="mx-auto max-w-[1280px]">
        <div
          className={`nav-glass flex items-center justify-between h-14 px-4 sm:px-6 rounded-[28px] transition-all duration-300 ${
            scrolled ? 'nav-glass-scrolled' : ''
          }`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="w-9 h-9 rounded-full overflow-hidden bg-ahi-coral flex items-center justify-center shrink-0">
              <img src="/images/ahi-logo-red.jpg" alt="AFHI" className="w-full h-full object-cover" />
            </div>
            <span className="hidden sm:block text-sm font-semibold text-ahi-text-dark truncate">
              Art For Health Initiative
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`label-text transition-colors duration-200 ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-ahi-coral border-b-2 border-ahi-coral pb-0.5'
                    : 'text-ahi-text-dark hover:text-ahi-coral'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="mailto:ARTFORHEALTHINITIATIVE@GMAIL.COM"
            className="hidden md:inline-flex items-center px-5 lg:px-6 py-2.5 rounded-[20px] bg-ahi-coral text-white text-sm font-semibold tracking-wide hover:bg-red-700 transition-colors duration-200"
          >
            Donate
          </a>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-ahi-coral transition-transform duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-ahi-coral transition-opacity duration-300 ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-ahi-coral transition-transform duration-300 ${
                mobileOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden mt-2 nav-glass rounded-2xl p-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="label-text text-ahi-text-dark hover:text-ahi-coral py-2 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:ARTFORHEALTHINITIATIVE@GMAIL.COM"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-[20px] bg-ahi-coral text-white text-sm font-semibold tracking-wide mt-2"
            >
              Donate
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
