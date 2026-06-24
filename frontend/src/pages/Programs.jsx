import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientText } from '../components/ui/GradientText';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Code, Terminal, Server, Brain, Clock, Users, ArrowRight } from 'lucide-react';

const domainIcons = {
  Python: <Terminal className="w-8 h-8 text-secondary" />,
  Java: <Code className="w-8 h-8 text-primary" />,
  Web: <Server className="w-8 h-8 text-success" />,
  AI: <Brain className="w-8 h-8 text-purple-400" />
};

export default function Programs() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch from /api/programs
    // For now, we simulate API response based on models
    setTimeout(() => {
      setPrograms([
        { _id: '1', name: 'Python Backend Development', domain: 'Python', capacity: 100, price: 4999 },
        { _id: '2', name: 'Enterprise Java Spring Boot', domain: 'Java', capacity: 50, price: 5999 },
        { _id: '3', name: 'MERN Stack Fullstack', domain: 'Web', capacity: 150, price: 6999 },
        { _id: '4', name: 'Applied AI & ML', domain: 'AI', capacity: 100, price: 7999 },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col items-center w-full min-h-screen py-24 px-4 relative">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl w-full z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Explore <GradientText>Programs</GradientText>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Choose your domain and start building real-world projects today.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard hoverEffect className="h-full flex flex-col p-8 border border-white/10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 bg-white/5 rounded-2xl shadow-inner border border-white/5">
                      {domainIcons[program.domain] || <Code className="w-8 h-8" />}
                    </div>
                    <span className="px-3 py-1 bg-success/20 text-success text-sm font-semibold rounded-full border border-success/30">
                      Open
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-2">{program.name}</h2>
                  <p className="text-gray-400 mb-6 flex-grow">
                    Intensive 30-day program focusing on {program.domain} development. Build 3 major projects and get industry-ready.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>30 Days</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Users className="w-4 h-4 text-secondary" />
                      <span>{program.capacity} Seats</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-white/10">
                    <div className="text-2xl font-bold">₹{program.price}</div>
                    <Link to={`/register?domain=${program.domain}`}>
                      <Button className="flex items-center gap-2 px-6">
                        Apply Now <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
