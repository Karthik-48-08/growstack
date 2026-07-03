import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { GradientText } from '../components/ui/GradientText';
import { Button } from '../components/ui/Button';
import {
  Flame,
  Trophy,
  BookOpen,
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  Clock,
  Loader2,
  AlertCircle,
  Award,
  Zap,
  Sparkles,
} from 'lucide-react';
import useSocketStore from '../lib/useSocketStore';
import useAuthStore from '../lib/authStore';
import { programApi, progressApi, authApi } from '../lib/api';
import {
  computeLevel,
  levelThreshold,
  progressToNextLevel,
} from '../lib/gamification';

/**
 * User dashboard — pulls live data:
 *  - GET /api/programs/my-enrollments          → enrolled programs + progress
 *  - GET /api/auth/profile                     → xp, level, streak, badges
 *
 * If user has no enrollments, shows a CTA to /programs.
 * If user has 0 unlocked days or un-enrolled (e.g. just registered), the
 * programController auto-creates a UserProgress with Day 1 unlocked.
 */
export default function Dashboard() {
  const navigate = useNavigate();
  const socket = useSocketStore((s) => s.socket);
  const isConnected = useSocketStore((s) => s.isConnected);
  const user = useAuthStore((s) => s.user);
  const applyProgress = useAuthStore((s) => s.applyProgress);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [currentEnrollment, setCurrentEnrollment] = useState(null);
  const [currentProgram, setCurrentProgram] = useState(null);
  const [profile, setProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Initial fetch
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    Promise.all([
      programApi.myEnrollments(),
      authApi.me(),
    ])
      .then(async ([enrRes, profRes]) => {
        if (!mounted) return;
        const myEnrollments = enrRes.data?.enrollments || [];
        setEnrollments(myEnrollments);
        setProfile(profRes.data);

        // Pick the most recently active enrollment (or first) and load full details
        if (myEnrollments.length > 0) {
          const enrollment = myEnrollments[0];
          setCurrentEnrollment(enrollment);
          try {
            const prog = enrollment.programId;
            const detailRes = await programApi.enrollment(prog._id || prog);
            if (mounted) setCurrentProgram(detailRes.data);
          } catch (e) {
            console.warn('Failed to load program detail:', e.message);
          }
        }
      })
      .catch((err) => {
        if (mounted) setError(err.message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Live socket events: progress updates + submission reviews
  useEffect(() => {
    if (!socket) return;
    const onProgress = (data) => {
      applyProgress(
        data.newXp,
        data.newLevel,
        data.currentStreak,
        data.badges
      );
      setProfile((p) => (p ? { ...p, ...data } : p));
      setNotifications((prev) => [
        ...prev,
        { id: Date.now() + 1, msg: `Progress saved — now at ${data.newXp} XP`, type: 'info' },
      ]);
    };
    const onSubmission = (data) => {
      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          msg: `📦 Submission reviewed for Day ${data.dayNumber}: ${data.status} (${data.xpEarned} XP)`,
          type: data.status === 'Approved' ? 'success' : 'warn',
        },
      ]);
      // Refresh profile so XP/level stay accurate
      authApi
        .me()
        .then((r) => setProfile(r.data))
        .catch(() => {});
    };
    socket.on('progress_updated', onProgress);
    socket.on('submission_reviewed', onSubmission);
    return () => {
      socket.off('progress_updated', onProgress);
      socket.off('submission_reviewed', onSubmission);
    };
  }, [socket, applyProgress]);

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-grow flex items-center justify-center px-4">
        <GlassCard className="max-w-md text-center">
          <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Couldn't load your dashboard</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Reload
          </Button>
        </GlassCard>
      </div>
    );
  }

  const hasEnrollments = enrollments.length > 0 && currentProgram;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 w-full relative">
      {/* Live notifications */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 border backdrop-blur ${
                n.type === 'success'
                  ? 'bg-success/10 border-success/40 text-white'
                  : n.type === 'warn'
                  ? 'bg-orange-500/10 border-orange-500/40 text-white'
                  : 'bg-black/80 border-primary/40 text-white'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {n.msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Greeting */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            Welcome, {user?.name || 'Developer'}{' '}
            <span
              className={`w-3 h-3 rounded-full ${
                isConnected ? 'bg-success' : 'bg-red-500'
              } inline-block`}
              title={isConnected ? 'Live' : 'Offline'}
            />
          </h1>
          <p className="text-gray-400">
            {hasEnrollments
              ? `You're on Day ${currentProgram.currentDay} of ${currentProgram.program.name}. Keep going.`
              : "Pick a program to start your 30-day learning sprint."}
          </p>
        </div>

        <GlassCard className="flex items-center gap-4 py-4 px-6">
          <div className="bg-orange-500/20 p-3 rounded-full">
            <Flame className="w-7 h-7 text-orange-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Daily Streak</p>
            <p className="text-2xl font-bold">
              {profile?.currentStreak ?? 0}
              <span className="text-sm text-gray-400 ml-1">
                (best {profile?.longestStreak ?? 0})
              </span>
            </p>
          </div>
        </GlassCard>
      </div>

      {/* Empty state — no enrollments */}
      {!hasEnrollments && (
        <GlassCard className="text-center py-16">
          <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">
            Ready to <GradientText>start learning?</GradientText>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Pick your domain — Python, Java, Web, or AI — and we'll unlock Day 1
            for you. New days unlock as you complete each one.
          </p>
          <Link to="/programs">
            <Button variant="primary">
              Browse programs <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </GlassCard>
      )}

      {hasEnrollments && currentProgram && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Program header card */}
            <GlassCard className="border-primary/30">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-secondary font-semibold mb-1">
                    Current program
                  </p>
                  <h2 className="text-3xl font-bold">
                    <GradientText>{currentProgram.program.name}</GradientText>
                  </h2>
                </div>
                <Link to={`/dashboard/program/${currentProgram.program._id}`}>
                  <Button variant="outline" className="text-sm">
                    Full syllabus <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>

              <div className="mb-3 flex justify-between text-sm font-medium">
                <span>Overall completion</span>
                <span className="text-primary">
                  {Math.round(
                    (currentProgram.days.filter((d) => d.dayLog?.isDayCompleted)
                      .length /
                      currentProgram.days.length) *
                      100
                  )}
                  %
                </span>
              </div>
              <ProgressBar
                progress={
                  (currentProgram.days.filter((d) => d.dayLog?.isDayCompleted)
                    .length /
                    currentProgram.days.length) *
                  100
                }
                className="h-3"
              />
              <p className="text-gray-400 text-sm mt-4">
                Completed{' '}
                {currentProgram.days.filter((d) => d.dayLog?.isDayCompleted)
                  .length}{' '}
                of {currentProgram.days.length} days.{' '}
                {currentProgram.currentDay < currentProgram.days.length && (
                  <>
                    Currently on <span className="text-white">Day {currentProgram.currentDay}</span>.
                  </>
                )}
              </p>
            </GlassCard>

            {/* Current day card */}
            {currentProgram.days
              .filter((d) => d.dayNumber === currentProgram.currentDay)
              .map((d) => (
                <GlassCard
                  key={d._id}
                  className="border-primary/40 bg-gradient-to-br from-primary/5 to-secondary/5"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">
                        Today's reading
                      </p>
                      <h3 className="text-2xl font-bold">Day {d.dayNumber}: {d.title}</h3>
                      <p className="text-gray-400 mt-1">{d.subtitle}</p>
                    </div>
                    <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full">
                      Unlocked
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                    <StepChip icon={BookOpen} label="Reading" log={d.dayLog} field="lessonCompleted" />
                    <StepChip icon={CheckCircle2} label="Quiz" log={d.dayLog} field="quizPassed" score={d.dayLog?.quizScore} />
                    <StepChip icon={PlayCircle} label="Code Test" log={d.dayLog} field="assessmentScore" score={d.dayLog?.assessmentScore} />
                    <StepChip icon={Trophy} label="Assignment" log={d.dayLog} field="assignmentSubmitted" />
                  </div>

                  <Link to={`/learn/${d._id}`}>
                    <Button variant="primary" className="w-full sm:w-auto">
                      Continue Day {d.dayNumber} →
                    </Button>
                  </Link>
                </GlassCard>
              ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* XP + Level */}
            <GlassCard>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" /> Your XP
              </h2>
              <XpCard profile={profile} />
            </GlassCard>

            {/* Badges */}
            <GlassCard>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-secondary" /> Badges
              </h2>
              <Badges earnedIds={profile?.badges || []} />
            </GlassCard>
          </div>
        </div>
      )}
    </div>
  );
}

function StepChip({ icon: Icon, label, log, field, score }) {
  const done = field === 'assessmentScore'
    ? (log?.[field] || 0) > 0
    : !!log?.[field];

  return (
    <div
      className={`flex items-center gap-2 p-3 rounded-lg border ${
        done
          ? 'bg-success/10 border-success/40 text-success'
          : 'bg-black/30 border-white/5 text-gray-400'
      }`}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <div className="min-w-0">
        <p className="text-xs font-semibold">{label}</p>
        <p className="text-[10px] truncate">
          {done ? (score != null ? `${score}%` : 'Done') : 'Pending'}
        </p>
      </div>
    </div>
  );
}

function XpCard({ profile }) {
  const xp = profile?.xp || 0;
  const lvl = computeLevel(xp);
  const nextAt = levelThreshold(lvl);
  const prevAt = levelThreshold(lvl - 1);
  const pct = progressToNextLevel(xp);

  return (
    <div>
      <div className="text-center py-4">
        <p className="text-6xl font-bold text-success">{xp}</p>
        <p className="text-gray-400 mt-1 text-sm uppercase tracking-widest">
          Experience Points
        </p>
        <p className="text-lg font-semibold mt-3">
          Level <span className="text-primary">{lvl}</span>
        </p>
      </div>
      <ProgressBar progress={pct} className="h-2 mt-3" />
      <p className="text-xs text-gray-400 mt-2 text-center">
        {Math.max(0, nextAt - xp)} XP to Level {lvl + 1}
      </p>
    </div>
  );
}

const BADGE_CATALOG = [
  { id: 'foundation_builder', name: 'Foundation Builder', emoji: '🧱', days: 7 },
  { id: 'oop_architect', name: 'OOP Architect', emoji: '🏛️', days: 14 },
  { id: 'data_wrangler', name: 'Data Wrangler', emoji: '📊', days: 21 },
  { id: 'oss_contributor', name: 'Open Source Contributor', emoji: '📦', days: 28 },
  { id: 'python_certified', name: 'Python Certified', emoji: '🐍', days: 30 },
];

function Badges({ earnedIds }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {BADGE_CATALOG.map((b) => {
        const earned = earnedIds.includes(b.id);
        return (
          <div
            key={b.id}
            className={`p-3 rounded-lg border text-center ${
              earned
                ? 'bg-primary/10 border-primary/40'
                : 'bg-black/30 border-white/5 opacity-50'
            }`}
          >
            <div className="text-2xl mb-1">{b.emoji}</div>
            <p className="text-xs font-semibold">{b.name}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">
              {earned ? '✓ Earned' : `Day ${b.days}`}
            </p>
          </div>
        );
      })}
    </div>
  );
}
