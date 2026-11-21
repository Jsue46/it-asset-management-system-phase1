# IT Asset Management System — Phase 1: Initiation and Planning

Academic project developed for the **Systems Theory 2** course at the Universidad de San Carlos de Guatemala (June 2026 term).

This repository covers Phase 1 of an IT Asset Management (ITAM) system for a university laboratory environment. It includes both the **project management documentation** following the PMBOK 8 predictive approach and a **functional interactive prototype** containerized with Docker Compose. The project was developed collaboratively as a group assignment.

---

## Overview

The system is designed to manage hardware and software assets across university laboratories, tracking assignments, maintenance schedules, license expiration alerts, and generating a real-time audit log of all actions.

Phase 1 focuses on project initiation, planning artifacts, and a functional prototype demonstrating the core domain model.

---

## Key Features

- Real-time dashboard with metrics: total assets, operational, under maintenance, license alerts
- Full CRUD for hardware (servers, computers, networking equipment) and software (licenses)
- Asset assignment to faculty and lab assistants
- Preventive and corrective maintenance registration with cost tracking
- Real-time audit log recording every create, edit, delete, and maintenance action

---

## Architecture

The prototype uses a clean layered separation to allow seamless scaling in Phase 2:

- **Frontend (SPA):** HTML5, CSS3 with custom theme variables, vanilla JavaScript
- **Backend (REST API):** Node.js, Express.js — CRUD endpoints for assets, maintenance, and audit log
- **Persistence:** JSON file-based in-memory engine (`data.json`), ready to swap for PostgreSQL, MySQL, or SQLite without touching business logic

---

## Technologies

- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, CSS3, JavaScript
- **Containerization:** Docker, Docker Compose

---

## Repository Structure

```
it-asset-management-system-phase1/
├── docs/
│   ├── acta_constitucion.md      # Project Charter (PMBOK 8)
│   ├── edt_wbs.md                # Work Breakdown Structure
│   ├── cronograma_gantt.md       # Gantt chart and critical path
│   ├── presupuesto_costos.md     # Resource and cost plan
│   └── matriz_riesgos.md         # Risk probability and impact matrix
├── src/
│   ├── db.js                     # JSON persistence engine
│   ├── server.js                 # Express server and API endpoints
│   └── public/
│       ├── index.html            # SPA entry point
│       └── style.css             # Styles and animations
├── data.json                     # Simulated database
├── Dockerfile
├── docker-compose.yml
└── package.json
```

---

## Running the Project

### Option 1 — Docker (recommended)

```bash
docker compose up --build
```

Open `http://localhost:3000` in your browser.

### Option 2 — Local (Node.js required)

```bash
# Terminal 1 — Backend
cd src
npm install
npm start
# API available at http://localhost:5000

# Terminal 2 — Frontend
cd frontend
npm install
npm run dev
# UI available at http://localhost:3000
```

---

## Academic Context

| Field       | Detail                                         |
|-------------|------------------------------------------------|
| Course      | Systems Theory 2 (TEO2) — June 2026 term      |
| Institution | Universidad de San Carlos de Guatemala         |
| Type        | Group project                                  |
