"use client";
import { motion } from "framer-motion";
import Link from "next/link";

function TechCard({ stack }: { stack: any }) {
  return (
    <motion.div
      layout
      className="group relative"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={stack.route} className="h-full block">
        <div
          className="relative h-full bg-[#1e1e2e]/80 backdrop-blur-sm rounded-xl 
          border border-[#313244]/50 hover:border-[#313244] 
          transition-all duration-300 overflow-hidden"
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-center items-center mb-4">
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20 
                  group-hover:opacity-30 transition-all duration-500"
                    area-hidden="true"
                  />
                  <div
                    className="relative p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20
                   group-hover:to-purple-500/20 transition-all duration-500"
                  >
                    <img
                      src={stack.icon}
                      alt={`${stack.label} logo`}
                      className="w-12 h-12 object-contain relative z-10"
                      width={50}
                      height={50}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-2xl font-semibold">
                    {stack.label}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
export default TechCard;
