# 🤖 AI Mock Interview Platform

An AI-powered full-stack mock interview platform built with **Spring Boot** and **React** that helps users practice technical interviews, generate interview questions using AI, submit answers, receive evaluations, track interview history, and practice coding questions.

The platform includes user authentication, OTP-based email verification, JWT security, AI-powered interview generation and evaluation using **Ollama**, coding practice, company preparation, dashboards, and interview history.

---

## 🚀 Features

### 👤 User Authentication

* User registration
* Email OTP verification
* User login
* JWT-based authentication
* Secure password handling
* Protected backend APIs
* Authentication filters using Spring Security

### 🎯 AI Mock Interviews

* Create and start mock interviews
* Generate interview questions using AI
* Answer interview questions
* Submit answers for evaluation
* AI-powered answer evaluation
* Receive interview feedback
* View interview results
* Track previous interviews

### 🧠 AI Integration

The application uses **Spring AI with Ollama** for local AI processing.

Current AI model configuration:

```text
Ollama
└── qwen3:4b-instruct
```

The application communicates with a locally running Ollama server:

```text
http://localhost:11434
```

AI functionality includes:

* Interview question generation
* Answer evaluation
* Strength identification
* Improvement suggestions
* Interview feedback

---

## 💻 Coding Interview Practice

The platform also provides coding interview functionality.

Users can:

* Select coding practice
* Configure coding interviews
* Submit coding problems
* Execute code through the backend
* Receive coding results

Backend components include:

```text
CodeController
CodeExecutionService
CodeRunRequest
CodeRunResponse
```

---

## 🏢 Company Preparation

The application includes a company-preparation section designed to help users practice interview-related questions and prepare for company-specific interviews.

---

## 📊 Dashboard

The dashboard provides users with interview-related information and statistics.

It includes functionality for:

* Interview history
* Interview results
* Performance statistics
* Previous interview tracking

---

# 🛠️ Technology Stack

## Backend

| Technology      | Purpose                          |
| --------------- | -------------------------------- |
| Java            | Programming language             |
| Spring Boot     | Backend framework                |
| Spring Web      | REST APIs                        |
| Spring Security | Authentication and authorization |
| JWT             | Token-based authentication       |
| Spring Data JPA | Database access                  |
| Hibernate       | ORM                              |
| MySQL           | Relational database              |
| Spring AI       | AI integration                   |
| Ollama          | Local AI model                   |
| Maven           | Build and dependency management  |

## Frontend

| Technology | Purpose                         |
| ---------- | ------------------------------- |
| React      | Frontend library                |
| JavaScript | Frontend programming            |
| Vite       | Frontend development/build tool |
| HTML       | Application structure           |
| CSS        | Styling                         |
| REST API   | Backend communication           |

---

# 🏗️ Project Architecture

The project follows a full-stack architecture:

```text
                         ┌──────────────────────┐
                         │      React UI        │
                         │                      │
                         │  Login               │
                         │  Register            │
                         │  Dashboard           │
                         │  Mock Interview      │
                         │  Coding Interview    │
                         │  Company Preparation │
                         └──────────┬───────────┘
                                    │
                              REST API / HTTP
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    Spring Boot       │
                         │      Backend         │
                         ├──────────────────────┤
                         │ Controllers          │
                         │ Services             │
                         │ DTOs                 │
                         │ Security             │
                         │ Exception Handling   │
                         └───────┬───────┬──────┘
                                 │       │
                    ┌────────────┘       └─────────────┐
                    ▼                                  ▼
             ┌──────────────┐                  ┌──────────────┐
             │    MySQL     │                  │    Ollama    │
             │   Database   │                  │   AI Model   │
             └──────────────┘                  └──────────────┘
```

---

# 📁 Project Structure

```text
ai-mock-interview/
│
├── React/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── pages/
│   │   │   ├── CodingInterview.jsx
│   │   │   ├── CodingSetup.jsx
│   │   │   ├── CompanyPreparation.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Interview.jsx
│   │   │   ├── InterviewHistory.jsx
│   │   │   ├── InterviewResult.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── PracticeSelection.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── StartInterview.jsx
│   │   │   └── VerifyOtp.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/mockinterview/
│   │   │       │
│   │   │       ├── config/
│   │   │       │   ├── PasswordConfig.java
│   │   │       │   └── SecurityConfig.java
│   │   │       │
│   │   │       ├── controller/
│   │   │       │   ├── AiInterviewController.java
│   │   │       │   ├── AnswerController.java
│   │   │       │   ├── AuthController.java
│   │   │       │   ├── CodeController.java
│   │   │       │   ├── InterviewController.java
│   │   │       │   ├── QuestionController.java
│   │   │       │   └── TestController.java
│   │   │       │
│   │   │       ├── dto/
│   │   │       │
│   │   │       ├── entity/
│   │   │       │
│   │   │       ├── exception/
│   │   │       │
│   │   │       ├── repository/
│   │   │       │
│   │   │       ├── security/
│   │   │       │   └── JwtAuthenticationFilter.java
│   │   │       │
│   │   │       └── service/
│   │   │           ├── AiInterviewService.java
│   │   │           ├── AnswerService.java
│   │   │           ├── AuthService.java
│   │   │           ├── CodeExecutionService.java
│   │   │           ├── EmailService.java
│   │   │           ├── InterviewService.java
│   │   │           ├── JwtService.java
│   │   │           ├── OtpService.java
│   │   │           └── QuestionService.java
│   │   │
│   │   └── resources/
│   │       └── application.properties
│   │
│   └── test/
│
├── pom.xml
├── mvnw
├── mvnw.cmd
├── .gitignore
└── README.md
```

---

# 🔐 Authentication Flow

The application uses **Spring Security and JWT** for authentication.

The general authentication flow is:

```text
User Registration
       │
       ▼
Email OTP Sent
       │
       ▼
OTP Verification
       │
       ▼
Account Activated
       │
       ▼
User Login
       │
       ▼
JWT Token Generated
       │
       ▼
Token Sent With API Requests
       │
       ▼
JwtAuthenticationFilter
       │
       ▼
Protected API Access
```

---

# 📧 Email OTP Verification

The application supports email-based OTP verification during registration.

The backend includes:

```text
EmailService
OtpService
OtpVerification
VerifyOtpRequest
```

OTP expiration is configured for:

```properties
app.otp.expiry-minutes=5
```

---

# 🗄️ Database

The application uses **MySQL**.

Database:

```text
ai_mock_interview
```

Main entities include:

```text
User
Interview
Question
Answer
OtpVerification
```

The relationship between these entities allows the application to maintain user accounts, interviews, questions, answers, OTP verification information, and interview history.

---

# 🤖 Ollama Setup

This project uses **Ollama** for local AI processing.

Install Ollama on your system and make sure the Ollama server is running.

The application expects Ollama at:

```text
http://localhost:11434
```

The configured model is:

```text
qwen3:4b-instruct
```

Pull the model using:

```bash
ollama pull qwen3:4b-instruct
```

Then start Ollama.

You can verify that Ollama is available before starting the Spring Boot application.

---

# ⚙️ Configuration

The application uses environment variables for sensitive configuration.

The following values should **not** be committed to GitHub:

```text
DB_PASSWORD
JWT_SECRET
MAIL_PASSWORD
```

The `application.properties` file uses:

```properties
spring.datasource.password=${DB_PASSWORD}

jwt.secret=${JWT_SECRET}

spring.mail.password=${MAIL_PASSWORD}
```

Set these variables on your local machine before running the backend.

### Windows Command Prompt

```bat
set DB_PASSWORD=your_database_password
set JWT_SECRET=your_jwt_secret
set MAIL_PASSWORD=your_gmail_app_password
```

Then start the application from the same terminal.

> Never commit real database passwords, email app passwords, API keys, JWT secrets, or other credentials to GitHub.

---

# 🧰 Prerequisites

Before running the project, install:

* Java JDK
* Maven or use the included Maven Wrapper
* MySQL
* Node.js and npm
* Ollama
* Git

Recommended environment:

```text
Java 17+
Node.js 18+
MySQL 8+
Ollama
```

---

# ▶️ Running the Backend

Clone the repository:

```bash
git clone https://github.com/Kdhanesh61/ai-mock-interview.git
```

Navigate into the project:

```bash
cd ai-mock-interview
```

Configure your environment variables.

Then run the Spring Boot application.

### Windows

```bat
mvnw.cmd spring-boot:run
```

Or, if Maven is installed:

```bash
mvn spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

---

# ▶️ Running the React Frontend

Open another terminal.

Navigate to the React directory:

```bash
cd React
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will display the local frontend URL in the terminal.

Typically:

```text
http://localhost:5173
```

---

# 🔄 Frontend → Backend Communication

The React application communicates with the Spring Boot backend through REST APIs.

The frontend API service is located at:

```text
React/src/services/api.js
```

The backend exposes APIs through controllers such as:

```text
AuthController
AiInterviewController
InterviewController
QuestionController
AnswerController
CodeController
```

---

# 🧪 Testing

The backend contains Spring Boot test configuration under:

```text
src/test/
```

Run the tests using:

```bash
mvn test
```

or on Windows:

```bat
mvnw.cmd test
```

---

# 🔒 Security Considerations

This project uses:

* Spring Security
* JWT authentication
* Password hashing
* Protected REST endpoints
* Environment variables for sensitive configuration
* Email OTP verification

For production deployment, additional security configuration should be considered, including:

* HTTPS
* Production-grade secret management
* Database access restrictions
* CORS configuration
* Rate limiting
* Secure cookie/token handling
* Production logging configuration
* API validation and monitoring

---

# 📸 Application Modules

The React frontend contains several application modules:

### Authentication

```text
Register
Login
Verify OTP
```

### Interview Practice

```text
Practice Selection
Start Interview
Interview
Interview Result
Interview History
```

### Coding Practice

```text
Coding Setup
Coding Interview
```

### User Dashboard

```text
Dashboard
Company Preparation
```

---

# 🌟 Key Learning Outcomes

This project demonstrates practical experience with:

* Java
* Spring Boot
* REST API development
* Spring Security
* JWT authentication
* Spring Data JPA
* Hibernate
* MySQL
* React
* JavaScript
* Vite
* REST API integration
* DTO-based API design
* Exception handling
* Email services
* OTP verification
* AI integration using Spring AI
* Local AI models using Ollama
* Full-stack application development
* Git and GitHub

---

# 🔮 Future Enhancements

Possible future improvements include:

* Voice-based interviews
* Speech-to-text interview answers
* Resume-based interview generation
* More AI models
* Interview difficulty levels
* Detailed performance analytics
* Leaderboards
* More programming languages for coding practice
* Online code execution sandbox
* Interview recommendation system
* Deployment using Docker
* Cloud deployment
* Admin dashboard

---

# 👨‍💻 Developer

**Korrakuti Dhanesh**

B.Tech Computer Science Engineering

Interested in:

* Java
* Spring Boot
* React
* Full-Stack Development
* AI-powered applications

---

# 📄 License

This project is currently available for learning and portfolio purposes.

A formal open-source license can be added if the project is intended for public reuse and distribution.

```

### One small recommendation

Since this is going on your GitHub as a **portfolio project**, I'd also add **2–4 screenshots of the actual application** under a `screenshots/` folder and add them to the README. That will make the repository much easier for a recruiter to understand at a glance.

Your repository is already live here:

[github.com/Kdhanesh61/ai-mock-interview](https://github.com/Kdhanesh61/ai-mock-interview?utm_source=chatgpt.com)

If you want, I can also give you the **exact Windows commands to replace the current README and push this new README to GitHub**.
```
