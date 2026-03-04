import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView.ts';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  const [ref, inView] = useInView();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <h2 className="text-3xl font-bold text-[#1d1d1f] tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-[15px] text-[#6e6e73] mt-1.5">{subtitle}</p>
      )}
    </motion.div>
  );
}
