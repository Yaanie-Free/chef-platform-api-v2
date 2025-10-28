import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function AnimatedLogo() {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Set animation as complete after initial sequence
    const timer = setTimeout(() => setAnimationComplete(true), 4500);
    return () => clearTimeout(timer);
  }, []);

  // Elegant sauce dots positions (like fine dining plating)
  const sauceDots = [
    { x: 320, y: 45, size: 3, delay: 3.2 },
    { x: 335, y: 52, size: 2, delay: 3.3 },
    { x: 345, y: 48, size: 2.5, delay: 3.4 },
    { x: 310, y: 70, size: 2, delay: 3.5 },
    { x: 355, y: 65, size: 3, delay: 3.6 },
  ];

  // Sauce drips/residue from ampersand to P
  const residueDrops = [
    { x1: 280, y1: 75, x2: 315, y2: 55, delay: 2.8 },
    { x1: 285, y1: 78, x2: 320, y2: 58, delay: 2.9 },
    { x1: 290, y1: 80, x2: 325, y2: 60, delay: 3.0 },
  ];

  return (
    <div className="relative inline-block">
      <svg
        width="600"
        height="120"
        viewBox="0 0 600 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* TABLE text - static */}
        <motion.text
          x="20"
          y="70"
          fontSize="56"
          fontWeight="700"
          fill="white"
          fontFamily="Futura, Futura PT, Avenir Next, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          TABLE
        </motion.text>

        {/* Animated Ampersand - drawn like sauce being plated */}
        <motion.path
          d="M 240 35 Q 255 25, 270 35 Q 280 45, 275 60 Q 270 75, 255 80 Q 245 83, 235 78 Q 225 73, 225 60 Q 225 45, 240 35 M 255 65 Q 265 55, 280 65 Q 290 75, 285 90"
          stroke="url(#pinkGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 2.5, ease: "easeInOut" },
            opacity: { duration: 0.3 }
          }}
          style={{ filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.4))' }}
        />

        {/* Filled ampersand that appears after drawing */}
        <motion.text
          x="228"
          y="82"
          fontSize="72"
          fontWeight="400"
          fill="url(#pinkGradient)"
          fontFamily="'Brush Script MT', cursive"
          style={{ 
            fontStyle: 'italic',
            filter: 'drop-shadow(0 0 12px rgba(236, 72, 153, 0.3))'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.3 }}
        >
          &
        </motion.text>

        {/* Sauce residue drops flowing from & to P */}
        {residueDrops.map((drop, i) => (
          <motion.line
            key={`residue-${i}`}
            x1={drop.x1}
            y1={drop.y1}
            x2={drop.x2}
            y2={drop.y2}
            stroke="url(#pinkGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{
              duration: 0.6,
              delay: drop.delay,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Residue dots on P */}
        {[
          { cx: 315, cy: 55, r: 1.5, delay: 3.1 },
          { cx: 320, cy: 58, r: 1, delay: 3.15 },
          { cx: 325, cy: 60, r: 1.2, delay: 3.2 },
        ].map((dot, i) => (
          <motion.circle
            key={`p-dot-${i}`}
            cx={dot.cx}
            cy={dot.cy}
            r={dot.r}
            fill="url(#pinkGradient)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{
              duration: 0.4,
              delay: dot.delay,
              ease: "backOut"
            }}
          />
        ))}

        {/* PLATE text */}
        <motion.text
          x="310"
          y="70"
          fontSize="56"
          fontWeight="700"
          fill="white"
          fontFamily="Futura, Futura PT, Avenir Next, sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          PLATE
        </motion.text>

        {/* Elegant sauce dots around PLATE (fine dining style) */}
        {sauceDots.map((dot, i) => (
          <motion.circle
            key={`sauce-dot-${i}`}
            cx={dot.x}
            cy={dot.y}
            r={dot.size}
            fill="url(#pinkGradient)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{
              duration: 0.5,
              delay: dot.delay,
              ease: "backOut"
            }}
          />
        ))}

        {/* Small decorative elements around PLATE (like herbs/garnish) */}
        <motion.circle
          cx="530"
          cy="45"
          r="2.5"
          fill="rgba(34, 197, 94, 0.6)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 0.4, delay: 3.7 }}
        />
        <motion.circle
          cx="538"
          cy: "50"
          r="1.8"
          fill="rgba(34, 197, 94, 0.5)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 0.4, delay: 3.75 }}
        />
        
        {/* Subtle sparkle effects */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 2,
            delay: 4,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          <line x1="265" y1="30" x2="265" y2="38" stroke="white" strokeWidth="1" opacity="0.4" />
          <line x1="261" y1="34" x2="269" y2="34" stroke="white" strokeWidth="1" opacity="0.4" />
        </motion.g>

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
        </defs>
      </svg>

      {/* Subtle glow effect behind logo */}
      <motion.div
        className="absolute inset-0 -z-10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.5, delay: 2 }}
        style={{
          background: 'radial-gradient(circle at 40% 50%, rgba(236, 72, 153, 0.3), transparent 70%)'
        }}
      />
    </div>
  );
}
