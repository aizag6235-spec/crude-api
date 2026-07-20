# Task API with SQLite

## Overview

This project is a CRUD Task API built with Express.js and SQLite.

Instead of storing tasks in memory, tasks are stored in a SQLite database, so they remain available even after the server restarts.

## Why SQLite?

SQLite is lightweight, requires no separate server, and stores all data in a single database file. It is perfect for small backend projects and learning SQL.

## Database Location

The database file is:

tasks.db

## How to Run

Install dependencies:

```bash
npm install
```

Start the server:

```bash
node server.js
```

The server runs on:

```
http://localhost:3000
```

## Example SQL Query

```sql
SELECT * FROM tasks;
```

## Database Screenshot

![Database Screenshot](screenshot.png)
