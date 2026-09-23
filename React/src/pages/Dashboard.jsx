import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Dashboard.css";

function Dashboard() {

    const navigate = useNavigate();

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const response = await api.get(
                "/api/interviews/dashboard"
            );

            console.log(
                "Dashboard:",
                response.data
            );

            setStats(response.data);

        } catch (error) {

            console.error(
                "Dashboard error:",
                error
            );

            setMessage(
                "Unable to load dashboard data."
            );

        } finally {

            setLoading(false);
        }
    };


    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem(
            "currentInterviewId"
        );

        navigate("/");
    };


    const startAIInterview = () => {
        navigate("/start-interview");
    };


    const startCodingPractice = () => {
        navigate("/coding-setup");
    };


    const openHistory = () => {
        navigate("/interview-history");
    };


    if (loading) {

        return (
            <div className="dashboard-loading">

                <div className="loading-card">

                    <div className="loading-spinner"></div>

                    <h2>
                        Loading your dashboard
                    </h2>

                    <p>
                        Please wait...
                    </p>

                </div>

            </div>
        );
    }


    return (

        <div className="dashboard">

            {/* ================= HEADER ================= */}

            <header className="dashboard-header">

                <div className="brand-section">

                    <div className="brand-logo">
                        AI
                    </div>

                    <div>

                        <h1>
                            Mock Interview
                        </h1>

                        <p>
                            Interview preparation & self-assessment
                        </p>

                    </div>

                </div>


                <div className="header-actions">

                    <button
                        className="history-header-button"
                        onClick={openHistory}
                    >
                        <span>📋</span>
                        History
                    </button>

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </header>


            {/* ================= MAIN ================= */}

            <main className="dashboard-content">


                {/* ================= HERO ================= */}

                <section className="hero-section">

                    <div className="hero-content">

                        <div className="hero-badge">
                            🎯 Practice with purpose
                        </div>

                        <h2>
                            Know where you stand
                            <br />
                            <span>before the interview.</span>
                        </h2>

                        <p>
                            Test your technical knowledge, coding
                            skills and interview readiness. Identify
                            your weak areas and improve at your own pace.
                        </p>

                    </div>


                    <div className="hero-decoration">

                        <div className="hero-circle circle-one"></div>
                        <div className="hero-circle circle-two"></div>

                        <div className="hero-card">

                            <div className="hero-card-icon">
                                ✓
                            </div>

                            <div>

                                <strong>
                                    Self Assessment
                                </strong>

                                <span>
                                    Practice • Evaluate • Improve
                                </span>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ================= ERROR ================= */}

                {message && (

                    <div className="error-message">

                        <span>
                            ⚠️
                        </span>

                        {message}

                    </div>

                )}


                {/* ================= STATISTICS ================= */}

                <section className="statistics-section">

                    <div className="section-heading">

                        <div>

                            <span className="section-label">
                                YOUR PROGRESS
                            </span>

                            <h2>
                                Interview Statistics
                            </h2>

                        </div>

                    </div>


                    {stats && (

                        <div className="stats-grid">

                            <div className="stat-card">

                                <div className="stat-icon blue">
                                    🎤
                                </div>

                                <div className="stat-info">

                                    <span>
                                        Total Interviews
                                    </span>

                                    <strong>
                                        {stats.totalInterviews}
                                    </strong>

                                </div>

                            </div>


                            <div className="stat-card">

                                <div className="stat-icon green">
                                    ✓
                                </div>

                                <div className="stat-info">

                                    <span>
                                        Completed
                                    </span>

                                    <strong>
                                        {stats.completedInterviews}
                                    </strong>

                                </div>

                            </div>


                            <div className="stat-card">

                                <div className="stat-icon orange">
                                    ▶
                                </div>

                                <div className="stat-info">

                                    <span>
                                        In Progress
                                    </span>

                                    <strong>
                                        {stats.startedInterviews}
                                    </strong>

                                </div>

                            </div>


                            <div className="stat-card">

                                <div className="stat-icon purple">
                                    %
                                </div>

                                <div className="stat-info">

                                    <span>
                                        Average Score
                                    </span>

                                    <strong>
                                        {stats.averageScore}%
                                    </strong>

                                </div>

                            </div>


                            <div className="stat-card best-score-card">

                                <div className="stat-icon gold">
                                    ★
                                </div>

                                <div className="stat-info">

                                    <span>
                                        Best Score
                                    </span>

                                    <strong>
                                        {stats.bestScore}%
                                    </strong>

                                </div>

                            </div>

                        </div>

                    )}

                </section>


                {/* ================= PRACTICE ================= */}

                <section className="practice-section">

                    <div className="section-heading practice-heading">

                        <div>

                            <span className="section-label">
                                PRACTICE
                            </span>

                            <h2>
                                Choose how you want to practice
                            </h2>

                            <p>
                                Test yourself and understand your current
                                interview readiness.
                            </p>

                        </div>

                    </div>


                    <div className="practice-grid">


                        {/* AI INTERVIEW */}

                        <article className="practice-card interview-card">

                            <div className="card-top">

                                <div className="large-card-icon interview-icon">
                                    🎤
                                </div>

                                <span className="available-badge">
                                    Available
                                </span>

                            </div>


                            <h3>
                                AI Technical Interview
                            </h3>

                            <p>
                                Practice technical interview questions
                                and receive AI-powered evaluation,
                                feedback and improvement guidance.
                            </p>


                            <div className="card-features">

                                <span>
                                    ✓ Technical questions
                                </span>

                                <span>
                                    ✓ AI evaluation
                                </span>

                                <span>
                                    ✓ Strengths & improvements
                                </span>

                            </div>


                            <button
                                className="card-button primary-button"
                                onClick={startAIInterview}
                            >
                                Start Interview
                                <span>→</span>
                            </button>

                        </article>


                        {/* CODING */}

                        <article className="practice-card coding-card">

                            <div className="card-top">

                                <div className="large-card-icon coding-icon">
                                    &lt;/&gt;
                                </div>

                                <span className="available-badge">
                                    Available
                                </span>

                            </div>


                            <h3>
                                Coding Assessment
                            </h3>

                            <p>
                                Solve programming problems using an
                                online code editor and test your solution
                                against test cases.
                            </p>


                            <div className="card-features">

                                <span>
                                    ✓ Online code editor
                                </span>

                                <span>
                                    ✓ Multiple languages
                                </span>

                                <span>
                                    ✓ Test cases
                                </span>

                            </div>


                            <button
                                className="card-button dark-button"
                                onClick={startCodingPractice}
                            >
                                Start Coding
                                <span>→</span>
                            </button>

                        </article>


                        {/* SQL */}

                        <article className="practice-card sql-card">

                            <div className="card-top">

                                <div className="large-card-icon sql-icon">
                                    DB
                                </div>

                                <span className="coming-badge">
                                    Coming next
                                </span>

                            </div>


                            <h3>
                                SQL Assessment
                            </h3>


                            <p>
                                Practice SQL queries and database
                                interview questions in an interactive
                                SQL environment.
                            </p>


                            <div className="card-features">

                                <span>
                                    ✓ SQL queries
                                </span>

                                <span>
                                    ✓ Query execution
                                </span>

                                <span>
                                    ✓ Result evaluation
                                </span>

                            </div>


                            <button
                                className="card-button disabled-button"
                                disabled
                            >
                                Coming Soon
                            </button>

                        </article>

                    </div>

                </section>


                {/* ================= QUICK ACTIONS ================= */}

                <section className="quick-section">

                    <div>

                        <span className="section-label">
                            QUICK ACCESS
                        </span>

                        <h2>
                            Continue your preparation
                        </h2>

                    </div>


                    <div className="quick-actions">

                        <button
                            onClick={openHistory}
                            className="quick-action"
                        >

                            <span className="quick-icon">
                                📋
                            </span>

                            <span>
                                <strong>
                                    Interview History
                                </strong>

                                <small>
                                    Review your previous attempts
                                </small>
                            </span>

                            <span className="arrow">
                                →
                            </span>

                        </button>


                        <button
                            onClick={startAIInterview}
                            className="quick-action"
                        >

                            <span className="quick-icon">
                                🎯
                            </span>

                            <span>
                                <strong>
                                    New AI Interview
                                </strong>

                                <small>
                                    Start another practice session
                                </small>

                            </span>

                            <span className="arrow">
                                →
                            </span>

                        </button>


                        <button
                            onClick={startCodingPractice}
                            className="quick-action"
                        >

                            <span className="quick-icon">
                                💻
                            </span>

                            <span>
                                <strong>
                                    Coding Practice
                                </strong>

                                <small>
                                    Continue coding practice
                                </small>

                            </span>

                            <span className="arrow">
                                →
                            </span>

                        </button>
						
						<button
						    onClick={() =>
						        navigate("/company-preparation")
						    }
						    className="quick-action"
						>

						    <span className="quick-icon">
						        🎯
						    </span>

						    <span>

						        <strong>
						            Company Preparation
						        </strong>

						        <small>
						            Choose a company and target role
						        </small>

						    </span>

						    <span className="arrow">
						        →
						    </span>

						</button>

                    </div>

                </section>


                {/* ================= FOOTER MESSAGE ================= */}

                <section className="dashboard-footer">

                    <div className="footer-icon">
                        💡
                    </div>

                    <div>

                        <strong>
                            Practice at your own pace
                        </strong>

                        <p>
                            There is no timer in normal practice.
                            Focus on understanding your current level
                            and improving your weak areas.
                        </p>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Dashboard;