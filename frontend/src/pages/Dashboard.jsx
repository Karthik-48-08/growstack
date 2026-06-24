import React, { useEffect, useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { GradientText } from '../components/ui/GradientText';
import { Button } from '../components/ui/Button';
import { PlayCircle, CheckCircle, Flame } from 'lucide-react';
import useSocketStore from '../lib/useSocketStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
  const socket = useSocketStore(state => state.socket);
  const isConnected = useSocketStore(state => state.isConnected);
  
  // Local state that would normally come from backend
  const [xp, setXp] = useState(450);
  const [streak, setStreak] = useState(5);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on('application_status_update', (data) => {
        setNotifications(prev => [...prev, { id: Date.now(), msg: `Application status: ${data.status}`, type: 'success' }]);
      });

      socket.on('progress_updated', (data) => {
        setXp(data.newXp);
        setStreak(data.newStreak);
        setNotifications(prev => [...prev, { id: Date.now(), msg: `Progress saved! +${data.newXp - xp} XP`, type: 'info' }]);
      });
      
      // Simulating a real-time event from admin for demo purposes
      setTimeout(() => {
        setNotifications(prev => [...prev, { id: Date.now(), msg: `Admin reviewed your code. Excellent work!`, type: 'info' }]);
      }, 5000);
    }
  }, [socket, xp]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 w-full relative">
      
      {/* Live Notifications Corner */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {notifications.map(notif => (
            <motion.div 
              key={notif.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="bg-black/80 border border-primary/50 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              {notif.msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            Welcome, Developer 
            <span className={`w-3 h-3 rounded-full ${isConnected ? 'bg-success' : 'bg-red-500'} inline-block`} title={isConnected ? 'Live' : 'Offline'} />
          </h1>
          <p className="text-gray-400">Your MERN Stack Internship is in progress.</p>
        </div>
        <GlassCard className="flex items-center gap-4 py-4 px-6">
          <div className="bg-orange-500/20 p-3 rounded-full">
            <Flame className="w-8 h-8 text-orange-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Daily Streak</p>
            <p className="text-2xl font-bold">{streak} Days</p>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <GlassCard>
            <h2 className="text-2xl font-bold mb-6">Current Progress</h2>
            <div className="mb-4 flex justify-between text-sm font-medium">
              <span>Overall Completion</span>
              <span className="text-primary">32%</span>
            </div>
            <ProgressBar progress={32} className="h-3" />
            <p className="text-gray-400 text-sm mt-4">You have completed 9 out of 30 days.</p>
          </GlassCard>

          <GlassCard>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Today's Task: <GradientText>Day 10</GradientText></h2>
              <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-bold rounded-full">Unlocked</span>
            </div>
            <h3 className="text-xl font-medium mb-4">Building the REST API with Express</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-gray-300">
                <PlayCircle className="w-5 h-5 text-secondary" /> Watch Video Lesson (45 mins)
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <CheckCircle className="w-5 h-5 text-gray-500" /> Complete MCQ Quiz
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <CheckCircle className="w-5 h-5 text-gray-500" /> Submit GitHub Repo Link
              </li>
            </ul>
            <Button className="w-full sm:w-auto">Start Day 10</Button>
          </GlassCard>
        </div>

        <div className="space-y-8">
          <GlassCard>
            <h2 className="text-xl font-bold mb-6">Your XP</h2>
            <div className="text-center py-6">
              <span className="text-6xl font-bold text-success">{xp}</span>
              <p className="text-gray-400 mt-2 text-sm uppercase tracking-widest">Experience Points</p>
            </div>
          </GlassCard>
          
          <GlassCard>
            <h2 className="text-xl font-bold mb-6">Recent Achievements</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-black/40 p-3 rounded-lg border border-glassBorder">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-xl">🚀</div>
                <div>
                  <p className="font-medium">First Project Deployed</p>
                  <p className="text-xs text-gray-400">Day 5</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-black/40 p-3 rounded-lg border border-glassBorder">
                <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center text-xl">🧠</div>
                <div>
                  <p className="font-medium">Perfect Quiz Score</p>
                  <p className="text-xs text-gray-400">Day 8</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
