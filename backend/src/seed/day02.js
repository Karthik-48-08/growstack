/**
 * Day 2 — Data Types & Operators
 */

const day2 = {
  dayNumber: 2,
  title: 'Data Types & Operators',
  subtitle: 'Numbers, strings, booleans, and how to do math with them',
  estimatedMinutes: 70,
  lesson: {
    introduction:
      "Yesterday you wrote your first program. Today we go deeper into the *kinds of values* Python can hold and what operations you can do with them. By the end of this module, you'll be able to build a profile-card CLI that mixes text, numbers, and calculations.",
    readingSections: [
      {
        heading: '2.1 The Core Data Types',
        order: 1,
        body: `Python has several built-in data types. The ones you'll use every day:

| Type     | Example            | Description                      |
| -------- | ------------------ | -------------------------------- |
| \`int\`    | \`42\`, \`-7\`, \`0\`        | Whole numbers (no decimal)       |
| \`float\`  | \`3.14\`, \`-0.5\`           | Numbers with decimals            |
| \`str\`    | \`"hello"\`           | Text (string of characters)      |
| \`bool\`   | \`True\`, \`False\`        | Logical values                   |
| \`None\`   | \`None\`              | "No value yet" placeholder       |

Check a value's type with \`type()\`:

\`\`\`python
print(type(42))        # <class 'int'>
print(type(3.14))      # <class 'float'>
print(type("hello"))   # <class 'str'>
print(type(True))      # <class 'bool'>
print(type(None))      # <class 'NoneType'>
\`\`\``,
        diagram: `graph TD\n  A[Python Values] --> B[int: 42]\n  A --> C[float: 3.14]\n  A --> D[str: hello]\n  A --> E[bool: True/False]\n  A --> F[None]\n`,
      },
      {
        heading: '2.2 Type Conversion',
        order: 2,
        body: `Sometimes you have a value of one type but need it as another. Python provides **constructor functions** for this:

\`\`\`python
age_str = "25"          # this is a STRING
age_int = int(age_str)  # now it's an integer
\`\`\`

Common conversions:
- \`int(x)\` — convert \`x\` to integer (truncates decimals)
- \`float(x)\` — convert \`x\` to float
- \`str(x)\` — convert \`x\` to string
- \`bool(x)\` — convert \`x\` to boolean

> **Watch out!** \`int("3.14")\` raises an error. You need \`int(float("3.14"))\` or just \`float("3.14")\`.

This is exactly why \`input()\` needs converting — it always returns a string, even if the user types a number:

\`\`\`python
age = input("Age: ")       # "25"
age_num = int(age)          # 25 (now we can do math)
\`\`\``,
      },
      {
        heading: '2.3 Arithmetic Operators',
        order: 3,
        body: `Python supports the usual math operators:

| Operator | Meaning              | Example      | Result  |
| -------- | -------------------- | ------------ | ------- |
| \`+\`      | Addition              | \`7 + 2\`     | \`9\`     |
| \`-\`      | Subtraction           | \`7 - 2\`     | \`5\`     |
| \`*\`      | Multiplication        | \`7 * 2\`     | \`14\`    |
| \`/\`      | True division         | \`7 / 2\`     | \`3.5\`   |
| \`//\`     | Floor division        | \`7 // 2\`    | \`3\`     |
| \`%\`      | Modulus (remainder)   | \`7 % 2\`     | \`1\`     |
| \`**\`     | Exponent              | \`7 ** 2\`    | \`49\`    |

\`\`\`python
print(10 / 3)    # 3.3333... (true division, always float)
print(10 // 3)   # 3        (floor division)
print(10 % 3)    # 1        (remainder)
print(2 ** 10)   # 1024     (2 to the power of 10)
\`\`\`

> **Tip:** Use \`round(x, n)\` to round to \`n\` decimal places: \`round(3.14159, 2)\` → \`3.14\`.`,
      },
      {
        heading: '2.4 Comparison Operators',
        order: 4,
        body: `Comparison operators return a **boolean** (\`True\` / \`False\`):

\`\`\`python
print(5 == 5)      # True   (equal)
print(5 != 3)      # True   (not equal)
print(5 > 3)       # True
print(5 < 3)       # False
print(5 >= 5)      # True
print(5 <= 4)      # False
\`\`\`

> **Note:** \`=\` (single) is **assignment**. \`==\` (double) is **comparison**. Mixing them up is one of the most common beginner bugs.

These will become crucial tomorrow when we cover conditionals.`,
      },
      {
        heading: '2.5 Logical Operators',
        order: 5,
        body: `Logical operators combine boolean values:

\`\`\`python
age = 22
has_laptop = True

print(age >= 18 and has_laptop)   # True   (AND — both must be true)
print(age < 18 or has_laptop)     # True   (OR  — at least one true)
print(not has_laptop)             # False  (NOT — flip the value)
\`\`\`

Truth tables:

| A     | B     | A and B | A or B |
| ----- | ----- | ------- | ------ |
| True  | True  | True    | True   |
| True  | False | False   | True   |
| False | True  | False   | True   |
| False | False | False   | False  |`,
      },
      {
        heading: '2.6 Operator Precedence',
        order: 6,
        body: `When you mix operators in one expression, Python follows a precedence order (similar to maths BODMAS/PEMDAS):

1. \`**\` (exponent)
2. \`+\` \`-\` (unary plus/minus)
3. \`*\` \`/\` \`//\` \`%\`
4. \`+\` \`-\` (addition/subtraction)
5. \`<\` \`<=\` \`>\` \`>=\` \`==\` \`!=\`
6. \`not\`
7. \`and\`
8. \`or\`

\`\`\`python
print(2 + 3 * 4)       # 14, not 20 — * is higher than +
print((2 + 3) * 4)     # 20 — parentheses force the order
print(2 ** 3 ** 2)     # 512 — ** is right-to-left: 3**2=9, 2**9=512
\`\`\`

> **Best practice:** when in doubt, add parentheses. Clear code beats clever code.`,
      },
    ],
    codeExamples: [
      {
        title: 'calc.py — basic calculator',
        language: 'python',
        code: `# calc.py — basic arithmetic on two numbers
a = float(input("First number: "))
b = float(input("Second number: "))

print(f"  Sum:      {a + b}")
print(f"  Diff:     {a - b}")
print(f"  Product:  {a * b}")
print(f"  Quotient: {a / b if b != 0 else 'undefined (division by zero)'}")
print(f"  Floor:    {a // b if b != 0 else 'n/a'}")
print(f"  Modulus:  {a % b if b != 0 else 'n/a'}")
print(f"  Power:    {a ** b}")
`,
        output: `First number: 10\nSecond number: 3\n  Sum:      13.0\n  Diff:     7.0\n  Product:  30.0\n  Quotient: 3.3333333333333335\n  Floor:    3.0\n  Modulus:  1.0\n  Power:    1000.0`,
        explanation:
          'Notice the ternary `b != 0` check to avoid dividing by zero. We used `float()` so the user can enter decimals.',
      },
      {
        title: 'profile_card.py — formatted profile',
        language: 'python',
        code: `# profile_card.py — your profile as a data card
name = input("Your name: ")
age = int(input("Your age: "))           # convert to int for math
cgpa = float(input("Your CGPA: "))      # convert to float

age_in_days = age * 365
print()
print("┌" + "─" * 38 + "┐")
print(f"│  Name:    {name:<28} │")
print(f"│  Age:     {age} years ({age_in_days} days){' ' * (14 - len(str(age_in_days)))} │")
print(f"│  CGPA:    {cgpa}{' ' * (29 - len(str(cgpa)))} │")
print("└" + "─" * 38 + "┘")
`,
        output: `┌──────────────────────────────────────┐\n│  Name:    Karthik                      │\n│  Age:     21 years (7665 days)         │\n│  CGPA:    8.4                          │\n└──────────────────────────────────────┘`,
        explanation:
          'We used `<` inside f-strings for left-alignment and padded with spaces to keep the box straight. Try changing the alignment to `>28` or `^28` to see what happens.',
      },
    ],
    keyTakeaways: [
      'Python has 5 core types: int, float, str, bool, None',
      '`type()` reveals a value\'s type',
      '`int()`, `float()`, `str()` convert between types',
      '`input()` always returns a string — convert before doing math',
      '`/` is true division, `//` is floor division, `%` is remainder',
      '`==` compares, `=` assigns — don\'t confuse them',
      'Use parentheses to make operator order explicit',
    ],
    downloads: [],
  },
  quiz: {
    timeLimit: 8,
    passingPercentage: 70,
    questions: [
      {
        question: 'What is the type of the value `3.14`?',
        options: ['int', 'float', 'str', 'double'],
        correctAnswer: 'float',
        explanation: 'Any number with a decimal point is a `float` in Python.',
      },
      {
        question: 'What does `int("3.9")` return?',
        options: ['3', '3.9', '4', 'Error'],
        correctAnswer: 'Error',
        explanation: '`int()` can\'t parse a string that has a decimal point. Use `int(float("3.9"))` to get 3, or `round()` to get 4.',
      },
      {
        question: 'What is the result of `10 // 3`?',
        options: ['3.33', '3', '1', '0'],
        correctAnswer: '3',
        explanation: 'Floor division `//` drops the fractional part.',
      },
      {
        question: 'What is the result of `2 ** 4`?',
        options: ['8', '16', '6', 'Error'],
        correctAnswer: '16',
        explanation: '`**` is the exponent operator. 2⁴ = 16.',
      },
      {
        question: 'What does `True and False` evaluate to?',
        options: ['True', 'False', 'None', 'Error'],
        correctAnswer: 'False',
        explanation: '`and` requires both sides to be True to return True.',
      },
      {
        question: 'Which operator is used for assignment?',
        options: ['==', '=', '===', ':='],
        correctAnswer: '=',
        explanation: 'Single `=` assigns. Double `==` compares.',
      },
      {
        question: 'What is the result of `type(None)`?',
        options: ['<class \'None\'>', '<class \'NoneType\'>', '<class \'null\'>', '<class \'void\'>'],
        correctAnswer: "<class 'NoneType'>",
        explanation: 'The type of `None` is `NoneType`.',
      },
      {
        question: 'What does `bool(0)` return?',
        options: ['True', 'False', '0', 'Error'],
        correctAnswer: 'False',
        explanation: '`0` is one of the few "falsy" values in Python. Others: empty string, empty list, None.',
      },
      {
        question: 'Which of these is a valid expression?',
        options: ['5 = 5', '5 == 5', '5 := 5', '5 equals 5'],
        correctAnswer: '5 == 5',
        explanation: '`==` is equality. `:=` is the walrus operator (advanced, not for comparisons).',
      },
      {
        question: 'What is the result of `7 % 3`?',
        options: ['2', '1', '3', '2.33'],
        correctAnswer: '1',
        explanation: '7 ÷ 3 = 2 remainder 1. `%` returns the remainder.',
      },
    ],
  },
  assessment: {
    timeLimit: 25,
    isFullScreenEnforced: true,
    instructions:
      '3 coding tasks. Stay in fullscreen. The auto-grader checks printed output.',
    questions: [
      {
        prompt: 'Ask for two numbers and print their **sum**, **difference**, and **product** — each on its own labelled line.',
        starterCode: '# Write your code\n',
        expectedOutput: 'sum',
        points: 30,
      },
      {
        prompt: 'Ask for the user\'s birth year (as integer), then print their age (assume current year is 2026).',
        starterCode: '# Compute and print age\n',
        expectedOutput: '20',
        points: 30,
      },
      {
        prompt: 'Ask for a temperature in Celsius and print the equivalent in Fahrenheit using the formula F = C × 9/5 + 32.',
        starterCode: '# Convert C to F\n',
        expectedOutput: '32',
        points: 40,
      },
    ],
  },
  assignment: {
    overview: 'Build a personal profile card CLI that converts your data into multiple formats.',
    objectives: [
      'Use input() and int()/float() conversions',
      'Apply arithmetic and f-string formatting',
      'Print aligned output using padding',
    ],
    technicalRequirements: ['Python 3.12+', 'No external libraries'],
    deliverables: [
      'A `day2_profile.py` script that asks for name, age, CGPA',
      'Prints a formatted "profile card" with each value, its type, and age converted to days',
      'Add sample output to your repo README',
    ],
    resources: ['Day 2 reading module'],
    xpReward: 50,
  },
};

export default day2;
