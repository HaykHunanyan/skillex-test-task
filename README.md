# Skillex Generator API

A Node.js + MySQL API that generates and stores valid item combinations based on specific prefix rules.

## Project Description

This API receives a list of item types (represented by numbers) and a required combination length. It converts each item into a unique string (`A1`, `B1`, etc.), generates all valid combinations where items must have **different starting letters**, saves the data into a MySQL database using transactions, and returns the result.

---

## Tech Stack

- **Node.js** (v18+)
- **Express.js**
- **MySQL** (raw queries via `mysql2`)
- **ESLint** — static code analysis to enforce coding standards and catch errors
- **Prettier** — code formatter for consistent style
- Modular architecture: `controllers`, `services`, `utils`, `middleware`, `routers`


---

##  Getting Started

### 1. Clone the repository

```bash

git clone https://github.com/HaykHunanyan/skillex-test-task
cd skillex-test-task
1. npm install
2. npm run dbSetup
3. npm run dev or npm run start

```
