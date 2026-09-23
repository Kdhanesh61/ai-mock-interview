import { useNavigate } from "react-router-dom";
import "./PracticeSelection.css";

function PracticeSelection() {

    const navigate = useNavigate();

    return (
        <div className="practice-page">

            {/* ================================
                HEADER
            ================================= */}

            <div className="practice-header">

                <h1>
                    Choose Your Practice
                </h1>

                <p>
                    Select an interview mode and start practicing.
                </p>

            </div>


            {/* ================================
                PRACTICE CARDS
            ================================= */}

            <section className="practice-cards">


                {/* ================================
                    AI INTERVIEW
                ================================= */}

                <div className="practice-card">

                    <div className="practice-icon">
                        🎤
                    </div>

                    <h2>
                        AI Technical Interview
                    </h2>

                    <p>
                        Practice technical interview
                        questions with AI.
                    </p>

                    <button
                        className="practice-button"
                        onClick={() =>
                            navigate("/start-interview")
                        }
                    >
                        Start Interview
                    </button>

                </div>


                {/* ================================
                    CODING INTERVIEW
                ================================= */}

                <div className="practice-card">

                    <div className="practice-icon">
                        💻
                    </div>

                    <h2>
                        Coding Interview
                    </h2>

                    <p>
                        Solve programming problems
                        using an online code editor.
                    </p>

                    <div className="language-list">

                        <span>Java</span>
                        <span>Python</span>
                        <span>C</span>
                        <span>C++</span>

                    </div>

                    <button
                        className="practice-button"
                        onClick={() =>
                            navigate("/coding-interview")
                        }
                    >
                        Start Coding
                    </button>

                </div>


                {/* ================================
                    SQL PRACTICE
                ================================= */}

                <div className="practice-card">

                    <div className="practice-icon">
                        🗄️
                    </div>

                    <h2>
                        SQL Practice
                    </h2>

                    <p>
                        Practice SQL queries and
                        database interview questions.
                    </p>

                    <button
                        className="practice-button"
                        onClick={() =>
                            navigate("/sql-practice")
                        }
                    >
                        Start SQL
                    </button>

                </div>

            </section>


            {/* ================================
                QUICK ACTIONS
            ================================= */}

            <section className="quick-actions">

                <h2>
                    Quick Actions
                </h2>


                <div className="quick-action-grid">


                    {/* Interview History */}

                    <button
                        className="quick-action"
                        onClick={() =>
                            navigate("/interview-history")
                        }
                    >

                        <span className="quick-icon">
                            📋
                        </span>

                        <span className="quick-title">
                            Interview History
                        </span>

                        <span className="quick-description">
                            View your previous interviews
                        </span>

                    </button>


                    {/* AI Interview */}

                    <button
                        className="quick-action"
                        onClick={() =>
                            navigate("/start-interview")
                        }
                    >

                        <span className="quick-icon">
                            🎤
                        </span>

                        <span className="quick-title">
                            AI Interview
                        </span>

                        <span className="quick-description">
                            Start a technical interview
                        </span>

                    </button>


                    {/* Coding */}

                    <button
                        className="quick-action"
                        onClick={() =>
                            navigate("/coding-interview")
                        }
                    >

                        <span className="quick-icon">
                            💻
                        </span>

                        <span className="quick-title">
                            Coding Practice
                        </span>

                        <span className="quick-description">
                            Solve coding problems
                        </span>

                    </button>


                    {/* SQL */}

                    <button
                        className="quick-action"
                        onClick={() =>
                            navigate("/sql-practice")
                        }
                    >

                        <span className="quick-icon">
                            🗄️
                        </span>

                        <span className="quick-title">
                            SQL Practice
                        </span>

                        <span className="quick-description">
                            Practice SQL queries
                        </span>

                    </button>

                </div>

            </section>

        </div>
    );
}

export default PracticeSelection;