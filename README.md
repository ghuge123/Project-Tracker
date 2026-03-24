# 🚀 Multi-View Project Tracker (Frontend)

A high-performance project management UI built using **React + TypeScript**, featuring **Kanban, List, and Timeline views**, along with **custom drag-and-drop**, **virtual scrolling**, and **URL-synced filters**.

This project focuses on real-world frontend engineering challenges like performance optimization, UI state management, and custom interaction design without relying on external libraries.

---

## 📌 Features

### 🧩 Multi-View System

* **Kanban Board**

  * 4 columns: To Do, In Progress, In Review, Done
  * Custom drag-and-drop (no libraries)
  * Task cards with priority, assignee, and status

* **List View**

  * Flat list of tasks
  * Virtual scrolling for performance
  * Handles 500+ tasks smoothly

* **Timeline View**

  * Gantt-style monthly timeline
  * Color-coded task bars
  * Hover tooltips with task details

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

3. Run the development server:

```bash
npm run dev
```

4. Open in browser:

```bash
http://localhost:5173
```

---

## 🧠 State Management Decision (Zustand)

Zustand was chosen for state management because:

* Lightweight and minimal boilerplate
* No need for reducers or complex setup
* Global state shared easily across multiple views
* Avoids prop drilling
* Better performance compared to Context API in frequent updates

The store manages:

* Task data
* Current view (Kanban/List/Timeline)
* Filters (status, priority, assignee)

This ensures all views operate on the **same dataset without re-fetching**, allowing instant switching.

---

## ⚡ Virtual Scrolling (List View)

To handle large datasets (500+ tasks), virtual scrolling was implemented manually without any external libraries.

### Approach:

* Fixed row height is used for each task
* Based on scroll position, only visible rows are calculated
* A small buffer (extra rows above and below) is rendered
* Remaining space is filled using a spacer div

### Key Logic:

* `startIndex = scrollTop / rowHeight`
* Only render items between `startIndex` and visible range
* Use `transform: translateY(...)` to position items correctly

### Benefits:

* Reduces DOM nodes significantly
* Improves performance and scrolling smoothness
* No flickering or layout jumps

---

## 🎯 Custom Drag-and-Drop Implementation

Drag-and-drop was implemented from scratch using **native pointer events** instead of external libraries.

### Approach:

* `onPointerDown` initializes drag
* `pointerup` determines drop location
* `document.elementFromPoint()` detects target column
* Task status is updated based on drop position

### Key Features:

* Works for both mouse and touch
* No external libraries used
* Clean and lightweight implementation

### Why Not Use Libraries?

The assignment required a **custom implementation**, and this approach demonstrates a deeper understanding of DOM interaction and event handling.

---

## 🔍 Filters + URL Sync

* Filters include:

  * Status
  * Priority
  * Assignee
* Filters are reflected in the URL using query parameters
* Example:

```bash
?status=todo&priority=high
```

### Benefits:

* Shareable filtered views
* State persistence on refresh
* Better user experience

---

## 🎨 UI & Styling

* Built using **Tailwind CSS**
* No UI component libraries used
* Clean and modern design inspired by Jira
* Smooth hover effects and transitions

---

## ⚠️ Constraints Followed

* ❌ No drag-and-drop libraries
* ❌ No virtual scrolling libraries
* ❌ No UI component libraries
* ✅ Fully custom implementation

---

## 📊 Lighthouse Performance

> Add your screenshot here

* Performance Score: **85+ (Desktop)**

Steps to generate:

1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit (Desktop mode)
4. Add screenshot in README

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

## 🚀 Future Improvements

* Drag-and-drop animation enhancements
* Timeline zoom (weekly/monthly view)
* Real-time collaboration using WebSockets
* Improved mobile responsiveness

---

## ✍️ Author

**Dipak Ghuge**
Frontend Developer (MERN Stack)

---

## 💡 Conclusion

This project demonstrates strong frontend development skills including:

* Performance optimization
* Custom UI interactions
* State management
* Scalable architecture

It reflects real-world problem-solving and production-level thinking.

---
