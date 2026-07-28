"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative py-8 px-6 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center">
              <span className="text-primary font-bold text-sm">AF</span>
            </div>
            <span className="text-muted-foreground text-sm">
              Asaph Felix © {new Date().getFullYear()}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-1 text-muted-foreground text-sm"
          >
            Fait avec{" "}
            <Heart size={14} className="text-primary fill-primary animate-pulse" />{" "}
            en Côte d&apos;Ivoire
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-sm"
          >
            <span className="font-mono text-primary">&lt;/&gt;</span> avec React &
            Three.js
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
