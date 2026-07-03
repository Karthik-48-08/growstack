import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { GradientText } from '../components/ui/GradientText';
import MarkdownRenderer from '../components/learning/MarkdownRenderer';
import MermaidRenderer from '../components/learning/MermaidRenderer';
import {
  programApi,
  progressApi,
  submissionApi,
} from '../lib/api';
import useAuthStore from '../lib/authStore';
import {
  BookOpen,
  ClipboardCheck,
  Code2,
  Upload,
  CheckCircle2,
  ChevronLeft,
  Loader2,
  AlertCircle,
  Clock,
  Trophy,
  Lock,
  PlayCircle,
  Copy,
  ExternalLink,
  Download,
  Lightbulb,
} from 'lucide-react';

/**
 * The central day view — GeeksforGeeks / W3Schools style reading + practice tabs.
 *
 * Tabs:
 *   1. Reading    — markdown introduction + reading sections + code examples + key takeaways
 *   2. Quiz       — MCQ with timer; submit to POST /progress/quiz-submit
 *   3. Assessment — timed coding prompts with starter code; submit to POST /progress/assessment-submit
 *   4. Assignment — submit GitHub / LinkedIn / ZIP; submit to POST /submissions/assignment
 *
 * Lock state is read from `data.dayLog` (filled in by GET /enrollment or here).
 */
export default function DayView() {
  const { dayId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [day, setDay] = useState(null);
  const [activeTab, setActiveTab] = useState('reading');
  const [dayLog, setDayLog] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    programApi
      .day(dayId)
      .then((res) => {
        if (mounted) {
          setDay(res.data);
          setDayLog(res.data.dayLog || null);
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
  }, [dayId]);

  const handleLessonComplete = async () => {
    try {
      const res = await progressApi.completeLesson(dayId);
      setDayLog(res.data.dayLog);
      useAuthStore.getState().applyProgress(res.data.awarded?.newXp);
      // Switch to quiz tab so the user keeps moving
      setActiveTab('quiz');
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !day) {
    return (
      <div className="flex-grow flex items-center justify-center px-4">
        <GlassCard className="max-w-md w-full text-center">
          <Lock className="w-10 h-10 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Day unavailable</h3>
          <p className="text-gray-400 mb-6">
            {error || 'Could not load this day.'}
          </p>
          <Button onClick={() => navigate('/dashboard')} variant="outline">
            Back to dashboard
          </Button>
        </GlassCard>
      </div>
    );
  }

  const tabs = [
    { id: 'reading', label: 'Reading', icon: BookOpen },
    { id: 'quiz', label: 'Quiz', icon: ClipboardCheck },
    { id: 'assessment', label: 'Assessment', icon: Code2 },
    { id: 'assignment', label: 'Assignment', icon: Upload },
  ];

  // Helpers to know which tabs are "done"
  const isLessonDone = !!dayLog?.lessonCompleted;
  const isQuizPassed = !!dayLog?.quizPassed;
  const isAssignmentDone = !!dayLog?.assignmentSubmitted;
  const isAssessmentDone = (dayLog?.assessmentScore || 0) > 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 w-full">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <Link to="/dashboard" className="hover:text-primary">
          Dashboard
        </Link>
        <ChevronLeft className="w-4 h-4 rotate-180" />
        <Link
          to={`/dashboard/program/${day.courseId}`}
          className="hover:text-primary"
        >
          Syllabus
        </Link>
        <ChevronLeft className="w-4 h-4 rotate-180" />
        <span>Day {day.dayNumber}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-bold uppercase tracking-wider text-primary">
            Day {day.dayNumber}
          </span>
          {day.isLocked && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Locked
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{day.title}</h1>
        <p className="text-gray-400 text-lg">{day.subtitle}</p>
        <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {day.estimatedMinutes} min
          </span>
          <span className="flex items-center gap-1">
            <Trophy className="w-4 h-4 text-primary" /> +{day.assignment?.xpReward ?? 50} XP on completion
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/10 mb-8 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const completed =
              (tab.id === 'reading' && isLessonDone) ||
              (tab.id === 'quiz' && isQuizPassed) ||
              (tab.id === 'assessment' && isAssessmentDone) ||
              (tab.id === 'assignment' && isAssignmentDone);

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 font-medium text-sm border-b-2 transition-colors ${
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {completed && (
                  <CheckCircle2 className="w-4 h-4 text-success ml-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'reading' && (
            <ReadingTab
              day={day}
              isLessonDone={isLessonDone}
              onComplete={handleLessonComplete}
            />
          )}
          {activeTab === 'quiz' && (
            <QuizTab day={day} isQuizPassed={isQuizPassed} dayLog={dayLog} />
          )}
          {activeTab === 'assessment' && (
            <AssessmentTab day={day} isAssessmentDone={isAssessmentDone} />
          )}
          {activeTab === 'assignment' && (
            <AssignmentTab day={day} isAssignmentDone={isAssignmentDone} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Reading Tab ──────────────────────────────────────────────────────────

function ReadingTab({ day, isLessonDone, onComplete }) {
  const [submitting, setSubmitting] = useState(false);
  const { introduction, readingSections = [], codeExamples = [], keyTakeaways = [], downloads = [] } =
    day.lesson || {};

  const handleComplete = async () => {
    setSubmitting(true);
    try {
      await onComplete();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Introduction card */}
      {introduction && (
        <GlassCard className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
          <div className="flex items-start gap-3 mb-3">
            <Lightbulb className="w-6 h-6 text-primary shrink-0 mt-1" />
            <h2 className="text-xl font-bold">Today's Reading</h2>
          </div>
          <MarkdownRenderer source={introduction} />
        </GlassCard>
      )}

      {/* Reading sections */}
      {readingSections.map((section, idx) => (
        <GlassCard key={section._id || idx} className="scroll-mt-24">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-secondary font-semibold mb-2">
            Section {idx + 1}
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">
            {section.heading}
          </h2>
          <MarkdownRenderer source={section.body} />

          {/* Optional standalone Mermaid diagram (separate field, not in body) */}
          {section.diagram && (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-wider text-secondary font-semibold mb-2">
                Diagram
              </p>
              <MermaidRenderer
                source={section.diagram}
                id={`section-${idx}`}
              />
            </div>
          )}
        </GlassCard>
      ))}

      {/* Code examples — each as its own card, like GfG's "Examples" section */}
      {codeExamples.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Code2 className="w-6 h-6 text-secondary" />
            Code Examples
          </h2>
          <div className="space-y-6">
            {codeExamples.map((ex, idx) => (
              <CodeExampleCard key={idx} example={ex} />
            ))}
          </div>
        </div>
      )}

      {/* Downloads */}
      {downloads.length > 0 && (
        <GlassCard>
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Download className="w-5 h-5 text-secondary" /> Downloads
          </h2>
          <ul className="space-y-2">
            {downloads.map((url, idx) => (
              <li key={idx}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-primary underline underline-offset-2 inline-flex items-center gap-1"
                >
                  {url} <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            ))}
          </ul>
        </GlassCard>
      )}

      {/* Key takeaways */}
      {keyTakeaways.length > 0 && (
        <GlassCard className="border-success/30 bg-gradient-to-br from-success/5 to-transparent">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-success">
            <CheckCircle2 className="w-5 h-5" />
            Key Takeaways
          </h2>
          <ul className="space-y-2">
            {keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-200">
                <span className="text-success mt-1">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      )}

      {/* Mark complete CTA */}
      <div className="sticky bottom-4 z-10">
        <GlassCard className="border-primary/30 bg-black/80 backdrop-blur">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold">
                {isLessonDone ? '✅ Reading complete!' : 'Finished reading?'}
              </p>
              <p className="text-sm text-gray-400">
                {isLessonDone
                  ? 'Move on to the quiz to keep earning XP.'
                  : 'Mark this lesson as complete to unlock the quiz (+10 XP).'}
              </p>
            </div>
            {isLessonDone ? (
              <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-success/20 text-success font-semibold border border-success/40">
                <CheckCircle2 className="w-4 h-4" /> Completed
              </span>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={submitting}
                variant="primary"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-1" /> Mark Lesson Complete
                  </>
                )}
              </Button>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function CodeExampleCard({ example }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(example.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore — older browsers or insecure contexts */
    }
  };

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-white">{example.title}</h3>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white border border-white/10 rounded px-2 py-1"
        >
          {copied ? (
            <>
              <CheckCircle2 className="w-3 h-3 text-success" /> Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" /> Copy
            </>
          )}
        </button>
      </div>
      <MarkdownRenderer source={`\`\`\`${example.language || 'python'}\n${example.code}\n\`\`\``} />
      {example.output && (
        <div className="mt-3">
          <p className="text-xs uppercase tracking-wider text-secondary font-semibold mb-2">
            Output
          </p>
          <pre className="bg-black/60 border border-white/10 rounded-lg p-3 text-success text-sm whitespace-pre-wrap">
{example.output}
          </pre>
        </div>
      )}
      {example.explanation && (
        <div className="mt-3 p-3 bg-secondary/5 border-l-2 border-secondary rounded-r">
          <p className="text-sm text-gray-200 italic">{example.explanation}</p>
        </div>
      )}
    </GlassCard>
  );
}

// ─── Quiz Tab ─────────────────────────────────────────────────────────────

function QuizTab({ day, isQuizPassed, dayLog }) {
  const quiz = day.quiz || {};
  const questions = quiz.questions || [];
  const timeLimitMin = quiz.timeLimit || 10;
  const passPct = quiz.passingPercentage || 70;

  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(timeLimitMin * 60);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    if (isQuizPassed || result || !timerStarted) return;
    const t = setInterval(() => setTimeLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [isQuizPassed, result, timerStarted]);

  useEffect(() => {
    if (timeLeft === 0 && !result && timerStarted) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  if (!questions.length) {
    return (
      <GlassCard>
        <p className="text-gray-400">
          No quiz questions for this day yet.
        </p>
      </GlassCard>
    );
  }

  const allAnswered = questions.every(
    (_, idx) => answers[idx] !== undefined
  );

  const startQuiz = () => {
    setTimerStarted(true);
  };

  const handleSubmit = async () => {
    if (submitting || result) return;
    setSubmitting(true);
    try {
      const payload = Object.entries(answers).map(([idx, selected]) => ({
        questionIndex: Number(idx),
        selected,
      }));
      const res = await progressApi.submitQuiz(day._id, payload);
      setResult(res.data);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  // ─── Past score banner (already passed or previously attempted) ──────
  if (isQuizPassed && !result) {
    const savedScore = dayLog?.quizScore || 0;
    return (
      <GlassCard>
        <div className="flex items-center gap-3 text-success mb-4">
          <CheckCircle2 className="w-6 h-6" />
          <h2 className="text-xl font-bold">Quiz already passed</h2>
        </div>
        <p className="text-gray-300">
          Your best score so far:{' '}
          <span className="font-bold text-white">{savedScore}%</span> (passing{' '}
          {passPct}%).
        </p>
        <button
          onClick={() => setResult({ score: savedScore, passed: true, breakdown: [] })}
          className="mt-4 text-secondary hover:text-primary text-sm"
        >
          Retake →
        </button>
      </GlassCard>
    );
  }

  // ─── Result view ────────────────────────────────────────────────────
  if (result) {
    return (
      <div className="space-y-6">
        <GlassCard
          className={`border-${
            result.passed ? 'success' : 'red-500'
          }/40 bg-${result.passed ? 'success' : 'red-500'}/5`}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {result.passed ? '🎉 You passed!' : '❌ Not quite'}
              </h2>
              <p className="text-gray-300">
                Score:{' '}
                <span className="font-bold text-white">{result.score}%</span>{' '}
                (passing {passPct}%)
              </p>
            </div>
            {result.passed && (
              <div className="text-right">
                <p className="text-3xl font-bold text-success">
                  +{result.awarded ? 20 : 0} XP
                </p>
                <p className="text-xs text-gray-400">for passing</p>
              </div>
            )}
          </div>

          {result.unlockedNext && (
            <div className="mt-4 p-3 bg-primary/10 border border-primary/40 rounded-lg text-sm">
              🔓 Day {day.dayNumber + 1} unlocked!
            </div>
          )}
        </GlassCard>

        <h3 className="text-xl font-bold">Answer breakdown</h3>
        <div className="space-y-4">
          {result.breakdown.map((q, idx) => (
            <GlassCard
              key={idx}
              className={`border-${
                q.isCorrect ? 'success' : 'red-500'
              }/30`}
            >
              <div className="flex items-start gap-2 mb-2">
                {q.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                )}
                <p className="font-semibold text-white">
                  {idx + 1}. {q.question}
                </p>
              </div>
              <div className="ml-7 space-y-1 text-sm">
                <p className="text-gray-300">
                  Your answer:{' '}
                  <span
                    className={
                      q.isCorrect ? 'text-success' : 'text-red-400'
                    }
                  >
                    {q.selected || '(no answer)'}
                  </span>
                </p>
                {!q.isCorrect && (
                  <p className="text-gray-300">
                    Correct:{' '}
                    <span className="text-success">{q.correctAnswer}</span>
                  </p>
                )}
                {q.explanation && (
                  <p className="text-gray-400 italic mt-2">
                    {q.explanation}
                  </p>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    );
  }

  // ─── Quiz taking view ──────────────────────────────────────────────
  if (!timerStarted) {
    return (
      <GlassCard>
        <h2 className="text-2xl font-bold mb-3">Ready to take the quiz?</h2>
        <ul className="space-y-2 text-gray-300 mb-6">
          <li>• {questions.length} multiple-choice questions</li>
          <li>• Time limit: {timeLimitMin} minutes</li>
          <li>• Passing score: {passPct}%</li>
          <li>• Passing awards +20 XP</li>
        </ul>
        <Button onClick={startQuiz} variant="primary">
          <PlayCircle className="w-4 h-4 mr-1" /> Start Quiz
        </Button>
      </GlassCard>
    );
  }

  return (
    <div>
      <div className="sticky top-4 z-10 mb-6">
        <GlassCard className="border-primary/40 bg-black/80 backdrop-blur flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-primary" />
            <span
              className={`font-mono font-bold ${
                timeLeft < 60 ? 'text-red-400' : 'text-white'
              }`}
            >
              {formatTime(timeLeft)}
            </span>
            <span className="text-gray-400">remaining</span>
          </div>
          <div className="text-sm text-gray-300">
            Answered:{' '}
            <span className="font-semibold text-white">
              {Object.keys(answers).length}/{questions.length}
            </span>
          </div>
        </GlassCard>
      </div>

      <div className="space-y-5">
        {questions.map((q, idx) => (
          <GlassCard key={idx}>
            <p className="font-semibold text-white mb-3">
              {idx + 1}. {q.question}
            </p>
            <div className="space-y-2">
              {q.options.map((opt, optIdx) => (
                <label
                  key={optIdx}
                  className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                    answers[idx] === opt
                      ? 'border-primary bg-primary/10'
                      : 'border-white/10 bg-black/30 hover:border-primary/40'
                  }`}
                >
                  <input
                    type="radio"
                    name={`q-${idx}`}
                    value={opt}
                    checked={answers[idx] === opt}
                    onChange={() => setAnswers({ ...answers, [idx]: opt })}
                    className="accent-primary"
                  />
                  <span className="text-gray-200">{opt}</span>
                </label>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={handleSubmit}
          disabled={submitting || !allAnswered}
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            'Submit Quiz'
          )}
        </Button>
      </div>
    </div>
  );
}

// ─── Assessment Tab ──────────────────────────────────────────────────────

function AssessmentTab({ day, isAssessmentDone }) {
  const assessment = day.assessment || {};
  const questions = assessment.questions || [];
  const timeLimit = assessment.timeLimit || 30;

  const [responses, setResponses] = useState(
    questions.map((q) => ({ answer: q.starterCode || '' }))
  );
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    if (!timerStarted || result) return;
    const t = setInterval(() => setTimeLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [timerStarted, result]);

  useEffect(() => {
    if (timeLeft === 0 && !result && timerStarted) handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const handleSubmit = async () => {
    if (submitting || result) return;
    setSubmitting(true);
    try {
      const payload = responses.map((r, idx) => ({
        questionIndex: idx,
        answer: r.answer,
      }));
      const res = await progressApi.submitAssessment(day._id, payload);
      setResult(res.data);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!questions.length) {
    return (
      <GlassCard>
        <p className="text-gray-400">No assessment for this day yet.</p>
      </GlassCard>
    );
  }

  if (result) {
    return (
      <div className="space-y-6">
        <GlassCard
          className={`border-${
            result.passed ? 'success' : 'red-500'
          }/40 bg-${result.passed ? 'success' : 'red-500'}/5`}
        >
          <h2 className="text-2xl font-bold mb-2">
            {result.passed ? '✅ Assessment passed!' : '❌ Keep practising'}
          </h2>
          <p className="text-gray-300">
            Score:{' '}
            <span className="font-bold text-white">{result.score}%</span>
          </p>
        </GlassCard>

        <div className="space-y-4">
          {result.breakdown.map((q, idx) => (
            <GlassCard key={idx}>
              <p className="font-semibold mb-2 text-white">{q.prompt}</p>
              <p className="text-sm text-gray-300 whitespace-pre-wrap bg-black/40 p-3 rounded">
                {q.answer || '(no answer)'}
              </p>
              <p className={`text-sm mt-2 ${q.matched ? 'text-success' : 'text-red-400'}`}>
                {q.matched ? '✓ Output matched' : '✗ Output did not match expected'}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    );
  }

  if (!timerStarted) {
    return (
      <GlassCard>
        <h2 className="text-2xl font-bold mb-3">Coding Assessment</h2>
        {assessment.instructions && (
          <p className="text-gray-300 mb-4 whitespace-pre-line">
            {assessment.instructions}
          </p>
        )}
        <ul className="space-y-2 text-gray-300 mb-6">
          <li>• {questions.length} coding prompt{questions.length > 1 ? 's' : ''}</li>
          <li>• Time limit: {timeLimit} minutes</li>
          <li>• Pass at ≥60%</li>
          <li>• Fullscreen recommended — don't close the tab</li>
        </ul>
        <Button onClick={() => setTimerStarted(true)} variant="primary">
          <PlayCircle className="w-4 h-4 mr-1" /> Start Assessment
        </Button>
      </GlassCard>
    );
  }

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <div className="sticky top-4 z-10 mb-6">
        <GlassCard className="border-primary/40 bg-black/80 backdrop-blur flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-primary" />
            <span
              className={`font-mono font-bold ${
                timeLeft < 60 ? 'text-red-400' : 'text-white'
              }`}
            >
              {formatTime(timeLeft)}
            </span>
            <span className="text-gray-400">remaining</span>
          </div>
          <Button
            size="sm"
            variant="primary"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit'}
          </Button>
        </GlassCard>
      </div>

      <div className="space-y-6">
        {questions.map((q, idx) => (
          <GlassCard key={idx}>
            <p className="font-semibold text-white mb-1">
              Question {idx + 1} ({q.points} pts)
            </p>
            <p className="text-gray-300 mb-4 whitespace-pre-line">{q.prompt}</p>
            <textarea
              value={responses[idx]?.answer || ''}
              onChange={(e) => {
                const next = [...responses];
                next[idx] = { answer: e.target.value };
                setResponses(next);
              }}
              rows={10}
              className="w-full font-mono text-sm bg-black/60 border border-white/10 rounded-lg p-3 text-green-300 focus:border-primary outline-none"
              spellCheck={false}
            />
            {q.expectedOutput && (
              <p className="text-xs text-gray-500 mt-2">
                Expected output contains:{' '}
                <code className="text-secondary">{q.expectedOutput}</code>
              </p>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

// ─── Assignment Tab ──────────────────────────────────────────────────────

function AssignmentTab({ day, isAssignmentDone }) {
  const a = day.assignment || {};
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [zipUrl, setZipUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!githubUrl && !linkedinUrl && !zipUrl) {
      setError('Please provide at least one URL — GitHub, LinkedIn, or ZIP.');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await submissionApi.submitAssignment({
        dayModuleId: day._id,
        githubUrl,
        linkedinUrl,
        zipUrl,
        notes,
      });
      setSubmitted(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <GlassCard className="border-success/40 bg-success/5">
        <div className="flex items-center gap-3 text-success mb-3">
          <CheckCircle2 className="w-7 h-7" />
          <h2 className="text-2xl font-bold">Assignment submitted!</h2>
        </div>
        <p className="text-gray-300 mb-4">
          We'll review your work and award +{a.xpReward || 50} XP when
          approved. You'll see a notification when the review is done.
        </p>
        <div className="text-sm text-gray-400 space-y-1">
          {submitted.githubUrl && (
            <p>
              GitHub: <a href={submitted.githubUrl} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">{submitted.githubUrl}</a>
            </p>
          )}
          {submitted.linkedinUrl && (
            <p>
              LinkedIn: <a href={submitted.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">{submitted.linkedinUrl}</a>
            </p>
          )}
          {submitted.zipUrl && (
            <p>
              ZIP: <a href={submitted.zipUrl} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">{submitted.zipUrl}</a>
            </p>
          )}
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-6">
      <GlassCard>
        <h2 className="text-2xl font-bold mb-3">{a.overview}</h2>

        {a.objectives?.length > 0 && (
          <div className="mb-4">
            <p className="text-sm uppercase tracking-wider text-secondary font-semibold mb-2">
              Objectives
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-gray-200">
              {a.objectives.map((o, idx) => <li key={idx}>{o}</li>)}
            </ul>
          </div>
        )}

        {a.technicalRequirements?.length > 0 && (
          <div className="mb-4">
            <p className="text-sm uppercase tracking-wider text-secondary font-semibold mb-2">
              Technical requirements
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-gray-200">
              {a.technicalRequirements.map((r, idx) => <li key={idx}>{r}</li>)}
            </ul>
          </div>
        )}

        {a.deliverables?.length > 0 && (
          <div className="mb-4">
            <p className="text-sm uppercase tracking-wider text-secondary font-semibold mb-2">
              Deliverables
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-gray-200">
              {a.deliverables.map((d, idx) => <li key={idx}>{d}</li>)}
            </ul>
          </div>
        )}

        {a.resources?.length > 0 && (
          <div className="mb-2">
            <p className="text-sm uppercase tracking-wider text-secondary font-semibold mb-2">
              Helpful resources
            </p>
            <ul className="space-y-1 text-gray-200 text-sm">
              {a.resources.map((r, idx) => (
                <li key={idx}>
                  <a href={r} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">
                    {r}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </GlassCard>

      <GlassCard>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5 text-secondary" />
          Submit your work
        </h3>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-300 font-medium block mb-1">
              GitHub Repository URL
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/you/day1-project"
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300 font-medium block mb-1">
              LinkedIn Post URL (optional)
            </label>
            <input
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://linkedin.com/posts/..."
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300 font-medium block mb-1">
              ZIP / Drive Link (optional)
            </label>
            <input
              type="url"
              value={zipUrl}
              onChange={(e) => setZipUrl(e.target.value)}
              placeholder="https://drive.google.com/..."
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300 font-medium block mb-1">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Anything you want the reviewer to know..."
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
            />
          </div>
          <Button type="submit" disabled={submitting} variant="primary" className="w-full">
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit for review'}
          </Button>
        </form>
      </GlassCard>
    </div>
  );
}
