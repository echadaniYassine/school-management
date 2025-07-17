// src/Layouts/LoadingSpinner.jsx

import { motion } from "framer-motion";

export default function LoadingSpinner({ text = "Loading Session..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <motion.div
        className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.p
        className="mt-4 text-teal-700 font-medium text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {text}
      </motion.p>
    </div>
  );
}
