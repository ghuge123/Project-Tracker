# 🚀 Multi-View Project Tracker (Frontend)

A high-performance, fully responsive **project management UI** built using **React + TypeScript**, featuring **Kanban, List, and Timeline views**, custom **drag-and-drop**, **virtual scrolling**, and **URL-synced filters**.

This project demonstrates advanced frontend engineering concepts such as state management, performance optimization, and custom UI logic — without relying on external UI or drag libraries.

---

## 📌 Features

### 🧩 Multi-View Interface

* **Kanban Board**

  * 4 columns: To Do, In Progress, In Review, Done
  * Task cards with title, assignee, priority, and status
  * Custom drag-and-drop (no libraries)

* **List View**

  * Flat list of all tasks
  * Virtual scrolling for handling 500+ tasks efficiently
  * Smooth scrolling with minimal DOM rendering

* **Timeline (Gantt View)**

  * Tasks displayed across a monthly timeline
  * Horizontal scroll support
  * Color-coded priority bars
  * Dynamic tooltip with task details

---

### ⚡ Performance Optimizations

* Virtual scrolling (no external libraries)
* Memoized filtering using `useMemo`
* Efficient rendering for large datasets (500+ tasks)

---

### 🎯 Custom Drag & Drop

* Built using native pointer events
* Works on both mouse and touch devices
* Dynamic column detection
* Smooth interaction without external libraries

---

### 🔍 Filters + URL Sync

* Filter by:

  * Status
  * Priority
  * Assignee
* Filters are reflected in URL query params
* State restores on page refresh or navigation

---

### 🎨 Premium UI

* Built using Tailwind CSS (no UI libraries)
* Modern layout inspired by Jira / Notion
* Smooth hover effects and transitions
* Responsive design for desktop & tablet

---

### 📊 Data Handling

* 500+ tasks generated dynamically
* Randomized:

  * Status
  * Priority
  * Assignee
  * Dates

---

## 🛠️ Tech Stack

* **React (with TypeScript)**
* **Zustand** – State Management
* **Tailwind CSS** – Styling
* **Vite** – Build Tool

---

## 📂 Project Structure

```
src/
 ├── components/
 │    ├── Kanban.tsx
 │    ├── List.tsx
 │    ├── Timeline.tsx
 │    ├── Filters.tsx
 ├── store/
 │    └── useStore.ts
 ├── utils/
 │    └── filterTasks.ts
 ├── data/
 │    └── generator.ts
 ├── App.tsx
 └── main.tsx
```

---

## ⚙️ Setup Instructions

1. Clone the repository:

```bash
git clone <your-repo-link>
cd project-tracker
```

2. Install dependencies:

```bash
npm install
```

3. Run the project:

```bash
npm run dev
```

---

## 🧠 Key Implementation Details

### 🔹 State Management (Zustand)

Zustand is used for global state management to maintain:

* Tasks
* Filters
* Current view

It allows seamless data sharing across multiple views without prop drilling.

---

### 🔹 Virtual Scrolling (List View)

Instead of rendering all tasks:

* Only visible rows are rendered
* A buffer is added for smooth scrolling
* Total height is maintained using spacer divs

This ensures high performance even with large datasets.

---

### 🔹 Custom Drag-and-Drop

* Implemented using pointer events
* No external libraries used
* Column detection via DOM (`elementFromPoint`)
* Updates task status on drop

---

### 🔹 Timeline Rendering

* Tasks are positioned using pixel calculations based on date
* Width represents task duration
* "Today" indicator shown dynamically
* Tooltip provides additional task details on hover

---

## ⚠️ Constraints Followed

* ❌ No drag-and-drop libraries
* ❌ No virtual scrolling libraries
* ❌ No UI component libraries
* ✅ Fully built with custom logic

---

## 📸 Screenshots

*Add screenshots here (Kanban / List / Timeline / Lighthouse Score)*

---

## 📊 Lighthouse Score

* Performance: 85+ (Desktop)

---

## 🚀 Future Improvements

* Drag-and-drop animation enhancements
* Timeline zoom (week/month view)
* Real-time collaboration using WebSockets
* Better mobile responsiveness

---

## ✍️ Author

**Dipak Ghuge**

* MERN Stack Developer
* Passionate about frontend engineering & performance optimization

---

## 💡 Conclusion

This project demonstrates strong frontend engineering skills including:

* Performance optimization
* UI/UX design
* State architecture
* Custom interaction handling

It reflects real-world application development practices and problem-solving ability.

---
