import React from 'react';
import { motion } from 'framer-motion';
import { GradientText } from '../components/ui/GradientText';
import { GlassCard } from '../components/ui/GlassCard';

export default function Success() {
  const stories = [
    { name: "Rahul S.", role: "SDE-1 at Amazon", image: "https://i.pravatar.cc/150?u=rahul", review: "GrowStack's MERN stack program completely changed my trajectory. The projects I built here got me through the resume screening!" },
    { name: "Priya M.", role: "Backend Engineer at startup", image: "https://i.pravatar.cc/150?u=priya", review: "The Java Spring Boot curriculum is top-notch. It covers exactly what industry demands right now." },
    { name: "Amit K.", role: "AI Researcher", image: "https://i.pravatar.cc/150?u=amit", review: "Transitioning to AI was seamless. The hands-on labs and real-time dashboard kept me motivated." }
  ];

  return (
    <div className="flex flex-col items-center w-full min-h-screen py-24 px-4 relative">
      <div className="max-w-7xl w-full z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Student <GradientText>Success</GradientText>
          </motion.h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our alumni are working at top companies around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-8 h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 text-6xl text-white/5 font-serif font-bold leading-none">"</div>
                <p className="text-gray-300 italic mb-8 relative z-10 flex-grow">
                  "{story.review}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <img src={story.image} alt={story.name} className="w-12 h-12 rounded-full border-2 border-primary" />
                  <div>
                    <h4 className="font-bold text-white">{story.name}</h4>
                    <p className="text-sm text-primary">{story.role}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
