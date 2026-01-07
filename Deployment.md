# Deployment Documentation


---

## Tech Stack & Deployment Architecture

### Application Stack

* **Framework:** React.js
* **Language:** JavaScript / TypeScript
* **Package Manager:** npm (can be yarn if preferred)
* **Version Control:** Git + GitHub

### Hosting & CI/CD

* **Hosting:** Hostinger (Shared Hosting)
* **Deployment Method:** GitHub Actions (CI/CD)
* **Transfer Method:** FTP (via GitHub Actions)

---

##  Prerequisites (New PC Setup – Windows)

These steps are written specifically for **Windows**

###  Install Node.js (Windows)

1. Download **Node.js LTS (18.x or later)** from the official website
2. Run the installer and keep default options checked
3. Restart your PC after installation

Verify installation in **Command Prompt or PowerShell**:

```bash
node -v
npm -v
```

---

###  Install Git (Windows)

1. Download Git from the official Git website
2. Run the installer
3. When prompted, select **"Git from the command line and also from 3rd-party software"**
4. Keep remaining options as default

Verify installation:

```bash
git --version
```

---

###  GitHub Account Access

* Ensure access to the **project GitHub repository**
* Permission to **push code** and **manage GitHub Actions secrets**

---

###  Hostinger Access

* Hostinger account credentials
* FTP details from hPanel:

  * FTP Host
  * FTP Username
  * FTP Password
  * Target directory (usually `public_html/`)

---

##  Project Setup on a New PC (Windows)

All commands below should be run using **Command Prompt**, **PowerShell**, or **Windows Terminal**.

### 4.1 Clone the Repository

Open Command Prompt and run:

```bash
git clone https://github.com/<username>/<repository-name>.git
cd <repository-name>
```

---

###  Install Dependencies

```bash
npm install
```

---

###  Environment Variables (Windows)

Create a file named `.env` in the project root folder:

```env
VITE_PORT
VITE_BASE_URL
VITE_GOOGLE_RECAPTCHA_SITE_KEY
RECAPTCHA_SECRET_KEY
VITE_FIREBASE_API_KEY
VITE_GOOGLE_MAPS_API_KEY
VITE_GOOGLE_MAPS_ID
VITE_IK_URL_ENDPOINT
VITE_SERVICE_ACCOUNT_KEY
VITE_CLOUDINARY_CLOUD_NAME
VITE_CLOUDINARY_UPLOAD_PRESET
VITE_CLOUDINARY_API_KEY
VITE_CLOUDINARY_API_SECRET
```

> ⚠️ Do **NOT** commit `.env` to GitHub

---



###  Test Build Locally (Windows)

Run the following commands in Command Prompt:

````bash
npm run build
npm run start
```bash
npm run build
npm run start
````

Confirm the app runs correctly at:

```
http://localhost:3000


##  Hostinger Hosting Setup

###  Create Website

1. Log in to **Hostinger hPanel**
2. Create or select the domain
3. Open **File Manager**
4. Locate `public_html/`

### 6.2 Clean Target Directory

* Delete all default files inside `public_html/`

---

##  GitHub Actions CI/CD Setup

###  Create GitHub Actions Workflow

Create the following file:

```
.github/workflows/deploy.yml
```

###  GitHub Actions Configuration

```yaml

name: Generate a build and push to another branch

permissions:
  contents: write

on:
  push:
    branches:
      - mvp

jobs:
  build:
    runs-on: ubuntu-latest
    name: Build and Push
    env:
      VITE_PORT: ${{secrets.VITE_PORT }}
      VITE_BASE_URL: ${{secrets.VITE_BASE_URL }}
      VITE_GOOGLE_RECAPTCHA_SITE_KEY: ${{secrets.VITE_GOOGLE_RECAPTCHA_SITE_KEY}}
      VITE_RECAPTCHA_SECRET_KEY: ${{secrets.VITE_RECAPTCHA_SECRET_KEY}}
      VITE_FIREBASE_API_KEY: ${{secrets.VITE_FIREBASE_API_KEY}}
      VITE_GOOGLE_MAPS_API_KEY: ${{secrets.VITE_GOOGLE_MAPS_API_KEY}}
      VITE_GOOGLE_MAPS_ID: ${{secrets.VITE_GOOGLE_MAPS_ID }}
      VITE_SERVICE_ACCOUNT_KEY: ${{ secrets.VITE_SERVICE_ACCOUNT_KEY }}
      VITE_IK_URL_ENDPOINT: ${{ secrets.VITE_IK_URL_ENDPOINT }}
      VITE_CLOUDINARY_CLOUD_NAME: ${{secrets.VITE_CLOUDINARY_CLOUD_NAME }}
      VITE_CLOUDINARY_UPLOAD_PRESET: ${{secrets.VITE_CLOUDINARY_UPLOAD_PRESET }}
      VITE_CLOUDINARY_API_KEY: ${{secrets.VITE_CLOUDINARY_API_KEY }}
      VITE_CLOUDINARY_API_SECRET: ${{secrets.VITE_CLOUDINARY_API_SECRET }}

    steps:
      - name: git-checkout
        uses: actions/checkout@v3

      - name: Install all dependencies
        run: npm install

      - name: Generate Sitemap
        run: node generate-sitemap.js
       
      - name: Build
        run: npm run build # The build command of your project
      - name: Debug build output
        run: ls -la && ls -la ./dist
      - name: Move Sitemap to dist
        run: mv public/sitemap.xml dist/sitemap.xml
      - name: Push
        uses: s0/git-publish-subdir-action@develop
        
        env:
          REPO: self
          BRANCH: build # The branch name where you want to push the assets
          FOLDER: dist # The directory where your assets are generated
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # GitHub will automatically add this - you don't need to bother getting a token
          MESSAGE: "Build: ({sha}) {msg}" # The commit message
---

##  GitHub Secrets Configuration

In the GitHub repository:

1. Go to **Settings → Secrets and variables → Actions**
2. Add the following secrets:

| Secret Name  | Description        |
| ------------ | ------------------ |
| FTP_SERVER   | Hostinger FTP host |
| FTP_USERNAME | FTP username       |
| FTP_PASSWORD | FTP password       |

---

##  Deployment Process (Automatic)

Once configured, deployment works as follows:

1. Developer pushes code to `main` branch
2. GitHub Actions workflow runs automatically
3. Project is built on GitHub servers
4. Files are uploaded to Hostinger via FTP
5. Website updates go live immediately

---

