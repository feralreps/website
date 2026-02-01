import { useEffect, useRef } from 'react';
import { useNavigation, SECTIONS, type SectionId } from '../context/NavigationContext';

const SCROLL_DURATION = 900;
const SCROLL_COOLDOWN = 1000;

// Gentle ease-out curve - decelerates smoothly
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export function useSmoothScroll(containerRef: React.RefObject<HTMLDivElement | null>) {
  const { activeSection, setActiveSection, registerContainer } = useNavigation();
  const isAnimatingRef = useRef(false);
  const currentIndexRef = useRef(0);
  const touchStartRef = useRef(0);

  // Register container with context
  useEffect(() => {
    registerContainer(containerRef);
  }, [containerRef, registerContainer]);

  // Find current section index
  useEffect(() => {
    const index = SECTIONS.indexOf(activeSection);
    if (index !== -1) {
      currentIndexRef.current = index;
    }
  }, [activeSection]);

  // Scroll to a specific section index
  const scrollToIndex = (index: number) => {
    if (index < 0 || index >= SECTIONS.length || isAnimatingRef.current) return;
    if (index === currentIndexRef.current) return;

    const container = containerRef.current;
    if (!container) return;

    isAnimatingRef.current = true;
    const startY = container.scrollTop;
    const targetY = index * window.innerHeight;
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
        currentIndexRef.current = index;
        setActiveSection(SECTIONS[index] as SectionId);
        setTimeout(() => {
          isAnimatingRef.current = false;
        }, SCROLL_COOLDOWN - SCROLL_DURATION);
      }
    }

    requestAnimationFrame(animate);
  };

  // Handle wheel events
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let accumulatedDelta = 0;
    let deltaTimeout: number;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isAnimatingRef.current) return;

      // Accumulate delta for smoother detection
      accumulatedDelta += e.deltaY;

      clearTimeout(deltaTimeout);
      deltaTimeout = window.setTimeout(() => {
        accumulatedDelta = 0;
      }, 100);

      // Threshold to trigger scroll
      if (Math.abs(accumulatedDelta) > 50) {
        const direction = accumulatedDelta > 0 ? 1 : -1;
        const nextIndex = currentIndexRef.current + direction;
        scrollToIndex(nextIndex);
        accumulatedDelta = 0;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      clearTimeout(deltaTimeout);
    };
  }, [containerRef, setActiveSection]);

  // Handle touch events
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimatingRef.current) return;

      const touchEnd = e.changedTouches[0].clientY;
      const diff = touchStartRef.current - touchEnd;

      // Minimum swipe distance
      if (Math.abs(diff) > 50) {
        const direction = diff > 0 ? 1 : -1;
        const nextIndex = currentIndexRef.current + direction;
        scrollToIndex(nextIndex);
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [containerRef, setActiveSection]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimatingRef.current) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        scrollToIndex(currentIndexRef.current + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToIndex(currentIndexRef.current - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToIndex(SECTIONS.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return { scrollToIndex, currentIndex: currentIndexRef.current };
}
