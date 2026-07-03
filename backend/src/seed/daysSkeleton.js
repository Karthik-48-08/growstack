/**
 * Day 4 through Day 30 — structured skeleton
 *
 * Days 1-3 have full GFG-style content in their own files.
 * Days 4-30 use this factory so the application is wired end-to-end
 * with real day modules in the DB — you can flesh out the markdown
 * bodies as you go. Each day has:
 *   - title / subtitle / estimated time
 *   - a placeholder reading intro and 2 reading sections
 *   - 10 quiz questions (multiple choice, with answers)
 *   - 3 assessment coding prompts (with expected outputs for auto-grading)
 *   - assignment overview / objectives / deliverables
 *
 * To flesh out a day, edit its entry in this file or move the full
 * content into its own file like day01.js.
 */

const days = {
  4: {
    title: 'Conditionals',
    subtitle: 'if, elif, else, and the truthiness rules',
    estimatedMinutes: 65,
    objectives: [
      'Understand if/elif/else flow',
      'Learn truthy/falsy values',
      'Use match-case for multi-branch logic',
      'Write a ternary expression',
    ],
    assignment: {
      overview: 'Build a CLI scholarship checker that uses nested conditions.',
      deliverables: [
        '`day4_admission.py` with at least 3 nested decisions',
        'Test with 3 sample inputs (printed in README)',
      ],
    },
  },
  5: {
    title: 'Loops',
    subtitle: 'for, while, break, continue, range, and enumeration',
    estimatedMinutes: 70,
    objectives: [
      'Master `for` and `while` loops',
      'Use `range()` with start, stop, step',
      'Apply `break`, `continue`, and loop `else`',
      'Enumerate items with index and value',
    ],
    assignment: {
      overview: 'Build a multiplication table generator with bonus reverse mode.',
      deliverables: ['`multiplication_table.py` — accepts N (1–20), prints forward + reverse'],
    },
  },
  6: {
    title: 'Lists & Tuples',
    subtitle: 'Sequences, mutability, and unpacking',
    estimatedMinutes: 70,
    objectives: [
      'Master list methods (append, sort, pop, ...)',
      'Use list comprehensions',
      'Know when to choose tuple vs list',
      'Use tuple unpacking and zip()',
    ],
    assignment: {
      overview: 'Build a CLI to-do list with JSON persistence.',
      deliverables: [
        '`todo.py` with add/list/done/delete commands',
        '`tasks.json` persistence',
      ],
    },
  },
  7: {
    title: 'Dictionaries & Sets + Weekly Project',
    subtitle: 'Key-value data and uniqueness',
    estimatedMinutes: 75,
    objectives: [
      'Create and manipulate dictionaries',
      'Use Counter and defaultdict from collections',
      'Apply set operations (union, intersection, difference)',
      'Build the weekly quiz CLI project',
    ],
    assignment: {
      overview: 'Weekly project — build `quiz_app.py` (5-question CLI quiz with high-score persistence).',
      deliverables: [
        '`quiz_app.py`',
        '`highscores.json`',
        '60-second screen recording in README',
      ],
    },
  },
  8: {
    title: 'Functions',
    subtitle: 'def, parameters, return, scope',
    estimatedMinutes: 70,
    objectives: [
      'Define functions with parameters and return values',
      'Use default and keyword arguments',
      'Understand variable scope',
      'Write docstrings and type hints',
    ],
    assignment: {
      overview: 'Build `utils.py` with 5 reusable functions and a `day8_report_card.py` driver.',
      deliverables: ['`utils.py` + `day8_report_card.py`'],
    },
  },
  9: {
    title: 'Functional Tools',
    subtitle: 'map, filter, reduce, lambdas, comprehensions',
    estimatedMinutes: 60,
    objectives: [
      'Use map() and filter()',
      'Apply reduce() for aggregation',
      'Write lambda functions',
      'Compare comprehensions vs functional tools',
    ],
    assignment: {
      overview: 'Build `day9_data_cleaner.py` — clean a messy string list using lambdas + sorted.',
      deliverables: ['`day9_data_cleaner.py`'],
    },
  },
  10: {
    title: 'File I/O',
    subtitle: 'open, with, pathlib, CSV basics',
    estimatedMinutes: 70,
    objectives: [
      'Read and write text files',
      'Use the `with` statement for safety',
      'Work with pathlib for cross-platform paths',
      'Read and write CSV files',
    ],
    assignment: {
      overview: 'Build `day10_notes_app.py` — notes saved as separate .txt files in `notes/`.',
      deliverables: ['`day10_notes_app.py` + `notes/` folder'],
    },
  },
  11: {
    title: 'Error Handling',
    subtitle: 'try, except, else, finally, custom exceptions',
    estimatedMinutes: 60,
    objectives: [
      'Catch specific exceptions',
      'Use else and finally clauses',
      'Raise your own exceptions',
      'Build custom exception classes',
    ],
    assignment: {
      overview: 'Wrap your Day 6 `todo.py` with comprehensive error handling.',
      deliverables: ['Updated `todo.py` with try/except everywhere'],
    },
  },
  12: {
    title: 'Modules, Packages & Virtual Environments',
    subtitle: 'import, pip, venv, pyproject',
    estimatedMinutes: 70,
    objectives: [
      'Import modules in different styles',
      'Create your own package with __init__.py',
      'Use pip and requirements.txt',
      'Manage dependencies with venv',
    ],
    assignment: {
      overview: 'Restructure your project with a venv and proper package layout.',
      deliverables: [
        'Working `venv/`',
        '`requirements.txt`',
        '`src/` package layout',
      ],
    },
  },
  13: {
    title: 'OOP Part 1: Classes & Objects',
    subtitle: '__init__, self, instance/class attributes',
    estimatedMinutes: 75,
    objectives: [
      'Define classes and instantiate objects',
      'Use __init__ and self',
      'Distinguish instance vs class attributes',
      'Implement __str__ and __repr__',
    ],
    assignment: {
      overview: 'Build a `Library` class managing a collection of `Book` objects with a CLI.',
      deliverables: ['`day13_library.py`'],
    },
  },
  14: {
    title: 'OOP Part 2: Inheritance & Polymorphism + Weekly Project',
    subtitle: 'super(), MRO, abstract base classes',
    estimatedMinutes: 90,
    objectives: [
      'Implement inheritance and super()',
      'Override methods',
      'Use abstract base classes',
      'Build the weekly bank-system project',
    ],
    assignment: {
      overview: 'Weekly project — `bank_system.py` with SavingsAccount, CurrentAccount, JSON persistence.',
      deliverables: [
        '`bank_system.py`',
        '`accounts.json`',
        'README with architecture diagram',
      ],
    },
  },
  15: {
    title: 'Standard Library Tour',
    subtitle: 'datetime, os, json, random, collections, re',
    estimatedMinutes: 75,
    objectives: [
      'Use datetime for date arithmetic',
      'Navigate files with pathlib and os',
      'Serialize with json',
      'Use Counter, defaultdict, namedtuple',
    ],
    assignment: {
      overview: 'Build `day15_organizer.py` — sort files into subfolders by extension.',
      deliverables: ['`day15_organizer.py` + before/after screenshots'],
    },
  },
  16: {
    title: 'HTTP & APIs with requests',
    subtitle: 'GET, POST, status codes, .env, API keys',
    estimatedMinutes: 75,
    objectives: [
      'Make GET/POST requests with requests',
      'Parse JSON responses',
      'Use .env files for secrets',
      'Handle network errors gracefully',
    ],
    assignment: {
      overview: 'Build `day16_github_lookup.py` — call GitHub API and print user info.',
      deliverables: ['`day16_github_lookup.py` + screenshot'],
    },
  },
  17: {
    title: 'Web Scraping Intro',
    subtitle: 'BeautifulSoup, ethics, robots.txt',
    estimatedMinutes: 80,
    objectives: [
      'Parse HTML with BeautifulSoup',
      'Use CSS selectors',
      'Respect robots.txt and add delays',
      'Know when to scrape vs use an API',
    ],
    assignment: {
      overview: 'Build `day17_news_headlines.py` — scrape top 10 headlines to CSV.',
      deliverables: ['`day17_news_headlines.py` + `headlines.csv` + ethics README'],
    },
  },
  18: {
    title: 'Databases with SQLite',
    subtitle: 'CRUD, parameterized queries, sqlite3 module',
    estimatedMinutes: 80,
    objectives: [
      'Connect to SQLite from Python',
      'Write CRUD operations',
      'Use parameterized queries safely',
      'Use context managers for connections',
    ],
    assignment: {
      overview: 'Migrate your Day 10 notes app to SQLite.',
      deliverables: ['`day10_notes_v2.py` + `notes.db` + DB Browser screenshot'],
    },
  },
  19: {
    title: 'Data with Pandas',
    subtitle: 'Series, DataFrame, filtering, groupby',
    estimatedMinutes: 80,
    objectives: [
      'Load CSV/JSON into DataFrames',
      'Inspect with head/info/describe',
      'Filter rows and select columns',
      'Apply groupby for aggregations',
    ],
    assignment: {
      overview: 'Pick a Kaggle dataset, write `day19_analysis.py` with 3 meaningful insights.',
      deliverables: ['`day19_analysis.py` + insights'],
    },
  },
  20: {
    title: 'Visualization with Matplotlib',
    subtitle: 'line, bar, histogram, scatter, savefig',
    estimatedMinutes: 70,
    objectives: [
      'Plot line/bar/histogram charts',
      'Add labels, titles, legends',
      'Save figures as PNG',
      'Use seaborn for prettier defaults',
    ],
    assignment: {
      overview: 'Extend Day 19 with 4 visualizations saved as PNGs.',
      deliverables: ['`day19_analysis.py` v2 + `charts/` PNGs'],
    },
  },
  21: {
    title: 'Weekly Project — Personal Finance Tracker',
    subtitle: 'SQLite + pandas + matplotlib in one app',
    estimatedMinutes: 120,
    objectives: [
      'Combine everything from Week 3',
      'Build a working CLI tool',
      'Persist data across runs',
      'Visualize insights',
    ],
    assignment: {
      overview: 'Build `finance_tracker.py` — add/list/summary commands + charts.',
      deliverables: ['`finance_tracker.py` + `finance.db` + ≥3 charts in README'],
    },
  },
  22: {
    title: 'Testing',
    subtitle: 'unittest, pytest, fixtures, AAA pattern',
    estimatedMinutes: 75,
    objectives: [
      'Write unit tests with unittest',
      'Use pytest for simpler syntax',
      'Organize tests with fixtures',
      'Run tests and read coverage',
    ],
    assignment: {
      overview: 'Write tests for `bank_system.py` from Day 14. Use pytest.',
      deliverables: ['`test_bank_system.py` + passing test output screenshot'],
    },
  },
  23: {
    title: 'Decorators & Generators',
    subtitle: 'closures, @decorator, yield, generator expressions',
    estimatedMinutes: 80,
    objectives: [
      'Understand closures',
      'Write your own decorators',
      'Use functools.wraps',
      'Build generator functions and expressions',
    ],
    assignment: {
      overview: 'Build a `@log_call` decorator and apply it to existing functions.',
      deliverables: ['`day23_logger.py` + demo output'],
    },
  },
  24: {
    title: 'Context Managers & Iterators',
    subtitle: 'with, __enter__/__exit__, @contextmanager, iter/next',
    estimatedMinutes: 75,
    objectives: [
      'Write class-based context managers',
      'Use @contextmanager for one-shot CMs',
      'Implement the iterator protocol',
      'Build a custom iterable',
    ],
    assignment: {
      overview: 'Build a `DatabaseConnection` context manager that auto-commits.',
      deliverables: ['Refactored script using custom CM'],
    },
  },
  25: {
    title: 'Async Basics',
    subtitle: 'async def, await, asyncio, aiohttp',
    estimatedMinutes: 80,
    objectives: [
      'Understand sync vs async',
      'Use async/await',
      'Run tasks concurrently with gather()',
      'Make async HTTP requests with aiohttp',
    ],
    assignment: {
      overview: 'Build `day25_async_quote_scraper.py` — fetch 10 pages concurrently. Compare times.',
      deliverables: ['`day25_async_quote_scraper.py` + speed comparison'],
    },
  },
  26: {
    title: 'Building a Web API with FastAPI',
    subtitle: 'routes, Pydantic, path/query params, /docs',
    estimatedMinutes: 85,
    objectives: [
      'Install and run FastAPI',
      'Define GET/POST/PUT/DELETE routes',
      'Use Pydantic for validation',
      'Explore auto-generated docs',
    ],
    assignment: {
      overview: 'Build `day26_tasks_api.py` — full CRUD for tasks. JSON persistence.',
      deliverables: ['`day26_tasks_api.py` + README + /docs screenshot'],
    },
  },
  27: {
    title: 'Git & GitHub Workflow for Python',
    subtitle: 'branches, .gitignore, conventional commits, README',
    estimatedMinutes: 65,
    objectives: [
      'Use branches and merge workflow',
      'Write a proper .gitignore for Python',
      'Follow conventional commit messages',
      'Polish a README with badges and screenshots',
    ],
    assignment: {
      overview: 'Polish the Day 26 repo with .gitignore, README badges, clean history.',
      deliverables: ['Polished repo + screenshot of pinned repos'],
    },
  },
  28: {
    title: 'Packaging & Publishing',
    subtitle: 'pyproject.toml, build, TestPyPI, semantic versioning',
    estimatedMinutes: 80,
    objectives: [
      'Structure a project with pyproject.toml',
      'Build a wheel and sdist',
      'Publish to TestPyPI',
      'Apply semantic versioning',
    ],
    assignment: {
      overview: 'Publish a small package to TestPyPI. Verify install works on a fresh venv.',
      deliverables: ['TestPyPI URL + install screenshot'],
    },
  },
  29: {
    title: 'Capstone Build Day',
    subtitle: 'Pick a project and ship it',
    estimatedMinutes: 180,
    objectives: [
      'Build a substantial project from scratch',
      'Use at least 4 of: OOP, files, API, DB, tests, async, web framework',
      'Write tests, README, and clean commit history',
    ],
    assignment: {
      overview: 'Build a capstone project. Options: devtrack_cli / insightdash / scrapenotify / your own.',
      deliverables: [
        'New `growstack-capstone` repo',
        'Working code with ≥3 tests',
        'Professional README with architecture diagram',
      ],
    },
  },
  30: {
    title: 'Polish, Submit & Certify',
    subtitle: 'Final review + LinkedIn post + certificate',
    estimatedMinutes: 120,
    objectives: [
      'Final code review and cleanup',
      'Publish a LinkedIn post showcasing work',
      'Pass the final assessment',
      'Receive your verified certificate',
    ],
    assignment: {
      overview: 'Polish capstone, write LinkedIn post, complete final assessment.',
      deliverables: [
        'Final capstone repo URL',
        'LinkedIn post URL',
        'Final assessment score ≥ 70%',
      ],
    },
  },
};

/**
 * Build a complete DayModule-shaped object from a skeleton entry
 */
export function buildDayModule(dayNumber, courseId) {
  const meta = days[dayNumber];
  if (!meta) throw new Error(`No skeleton defined for day ${dayNumber}`);

  return {
    courseId,
    dayNumber,
    title: meta.title,
    subtitle: meta.subtitle,
    estimatedMinutes: meta.estimatedMinutes,
    isLocked: dayNumber !== 1,
    lesson: {
      introduction:
        `📚 **Day ${dayNumber} — ${meta.title}**\n\n${meta.subtitle}\n\n` +
        `This module is part of GrowStack's Python track. ` +
        `It will be filled in with full GeeksforGeeks-style content (code examples, diagrams, tables). ` +
        `For now, treat this as a placeholder — the structure, quiz, assessment, and assignment are all wired up and the day is unlockable.\n\n` +
        `### What you'll learn\n\n` +
        meta.objectives.map((o, i) => `${i + 1}. ${o}`).join('\n'),
      readingSections: meta.objectives.map((heading, idx) => ({
        heading: `${idx + 1}. ${heading}`,
        order: idx,
        body:
          `This section covers **${heading.toLowerCase()}**.\n\n` +
          `> Full reading content coming soon. The skeleton below shows the planned structure.\n\n` +
          `\`\`\`python\n# placeholder example for: ${heading}\nprint("${heading} – to be written")\n\`\`\`\n\n` +
          `_Edit \`backend/src/seed/daysSkeleton.js\` to flesh this out, or move the full content into its own file (see \`day01.js\` for the template)._`,
      })),
      codeExamples: [
        {
          title: `Example for ${meta.title}`,
          language: 'python',
          code: `# Example — to be filled in\nprint("Day ${dayNumber} example placeholder")\n`,
          output: `Day ${dayNumber} example placeholder`,
          explanation: 'Replace this with a runnable example that demonstrates the day\'s main idea.',
        },
      ],
      keyTakeaways: meta.objectives,
      downloads: [],
    },
    quiz: {
      timeLimit: 10,
      passingPercentage: 70,
      questions: generatePlaceholderQuiz(meta, dayNumber),
    },
    assessment: {
      timeLimit: 25,
      isFullScreenEnforced: true,
      instructions: `Coding assessment for Day ${dayNumber} — ${meta.title}. Read each prompt carefully. The auto-grader checks your printed output.`,
      questions: [
        {
          prompt: `Write a Python script that prints: \`Day ${dayNumber}: ${meta.title}\``,
          starterCode: '# Print the day title\n',
          expectedOutput: `Day ${dayNumber}`,
          points: 30,
        },
        {
          prompt: `Demonstrate the first learning objective (${meta.objectives[0]}) with a small example.`,
          starterCode: '# Your example\n',
          expectedOutput: meta.objectives[0].split(' ')[0],
          points: 35,
        },
        {
          prompt: `Demonstrate the second learning objective (${meta.objectives[1] || meta.objectives[0]}) with a small example.`,
          starterCode: '# Your example\n',
          expectedOutput: meta.objectives[1] ? meta.objectives[1].split(' ')[0] : meta.objectives[0].split(' ')[0],
          points: 35,
        },
      ],
    },
    assignment: {
      overview: meta.assignment.overview,
      objectives: meta.objectives,
      technicalRequirements: ['Python 3.12+', 'VS Code with Python extension', 'Git for version control'],
      deliverables: meta.assignment.deliverables,
      resources: ['Day ' + dayNumber + ' reading module'],
      xpReward: 50,
    },
  };
}

/**
 * Generate a 10-question placeholder quiz tied to the day's objectives
 */
function generatePlaceholderQuiz(meta, dayNumber) {
  const obj = meta.objectives;
  return [
    {
      question: `Which of these best describes the focus of Day ${dayNumber}?`,
      options: [meta.title, 'Unrelated topic', 'Database design', 'Web development only'],
      correctAnswer: meta.title,
      explanation: `Day ${dayNumber} is about ${meta.title}.`,
    },
    {
      question: `What is the first learning objective of this day?`,
      options: [obj[0] || 'TBD', obj[1] || 'TBD', obj[2] || 'TBD', 'None of the above'],
      correctAnswer: obj[0] || 'TBD',
      explanation: obj[0] ? `The first objective is: ${obj[0]}` : 'To be added.',
    },
    {
      question: `How long is this day's reading estimated to take?`,
      options: [`${meta.estimatedMinutes} minutes`, '10 minutes', '3 hours', '15 minutes'],
      correctAnswer: `${meta.estimatedMinutes} minutes`,
      explanation: `Estimated reading time is ${meta.estimatedMinutes} minutes (≈ 1 hour).`,
    },
    {
      question: `True or False: Each day includes a quiz, an assessment, and an assignment.`,
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: 'Every day has all four components: Reading, Quiz, Assessment, Assignment.',
    },
    {
      question: `What is the passing percentage for the day\'s quiz?`,
      options: ['50%', '60%', '70%', '100%'],
      correctAnswer: '70%',
      explanation: 'All quizzes use 70% as the passing threshold.',
    },
    {
      question: `Where do you submit your assignment work?`,
      options: ['Email', 'GitHub repo, LinkedIn post, or ZIP upload', 'In the chat', 'On paper'],
      correctAnswer: 'GitHub repo, LinkedIn post, or ZIP upload',
      explanation: 'Submit one of the three accepted formats.',
    },
    {
      question: `What XP reward do you get for completing the assignment?`,
      options: ['10 XP', '20 XP', '50 XP', '100 XP'],
      correctAnswer: '50 XP',
      explanation: 'Assignment approval awards 50 XP.',
    },
    {
      question: `What happens when you complete all 30 days?`,
      options: ['A new badge', 'A certificate with a unique ID', 'Nothing', 'A free laptop'],
      correctAnswer: 'A certificate with a unique ID',
      explanation: 'A verified GrowStack certificate with a unique certificateId is issued.',
    },
    {
      question: `The second learning objective is: ${obj[1] || 'TBD'}.`,
      options: ['Correct', 'Incorrect'],
      correctAnswer: 'Correct',
      explanation: 'This is the second objective from the syllabus.',
    },
    {
      question: `True or False: The assessment is fullscreen-enforced and timed.`,
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: 'Assessments run in fullscreen mode with a strict timer.',
    },
  ];
}

export default days;
