# GrowStack — Python Track: 30-Day Curriculum

> **Track:** Python Application Development
> **Duration:** 30 days (≈ 5 weeks × 6 days, Day 6 = project day)
> **Audience:** College students, beginners → job-ready
> **Daily time commitment:** ~90–120 minutes (1 lesson + 1 quiz + 1 assessment + 1 assignment)
> **Outcome:** A GitHub portfolio of 5 working projects + a verifiable GrowStack certificate

---

## How Each Day Is Structured

Every day unlocks four components (matching the DayModule schema):

| Component | Purpose | Time | Pass criteria |
|---|---|---|---|
| **Lesson** | Video + written notes + runnable code examples + downloads | 25 min | Watched end-to-end |
| **MCQ Quiz** | Recall + comprehension check | 10 min | 70% to unlock next day |
| **Fullscreen Assessment** | Timed coding test (anti-cheat) | 20 min | 60% to count |
| **Assignment** | Hands-on build, submitted as **GitHub repo / LinkedIn post / ZIP** | 45 min | Reviewed by admin → Approved |

**Gamification on top:**
- XP per component (Lesson 10, Quiz 20, Assessment 30, Assignment 50 = 110 XP/day)
- Streak bonus: +20 XP/day for completing all 4 before midnight
- Badges awarded at milestones (Day 7, 14, 21, 30)

---

## Curriculum Map (Big Picture)

```
WEEK 1 — Foundations:       syntax → data types → control flow → data structures
WEEK 2 — Core Python:      functions → modules → OOP
WEEK 3 — Real Programs:    files/APIs → data with pandas → mini-project
WEEK 4 — Professional:     testing → async → web framework → Git workflow
WEEK 5 — Capstone:         build a real tool, polish, ship, certify
```

Each week ends with a **Mini Project** that combines everything taught that week.

---

# WEEK 1 — Python Foundations (Days 1–7)

> **Goal:** Comfortable writing small programs that use variables, types, conditionals, loops, and core data structures.

---

## Day 1 — Setup & Your First Program

**Lesson (25 min)**
- What Python is, where it's used (web, data, AI, automation, scripting)
- Installing Python 3.12+ (Windows/macOS/Linux)
- Choosing an IDE: VS Code setup + the Python extension
- `python --version`, `python hello.py` from the terminal
- The `print()` function, strings, comments (`#`)
- Variables, assignment, naming rules
- Basic input with `input()`

**Run-it code example**
```python
# hello.py
name = input("What's your name? ")
print(f"Hey {name}, welcome to GrowStack's Python track!")
print("Day 1 of 30 — let's go.")
```

**Quiz (10 Qs)** — covers `print` syntax, comment character, valid variable names, `input` return type, file extensions (`.py`), case-sensitivity.

**Assessment prompt (fullscreen, 20 min)**
> Write a program `intro.py` that asks the user for their **name**, **college**, and **dream company**, then prints a single formatted greeting that includes all three on separate lines using an f-string. Submit the file when done.

**Assignment — Submit as ZIP or GitHub**
> Create a GitHub repo called `growstack-day1`. Inside, add `intro.py` (the assessment solution), `notes.md` (3 things you learned today in your own words), and a `README.md` introducing yourself. Push to GitHub and submit the repo link.
>
> **Deliverables:** GitHub repo URL
> **XP:** 50

---

## Day 2 — Data Types & Operators

**Lesson**
- Core types: `int`, `float`, `str`, `bool`, `None`
- The `type()` function
- Type conversion: `int()`, `float()`, `str()`, `bool()`
- Arithmetic operators: `+ - * / // % **`
- Comparison operators: `== != < > <= >=`
- Logical operators: `and`, `or`, `not`
- Operator precedence (the boring but important table)

**Quiz** — type identification, conversion edge cases (`int("3.5")` → error?), precedence, `True == 1`, integer vs float division.

**Assessment prompt**
> Write `calc.py` that takes **two numbers** as input and prints their sum, difference, product, integer division, and remainder. Format the output cleanly with labels.

**Assignment**
> Extend `intro.py` into a `day2_profile.py` mini-app: ask for the user's name, age, and CGPA. Print a "Profile Card" showing each value, its Python type, and convert their age into days (age × 365). Push to the same `growstack-day1` repo (rename to `growstack-journal`).
>
> **Deliverables:** Updated repo with `day2_profile.py`
> **XP:** 50

---

## Day 3 — Strings Deep Dive

**Lesson**
- String creation: `'...'`, `"..."`, `'''...'''`
- Indexing & slicing (`s[0]`, `s[-1]`, `s[1:4]`, `s[::-1]`)
- String methods: `upper`, `lower`, `strip`, `split`, `join`, `replace`, `find`, `startswith`, `endswith`, `isdigit`
- f-strings, `.format()`, `%`-formatting (just to recognize it)
- Escape characters: `\n`, `\t`, `\\`, `\"`
- String immutability (why `s[0] = "X"` fails)

**Quiz** — slicing outcomes, what `'  hello  '.strip()` returns, what `'a,b,c'.split(',')` returns, escape character behavior.

**Assessment prompt**
> Write `palindrome.py` that takes a string from the user, ignores case and spaces, and prints whether it's a palindrome. Example: `"A man a plan a canal Panama"` → palindrome.

**Assignment**
> Build a `formatter.py` tool: takes any user input (name, email, sentence) and prints it back in 5 different formats (uppercase, lowercase, title case, word count, character count). Add it to your repo with a `README.md` snippet showing example input/output.
>
> **Deliverables:** `formatter.py` + README update
> **XP:** 50

---

## Day 4 — Conditionals

**Lesson**
- `if`, `elif`, `else` blocks, indentation rules
- Truthy / falsy values (`0`, `""`, `[]`, `None`, `{}` → falsy)
- Nested conditionals
- The `match-case` statement (Python 3.10+)
- Ternary expression: `x if condition else y`

**Quiz** — output prediction on nested ifs, truthiness of various values, ternary syntax.

**Assessment prompt**
> Write `grade.py` that takes a marks input (0–100) and prints the grade: `A` (90+), `B` (80–89), `C` (70–79), `D` (60–69), `F` (<60). Also handle invalid input (negative, >100) with a clear error message.

**Assignment**
> Build `day4_admission.py` — a small CLI "college admission checker": ask for marks, age, and a boolean (yes/no) for "extracurriculars?". Print whether the candidate qualifies for a scholarship (criteria: marks ≥ 80 **and** age ≤ 25 **and** extracurriculars = yes). Add 3 sample runs to the README.
>
> **Deliverables:** `day4_admission.py` with sample runs
> **XP:** 50

---

## Day 5 — Loops

**Lesson**
- `for` loops with `range(stop)`, `range(start, stop)`, `range(start, stop, step)`
- Iterating over strings, lists
- `while` loops, `break`, `continue`, `pass`
- `else` clause on loops (the underrated one)
- Nested loops
- The `enumerate()` function

**Quiz** — output prediction for nested loops, range bounds, when `break` vs `continue` fires, what `range(10, 0, -1)` produces.

**Assessment prompt**
> Write `primes.py` that prints all prime numbers between 1 and 100 using a `for` loop. One prime per line.

**Assignment**
> Build `multiplication_table.py` — takes an integer N (1–20) and prints its multiplication table up to 10. Bonus: also print the **reverse** table (10 → 1). Show sample output in README.
>
> **Deliverables:** `multiplication_table.py`
> **XP:** 50

---

## Day 6 — Lists & Tuples

**Lesson**
- List creation, indexing, slicing (same as strings)
- List methods: `append`, `extend`, `insert`, `remove`, `pop`, `clear`, `sort`, `reverse`, `copy`
- List comprehensions: `[x*2 for x in nums]`
- Nested lists (2D)
- Tuples: immutability, when to use them
- Tuple unpacking: `a, b, c = (1, 2, 3)`
- `zip()` to combine iterables

**Quiz** — list vs tuple mutability, list comprehension output, what `.sort()` returns, `tuple([1,2,3])`.

**Assessment prompt**
> Write `top_scores.py` — given a hardcoded list of 10 student scores, print the top 3 highest and bottom 3 lowest without using `sort()`. Use a loop.

**Assignment**
> Build `todo.py` — a CLI to-do list: user types `add`, `list`, `done <index>`, `delete <index>`, or `quit`. Maintain a list of dictionaries `[{"task": ..., "done": False}]`. Persist to a JSON file so it survives restarts.
>
> **Deliverables:** `todo.py` + `tasks.json`
> **XP:** 60

---

## Day 7 — Dictionaries & Sets + WEEKLY PROJECT

**Lesson**
- Dictionary creation, access, mutation: `d["key"]`, `d.get()`, `d.setdefault()`
- Dictionary methods: `keys`, `values`, `items`, `update`, `pop`
- Dictionary comprehensions
- Sets: uniqueness, set operations (`| & - ^`)
- When to use dict vs set vs list
- `collections.Counter` (quick intro)

**Quiz** — dict key uniqueness, what happens on missing key, set vs list membership performance intuition.

**Assessment prompt**
> Write `word_frequency.py` — given a hardcoded paragraph (multi-line string), count how often each word appears and print the top 5 most common. Use a dictionary.

### 🏆 WEEKLY PROJECT — `quiz_app.py`
> **The "Daily Quiz CLI"** — a real working quiz game:
> - 5 hardcoded questions (multiple choice)
> - Tracks score, prints feedback per question
> - Saves high score to `highscores.json`
> - On startup, shows the previous high score and asks for the player's name
> - On game end, updates the high score if beaten
>
> **Deliverables:** `quiz_app.py` + `highscores.json` + a 60-second screen recording (Loom/ShareX) showing it running, in the repo README
> **XP:** 100
> **Badge unlocked:** 🧱 Foundation Builder

---

# WEEK 2 — Core Python (Days 8–14)

> **Goal:** Write modular, reusable, well-organized code. Understand OOP.

---

## Day 8 — Functions

**Lesson**
- `def`, parameters, return values
- Default arguments, keyword arguments
- `*args`, `**kwargs` (introduction)
- Variable scope: local vs global, the `global` keyword
- Docstrings (`"""..."""`) and why they matter
- Type hints: `def add(a: int, b: int) -> int:`

**Quiz** — argument order, scope resolution, what `*args` is internally, docstring conventions.

**Assessment prompt**
> Write `utils.py` with 5 utility functions: `is_palindrome(s)`, `factorial(n)`, `fibonacci(n)`, `celsius_to_fahrenheit(c)`, `is_anagram(a, b)`. Add a `__main__` block with test calls.

**Assignment**
> Build `day8_report_card.py` — takes a list of student marks (input or hardcoded), uses functions to compute: average, highest, lowest, pass/fail count. Format output as a clean report card table.
>
> **Deliverables:** `day8_report_card.py`
> **XP:** 50

---

## Day 9 — Functional Tools

**Lesson**
- `map(func, iterable)`
- `filter(func, iterable)`
- `reduce(func, iterable)` from `functools`
- Lambda functions: `lambda x: x*2`
- `sorted()` with `key=`
- `any()`, `all()`
- List comprehensions vs map/filter (when to use which)

**Quiz** — convert loops to comprehensions, `reduce` behavior, `sorted` with custom key.

**Assessment prompt**
> Given a list of dictionaries representing students (`[{"name": ..., "marks": ...}, ...]`), use **one** `map` and **one** `filter` call to produce a list of names of students who scored ≥ 75.

**Assignment**
> Build `day9_data_cleaner.py` — a function that takes a raw list of strings (e.g., `["  Alice  ", "BOB", "carol  "]`) and returns a cleaned list (lowercased, stripped, de-duplicated, sorted). Use lambdas + `sorted` with a key.
>
> **Deliverables:** `day9_data_cleaner.py`
> **XP:** 50

---

## Day 10 — File I/O

**Lesson**
- `open()` modes: `r`, `w`, `a`, `x`, `b`, `+`
- The `with` statement (context manager intro)
- `file.read()`, `file.readline()`, `file.readlines()`, iteration over file
- `file.write()`, `file.writelines()`
- Working with paths: `os.path` vs `pathlib.Path`
- Reading/writing CSV manually (just to understand what `csv` module does under the hood)

**Quiz** — mode behaviors, what happens when you open in `w` to a non-existent file, why use `with`, difference between `read()` and `readline()`.

**Assessment prompt**
> Write `log_parser.py` — given a sample log file (`access.log` with lines like `2026-01-15 12:30:45 GET /home 200`), count how many 200 vs 404 vs 500 responses there are and print a summary.

**Assignment**
> Build `day10_notes_app.py` — a CLI note-taking app: notes are saved as separate `.txt` files in a `notes/` folder. Commands: `new`, `list`, `view <name>`, `delete <name>`. Use `pathlib`.
>
> **Deliverables:** `day10_notes_app.py` + sample `notes/` folder
> **XP:** 50

---

## Day 11 — Error Handling

**Lesson**
- Exceptions vs syntax errors
- `try / except / else / finally`
- Catching specific exceptions: `except ValueError:`, `except (TypeError, KeyError):`
- The `as` keyword: `except ValueError as e:`
- Raising exceptions: `raise ValueError("...")`
- Custom exception classes
- Common built-in exceptions: `ValueError`, `TypeError`, `IndexError`, `KeyError`, `FileNotFoundError`, `ZeroDivisionError`

**Quiz** — what gets caught by `except Exception:` vs `except:`, when `else` runs vs `finally`, the order of except blocks.

**Assessment prompt**
> Write `safe_divide.py` — a function `safe_divide(a, b)` that returns the result, but handles `ZeroDivisionError` and `TypeError` with custom error messages. Test it with 5 different inputs.

**Assignment**
> Wrap your `todo.py` from Day 6 with proper error handling: invalid input, missing file, bad index. Submit the updated version.
>
> **Deliverables:** Updated `todo.py`
> **XP:** 50

---

## Day 12 — Modules, Packages & Virtual Environments

**Lesson**
- `import module`, `from module import name`, `import module as alias`
- The standard library: `math`, `random`, `datetime`, `os`, `sys`, `json`
- `__name__ == "__main__"` and why it matters
- Creating your own package (folder with `__init__.py`)
- `pip install`, requirements.txt
- Virtual environments: `python -m venv venv`, activating, why they exist

**Quiz** — import order, `__name__` value in a script vs imported module, where pip installs packages, why venv.

**Assessment prompt**
> Write `crypto_utils.py` — a module with functions for: random password generator, Caesar cipher, ROT13. Import and use it from a `main.py` file. Verify `__name__` works correctly.

**Assignment**
> Set up a proper project structure for your GrowStack journal:
> ```
> growstack-journal/
> ├── venv/
> ├── requirements.txt
> ├── README.md
> └── src/
>     ├── __init__.py
>     └── calculator.py
> ```
> Implement `calculator.py` with add/sub/mul/div (all using functions from `crypto_utils.py` style separation). Commit + push.
>
> **Deliverables:** Properly structured repo
> **XP:** 60

---

## Day 13 — OOP Part 1: Classes & Objects

**Lesson**
- Why OOP exists (model real-world things)
- Defining a class, creating an instance
- `__init__` constructor, `self`
- Instance attributes vs class attributes
- Instance methods, the `self` parameter
- `__str__`, `__repr__` dunder methods
- The `@staticmethod` and `@classmethod` decorators

**Quiz** — what `self` refers to, when `__init__` runs, difference between instance and class attribute.

**Assessment prompt**
> Create a `Dog` class with: `name`, `breed`, `energy` attributes, `bark()`, `play()`, `sleep()` methods, and a `__str__` that prints nicely. Create 3 instances and call methods.

**Assignment**
> Build `day13_library.py` — a `Book` class (title, author, pages, is_read) and a `Library` class that holds a list of `Book` objects with methods to add, list, mark as read, find by author. CLI menu to interact with it.
>
> **Deliverables:** `day13_library.py`
> **XP:** 50

---

## Day 14 — OOP Part 2: Inheritance & Polymorphism + WEEKLY PROJECT

**Lesson**
- Inheritance: `class Child(Parent):`
- `super().__init__()`
- Method overriding
- Multiple inheritance and MRO (Method Resolution Order)
- Abstract base classes: `from abc import ABC, abstractmethod`
- Polymorphism in practice
- Composition vs inheritance (when to prefer which)

**Quiz** — MRO on diamond inheritance, what `super()` does, when to use abstract methods.

**Assessment prompt**
> Build an inheritance chain: `Shape` (abstract) → `Circle`, `Rectangle`, `Triangle`. Each subclass implements `area()` and `perimeter()`. Write a function that takes a list of mixed shapes and prints each shape's info.

### 🏆 WEEKLY PROJECT — `bank_system.py`
> A working CLI bank system using OOP:
> - `Account` base class → `SavingsAccount`, `CurrentAccount`
> - Methods: `deposit`, `withdraw`, `transfer`, `check_balance`
> - `Bank` class manages multiple accounts
> - Persistent storage (JSON file)
> - CLI menu to log in as a customer and perform operations
>
> **Deliverables:** `bank_system.py` + `accounts.json` + README with architecture diagram (ASCII or Mermaid)
> **XP:** 100
> **Badge unlocked:** 🏛️ OOP Architect

---

# WEEK 3 — Real Programs (Days 15–21)

> **Goal:** Work with files, APIs, and data. Build something useful.

---

## Day 15 — Standard Library Tour

**Lesson**
- `datetime` and `timedelta` for date math
- `os` and `shutil` for file/folder operations
- `json` for serialization
- `random` and `secrets`
- `collections`: `Counter`, `defaultdict`, `namedtuple`, `deque`
- `re` — regex basics (`.`, `*`, `+`, `\d`, `\w`, `^`, `$`, groups)

**Quiz** — `datetime` arithmetic, regex pattern meaning, what `Counter` returns.

**Assessment prompt**
> Write `log_analyzer.py` — given a list of log entries with timestamps, count how many happened per hour. Use `datetime` + `Counter`.

**Assignment**
> Build `day15_organizer.py` — a script that scans a `messy_folder/` of mixed files (`.txt`, `.jpg`, `.pdf`, `.py`) and organizes them into subfolders by extension. Use `pathlib` + `shutil`.
>
> **Deliverables:** `day15_organizer.py` + screenshots of before/after
> **XP:** 50

---

## Day 16 — HTTP & APIs with `requests`

**Lesson**
- What HTTP is: GET, POST, PUT, DELETE
- Status codes: 200, 201, 400, 401, 404, 500
- Headers, query params, request body (JSON)
- The `requests` library: `requests.get()`, `.json()`, `.status_code`, `.text`
- API keys and `.env` files (use `python-dotenv`)
- Calling real public APIs

**Quiz** — status code meanings, GET vs POST, what `.json()` returns, why we use `.env`.

**Assessment prompt**
> Write `weather.py` — calls the Open-Meteo API (no key needed) for a hardcoded city and prints temperature, wind speed, and a one-line summary. Handle network errors gracefully.

**Assignment**
> Build `day16_github_lookup.py` — takes a GitHub username, calls the GitHub REST API, and prints: name, bio, public repo count, top 3 repos by stars. Submit your script + a screenshot of the output for your own username.
>
> **Deliverables:** `day16_github_lookup.py` + screenshot
> **XP:** 50

---

## Day 17 — Web Scraping Intro

**Lesson**
- HTML basics: tags, attributes, classes, IDs
- CSS selectors refresher
- `requests` to fetch HTML
- `BeautifulSoup` to parse it: `soup.find()`, `find_all()`, `.select()`, `.get_text()`, `.get()`
- Ethics: respect `robots.txt`, add delays, identify your bot in headers
- When NOT to scrape (use an API instead)

**Quiz** — selector syntax, what `find_all(class_="title")` returns, why a polite user-agent matters.

**Assessment prompt**
> Write `quote_scraper.py` — scrapes `quotes.toscrape.com` (designed for scraping), extracts the first 5 quotes and their authors, prints them nicely.

**Assignment**
> Build `day17_news_headlines.py` — scrapes a public news site of your choice, extracts the top 10 headlines, saves to `headlines.csv`. Include a `README.md` explaining which site, which selectors, and a polite user-agent string.
>
> **Deliverables:** `day17_news_headlines.py` + `headlines.csv` + README ethics section
> **XP:** 50

---

## Day 18 — Databases with SQLite

**Lesson**
- Why databases exist (vs JSON files)
- Relational concepts: tables, rows, columns, primary keys
- `sqlite3` module — no install needed
- `connect()`, `cursor()`, `execute()`, `fetchall()`, `commit()`
- `CREATE TABLE`, `INSERT`, `SELECT`, `UPDATE`, `DELETE`
- SQL injection and parameterized queries (`?` placeholders)
- `with sqlite3.connect(...) as conn:` pattern

**Quiz** — CRUD operations, what `commit()` does, why parameterized queries matter.

**Assessment prompt**
> Write `students_db.py` — creates a `students` table, inserts 5 students, queries and prints all, updates one, deletes one. Use parameterized queries.

**Assignment**
> Migrate your `day10_notes_app.py` to use SQLite instead of plain `.txt` files. Same CLI, same commands, but data persists in `notes.db`. Submit the new version + a screenshot from DB Browser for SQLite showing the table.
>
> **Deliverables:** `day10_notes_v2.py` (renamed) + `notes.db` + DB Browser screenshot
> **XP:** 60

---

## Day 19 — Data with Pandas

**Lesson**
- Why pandas (real-world data is tabular and messy)
- `Series` vs `DataFrame`
- Reading data: `pd.read_csv()`, `pd.read_json()`
- Inspecting: `.head()`, `.info()`, `.describe()`, `.shape`, `.columns`, `.dtypes`
- Selection: `df["col"]`, `df[["c1","c2"]]`, `df.loc[]`, `df.iloc[]`
- Filtering: `df[df["age"] > 25]`
- Adding columns, applying functions: `df["new"] = df["col"].apply(...)`
- GroupBy basics: `df.groupby("category")["value"].mean()`

**Quiz** — shape of a DataFrame, difference between `loc` and `iloc`, what `groupby` returns.

**Assessment prompt**
> Given a CSV of mock sales data (10 rows), load with pandas, print the DataFrame info, filter rows where revenue > 1000, and compute the average revenue per region.

**Assignment**
> Find any open dataset on Kaggle (CSV, <1MB), load it with pandas, and write `day19_analysis.py` that prints: shape, first 5 rows, summary stats, and **3 interesting filters or groupings** with brief written insights. Submit script + a screenshot of the output.
>
> **Deliverables:** `day19_analysis.py` + chosen dataset (or link) + insights
> **XP:** 60

---

## Day 20 — Visualization with Matplotlib

**Lesson**
- `import matplotlib.pyplot as plt`
- Line plots, bar charts, histograms, scatter plots
- Labels, titles, legends, grid
- `plt.savefig("chart.png")` and `plt.show()`
- Styling: colors, markers, linestyles
- Quick intro to `seaborn` for prettier defaults

**Quiz** — which plot for which data type, what `figsize` does, how to save vs display.

**Assessment prompt**
> Generate 3 plots from a hardcoded dataset: a line chart of monthly sales, a bar chart of category totals, a histogram of values. Save each as a separate PNG.

**Assignment**
> Extend `day19_analysis.py` with 4 visualizations saved as PNGs. Add them to your repo's `README.md` using markdown image tags. Bonus: use seaborn for at least one.
>
> **Deliverables:** `day19_analysis.py` v2 + PNG images in `charts/`
> **XP:** 50

---

## Day 21 — WEEKLY PROJECT

### 🏆 WEEKLY PROJECT — `finance_tracker.py`
> A **Personal Finance Tracker** CLI:
> - Add income/expense entries (amount, category, date, note)
> - Store in SQLite (`finance.db`)
> - Load with pandas for analysis
> - Visualize monthly spending by category (matplotlib bar chart)
> - Export filtered report to CSV
> - Summary command: total income, total expense, savings rate
>
> **Deliverables:** `finance_tracker.py` + sample `finance.db` + at least 3 charts in README
> **XP:** 100
> **Badge unlocked:** 📊 Data Wrangler

---

# WEEK 4 — Professional Python (Days 22–28)

> **Goal:** Write code like a professional. Test it, structure it, share it.

---

## Day 22 — Testing

**Lesson**
- Why test? (catch bugs early, refactor with confidence)
- `assert` statements (the quick and dirty way)
- `unittest` module: `TestCase`, `setUp`, `tearDown`, `assertEqual`, `assertRaises`
- Writing your first test: AAA pattern (Arrange, Act, Assert)
- `pytest` basics: simpler syntax, `pytest test_*.py`, fixtures intro

**Quiz** — what's in a test method name, what `setUp` does, difference between `unittest` and `pytest` style.

**Assessment prompt**
> Take `utils.py` from Day 8 and write `test_utils.py` with at least 5 unit tests using `unittest`.

**Assignment**
> Write tests for your `bank_system.py` from Week 2. Cover: deposit, withdraw (including insufficient funds), transfer (both happy path and failure). Use `pytest`. Include a screenshot of the test runner showing all green.
>
> **Deliverables:** `test_bank_system.py` + passing test output screenshot
> **XP:** 60

---

## Day 23 — Decorators & Generators

**Lesson**
- First-class functions: passing functions as arguments
- Closures: functions that remember their enclosing scope
- Decorators: `@decorator` syntax, writing your own
- Decorators with arguments (the 3-level nested function pattern)
- `functools.wraps`
- Generators: `yield`, lazy evaluation
- Generator expressions: `(x*2 for x in nums)`

**Quiz** — what `@decorator` is syntactic sugar for, when a generator function pauses, what `functools.wraps` preserves.

**Assessment prompt**
> Write a `@timer` decorator that prints how long the decorated function took to run. Apply it to a slow function (e.g., a loop with `time.sleep`).

**Assignment**
> Build `day23_logger.py` — a `@log_call` decorator that prints `[TIMESTAMP] function_name(args) → return_value` every time the decorated function runs. Use it on 3 of your existing functions and show the output.
>
> **Deliverables:** `day23_logger.py` + demo output
> **XP:** 50

---

## Day 24 — Context Managers & Iterators

**Lesson**
- The `with` statement (recap)
- The context manager protocol: `__enter__`, `__exit__`
- Writing a class-based context manager
- `@contextmanager` decorator from `contextlib`
- The iterator protocol: `__iter__`, `__next__`
- `iter()` and `next()`
- Building a custom iterable class

**Quiz** — what `__enter__` must return, what `__exit__` receives as args, when `StopIteration` is raised.

**Assessment prompt**
> Write a `Timer` context manager: `with Timer(): do_work()`. On exit, prints elapsed time.

**Assignment**
> Refactor a small script to use a custom context manager — e.g., a `DatabaseConnection` that opens a SQLite connection on enter and commits + closes on exit (even if an exception happens). Submit the refactored code.
>
> **Deliverables:** Refactored script with custom CM
> **XP:** 50

---

## Day 25 — Async Basics

**Lesson**
- Sync vs async: why sometimes you want concurrency
- `async def`, `await`
- `asyncio.run()`, `asyncio.sleep()`
- `asyncio.gather()` to run multiple tasks
- `aiohttp` for async HTTP
- When async helps (I/O-bound) vs when it doesn't (CPU-bound)

**Quiz** — what `await` does, what `gather` does, when async gives a real speedup.

**Assessment prompt**
> Write `async_fetch.py` — fetches 5 URLs concurrently using `aiohttp` and prints each response status + time taken. Compare total time to a sequential version.

**Assignment**
> Build `day25_async_quote_scraper.py` — async version of your Day 17 scraper that fetches all 10 pages concurrently. Show the speedup vs sequential in the README.
>
> **Deliverables:** `day25_async_quote_scraper.py` + speed comparison
> **XP:** 60

---

## Day 26 — Building a Web API with FastAPI

**Lesson**
- Web frameworks: Flask vs FastAPI (why FastAPI for new projects)
- Install: `pip install fastapi uvicorn`
- Defining routes: `@app.get("/")`, `@app.post("/items")`
- Path parameters, query parameters, request body
- Pydantic models for validation
- Auto-generated docs at `/docs`
- Running: `uvicorn main:app --reload`

**Quiz** — difference between path and query params, what Pydantic does, what `--reload` does.

**Assessment prompt**
> Build a `notes_api.py` with 4 endpoints: `GET /notes`, `POST /notes`, `GET /notes/{id}`, `DELETE /notes/{id}`. Store in memory (a list is fine). Test with curl or the `/docs` page.

**Assignment**
> Build `day26_tasks_api.py` — a full CRUD API for tasks (title, description, done). Persist to a JSON file. Include a `README.md` with curl examples for each endpoint + a screenshot of `/docs`.
>
> **Deliverables:** `day26_tasks_api.py` + README + screenshot
> **XP:** 60

---

## Day 27 — Git & GitHub Workflow for Python

**Lesson**
- `git init`, `add`, `commit`, `push`, `pull`, `clone`
- `.gitignore` for Python (`__pycache__/`, `*.pyc`, `venv/`, `.env`)
- Branching: `git checkout -b feature-x`, merge workflow
- Writing good commit messages (conventional commits style)
- README best practices: badges, install, usage, screenshots
- GitHub profile README (bonus)

**Quiz** — what goes in `.gitignore`, why commit often, conventional commit prefixes (`feat:`, `fix:`, `docs:`).

**Assessment prompt**
> Take any previous day's project, create a feature branch, add a small feature, commit with a proper message, merge back. Show the `git log --oneline --graph` output.

**Assignment**
> Polish the repo from Day 26: add a proper `.gitignore`, professional `README.md` with badges (use `shields.io`), and clean commit history (squash if needed). Pin the repo on your GitHub profile.
>
> **Deliverables:** Polished repo URL + screenshot of pinned repos
> **XP:** 50

---

## Day 28 — Packaging & Publishing

**Lesson**
- Project structure: `src/`, `tests/`, `pyproject.toml`
- `pyproject.toml` basics (PEP 621)
- Building a package: `python -m build`
- Publishing to **TestPyPI** (always test first!)
- Semantic versioning: `MAJOR.MINOR.PATCH`
- Importing your own package after install

**Quiz** — what `pyproject.toml` is for, why TestPyPI exists, when to bump major vs minor.

**Assessment prompt**
> Take a small utility module from earlier days (e.g., `crypto_utils.py`), restructure it as `growstack_utils/`, add a `pyproject.toml`, and build the wheel + sdist locally.

**Assignment**
> Publish a small package (your utility or a new one) to **TestPyPI**. Submit the install command + a screenshot showing `pip install` working on a fresh virtualenv.
>
> **Deliverables:** TestPyPI URL + install screenshot
> **XP:** 60

---

# WEEK 5 — Capstone (Days 29–30)

> **Goal:** Build one substantial project. Polish it. Ship it. Get certified.

---

## Day 29 — Capstone Build Day

**Project Brief (pick one)**
> **Option A — `devtrack_cli`**: A CLI productivity tool for developers — tracks your coding tasks, syncs with a local SQLite DB, has a Pomodoro timer, generates daily reports as markdown, exports to PDF.
>
> **Option B — `insightdash`**: A web dashboard (FastAPI backend + simple HTML/JS frontend) that loads a CSV of user analytics, computes KPIs, and renders charts in the browser.
>
> **Option C — `scrapenotify`**: A web scraper that monitors a website (job board, price tracker, news), detects changes, and sends an email notification when something changes.
>
> **Or propose your own** — must use at least 4 of: OOP, files, API calls, database, testing, async, web framework.

**Deliverables (by end of day)**
- Working code in a new repo `growstack-capstone`
- README with: project description, architecture diagram, install + usage, screenshots / screen recording
- At least 3 unit tests
- Clean commit history (one commit per feature)
- `.gitignore` + `requirements.txt` (or `pyproject.toml`)

**XP:** 80

---

## Day 30 — Polish, Submit & Certify

**Tasks**
1. Final code review pass: remove dead code, add docstrings, type hints
2. Add a `CONTRIBUTING.md` and `LICENSE` (MIT recommended)
3. Write a **LinkedIn post** showcasing your capstone — link to the repo, describe what it does, what you learned
4. Submit the repo URL + LinkedIn post URL
5. Complete the **final assessment** (fullscreen, comprehensive — covers Weeks 1–4)
6. Take the **exit survey**

**Deliverables**
- Final capstone repo URL
- LinkedIn post URL
- Passed final assessment (70%+)

**On approval:**
- 🎓 **Certificate of Completion** auto-generated with your name + unique `certificateId`
- 🎖️ **Badge unlocked:** 🐍 Python Certified
- 📜 Public verification page: `growstack.com/verify/<certificateId>`

---

# Milestones & Badges

| Day | Achievement | Badge |
|---|---|---|
| 7 | Finish Week 1 project | 🧱 Foundation Builder |
| 14 | Finish Week 2 project | 🏛️ OOP Architect |
| 21 | Finish Week 3 project | 📊 Data Wrangler |
| 28 | Publish to TestPyPI | 📦 Open Source Contributor |
| 30 | Capstone approved + final assessment passed | 🐍 Python Certified |

---

# XP & Leveling Math

- **Daily max XP:** 110 (Lesson 10 + Quiz 20 + Assessment 30 + Assignment 50)
- **Weekly project bonus:** +100 XP
- **Streak bonus:** +20 XP/day for completing all 4 components before midnight
- **Levels:** `XP // 500 + 1` — so Level 1 at 0, Level 2 at 500, etc.
- **30-day total possible:** ~3,300 + streak bonuses ≈ **Level 7** on completion

---

# What Students Walk Away With

1. **5 working projects** on a public GitHub profile (quiz app, bank system, finance tracker, async scraper, REST API + capstone)
2. **One published Python package** on TestPyPI
3. **A verified GrowStack certificate** with a unique ID, shareable on LinkedIn
4. **Solid foundation** to learn any framework (Django, Flask, ML libs) on their own
5. **A daily habit** — 90 min/day for 30 days builds real momentum

---

*Designed for GrowStack. Edit this file directly to refine content as student feedback comes in.*
