"use client";
import NavigationHeader from "@/components/NavigationHeader";
import { Code, Share, BookOpen, Users, Rocket, MessageSquare } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative">
      {/* Hero Section */}
      <NavigationHeader />
      <section className="text-center py-24 px-6 relative">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-green-400 to-purple-500 bg-clip-text text-transparent">
          CodeCraft: Learn, Share & Build
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Explore an interactive coding experience, share snippets, and collaborate with developers worldwide.
        </p>
        <div className="mt-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-lg px-6 py-3 rounded-lg transition-transform transform hover:scale-105">
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-16 py-12">
        <FeatureCard
          icon={<Code className="w-10 h-10 text-white" />}
          title="Interactive Compiler"
          description="Write, test, and run code in multiple languages seamlessly."
          bgColor="bg-gradient-to-r from-blue-500 to-blue-700"
          hoverColor="hover:shadow-blue-500/50"
        />
        <FeatureCard
          icon={<Share className="w-10 h-10 text-white" />}
          title="Share Code Snippets"
          description="Easily share your code snippets with the developer community."
          bgColor="bg-gradient-to-r from-green-500 to-green-700"
          hoverColor="hover:shadow-green-500/50"
        />
        <FeatureCard
          icon={<BookOpen className="w-10 h-10 text-white" />}
          title="Learn & Explore"
          description="Access a library of curated code snippets to enhance your skills."
          bgColor="bg-gradient-to-r from-yellow-500 to-orange-600"
          hoverColor="hover:shadow-yellow-500/50"
        />
      </section>

      {/* Community Showcase Section */}
      <section className="py-16 px-6 md:px-16 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">🚀 Join the Developer Community</h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Thousands of developers are learning and sharing their best coding practices here. Be a part of it!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <FeatureCard
            icon={<Users className="w-12 h-12 text-white" />}
            title="100K+ Users"
            description="Trusted by developers worldwide."
            bgColor="bg-gradient-to-r from-purple-500 to-purple-700"
            hoverColor="hover:shadow-purple-500/50"
          />
          <FeatureCard
            icon={<Rocket className="w-12 h-12 text-white" />}
            title="Fast & Efficient"
            description="Run your code instantly with our powerful compiler."
            bgColor="bg-gradient-to-r from-indigo-500 to-indigo-700"
            hoverColor="hover:shadow-indigo-500/50"
          />
          <FeatureCard
            icon={<MessageSquare className="w-12 h-12 text-white" />}
            title="Active Discussions"
            description="Engage with developers and solve problems together."
            bgColor="bg-gradient-to-r from-teal-500 to-teal-700"
            hoverColor="hover:shadow-teal-500/50"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 md:px-16 bg-blue-700 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">🚀 Start Your Coding Journey Today!</h2>
        <p className="text-white max-w-3xl mx-auto">
          Whether you&apos;re a beginner or an expert, CodeCraft has something for everyone. Get started now and take your coding skills to the next level!
        </p>
        <div className="mt-6">
          <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition">
            Join Now
          </button>
        </div>
      </section>
    </div>
  );
}

// Feature Card Component
function FeatureCard({
  icon,
  title,
  description,
  bgColor,
  hoverColor,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
  bgColor: string;
  hoverColor: string;
}) {
  return (
    <div
      className={`${bgColor} rounded-lg p-6 text-center shadow-lg ${hoverColor} hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-gray-200 mt-2">{description}</p>
    </div>
  );
}
