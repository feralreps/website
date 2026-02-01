import { useRef, type ReactNode } from 'react';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import styles from './ScrollContainer.module.css';

interface ScrollContainerProps {
  children: ReactNode;
}

export function ScrollContainer({ children }: ScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useSmoothScroll(containerRef);

  return (
    <div ref={containerRef} className={styles.container}>
      {children}
    </div>
  );
}
