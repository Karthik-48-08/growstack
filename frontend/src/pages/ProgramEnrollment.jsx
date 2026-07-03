import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientText } from '../components/ui/GradientText';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { programApi } from '../lib/api';
import {
  Lock,
  CheckCircle2,
  PlayCircle,
  Clock,
  Award,
  ChevronRight,
  AlertCircle,
  Loader2,
} from 'lucide-react';

/**
 * The "syllabus" view of a program. Shows all 30 days with their lock state,
 * completion state, and lets the user click into any unlocked day.
 *
 * Data source: GET /api/programs/:programId/enrollment
 * (returns: program, course, days[], currentDay, unlockedDays, xp, ...)
 */
export default function ProgramEnrollment() {
  const { programId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    programApi
      .enrollment(programId)
      .then((res) => {
        if (mounted) setData(res.data);
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
  }, [programId]);

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex-grow flex items-center justify-center px-4">
        <GlassCard className="max-w-md w-full text-center">
          <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Couldn't load program</h3>
          <p className="text-gray-400 mb-6">{error || 'Unknown error'}</p>
          <Button onClick={() => navigate('/dashboard')} variant="outline">
            Back to dashboard
          </Button>
        </GlassCard>
      </div>
    );
  }

  const { program, course, days = [], currentDay, unlockedDays = [] } = data;

  const completedDays = days.filter(
    (d) => d.dayLog?.isDayCompleted
  ).length;
  const totalDays = days.length || 30;
  const overallPct = Math.round((completedDays / totalDays) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
          <Link to="/dashboard" className="hover:text-primary">
            Dashboard
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span>{program.name}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          <GradientText>{program.name}</GradientText>
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl">
          {program.description ||
            'Your 30-day reading-first track. Lessons unlock as you complete each day.'}
        </p>
      </motion.div>

      {/* Progress summary */}
      <GlassCard className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2">
            <p className="text-sm text-gray-400 mb-2 font-medium">
              Overall progress — {completedDays}/{totalDays} days
            </p>
            <ProgressBar progress={overallPct} className="h-3" />
            <p className="text-gray-400 text-sm mt-3">
              You're on day <span className="text-white font-semibold">{currentDay}</span>
              {overallPct > 0 && (
                <>
                  {' '}— completed {overallPct}% of the syllabus
                </>
              )}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-primary/20 p-3 rounded-xl">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Today</p>
              <p className="text-xl font-bold">Day {currentDay}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-success/20 p-3 rounded-xl">
              <Award className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Unlocked</p>
              <p className="text-xl font-bold">{unlockedDays.length}/{totalDays}</p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Day grid */}
      <h2 className="text-2xl font-bold mb-6">Syllabus</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {days.map((day, idx) => {
          const isUnlocked = unlockedDays.includes(day.dayNumber);
          const log = day.dayLog || {};
          const isCompleted = log.isDayCompleted;
          const lessonDone = log.lessonCompleted;
          const quizDone = log.quizPassed;
          const assignmentDone = log.assignmentSubmitted;

          const componentSummary = [
            lessonDone && '📖',
            quizDone && '✅',
            (log.assessmentScore || 0) > 0 && '💻',
            assignmentDone && '📦',
          ].filter(Boolean).join(' ');

          return (
            <motion.div
              key={day._id || day.dayNumber}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.015 }}
            >
              <DayCard
                day={day}
                isUnlocked={isUnlocked}
                isCompleted={isCompleted}
                componentSummary={componentSummary}
                onOpen={() => navigate(`/learn/${day._id}`)}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function DayCard({ day, isUnlocked, isCompleted, componentSummary, onOpen }) {
  const baseClasses =
    'h-full p-5 border transition-all duration-200 flex flex-col justify-between';

  if (!isUnlocked) {
    return (
      <GlassCard className={`${baseClasses} border-white/5 opacity-60`}>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Day {day.dayNumber}
            </span>
            <Lock className="w-4 h-4 text-gray-500" />
          </div>
          <h3 className="font-semibold text-gray-400 mb-1">{day.title}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">
            {day.subtitle || 'Locked — complete the previous day to unlock.'}
          </p>
        </div>
        <div className="mt-4 text-xs text-gray-500 flex items-center gap-1">
          <Lock className="w-3 h-3" />
          Locked
        </div>
      </GlassCard>
    );
  }

  const cardClasses = isCompleted
    ? `${baseClasses} border-success/40 bg-success/5 hover:bg-success/10`
    : `${baseClasses} border-primary/40 bg-primary/5 hover:bg-primary/10 cursor-pointer`;

  return (
    <GlassCard className={cardClasses} onClick={isCompleted ? null : onOpen}>
      <div>
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-xs font-semibold uppercase tracking-wider ${
              isCompleted ? 'text-success' : 'text-primary'
            }`}
          >
            Day {day.dayNumber}
          </span>
          {isCompleted ? (
            <CheckCircle2 className="w-4 h-4 text-success" />
          ) : (
            <PlayCircle className="w-4 h-4 text-primary" />
          )}
        </div>
        <h3 className="font-semibold text-white mb-1">{day.title}</h3>
        <p className="text-sm text-gray-300 line-clamp-2">{day.subtitle}</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-gray-400 flex items-center gap-2">
          <Clock className="w-3 h-3" /> {day.estimatedMinutes}m
          {componentSummary && (
            <span className="ml-2 tracking-wide">{componentSummary}</span>
          )}
        </div>
        {!isCompleted && (
          <span
            className="text-xs text-primary font-semibold"
            onClick={onOpen}
          >
            Start →
          </span>
        )}
      </div>
    </GlassCard>
  );
}
