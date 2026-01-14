#!/usr/bin/env node

const fs = require('fs');
const inquirer = require('inquirer');
const dayjs = require('dayjs');

const DATA_FILE = 'tasks.json';

// ---------- Load/Save ----------
function loadTasks() {
    if (fs.existsSync(DATA_FILE)) {
        return JSON.parse(fs.readFileSync(DATA_FILE));
    }
    return [];
}

function saveTasks(tasks) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// ---------- Date Parser ----------
function parseDate(input) {
    input = input.trim().toLowerCase();

    if (!input || input === 'now') {
        return dayjs().format('YYYY-MM-DD HH:mm');
    }

    const parts = input.split(' ');
    if (parts.length === 2) {
        let [dayPart, timePart] = parts;

        if (dayPart === 'today') {
            const dt = dayjs().format('YYYY-MM-DD') + ' ' + timePart;
            if (dayjs(dt, 'YYYY-MM-DD HH:mm', true).isValid()) return dt;
        }
        if (dayPart === 'tomorrow') {
            const dt = dayjs().add(1, 'day').format('YYYY-MM-DD') + ' ' + timePart;
            if (dayjs(dt, 'YYYY-MM-DD HH:mm', true).isValid()) return dt;
        }
    }

    // fallback: assume full YYYY-MM-DD HH:mm
    if (dayjs(input, 'YYYY-MM-DD HH:mm', true).isValid()) return input;

    return null;
}

// ---------- Display ----------
function showTasks(tasks) {
    if (!tasks.length) {
        console.log("No tasks available.");
        return;
    }

    tasks.forEach((task, i) => {
        const status = task.done ? "✓" : "✗";
        const dt = task.datetime || '-';
        console.log(`${i + 1}. [${status}] ${task.title} [${dt}]`);
    });
}

function showAgenda(tasks) {
    const today = dayjs();
    const dated = tasks.filter(t => t.datetime);
    if (!dated.length) {
        console.log("No dated tasks.");
        return;
    }

    dated.sort((a, b) => dayjs(a.datetime).unix() - dayjs(b.datetime).unix());

    dated.forEach(task => {
        const dt = dayjs(task.datetime);
        const status = task.done ? '✓' : '✗';
        console.log(`[${status}] [${task.datetime}] ${task.title}`);
    });
}

// ---------- Actions ----------
async function addTask(tasks) {
    const answers = await inquirer.prompt([
        { name: 'title', message: 'Task title:' },
        { name: 'datetime', message: 'Date & Time (YYYY-MM-DD HH:mm, today HH:mm, tomorrow HH:mm, or leave blank for now):' }
    ]);

    const datetime = parseDate(answers.datetime);
    if (!datetime) {
        console.log("Invalid date/time input.");
        return;
    }

    tasks.push({ title: answers.title.trim(), datetime, done: false });
    saveTasks(tasks);
    console.log("Task added!");
}

async function completeTask(tasks) {
    showTasks(tasks);
    if (!tasks.length) return;

    const answer = await inquirer.prompt([
        { name: 'index', message: 'Task # to complete:', validate: val => !isNaN(val) && val > 0 && val <= tasks.length }
    ]);

    tasks[parseInt(answer.index) - 1].done = true;
    saveTasks(tasks);
    console.log("Task completed!");
}

async function deleteTask(tasks) {
    showTasks(tasks);
    if (!tasks.length) return;

    const answer = await inquirer.prompt([
        { name: 'index', message: 'Task # to delete:', validate: val => !isNaN(val) && val > 0 && val <= tasks.length }
    ]);

    const removed = tasks.splice(parseInt(answer.index) - 1, 1)[0];
    saveTasks(tasks);
    console.log(`Deleted: ${removed.title}`);
}

// ---------- Menu ----------
async function mainMenu(tasks) {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'CLI Planner Menu',
            choices: [
                'View tasks',
                'Add task',
                'Complete task',
                'Delete task',
                'View agenda',
                'Exit'
            ]
        }
    ]);

    switch (answer.option) {
        case 'View tasks': showTasks(tasks); break;
        case 'Add task': await addTask(tasks); break;
        case 'Complete task': await completeTask(tasks); break;
        case 'Delete task': await deleteTask(tasks); break;
        case 'View agenda': showAgenda(tasks); break;
        case 'Exit': process.exit(0);
    }

    console.log();
    await inquirer.prompt([{ name: 'continue', message: 'Press Enter to continue', type: 'input' }]);
}

// ---------- Main Loop ----------
async function main() {
    const tasks = loadTasks();
    while (true) {
        await mainMenu(tasks);
    }
}

main();
