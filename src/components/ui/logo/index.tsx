"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import styles from './logo.module.css';

export function Logo() {
  const router = useRouter();

  return (
    <motion.div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => router.push('/')}
      whileHover={{ scale: 1.05 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 10
      }}
    >
      <div className={styles.logoContainer}>
        <Image
          src="/logo.svg"
          alt="Karin App Logo"
          width={32}
          height={32}
          className={styles.logo}
        />
      </div>
      <motion.span
        className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        whileHover={{
          backgroundImage: "linear-gradient(45deg, #3b82f6, #9333ea, #3b82f6)",
          backgroundSize: "200%",
          backgroundPosition: ["0%", "200%"]
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        Karin App
      </motion.span>
    </motion.div>
  );
} 