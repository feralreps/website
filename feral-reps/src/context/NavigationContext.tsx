import { createContext, useContext, useState, useCallback, useRef, type ReactNode, type RefObject } from 'react';

type SectionId = 'home' | 'about' | 'roster' | 'contact';
const SECTIONS: SectionId[] = ['home', 'about', 'roster', 'contact'];
const SCROLL_DURATION = 900;

interface NavigationContextType {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
  scrollToSection: (section: SectionId) => void;
  registerContainer: (ref: RefObject<HTMLDivElement | null>) => void;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}

// Gentle ease-out curve - decelerates smoothly without speeding up at the end
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrollingRef = useRef(false);
  const containerRef = useRef<RefObject<HTMLDivElement | null> | null>(null);

  const registerContainer = useCallback((ref: RefObject<HTMLDivElement | null>) => {
    containerRef.current = ref;
  }, []);

  const scrollToSection = useCallback((section: SectionId) => {
    const container = containerRef.current?.current;
    if (!container || isScrollingRef.current) {
      setIsMenuOpen(false);
      return;
    }

    const sectionIndex = SECTIONS.indexOf(section);
    if (sectionIndex === -1) return;

    isScrollingRef.current = true;
    const startY = container.scrollTop;
    const targetY = sectionIndex * window.innerHeight;
    const difference = targetY - startY;
    const startTime = performance.now();
    const scrollContainer = container; // Capture for closure

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / SCROLL_DURATION, 1);
      const easedProgress = easeOutQuart(progress);

      scrollContainer.scrollTop = startY + difference * easedProgress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setActiveSection(section);
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 100);
      }
    }

    requestAnimationFrame(animate);
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        activeSection,
        setActiveSection,
        scrollToSection,
        registerContainer,
        isMenuOpen,
        toggleMenu,
        closeMenu,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}

export { SECTIONS, type SectionId };
