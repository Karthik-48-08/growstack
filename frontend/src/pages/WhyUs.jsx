import React from 'react';
import { motion } from 'framer-motion';
import { GradientText } from '../components/ui/GradientText';
import { GlassCard } from '../components/ui/GlassCard';
import { Trophy, Target, Users, Zap } from 'lucide-react';

export default function WhyUs() {
  const features = [
    { icon: <Target className="w-10 h-10 text-primary" />, title: "Industry Aligned", desc: "Curriculum designed by experts working in top tech companies." },
    { icon: <Zap className="w-10 h-10 text-secondary" />, title: "Real-time Feedback", desc: "Instant code reviews and live mentorship sessions." },
    { icon: <Trophy className="w-10 h-10 text-success" />, title: "Project Based", desc: "Learn by building. Graduate with a portfolio of 3 major projects." },
    { icon: <Users className="w-10 h-10 text-purple-400" />, title: "Community Driven", desc: "Join thousands of peers. Network, collaborate, and grow together." },
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
            Why Choose <GradientText>GrowStack</GradientText>?
          </motion.h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We are redefining technical education with a focus on real-world skills and immediate employability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-8 flex gap-6 items-start h-full">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
