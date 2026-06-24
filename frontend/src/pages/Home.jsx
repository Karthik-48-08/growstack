import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { GradientText } from '../components/ui/GradientText';
import { GlassCard } from '../components/ui/GlassCard';
import { Code, Server, Brain, Terminal } from 'lucide-react';

export default function Home() {
  const domains = [
    { title: "Python Development", icon: <Terminal className="w-8 h-8 text-secondary" />, duration: "30 Days", desc: "Master Python from basics to advanced APIs." },
    { title: "Java Development", icon: <Code className="w-8 h-8 text-primary" />, duration: "45 Days", desc: "Build enterprise-grade applications." },
    { title: "Web Development", icon: <Server className="w-8 h-8 text-success" />, duration: "60 Days", desc: "MERN Stack from scratch to production." },
    { title: "AI & Machine Learning", icon: <Brain className="w-8 h-8 text-purple-400" />, duration: "45 Days", desc: "Train models and deploy AI applications." },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/20 blur-[100px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Build Skills. Build Projects. <br />
            <GradientText>Build Your Future.</GradientText>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join internship programs designed to help students gain practical skills, build real-world projects, and create a portfolio employers notice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" className="text-lg px-8 py-4">Start Internship</Button>
            <Button variant="outline" className="text-lg px-8 py-4">Explore Programs</Button>
          </div>
        </motion.div>
      </section>

      {/* Internship Domains Section */}
      <section className="w-full max-w-7xl px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Choose Your <GradientText>Domain</GradientText></h2>
          <p className="text-gray-400">Structured programs designed for industry readiness.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {domains.map((domain, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard hoverEffect className="h-full flex flex-col items-start text-left">
                <div className="p-3 bg-white/5 rounded-xl mb-4">
                  {domain.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{domain.title}</h3>
                <p className="text-gray-400 mb-4 flex-grow">{domain.desc}</p>
                <div className="w-full flex justify-between items-center mt-auto pt-4 border-t border-glassBorder">
                  <span className="text-sm font-medium text-gray-500">{domain.duration}</span>
                  <span className="text-sm font-medium text-success">Certificate</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
