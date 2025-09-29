import { motion } from 'framer-motion';
import '../styles/floating-cta.css';

const FloatingCTA = () => {
  return (
    <motion.a
      href="#inquiry"
      className="floating-cta"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      실시간 상담 요청
      <span aria-hidden>💌</span>
    </motion.a>
  );
};

export default FloatingCTA;
