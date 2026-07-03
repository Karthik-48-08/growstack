/**
 * Day 1 — Setup & Your First Program
 * Reading style: GeeksforGeeks / W3Schools — markdown with code, diagrams, tables
 */

const day1 = {
  dayNumber: 1,
  title: 'Setup & Your First Program',
  subtitle: 'Install Python, set up VS Code, and write your first script',
  estimatedMinutes: 60,
  isLocked: false, // Day 1 is always unlocked
  lesson: {
    introduction:
      "Welcome to GrowStack's Python track. Before we write a single line of real code, we need to set up your machine. This module walks you through installing Python, configuring a professional editor (VS Code), and running your first program. By the end you'll have a working development environment and a script that asks for your name and prints a personalised greeting.",
    readingSections: [
      {
        heading: '1.1 What is Python?',
        order: 1,
        body: `Python is a **high-level, interpreted, general-purpose programming language** created by Guido van Rossum and first released in 1991. It emphasises code readability — note how the language's name itself comes from *Monty Python*, not the snake.

Python is used everywhere today:

| Domain            | Example Use Cases                                          |
| ----------------- | ---------------------------------------------------------- |
| Web Development   | Django, Flask, FastAPI backends                            |
| Data Science      | pandas, NumPy, scikit-learn, Jupyter notebooks             |
| Machine Learning  | PyTorch, TensorFlow, Hugging Face                          |
| Automation        | Scripting, web scraping, task scheduling                   |
| DevOps            | Ansible, build tools, CI scripts                           |

Python code is executed **line-by-line by an interpreter**, so you don't need to compile it before running. This makes iteration fast — perfect for learning.`,
        diagram: `graph LR\n  A[Python Syntax] --> B[Web Apps]\n  A --> C[Data Science]\n  A --> D[ML/AI]\n  A --> E[Automation]\n  A --> F[DevOps]`,
      },
      {
        heading: '1.2 Installing Python',
        order: 2,
        body: `Download Python 3.12 or newer from the official site: **https://www.python.org/downloads/**.

During installation on Windows, **tick "Add Python to PATH"** — this lets you run \`python\` from any terminal window.

Verify your install:

\`\`\`bash
python --version
# Output: Python 3.12.x
\`\`\`

> **macOS / Linux:** Python 3 usually comes pre-installed. You can use \`python3\` instead of \`python\` if needed.

You can also have multiple Python versions side by side using tools like \`pyenv\`, but for this course a single 3.12 install is enough.`,
      },
      {
        heading: '1.3 Choosing an IDE — VS Code',
        order: 3,
        body: `An IDE (Integrated Development Environment) gives you syntax highlighting, auto-completion, debugging, and a terminal — all in one window.

For this track we recommend **Visual Studio Code** (free, from Microsoft):

1. Download from https://code.visualstudio.com/
2. Open VS Code and click the **Extensions** icon (or press \`Ctrl+Shift+X\`)
3. Search for **Python** and install the official extension by Microsoft

A good VS Code layout for Python work looks like this:

\`\`\`mermaid
graph TD\n  A[VS Code Window] --> B[Explorer: files]\n  A --> C[Editor: your code]\n  A --> D[Terminal: run scripts]\n  A --> E[Extensions: Python]\n\`\`\``,
      },
      {
        heading: '1.4 Your First Program',
        order: 4,
        body: `Create a folder called \`growstack-journal\` somewhere on your machine (e.g. Desktop). Inside, create a file called \`hello.py\`.

\`\`\`python
# hello.py
# This is a comment. Python ignores anything after a # symbol.

print("Hello, world!")
print("I'm learning Python with GrowStack.")
\`\`\`

Run it from the terminal:

\`\`\`bash
cd path/to/growstack-journal
python hello.py
\`\`\`

Expected output:
\`\`\`
Hello, world!
I'm learning Python with GrowStack.
\`\`\`

**What's happening?**
- \`print()\` is a **built-in function** that displays text on the screen.
- The text inside the parentheses is called an **argument**.
- Strings are wrapped in quotes (\`"..."\` or \`'...'\` — both work).
- A \`#\` starts a **comment** — Python ignores it, but humans love it.`,
        codeExample: false,
      },
      {
        heading: '1.5 Variables and Input',
        order: 5,
        body: `A **variable** is a name you give to a value so you can reuse it later. Think of it as a labelled box.

\`\`\`python
# Variables
name = "Karthik"
college = "IIT Madras"
goal = "Become a backend engineer"

print(name)
print("College:", college)
print("Goal:", goal)
\`\`\`

**Variable naming rules:**
- Must start with a letter or underscore (\`_name\`)
- Can contain letters, digits, underscores
- Case-sensitive: \`name\` and \`Name\` are different
- Cannot be a reserved keyword (\`if\`, \`for\`, \`def\`, etc.)

To get input from the user, use \`input()\`:

\`\`\`python
name = input("What's your name? ")
print(f"Hey {name}, welcome to GrowStack's Python track!")
\`\`\`

The \`f"..."\` syntax is called an **f-string** — it lets you embed variables directly inside a string using \`{...}\`.`,
      },
      {
        heading: '1.6 Running Python in Two Ways',
        order: 6,
        body: `You can run Python in two modes:

**1. Script mode** (what we'll use 99% of the time) — write code in a \`.py\` file and run it.

\`\`\`bash
python my_script.py
\`\`\`

**2. Interactive mode** (great for experimenting) — type \`python\` in your terminal with no file:

\`\`\`bash
$ python
>>> 2 + 2
4
>>> print("hi")
hi
>>> exit()
\`\`\`

The \`>>>\` prompt means Python is waiting for your input. Type \`exit()\` to leave.`,
      },
    ],
    codeExamples: [
      {
        title: 'intro.py — Interactive Greeting',
        language: 'python',
        code: `# intro.py — your first interactive program
name = input("What's your name? ")
college = input("Where do you study? ")
dream = input("What's your dream company? ")

print()
print("=" * 40)
print(f"  Hey {name}, welcome to GrowStack!")
print(f"  College: {college}")
print(f"  Dream:   {dream}")
print("=" * 40)
print("  Day 1 of 30 — let's go. 🚀")
`,
        output: `========================================
  Hey Karthik, welcome to GrowStack!
  College: IIT Madras
  Dream:   Stripe
========================================
  Day 1 of 30 — let's go. 🚀`,
        explanation:
          'Notice how we used an f-string to embed variables. The `print()` on its own line prints a blank line for spacing. The `"=" * 40` repeats the equals sign 40 times — a common trick for drawing lines.',
      },
    ],
    keyTakeaways: [
      'Python is an interpreted language — no compile step required',
      'Always install Python 3.12+ and tick "Add to PATH" on Windows',
      'VS Code with the Python extension is the recommended IDE',
      '`print()` displays output, `input()` reads user input',
      'Variables store values and follow snake_case naming convention',
      'f-strings (`f"... {var} ..."`) are the modern way to format strings',
    ],
    downloads: [
      'https://www.python.org/downloads/',
      'https://code.visualstudio.com/',
    ],
  },
  quiz: {
    timeLimit: 8,
    passingPercentage: 70,
    questions: [
      {
        question: 'Which file extension is used for Python source files?',
        options: ['.pt', '.python', '.py', '.pys'],
        correctAnswer: '.py',
        explanation: 'Python source files always end in `.py`.',
      },
      {
        question: 'What does `input()` return?',
        options: ['An integer', 'A string', 'A boolean', 'Whatever the user types, exactly'],
        correctAnswer: 'A string',
        explanation: '`input()` always returns a string. You must convert it explicitly using `int()`, `float()`, etc.',
      },
      {
        question: 'Which of these is a valid Python variable name?',
        options: ['2cool', 'my-name', 'my_name', 'class'],
        correctAnswer: 'my_name',
        explanation: '`2cool` starts with a digit, `my-name` has a hyphen, `class` is a reserved keyword. `my_name` is valid.',
      },
      {
        question: 'What will `print(f"Hi {name}")` print if `name = "Karthik"`?',
        options: ['Hi {name}', 'Hi name', 'Hi Karthik', 'Error'],
        correctAnswer: 'Hi Karthik',
        explanation: 'The `f` prefix turns it into an f-string, replacing `{name}` with the variable\'s value.',
      },
      {
        question: 'Which symbol starts a comment in Python?',
        options: ['//', '#', '/*', '--'],
        correctAnswer: '#',
        explanation: 'Python uses `#` for comments. `//` is C/Java.',
      },
      {
        question: 'What command runs a script called `hello.py` from the terminal?',
        options: ['run hello.py', 'python hello.py', 'execute hello.py', 'go hello.py'],
        correctAnswer: 'python hello.py',
        explanation: 'You invoke the Python interpreter with the file as an argument.',
      },
      {
        question: 'Which of these is NOT a Python use case?',
        options: ['Web development', 'Data science', 'Browser rendering (client-side JS replacement)', 'Automation'],
        correctAnswer: 'Browser rendering (client-side JS replacement)',
        explanation: 'Python runs on servers and in scripts. Browsers use JavaScript for client-side rendering.',
      },
      {
        question: 'What does the line `name = "Karthik"` do?',
        options: [
          'Prints "Karthik"',
          'Asks the user for their name',
          'Stores the string "Karthik" in a variable called name',
          'Creates a file called name',
        ],
        correctAnswer: 'Stores the string "Karthik" in a variable called name',
        explanation: 'The `=` operator is assignment — it stores the value on the right into the variable on the left.',
      },
      {
        question: 'In VS Code, what extension should you install for Python development?',
        options: ['Python Tools', 'PyRunner', 'Python (by Microsoft)', 'PyHelper'],
        correctAnswer: 'Python (by Microsoft)',
        explanation: 'The official Python extension by Microsoft provides IntelliSense, debugging, and linting.',
      },
      {
        question: 'What is the output of `print("=" * 5)`?',
        options: ['5', '=====', '== ==', 'Error'],
        correctAnswer: '=====',
        explanation: 'The `*` operator on a string repeats it. `"=" * 5` repeats `=` five times.',
      },
    ],
  },
  assessment: {
    timeLimit: 25,
    isFullScreenEnforced: true,
    instructions:
      'You will be given 3 short coding tasks. You have 25 minutes. Once started, you cannot leave the fullscreen window. Read carefully — the auto-grader checks your output, not your code.',
    questions: [
      {
        prompt: `Write a Python program that asks the user for their **name** and **age**, then prints:\n\n\`\`\`\nHello <name>, you are <age> years old.\n\`\`\``,
        starterCode: '# Write your code below\n',
        expectedOutput: 'Hello',
        points: 30,
      },
      {
        prompt: `Write a Python program that creates a variable called \`motivation\` containing the string \`"Python is fun"\` and prints it.`,
        starterCode: '# Create the variable and print it\n',
        expectedOutput: 'Python is fun',
        points: 30,
      },
      {
        prompt: `Write a Python program that uses an f-string to print: \`The answer is 42\`. Store the number in a variable first.`,
        starterCode: '# Use a variable and an f-string\n',
        expectedOutput: 'The answer is 42',
        points: 40,
      },
    ],
  },
  assignment: {
    overview:
      'Set up your GitHub portfolio. Create a repo, push your first script, write a README, and submit the repo URL.',
    objectives: [
      'Install Python 3.12+ and VS Code',
      'Set up a GitHub account (if you don\'t have one)',
      'Create your first Python script with input + output',
      'Push your code to a public GitHub repo',
      'Write a professional README.md',
    ],
    technicalRequirements: [
      'Python 3.12 or newer',
      'VS Code with Python extension installed',
      'Git installed and configured with your GitHub credentials',
      'At least 2 commits in your repo',
    ],
    deliverables: [
      'Public GitHub repo URL',
      'A `hello.py` script that takes user input and prints output',
      'A `notes.md` with 3 things you learned today',
      'A `README.md` with your name, college, and goal',
    ],
    resources: [
      'https://git-scm.com/downloads',
      'https://docs.github.com/en/get-started/quickstart/create-a-repo',
    ],
    xpReward: 50,
  },
};

export default day1;
