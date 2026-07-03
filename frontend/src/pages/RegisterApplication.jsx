import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientText } from '../components/ui/GradientText';
import { Button } from '../components/ui/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { applicationApi, authApi } from '../lib/api';
import useAuthStore from '../lib/authStore';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

const DOMAINS = [
  { value: 'Python', label: 'Python Development', desc: '30 days — variables to FastAPI' },
  { value: 'Java', label: 'Java Spring Boot', desc: '30 days — enterprise apps' },
  { value: 'Web', label: 'MERN Stack Web Development', desc: '30 days — full-stack' },
  { value: 'AI', label: 'AI & Machine Learning', desc: '30 days — applied ML' },
];

export default function RegisterApplication() {
  const [searchParams] = useSearchParams();
  const initialDomain = searchParams.get('domain') || 'Python';
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    domain: initialDomain,
    college: '',
    degree: '',
    hasLaptop: false,
    hasInternet: false,
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const next = () => {
    setError(null);
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.password) {
        setError('Please fill in all fields.');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
    }
    if (step === 2) {
      if (!formData.college || !formData.degree) {
        setError('Please fill in your academic info.');
        return;
      }
    }
    if (step === 3) {
      if (!formData.hasLaptop || !formData.hasInternet) {
        setError('You need both a laptop and internet to participate.');
        return;
      }
    }
    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (step < 4) {
      next();
      return;
    }

    setIsSubmitting(true);
    try {
      // Step 4 — register the user first
      const { data } = await authApi.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // Persist credentials so subsequent requests are authed
      localStorage.setItem('gs_token', data.token);
      localStorage.setItem('gs_user', JSON.stringify(data));
      login(data.email, formData.password).catch(() => {}); // sync store

      // Submit the application
      try {
        await applicationApi.submit({
          domain: formData.domain,
          college: formData.college,
          degree: formData.degree,
          hasLaptop: formData.hasLaptop,
          hasInternet: formData.hasInternet,
        });
      } catch (appErr) {
        // Non-fatal — user is registered, just log the application failure
        console.warn('Application submit failed:', appErr.message);
      }

      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
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
          <h1 className="text-4xl font-bold mb-4">
            Application <GradientText>Form</GradientText>
          </h1>
          <p className="text-gray-400">Step {step} of 4</p>
          <div className="w-full bg-black/40 h-2 rounded-full mt-4 border border-white/10 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-300 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <GlassCard className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">Account Details</h2>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Full Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none transition-colors"
                    placeholder="Karthik R"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Email Address</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Password</label>
                  <input
                    required
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none transition-colors"
                    placeholder="At least 6 characters"
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">Pick Your Domain</h2>
                <div className="grid gap-3">
                  {DOMAINS.map((d) => (
                    <label
                      key={d.value}
                      className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                        formData.domain === d.value
                          ? 'border-primary bg-primary/10'
                          : 'border-white/10 bg-black/30 hover:border-primary/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="domain"
                        value={d.value}
                        checked={formData.domain === d.value}
                        onChange={handleChange}
                        className="mt-1 accent-primary"
                      />
                      <div>
                        <p className="font-semibold">{d.label}</p>
                        <p className="text-sm text-gray-400">{d.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">Academic Information</h2>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">College / University</label>
                  <input
                    required
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none transition-colors"
                    placeholder="IIT Madras"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Degree & Specialization</label>
                  <input
                    required
                    type="text"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    placeholder="e.g. B.Tech Computer Science"
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none transition-colors"
                  />
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">Requirements</h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-4 bg-black/30 border border-white/10 rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                    <input
                      type="checkbox"
                      name="hasLaptop"
                      checked={formData.hasLaptop}
                      onChange={handleChange}
                      className="w-5 h-5 accent-primary"
                    />
                    <span>I have a working laptop/PC suitable for programming.</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 bg-black/30 border border-white/10 rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                    <input
                      type="checkbox"
                      name="hasInternet"
                      checked={formData.hasInternet}
                      onChange={handleChange}
                      className="w-5 h-5 accent-primary"
                    />
                    <span>I have a stable internet connection.</span>
                  </label>
                </div>
                <div className="p-4 bg-success/5 border border-success/20 rounded-lg flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-300">
                    <p className="font-semibold mb-1">Almost done!</p>
                    <p className="text-gray-400">
                      Click submit to create your account. You'll be redirected to your dashboard
                      where you can start Day 1 of the <strong>{formData.domain}</strong> track.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex justify-between pt-6 border-t border-white/10 mt-8">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              ) : (
                <div />
              )}
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : step === 4 ? (
                  'Submit & Start Learning'
                ) : (
                  'Continue'
                )}
              </Button>
            </div>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
}