import { useActiveSection } from '../../hooks/useActiveSection';
import styles from './Home.module.css';

export function Home() {
  const sectionRef = useActiveSection('home');

  return (
    <section id="home" ref={sectionRef} className={`section ${styles.home}`}>
      <video
        className={styles.videoBackground}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/assets/FERAL_LOGO_LOOP.mp4" type="video/mp4" />
      </video>

      <footer className={styles.footer}>
        <span>FERAL REPS LTD - LONDON - EST. 2026</span>
      </footer>
    </section>
  );
}
