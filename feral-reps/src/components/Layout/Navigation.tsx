import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../../context/NavigationContext';
import styles from './Navigation.module.css';

const navItems = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'roster', label: 'ROSTER' },
  { id: 'contact', label: 'CONTACT' },
] as const;

export function Navigation() {
  const { activeSection, scrollToSection, isMenuOpen, toggleMenu, closeMenu } = useNavigation();
  const isLightBackground = activeSection !== 'home';

  return (
    <>
      <nav className={`${styles.nav} ${isLightBackground ? styles.light : ''}`}>
        <div className={styles.navContent}>
          {/* Desktop Navigation */}
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
                  onClick={() => scrollToSection(item.id)}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Social Icons */}
          <div className={styles.socialIcons}>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={styles.socialLink}
            >
              <img src="/assets/linkedin.svg" alt="" width="24" height="24" />
            </a>
            <a
              href="https://www.instagram.com/feralreps"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={styles.socialLink}
            >
              <img src="/assets/instagram.svg" alt="" width="24" height="24" />
            </a>
          </div>

          {/* Hamburger Button (Mobile) */}
          <button
            className={`${styles.hamburger} ${isLightBackground ? styles.light : ''}`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ''}`} />
            <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ''}`} />
            <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ul className={styles.mobileNavList}>
              {navItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    className={`${styles.mobileNavLink} ${activeSection === item.id ? styles.active : ''}`}
                    onClick={() => {
                      scrollToSection(item.id);
                      closeMenu();
                    }}
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>

            <div className={styles.mobileSocial}>
              <a href="#" aria-label="LinkedIn" className={styles.socialLink}>
                <img src="/assets/linkedin.svg" alt="" width="32" height="32" />
              </a>
              <a href="https://www.instagram.com/feralreps" aria-label="Instagram" className={styles.socialLink}>
                <img src="/assets/instagram.svg" alt="" width="32" height="32" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
