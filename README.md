# TAAP

### TUI Agenda And Planner (Terminal-based)

TAAP is a **terminal user interface (TUI) task planner and agenda** written in **Node.js**.
It runs fully inside your terminal and lets you manage tasks using a menu-based interface.

The goal of TAAP is to be:

* Simple
* Fast
* Dependency-light
* Usable from **any directory** with a single command

---

## ✨ Features

* Menu-based TUI (arrow keys + enter)
* Add tasks with date & time
* View tasks and agenda
* Mark tasks as completed
* Delete tasks
* Smart date & time input
* Works globally as a CLI command (`taap`)
* No colors (for maximum terminal compatibility & stability)

---

## 📦 Requirements

You must have:

* **Node.js** (version 16 or newer)
* **npm** (comes with Node.js)
* A Unix-like system (Linux, macOS, BSD)

### Check if Node.js is installed

```bash
node -v
npm -v
```

If not installed on Arch Linux:

```bash
sudo pacman -S nodejs npm
```

---

## 📥 Installation (from GitHub)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ferre455/taap-TUI-Agenda-And-Planner-.git
cd taap-TUI-Agenda-And-Planner-
```

---

### 2️⃣ Install dependencies

This installs all required Node.js packages.

```bash
npm install
```

---

## 🚀 Make TAAP usable from **any directory**

TAAP is designed to work as a **global CLI command**.

### 3️⃣ Make the main file executable

```bash
chmod +x planner.js
```

Make sure the first line of `planner.js` is:

```js
#!/usr/bin/env node
```

---

### 4️⃣ Install TAAP globally

From inside the project folder:

```bash
npm install -g .
```

This tells npm:

> “Install this project as a global command using the `bin` field in `package.json`.”

---

### 5️⃣ Run TAAP from anywhere 🎉

```bash
taap
```

You can now run `taap` in **any directory**, not just the project folder.

---

## 🧭 How to use TAAP

When you start TAAP:

```bash
taap
```

You’ll see a menu like:

```
CLI Planner Menu
> View tasks
  Add task
  Complete task
  Delete task
  View agenda
  Exit
```

### Navigation

* **Arrow keys** → move through menu
* **Enter** → select option

---

### 📝 Adding a task

You will be asked for:

* Task title
* Date & time

#### Supported date & time formats:

```
today 14:00
tomorrow 09:30
now
2026-01-20 18:45
```

---

### 📅 View agenda

Shows tasks **sorted by date and time** so you can see what’s coming up.

---

### ✅ Complete a task

Marks a task as done (it will still be stored but marked completed).

---

### 🗑️ Delete a task

Permanently removes a task.

---

## 💾 Where tasks are stored

By default, TAAP creates a file:

```
tasks.json
```

This file is stored in **the directory where you run `taap`**.

> Example:

```bash
cd ~/Projects
taap
```

Tasks will be saved in:

```
~/Projects/tasks.json
```

---

## 🌍 Optional: Global task storage (advanced)

If you want **one shared task list everywhere**, you can modify the code to store tasks in:

```
~/.taap/tasks.json
```

This ensures all tasks are shared no matter where you run `taap`.

(Recommended for power users.)

---

## 🧑‍💻 Development setup (optional)

If you want to edit or extend TAAP:

```bash
git clone https://github.com/ferre455/taap-TUI-Agenda-And-Planner-.git
cd taap-TUI-Agenda-And-Planner-
npm install
node planner.js
```

---

## 📁 Project structure

```
TAAP/
├── planner.js        # Main TUI application
├── package.json      # Project config & CLI definition
├── package-lock.json # Dependency lock file
├── README.md         # Documentation
├── .gitignore        # Git ignore rules
```

---

## 🛑 Files NOT included in GitHub

* `node_modules/` (installed via npm)
* `tasks.json` (user data)

These are excluded via `.gitignore`.

---

## 🧠 Why Node.js instead of Python?

* No virtual environments required
* Easy global CLI installs
* Better cross-platform terminal support
* Faster startup time for CLI tools

---

## 📜 License

MIT License
You are free to:

* Use
* Modify
* Share
* Distribute

---

## 🙌 Contributing

Pull requests are welcome.

Ideas:

* Recurring tasks
* Task categories
* Notifications
* Import/export
* Config file support

---

## ⭐ Final note

TAAP is meant to be **simple, hackable, and stable**.
If something breaks, it’s meant to be easy to understand and fix.

---

If you want, next I can:

* Review your **actual README before you commit**
* Help you **publish TAAP to npm**
* Add **screenshots / asciinema demo**
* Help you **version & release v1.0**

Just tell me what you want next 👌
