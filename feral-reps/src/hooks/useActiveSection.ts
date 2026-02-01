import { useEffect, useRef } from 'react';
import { useNavigation } from '../context/NavigationContext';

type SectionId = 'home' | 'about' | 'roster' | 'contact';

export function useActiveSection(sectionId: SectionId) {
  const { setActiveSection } = useNavigation();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveSection(sectionId);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [sectionId, setActiveSection]);

  return sectionRef;
}
