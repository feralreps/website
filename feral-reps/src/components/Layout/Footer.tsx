import { useNavigation } from '../../context/NavigationContext';
import styles from './Footer.module.css';

export function Footer() {
  const { activeSection } = useNavigation();
  const isVisible = activeSection !== 'home';

  return (
    <footer className={`${styles.footer} ${isVisible ? styles.visible : ''}`}>
      <img
        src="/assets/FERAL_REPS_LOGO.svg"
        alt="FERAL REPS"
        className={styles.logo}
      />
    </footer>
  );
}
