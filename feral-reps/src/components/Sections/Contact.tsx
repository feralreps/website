import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useActiveSection } from '../../hooks/useActiveSection';
import styles from './Contact.module.css';

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

export function Contact() {
  const sectionRef = useActiveSection('contact');
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.3 });

  return (
    <section id="contact" ref={sectionRef} className={`section ${styles.contact}`}>
      <motion.div
        ref={contentRef}
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h2 className={styles.name} variants={itemVariants}>
          Emily Jordan-Wilson
        </motion.h2>

        <motion.a
          href="mailto:emily@feralreps.com"
          className={styles.email}
          variants={itemVariants}
        >
          emily@feralreps.com
        </motion.a>
      </motion.div>
    </section>
  );
}
