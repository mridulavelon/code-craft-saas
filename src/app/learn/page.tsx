"use client";
import NavigationHeader from '@/components/NavigationHeader';
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen } from 'lucide-react';
import React from 'react'
import TechCard from './_components/Techcard';

function LearnPage() {

    const techStacks = [
        { id:1,label: "HTML", icon: "https://cdn.simpleicons.org/html5", route: "/learn/html" },
        { id:2,label: "CSS", icon: "https://cdn.simpleicons.org/css3", route: "/learn/css" },
        { id:3,label: "JavaScript", icon: "https://cdn.simpleicons.org/javascript", route: "/learn/javascript" },
        { id:4,label: "TypeScript", icon: "https://cdn.simpleicons.org/typescript", route: "/learn/typescript" },
        { id:5,label: "Python", icon: "https://cdn.simpleicons.org/python", route: "/learn/python" },
        { id:6,label: "Java", icon: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/181_Java_logo_logos-512.png", route: "/learn/java" },
        { id:7,label: "C", icon: "https://cdn.simpleicons.org/c", route: "/learn/c" },
        { id:8,label: "C++", icon: "https://cdn.simpleicons.org/cplusplus", route: "/learn/cplusplus" },
        { id:9,label: "C#", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Logo_C_sharp.svg/1820px-Logo_C_sharp.svg.png", route: "/learn/csharp" },
        { id:10,label: "Go", icon: "https://cdn.simpleicons.org/go", route: "/learn/go" },
        { id:11,label: "Rust", icon: "https://cdn.simpleicons.org/rust", route: "/learn/rust" },
        { id:12,label: "Swift", icon: "https://cdn.simpleicons.org/swift", route: "/learn/swift" },
        { id:13,label: "Kotlin", icon: "https://cdn.simpleicons.org/kotlin", route: "/learn/kotlin" },
        { id:14,label: "Dart", icon: "https://cdn.simpleicons.org/dart", route: "/learn/dart" },
        { id:15,label: "PHP", icon: "https://cdn.simpleicons.org/php", route: "/learn/php" },
        { id:16,label: "Ruby", icon: "https://cdn.simpleicons.org/ruby", route: "/learn/ruby" },
        { id:17,label: "Perl", icon: "https://cdn.simpleicons.org/perl", route: "/learn/perl" },
        { id:18,label: "R", icon: "https://cdn.simpleicons.org/r", route: "/learn/r" },
      ];
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
    <NavigationHeader />
    <div className="relative max-w-7xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r
           from-blue-500/10 to-purple-500/10 text-sm text-gray-400 mb-6"
        >
          <BookOpen className="w-4 h-4" />
          Interactive Learning Platform
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-4xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text mb-6"
        >
          Learn different technologies with ease
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-400 mb-8"
        >
          Choose from variety of programming languages and frameworks available
        </motion.p>
      </div>
      {/* Snippets Grid */}
      <motion.div
        className={`grid gap-6 "grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}
        layout
      >
        <AnimatePresence mode="popLayout">
          {techStacks.map((stack) => (
            <TechCard key={stack.id} stack={stack}/>
          ))}
        </AnimatePresence>
      </motion.div>     
    </div>
  </div>
  )
}

export default LearnPage;