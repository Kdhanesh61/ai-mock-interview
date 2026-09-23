import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./StartInterview.css";

function StartInterview() {

    const navigate = useNavigate();


    // =====================================================
    // STATE
    // =====================================================

    const [title, setTitle] =
        useState("");

    const [interviewType, setInterviewType] =
        useState("CODING");

    const [programmingLanguage, setProgrammingLanguage] =
        useState("Java");

    const [category, setCategory] =
        useState("DSA");

    const [difficulty, setDifficulty] =
        useState("Medium");

    const [questionCount, setQuestionCount] =
        useState(10);

    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");


    // =====================================================
    // CHANGE INTERVIEW TYPE
    // =====================================================

    const handleInterviewTypeChange = (event) => {

        const type =
            event.target.value;

        setInterviewType(type);


        if (type === "CODING") {

            setProgrammingLanguage("Java");
            setCategory("DSA");

        }

        else if (type === "TECHNICAL") {

            setProgrammingLanguage("Java");
            setCategory("JAVA");

        }

        else if (type === "SQL") {

            setProgrammingLanguage("MySQL");
            setCategory("SQL_BASICS");

        }

        else if (type === "FULL_STACK") {

            setProgrammingLanguage("Java");
            setCategory("FRONTEND");

        }

        else if (type === "BEHAVIORAL") {

            setProgrammingLanguage("");
            setCategory("HR");

        }
    };


    // =====================================================
    // START INTERVIEW
    // =====================================================

    const handleStartInterview = async (event) => {

        event.preventDefault();

        setMessage("");


        // =================================================
        // VALIDATION
        // =================================================

        if (!title.trim()) {

            setMessage(
                "Please enter an interview title."
            );

            return;
        }


        if (!category) {

            setMessage(
                "Please select a category."
            );

            return;
        }


        if (!difficulty) {

            setMessage(
                "Please select a difficulty."
            );

            return;
        }


        if (!questionCount) {

            setMessage(
                "Please select the number of questions."
            );

            return;
        }


        setLoading(true);


        try {

            // =================================================
            // REQUEST DATA
            // =================================================

            const requestData = {

                title:
                    title.trim(),

                interviewType:
                    interviewType,

                programmingLanguage:
                    programmingLanguage || null,

                category:
                    category,

                difficulty:
                    difficulty,

                questionCount:
                    Number(questionCount)
            };


            console.log(
                "Starting interview:",
                requestData
            );


            // =================================================
            // API REQUEST
            // =================================================

            const response =
                await api.post(
                    "/api/interviews/start",
                    requestData
                );


            console.log(
                "Interview response:",
                response.data
            );


            // =================================================
            // GET INTERVIEW ID
            // =================================================

            const interviewId =
                response.data?.id;


            if (!interviewId) {

                setMessage(
                    "Interview was created, but the server did not return an interview ID."
                );

                return;
            }


            // =================================================
            // SAVE CURRENT INTERVIEW
            // =================================================

            localStorage.setItem(
                "currentInterviewId",
                String(interviewId)
            );


            // =================================================
            // GO TO INTERVIEW
            // =================================================

            navigate("/interview");


        }

        catch (error) {

            console.error(
                "Start interview error:",
                error
            );


            console.log(
                "Status:",
                error.response?.status
            );


            console.log(
                "Response:",
                error.response?.data
            );


            const backendMessage =
                error.response?.data?.message;


            setMessage(
                backendMessage ||
                "Unable to start interview. Please try again."
            );

        }

        finally {

            setLoading(false);
        }
    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="start-interview-page">

            <div className="start-interview-container">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="start-interview-header">

                    <h1>
                        AI Mock Interview
                    </h1>

                    <p>
                        Configure your interview
                    </p>

                </div>


                {/* =================================================
                    CARD
                ================================================= */}

                <div className="start-interview-card">

                    <h2>
                        Start New Interview
                    </h2>

                    <p className="start-interview-subtitle">
                        Choose your interview preferences
                    </p>


                    {/* =================================================
                        FORM
                    ================================================= */}

                    <form
                        className="start-interview-form"
                        onSubmit={handleStartInterview}
                    >


                        {/* =================================================
                            TITLE
                        ================================================= */}

                        <div className="start-form-group">

                            <label htmlFor="title">
                                Interview Title
                            </label>

                            <input
                                id="title"
                                type="text"
                                placeholder="Java Coding Interview"
                                value={title}
                                onChange={(event) =>
                                    setTitle(
                                        event.target.value
                                    )
                                }
                                disabled={loading}
                                required
                            />

                        </div>


                        {/* =================================================
                            INTERVIEW TYPE
                        ================================================= */}

                        <div className="start-form-group">

                            <label htmlFor="interviewType">
                                Interview Type
                            </label>

                            <select
                                id="interviewType"
                                value={interviewType}
                                onChange={
                                    handleInterviewTypeChange
                                }
                                disabled={loading}
                            >

                                <option value="CODING">
                                    Coding Interview
                                </option>

                                <option value="TECHNICAL">
                                    Technical Interview
                                </option>

                                <option value="SQL">
                                    SQL Interview
                                </option>

                                <option value="FULL_STACK">
                                    Full Stack Interview
                                </option>

                                <option value="BEHAVIORAL">
                                    Behavioral Interview
                                </option>

                            </select>

                        </div>


                        {/* =================================================
                            PROGRAMMING LANGUAGE
                        ================================================= */}

                        {(
                            interviewType === "CODING" ||
                            interviewType === "FULL_STACK"
                        ) && (

                            <div className="start-form-group">

                                <label htmlFor="language">
                                    Programming Language
                                </label>

                                <select
                                    id="language"
                                    value={programmingLanguage}
                                    onChange={(event) =>
                                        setProgrammingLanguage(
                                            event.target.value
                                        )
                                    }
                                    disabled={loading}
                                >

                                    <option value="Java">
                                        Java
                                    </option>

                                    <option value="Python">
                                        Python
                                    </option>

                                    <option value="JavaScript">
                                        JavaScript
                                    </option>

                                    <option value="C">
                                        C
                                    </option>

                                    <option value="C++">
                                        C++
                                    </option>

                                </select>

                            </div>
                        )}


                        {/* =================================================
                            SQL DATABASE
                        ================================================= */}

                        {interviewType === "SQL" && (

                            <div className="start-form-group">

                                <label htmlFor="database">
                                    SQL Database
                                </label>

                                <select
                                    id="database"
                                    value={programmingLanguage}
                                    onChange={(event) =>
                                        setProgrammingLanguage(
                                            event.target.value
                                        )
                                    }
                                    disabled={loading}
                                >

                                    <option value="MySQL">
                                        MySQL
                                    </option>

                                    <option value="PostgreSQL">
                                        PostgreSQL
                                    </option>

                                </select>

                            </div>
                        )}


                        {/* =================================================
                            CATEGORY
                        ================================================= */}

                        <div className="start-form-group">

                            <label htmlFor="category">
                                Category
                            </label>

                            <select
                                id="category"
                                value={category}
                                onChange={(event) =>
                                    setCategory(
                                        event.target.value
                                    )
                                }
                                disabled={loading}
                            >


                                {/* CODING */}

                                {interviewType === "CODING" && (
                                    <>

                                        <option value="DSA">
                                            Data Structures & Algorithms
                                        </option>

                                        <option value="ARRAYS">
                                            Arrays
                                        </option>

                                        <option value="STRINGS">
                                            Strings
                                        </option>

                                        <option value="LINKED_LIST">
                                            Linked List
                                        </option>

                                        <option value="STACK_QUEUE">
                                            Stack & Queue
                                        </option>

                                        <option value="TREE">
                                            Trees
                                        </option>

                                        <option value="DYNAMIC_PROGRAMMING">
                                            Dynamic Programming
                                        </option>

                                    </>
                                )}


                                {/* TECHNICAL */}

                                {interviewType === "TECHNICAL" && (
                                    <>

                                        <option value="JAVA">
                                            Java
                                        </option>

                                        <option value="SPRING_BOOT">
                                            Spring Boot
                                        </option>

                                        <option value="OOP">
                                            OOP
                                        </option>

                                        <option value="DATABASE">
                                            Database
                                        </option>

                                    </>
                                )}


                                {/* SQL */}

                                {interviewType === "SQL" && (
                                    <>

                                        <option value="SQL_BASICS">
                                            SQL Basics
                                        </option>

                                        <option value="JOINS">
                                            Joins
                                        </option>

                                        <option value="SUBQUERIES">
                                            Subqueries
                                        </option>

                                        <option value="AGGREGATE">
                                            Aggregate Functions
                                        </option>

                                        <option value="WINDOW_FUNCTIONS">
                                            Window Functions
                                        </option>

                                    </>
                                )}


                                {/* FULL STACK */}

                                {interviewType === "FULL_STACK" && (
                                    <>

                                        <option value="FRONTEND">
                                            Frontend
                                        </option>

                                        <option value="BACKEND">
                                            Backend
                                        </option>

                                        <option value="DATABASE">
                                            Database
                                        </option>

                                        <option value="API">
                                            REST APIs
                                        </option>

                                    </>
                                )}


                                {/* BEHAVIORAL */}

                                {interviewType === "BEHAVIORAL" && (
                                    <>

                                        <option value="HR">
                                            HR
                                        </option>

                                        <option value="COMMUNICATION">
                                            Communication
                                        </option>

                                        <option value="SITUATIONAL">
                                            Situational
                                        </option>

                                    </>
                                )}

                            </select>

                        </div>


                        {/* =================================================
                            DIFFICULTY
                        ================================================= */}

                        <div className="start-form-group">

                            <label htmlFor="difficulty">
                                Difficulty
                            </label>

                            <select
                                id="difficulty"
                                value={difficulty}
                                onChange={(event) =>
                                    setDifficulty(
                                        event.target.value
                                    )
                                }
                                disabled={loading}
                            >

                                <option value="Easy">
                                    Easy
                                </option>

                                <option value="Medium">
                                    Medium
                                </option>

                                <option value="Hard">
                                    Hard
                                </option>

                                <option value="Adaptive">
                                    Adaptive AI
                                </option>

                            </select>

                        </div>


                        {/* =================================================
                            QUESTION COUNT
                        ================================================= */}

                        <div className="start-form-group">

                            <label htmlFor="questionCount">
                                Number of Questions
                            </label>

                            <select
                                id="questionCount"
                                value={questionCount}
                                onChange={(event) =>
                                    setQuestionCount(
                                        event.target.value
                                    )
                                }
                                disabled={loading}
                            >

                                <option value="5">
                                    5 Questions
                                </option>

                                <option value="10">
                                    10 Questions
                                </option>

                                <option value="15">
                                    15 Questions
                                </option>

                                <option value="20">
                                    20 Questions
                                </option>

                            </select>

                        </div>


                        {/* =================================================
                            MESSAGE
                        ================================================= */}

                        {message && (

                            <div className="start-interview-message">

                                {message}

                            </div>

                        )}


                        {/* =================================================
                            BUTTON
                        ================================================= */}

                        <button
                            type="submit"
                            className="start-interview-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Starting..."
                                : "Start Interview"
                            }

                        </button>

                    </form>

                </div>


                {/* =================================================
                    FOOTER
                ================================================= */}

                <div className="start-interview-footer">

                    © 2026 AI Mock Interview

                </div>

            </div>

        </div>
    );
}

export default StartInterview;