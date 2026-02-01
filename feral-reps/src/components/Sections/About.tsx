import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useActiveSection } from '../../hooks/useActiveSection';
import styles from './About.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function About() {
  const sectionRef = useActiveSection('about');
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.3 });

  return (
    <section id="about" ref={sectionRef} className={`section ${styles.about}`}>
      <motion.div
        ref={contentRef}
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h1 className={styles.heading} variants={itemVariants}>
          WELCOME TO FERAL
        </motion.h1>

        <motion.p className={styles.tagline} variants={itemVariants}>
          A CURATED CIRCLE OF PRODUCTION PARTNERS WHO DON'T JUST PLAY THE GAME, THEY REWRITE THE RULES.
        </motion.p>

        <motion.p className={styles.description} variants={itemVariants}>
          WE BRING TOGETHER THE BOLDEST, MOST ORIGINAL MINDS IN PRODUCTION, POST, MUSIC & TALENT. PEOPLE WITH BITE, VISION, AND A SHARED INSTINCT FOR DOING THINGS DIFFERENTLY. EVERY FERAL COMPANY IS HANDPICKED BECAUSE THEY LIVE AND BREATHE THE SAME CREATIVE ENERGY AND VALUES.
        </motion.p>

        <motion.p className={styles.statement} variants={itemVariants}>
          THIS ISN'T ABOUT COMPETITION OR CONFORMITY, IT'S ABOUT CONNECTION.
        </motion.p>

        <motion.p className={styles.closing} variants={itemVariants}>
          FERAL IS FOR THE FEARLESS, THE ONES WHO LEAD WITH INSTINCT, CREATE WITH CONVICTION, AND NEVER FOLLOW THE HERD.
        </motion.p>
      </motion.div>
    </section>
  );
}
