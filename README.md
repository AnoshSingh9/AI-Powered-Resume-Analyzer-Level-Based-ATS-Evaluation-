# AI Resume Analyzer  
Level-Based ATS Evaluation System

An AI-powered Resume Analyzer that evaluates resumes based on **job role and experience level (Fresher or Experienced)**, closely simulating how modern Applicant Tracking Systems (ATS) screen candidates before recruiter review.

This project helps candidates understand why resumes get rejected and provides actionable improvements to increase shortlisting chances.

---

## Features

### Level-Based Resume Analysis
Resumes are evaluated differently for **Freshers** and **Experienced professionals**, ensuring fair and realistic ATS scoring.

### ATS Match Score
Calculates role-specific compatibility score based on recruiter expectations.

### Missing Skills Detection
Identifies skills required at the selected experience level and role.

### Actionable Resume Improvements
Clear suggestions to optimize resumes for ATS shortlisting.

### Secure Authentication
JWT-based login and signup system.

### Resume History Tracking
Logged-in users can track past resume analyses.

---

## Tech Stack

### Frontend
- EJS (Server-Side Rendering)

### Backend
- Node.js
- Express.js (REST APIs)

### Database
- MongoDB

### Authentication
- JSON Web Tokens (JWT)

### Resume Processing
- PDF parsing and text extraction
- AI-driven scoring logic

---

## How It Works

1. Select job role  
2. Select experience level (Fresher / Experienced)  
3. Upload resume (PDF)  
4. Receive:
   - ATS Match Score
   - Missing Skills
   - Resume Improvement Suggestions

---

## Project Structure

```text
RESUME-ANALYSER/
│
├── public/
│   └── (uploaded resumes - ignored in git)
│
├── views/
│   ├── home.ejs
│   ├── index.ejs
│   ├── login.ejs
│   ├── signup.ejs
│   └── result.ejs
│
├── userModel.js
├── gemini.js
├── index.js
├── package.json
├── requirements.txt
└── .env
```
Installation & Setup
Prerequisites
Node.js (v18+ recommended)
MongoDB (local or cloud)
Steps
```bash
git clone https://github.com/your-username/ai-resume-analyzer.git
cd ai-resume-analyzer
npm install
```
Create a .env file:
```bash
Your gemini api = " your key"
```

Start the server:
```bash
nodemon index.js
```
Open in browser:
http://localhost:3000

Use Cases
- Freshers preparing ATS-friendly resumes
- Experienced professionals optimizing resumes
- Recruiters evaluating resumes more accurately
- Developers learning real-world MERN backend workflows

Future Enhancements
- Resume-to-job description matching
- Downloadable ATS reports
- AI-based resume rewriting
- Recruiter dashboard

Author
Anosh Singh<br>
MERN / Backend / Full-Stack Developer

License
This project is licensed under the MIT License.
