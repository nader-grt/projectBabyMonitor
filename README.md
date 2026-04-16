# 🚀 projectBabyMonitor - Full Setup Guide

This file explains ALL steps to clone, install, and run the project from GitHub.

---

# 📦 1. Open Terminal

Open your terminal and go to your workspace folder:

```bash
cd ~
```

OR:

```bash
cd projects
```

---

# 📥 2. Clone the repository

```bash
git clone https://github.com/nader-grt/projectBabyMonitor.git
```

---

# 📂 3. Enter project folder

```bash
cd projectBabyMonitor
```

If backend is inside `api` folder:

```bash
cd api
```

---

# 📦 4. Install dependencies

```bash
npm install
```

---

# ⚙️ 5. Create environment file (.env)

Create the file:

```bash
touch .env
```

Open it:

```bash
nano .env
```

Add your environment variables:

```env
PORT=4000
DATABASE_URL=your_database_url_here
JWT_SECRET=your_secret_key_here
```

Save and exit:

* CTRL + X
* Y
* ENTER

---

# ▶️ 6. Run project in development

If using TypeScript:

```bash
npm run dev
```

OR:

```bash
npx ts-node src/index.ts
```

---

# 🏗️ 7. Build project (optional)

```bash
npm run build
```

---

# 🚀 8. Run production build

```bash
npm start
```

---

# 🔥 Quick Full Setup (One Line Flow)

```bash
git clone https://github.com/nader-grt/projectBabyMonitor.git
cd projectBabyMonitor/api
npm install
touch .env
npm run dev
```

---

# ⚠️ Common Issues

## ❌ git not found

```bash
sudo apt install git
```

## ❌ node not found

```bash
node -v
npm -v
```

Install Node.js:

```bash
sudo apt install nodejs npm
```

---

# 🎯 Done!

Your project should now be running successfully.

If you face any error, check:

* .env file
* npm install completed
* correct folder (api vs root)
