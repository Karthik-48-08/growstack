import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientText } from '../components/ui/GradientText';
import { Button } from '../components/ui/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useSocketStore from '../lib/useSocketStore';

export default function RegisterApplication() {
  const [searchParams] = useSearchParams();
  const initialDomain = searchParams.get('domain') || 'Web';
  const navigate = useNavigate();
  const socket = useSocketStore(state => state.socket);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    domain: initialDomain,
    firstName: '',
    lastName: '',
    college: '',
    degree: '',
    hasLaptop: false,
    hasInternet: false
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Simulate API submit
      console.log("Submitting:", formData);
      // If socket connected, emit application_submitted event to admins
      if (socket) {
        socket.emit('application_submitted', formData);
      }
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-24 px-4 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl z-10"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Application <GradientText>Form</GradientText></h1>
          <p className="text-gray-400">Step {step} of 3</p>
          <div className="w-full bg-black/40 h-2 rounded-full mt-4 border border-white/10 overflow-hidden">
            <div 
              className="bg-primary h-full transition-all duration-500" 
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">Personal Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">First Name</label>
                    <input 
                      required
                      type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                      className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Last Name</label>
                    <input 
                      required
                      type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                      className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Domain Selection</label>
                  <select 
                    name="domain" value={formData.domain} onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none transition-colors appearance-none"
                  >
                    <option value="Web">MERN Stack Web Development</option>
                    <option value="Python">Python Development</option>
                    <option value="Java">Java Spring Boot</option>
                    <option value="AI">AI & ML</option>
                  </select>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">Academic Information</h2>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">College / University</label>
                  <input 
                    required
                    type="text" name="college" value={formData.college} onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Degree & Specialization</label>
                  <input 
                    required
                    type="text" name="degree" value={formData.degree} onChange={handleChange}
                    placeholder="e.g. B.Tech Computer Science"
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none transition-colors"
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">Requirements</h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-4 bg-black/30 border border-white/10 rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                    <input 
                      type="checkbox" name="hasLaptop" checked={formData.hasLaptop} onChange={handleChange}
                      className="w-5 h-5 accent-primary" required
                    />
                    <span>I have a working laptop/PC suitable for programming.</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 bg-black/30 border border-white/10 rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                    <input 
                      type="checkbox" name="hasInternet" checked={formData.hasInternet} onChange={handleChange}
                      className="w-5 h-5 accent-primary" required
                    />
                    <span>I have a stable internet connection.</span>
                  </label>
                </div>
              </motion.div>
            )}

            <div className="flex justify-between pt-6 border-t border-white/10 mt-8">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              ) : <div></div>}
              <Button type="submit" variant="primary">
                {step === 3 ? 'Submit Application' : 'Continue'}
              </Button>
            </div>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
}
