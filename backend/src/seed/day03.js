/**
 * Day 3 — Strings Deep Dive
 */

const day3 = {
  dayNumber: 3,
  title: 'Strings Deep Dive',
  subtitle: 'Slicing, formatting, and the most common string operations',
  estimatedMinutes: 65,
  lesson: {
    introduction:
      "Strings are Python's way of handling text. You'll use them in almost every program — usernames, messages, file contents, API responses. Today you'll learn how to slice, search, replace, and format strings like a pro.",
    readingSections: [
      {
        heading: '3.1 Creating Strings',
        order: 1,
        body: `Three ways to create a string:

\`\`\`python
single = 'Hello'
double = "Hello"
multi = """This is
a multi-line
string."""
\`\`\`

Use single or double quotes consistently — your choice. Use triple quotes (\`"""\`) for multi-line text or docstrings.`,
      },
      {
        heading: '3.2 Indexing & Slicing',
        order: 2,
        body: `Every character in a string has a position called an **index**. Python uses **0-based indexing**:

\`\`\`python
word = "Python"
#       P  y  t  h  o  n
#       0  1  2  3  4  5    (forward)
#      -6 -5 -4 -3 -2 -1    (backward)

print(word[0])     # 'P'  (first)
print(word[1])     # 'y'
print(word[-1])    # 'n'  (last)
\`\`\`

**Slicing** lets you grab a range: \`word[start:stop:step]\`

\`\`\`python
print(word[0:3])    # 'Pyt'  (chars 0,1,2 — stop is exclusive)
print(word[2:])     # 'thon' (from index 2 to end)
print(word[:4])     # 'Pyth' (start to index 3)
print(word[::2])    # 'Pto'  (every 2nd char)
print(word[::-1])   # 'nohtyP' (reversed!)
\`\`\`

\`\`\`mermaid
graph LR\n  A["Python"] --> B["word[0] = P"]\n  A --> C["word[1:4] = yth"]\n  A --> D["word[::-1] = nohtyP"]\n\`\`\``,
        diagram: `sequenceDiagram\n  participant Str as "word = 'Python'"\n  participant Idx as Index\n  Str->>Idx: word[0]\n  Idx-->>Str: 'P'\n  Str->>Idx: word[-1]\n  Idx-->>Str: 'n'\n  Str->>Idx: word[1:4]\n  Idx-->>Str: 'yth'`,
      },
      {
        heading: '3.3 Common String Methods',
        order: 3,
        body: `Strings come with many **methods** — functions you call *on* the string itself using a dot:

\`\`\`python
s = "  Hello, World!  "

print(s.strip())          # "Hello, World!"    (remove whitespace)
print(s.lower())          # "  hello, world!  "
print(s.upper())          # "  HELLO, WORLD!  "
print(s.replace("World", "Python"))
print(s.startswith("  H")) # True
print(s.endswith("!  "))   # True
print(s.find("World"))      # 9 (index of first occurrence)
print(s.count("l"))        # 3
print("hello".isalpha())    # True (only letters)
print("123".isdigit())      # True (only digits)
\`\`\`

**Methods that return a list:**
\`\`\`python
"a,b,c,d".split(",")      # ['a', 'b', 'c', 'd']
"-".join(["2026", "01", "15"])  # "2026-01-15"
\`\`\`

> **Key rule:** String methods return a **new** string. They never modify the original. Strings are **immutable**.`,
      },
      {
        heading: '3.4 String Formatting',
        order: 4,
        body: `Three ways to build formatted strings:

**1. f-strings (Python 3.6+, recommended)**
\`\`\`python
name = "Karthik"
score = 95.5
print(f"{name} scored {score:.1f}%")  # "Karthik scored 95.5%"
\`\`\`

You can also pad and align:
\`\`\`python
for name, score in [("Alice", 88), ("Bob", 92)]:
    print(f"{name:<10} | {score:>5}")
# Alice      |    88
# Bob        |    92
\`\`\`

**2. .format() method**
\`\`\`python
"Hello, {}!".format("world")
"Pi is {:.2f}".format(3.14159)
\`\`\`

**3. %-formatting (legacy, just recognise it)**
\`\`\`python
"Hello, %s!" % "world"
\`\`\`

> Stick with f-strings. They're the cleanest and most readable.`,
      },
      {
        heading: '3.5 Escape Characters',
        order: 5,
        body: `Some characters can't be typed directly. Use **escape sequences**:

| Escape | Meaning         |
| ------ | --------------- |
| \`\\n\`    | newline          |
| \`\\t\`    | tab              |
| \`\\\\\`   | backslash        |
| \`\\'\`    | single quote     |
| \`\\"\`    | double quote     |

\`\`\`python
print("Line 1\\nLine 2")
# Line 1
# Line 2

print("She said \\"hi\\"")
# She said "hi"
\`\`\`

If you don't want any escape processing, prefix with \`r\` (raw string):

\`\`\`python
print(r"C:\\Users\\karthik\\Desktop")
# C:\\Users\\karthik\\Desktop
\`\`\``,
      },
      {
        heading: '3.6 String Immutability',
        order: 6,
        body: `**Strings cannot be changed after creation.** This surprises beginners:

\`\`\`python
s = "hello"
s[0] = "H"      # ❌ TypeError: 'str' does not support item assignment
\`\`\`

To "modify" a string, you create a new one:

\`\`\`python
s = "hello"
s = "H" + s[1:]   # "Hello"
print(s)
\`\`\`

This immutability is what lets strings be used safely as dictionary keys (we'll cover this on Day 7).`,
      },
    ],
    codeExamples: [
      {
        title: 'palindrome.py — classic problem',
        language: 'python',
        code: `# palindrome.py — check if a string is a palindrome (case + space insensitive)
text = input("Enter text: ")

# Normalize: lowercase and remove spaces
cleaned = text.lower().replace(" ", "")

# A palindrome reads the same forwards and backwards
is_pal = cleaned == cleaned[::-1]

if is_pal:
    print(f'  "{text}" IS a palindrome.')
else:
    print(f'  "{text}" is NOT a palindrome.')
    print(f'  Forward:  {cleaned}')
    print(f'  Backward: {cleaned[::-1]}')
`,
        output: `Enter text: A man a plan a canal Panama\n  "A man a plan a canal Panama" IS a palindrome.`,
        explanation:
          'Notice how we chained `.lower().replace(" ", "")` — methods return new strings, and you can call methods on the result in a single expression.',
      },
      {
        title: 'formatter.py — text in 5 styles',
        language: 'python',
        code: `# formatter.py — show one string in 5 different formats
text = input("Type something: ")

print()
print(f"  Original:    [{text}]")
print(f"  Uppercase:   [{text.upper()}]")
print(f"  Lowercase:   [{text.lower()}]")
print(f"  Title Case:  [{text.title()}]")
print(f"  Word count:  {len(text.split())}")
print(f"  Char count:  {len(text)} (no spaces: {len(text.replace(' ', ''))})")
`,
        output: `Type something: Hello GrowStack\n\n  Original:    [Hello GrowStack]\n  Uppercase:   [HELLO GROWSTACK]\n  Lowercase:   [hello growstack]\n  Title Case:  [Hello Growstack]\n  Word count:  2\n  Char count:  15 (no spaces: 13)`,
        explanation:
          '`split()` with no argument splits on any whitespace (spaces, tabs, newlines) — perfect for counting words.',
      },
    ],
    keyTakeaways: [
      'Use indexing (`s[i]`) and slicing (`s[a:b:c]`) to extract parts of a string',
      '`s[::-1]` reverses a string',
      '`.strip()`, `.lower()`, `.upper()`, `.replace()`, `.split()`, `.join()` are the workhorses',
      'f-strings (`f"... {var} ..."`) are the modern formatting tool',
      'Strings are immutable — methods return new strings',
      'Use raw strings (`r"..."`) when you have lots of backslashes',
    ],
    downloads: [],
  },
  quiz: {
    timeLimit: 8,
    passingPercentage: 70,
    questions: [
      {
        question: 'What does `"Python"[0]` return?',
        options: ['"P"', '"y"', '"n"', 'Error'],
        correctAnswer: '"P"',
        explanation: 'Index 0 is the first character.',
      },
      {
        question: 'What is the result of `"hello"[-1]`?',
        options: ['"h"', '"o"', '"e"', 'Error'],
        correctAnswer: '"o"',
        explanation: 'Negative indexing starts from the end. -1 is the last character.',
      },
      {
        question: 'What does `"abcdef"[1:4]` return?',
        options: ['"abc"', '"bcd"', '"bcde"', '"bce"'],
        correctAnswer: '"bcd"',
        explanation: 'Slice stops *before* index 4. So we get chars at indices 1, 2, 3 → "bcd".',
      },
      {
        question: 'What is `"hello world".split()` ?',
        options: ['"hello world"', '["hello", "world"]', '["hello world"]', 'Error'],
        correctAnswer: '["hello", "world"]',
        explanation: '`split()` with no argument splits on whitespace.',
      },
      {
        question: 'What does `"  hi  ".strip()` return?',
        options: ['"hi"', '"  hi  "', '"hi  "', '"  hi"'],
        correctAnswer: '"hi"',
        explanation: '`strip()` removes whitespace from both ends.',
      },
      {
        question: 'Are strings mutable in Python?',
        options: ['Yes, you can change characters by index', 'No, strings are immutable', 'Only in Python 4', 'Only with the `mutable` keyword'],
        correctAnswer: 'No, strings are immutable',
        explanation: 'You can\'t do `s[0] = "X"` on a string. Create a new one instead.',
      },
      {
        question: 'What does `"abc".join(["1", "2", "3"])` return?',
        options: ['"abc123"', '"123"', '"1abc2abc3"', 'Error'],
        correctAnswer: '"1abc2abc3"',
        explanation: '`join()` puts the separator string *between* each element of the list.',
      },
      {
        question: 'What is the result of `"hello".upper().lower()`?',
        options: ['"HELLO"', '"hello"', '"Hello"', 'Error'],
        correctAnswer: '"hello"',
        explanation: 'Methods return new strings. `upper()` gives "HELLO", then `.lower()` makes it "hello".',
      },
      {
        question: 'In an f-string, what does `{x:.2f}` format?',
        options: ['A string with 2 characters', 'A float with 2 decimal places', 'An int with 2 digits', 'A binary number'],
        correctAnswer: 'A float with 2 decimal places',
        explanation: '`{x:.2f}` formats `x` as a float with exactly 2 digits after the decimal point.',
      },
      {
        question: 'What does `"hello\\nworld"` print?',
        options: ['hello\\nworld', 'hello world', 'hello\\nworld on one line', 'helloworld'],
        correctAnswer: 'hello\nworld',
        explanation: 'Wait — the answer is literally "hello" then newline then "world". That\'s what `\\n` means.',
      },
    ],
  },
  assessment: {
    timeLimit: 20,
    isFullScreenEnforced: true,
    instructions: '3 string-handling tasks. Stay focused.',
    questions: [
      {
        prompt: 'Ask for the user\'s full name. Print their initials in uppercase (e.g. "Karthik Sharma" → "KS").',
        starterCode: '# Get initials\n',
        expectedOutput: 'KS',
        points: 35,
      },
      {
        prompt: 'Ask for an email address. Print the domain (the part after @).',
        starterCode: '# Extract domain\n',
        expectedOutput: '@',
        points: 30,
      },
      {
        prompt: 'Ask for a sentence. Print the count of vowels (a, e, i, o, u — case insensitive).',
        starterCode: '# Count vowels\n',
        expectedOutput: 'vowel',
        points: 35,
      },
    ],
  },
  assignment: {
    overview: 'Build a string-formatting tool that shows any input in 5 styles plus word/char counts.',
    objectives: [
      'Apply string slicing and methods',
      'Use f-strings with alignment specifiers',
      'Build a reusable utility script',
    ],
    technicalRequirements: ['Python 3.12+', 'No external libraries'],
    deliverables: [
      'A `formatter.py` script',
      'Reads user input, prints it in 5 formats',
      'Includes README example output',
    ],
    resources: ['Day 3 reading module'],
    xpReward: 50,
  },
};

export default day3;
