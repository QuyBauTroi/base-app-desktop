import { motion } from "framer-motion";
import { useSplashViewModel } from "@/viewmodels/splash/useSplashViewModel";

export function SplashView() {
  useSplashViewModel();

  return (
    <div className="flex h-screen w-full items-center justify-center bg-(--bg-base)">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-24 h-24 bg-linear-to-tr from-(--color-primary) to-emerald-400 rounded-[28px] shadow-lg flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
            <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
          </svg>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold tracking-tight text-(--text-main)"
        >
          App Desktop Base
        </motion.h1>
      </motion.div>
    </div>
  );
}
