import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useActiveSection } from '../../hooks/useActiveSection';
import styles from './Roster.module.css';

const companies = [
  { name: 'ANONYMOUS UK', url: '#' },
  { name: 'CABIN EDIT', url: '#' },
  { name: 'ENTOURAGE', url: '#' },
  { name: 'SPINDLE', url: '#' },
  { name: 'SYSTMS', url: '#' },
  { name: 'WAKE THE TOWN', url: '#' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function Roster() {
  const sectionRef = useActiveSection('roster');
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.3 });

  return (
    <section id="roster" ref={sectionRef} className={`section ${styles.roster}`}>
      <motion.div
        ref={contentRef}
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <ul className={styles.companyList}>
          {companies.map((company) => (
            <motion.li key={company.name} variants={itemVariants}>
              <a
                href={company.url}
                className={styles.companyLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {company.name}
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
