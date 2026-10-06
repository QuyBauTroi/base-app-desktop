import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

// Animated network node component
function NetworkNode({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-(--color-primary)/20 blur-sm"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Connection line between nodes
function ConnectionLine({ x1, y1, x2, delay }: { x1: string; y1: string; x2: string; delay: number }) {
  return (
    <motion.div
      className="absolute h-px bg-linear-to-r from-transparent via-(--color-primary)/30 to-transparent origin-left"
      style={{
        left: x1,
        top: y1,
        width: `calc(${x2} - ${x1})`,
        transform: `rotate(${Math.random() * 30 - 15}deg)`,
      }}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: [0, 0.5, 0] }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-y-auto bg-(--bg-layer-1) py-8">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary gradient orb */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-(--color-primary)/10 blur-3xl"
          style={{ left: "-10%", top: "-20%" }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Secondary gradient orb */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-emerald-500/8 blur-3xl"
          style={{ right: "-10%", bottom: "-10%" }}
          animate={{
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Tertiary accent */}
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-3xl"
          style={{ right: "30%", top: "10%" }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* IoT Network nodes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <NetworkNode delay={0} x="10%" y="20%" size={8} />
        <NetworkNode delay={0.5} x="85%" y="15%" size={6} />
        <NetworkNode delay={1} x="75%" y="70%" size={10} />
        <NetworkNode delay={1.5} x="15%" y="75%" size={7} />
        <NetworkNode delay={2} x="50%" y="10%" size={5} />
        <NetworkNode delay={2.5} x="90%" y="50%" size={8} />
        <NetworkNode delay={3} x="5%" y="45%" size={6} />
        <NetworkNode delay={0.3} x="40%" y="85%" size={9} />
        <NetworkNode delay={1.2} x="60%" y="30%" size={7} />
        <NetworkNode delay={2.2} x="25%" y="55%" size={5} />
      </div>

      {/* Connection lines (simulating IoT network) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
        <ConnectionLine x1="10%" y1="20%" x2="50%" delay={0} />
        <ConnectionLine x1="85%" y1="15%" x2="60%" delay={1} />
        <ConnectionLine x1="15%" y1="75%" x2="40%" delay={2} />
        <ConnectionLine x1="75%" y1="70%" x2="90%" delay={3} />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,140,79,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,140,79,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-(--color-primary)/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-sm p-4">
        {children}
      </div>

      {/* Bottom tech decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-(--color-primary)/20 to-transparent" />
    </div>
  );
}
