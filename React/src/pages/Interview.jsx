import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Interview.css";

function Interview() {

    const navigate = useNavigate();


    // =====================================================
    // ACTIVE INTERVIEW ID
    // =====================================================

    const savedInterviewId =
        localStorage.getItem(
            "currentInterviewId"
        );

    const interviewId =
        savedInterviewId
            ? Number(savedInterviewId)
            : null;


    // =====================================================
    // STATE
    // =====================================================

    const [interviewInfo, setInterviewInfo] =
        useState(null);

    const [questions, setQuestions] =
        useState([]);

    const [currentIndex, setCurrentIndex] =
        useState(0);

    const [answer, setAnswer] =
        useState("");

    const [result, setResult] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [message, setMessage] =
        useState("");


    // =====================================================
    // LOAD INTERVIEW
    // =====================================================

    useEffect(() => {

        if (!interviewId) {

            setLoading(false);

            return;
        }

        loadInterview();

    }, [interviewId]);


    // =====================================================
    // LOAD INTERVIEW INFORMATION
    // =====================================================

    const loadInterview = async () => {

        try {

            setLoading(true);

            setMessage("");


            // ------------------------------------------------
            // GET INTERVIEW
            // ------------------------------------------------

            const interviewResponse =
                await api.get(
                    `/api/interviews/${interviewId}`
                );


            const interview =
                interviewResponse.data;


            console.log(
                "Interview:",
                interview
            );


            setInterviewInfo(
                interview
            );


            // ------------------------------------------------
            // GET EXISTING QUESTIONS
            // ------------------------------------------------

            const questionResponse =
                await api.get(
                    `/api/questions/interview/${interviewId}`
                );


            const existingQuestions =
                questionResponse.data || [];


            console.log(
                "Existing questions:",
                existingQuestions
            );


            // ------------------------------------------------
            // IF QUESTIONS ALREADY EXIST
            // ------------------------------------------------

            if (
                existingQuestions.length > 0
            ) {

                setQuestions(
                    existingQuestions
                );

                setCurrentIndex(0);

                return;
            }


            // ------------------------------------------------
            // GENERATE QUESTIONS
            // ------------------------------------------------

            const count =
                interview.questionCount || 5;


            await generateQuestions(
                count
            );

        }

        catch (error) {

            console.error(
                "Load interview error:",
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


            setMessage(
                error.response?.data?.message ||
                "Unable to load interview."
            );

        }

        finally {

            setLoading(false);

        }

    };


    // =====================================================
    // GENERATE QUESTIONS
    // =====================================================

    const generateQuestions =
        async (count) => {

            try {

                setMessage("");


                const response =
                    await api.post(
                        "/api/questions/generate",
                        {
                            interviewId:
                                interviewId,

                            count:
                                Number(count)
                        }
                    );


                const generatedQuestions =
                    response.data || [];


                console.log(
                    "Generated questions:",
                    generatedQuestions
                );


                if (
                    generatedQuestions.length === 0
                ) {

                    setMessage(
                        "AI did not generate any questions."
                    );

                    return;
                }


                setQuestions(
                    generatedQuestions
                );


                setCurrentIndex(0);

            }

            catch (error) {

                console.error(
                    "Generate questions error:",
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


                setMessage(
                    error.response?.data?.message ||
                    "Unable to generate questions."
                );

            }

        };


    // =====================================================
    // SUBMIT ANSWER
    // =====================================================

    const submitAnswer = async () => {

        if (!answer.trim()) {

            setMessage(
                "Please enter your answer."
            );

            return;
        }


        const currentQuestion =
            questions[currentIndex];


        if (!currentQuestion) {

            setMessage(
                "Question not found."
            );

            return;
        }


        try {

            setLoading(true);

            setMessage("");


            const response =
                await api.post(
                    "/api/answer",
                    {
                        questionId:
                            currentQuestion.id,

                        answerText:
                            answer.trim()
                    }
                );


            console.log(
                "Answer evaluation:",
                response.data
            );


            setResult(
                response.data
            );


            setAnswer("");

        }

        catch (error) {

            console.error(
                "Submit answer error:",
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


            setMessage(
                error.response?.data?.message ||
                "Unable to evaluate answer."
            );

        }

        finally {

            setLoading(false);

        }

    };


    // =====================================================
    // NEXT QUESTION
    // =====================================================

    const nextQuestion = () => {

        setResult(null);

        setAnswer("");

        setMessage("");


        if (
            currentIndex <
            questions.length - 1
        ) {

            setCurrentIndex(
                previousIndex =>
                    previousIndex + 1
            );

            return;
        }


        // ------------------------------------------------
        // LAST QUESTION
        // ------------------------------------------------

        completeInterview();

    };


    // =====================================================
    // COMPLETE INTERVIEW
    // =====================================================

    const completeInterview =
        async () => {

            if (!interviewId) {

                setMessage(
                    "Interview ID is not available."
                );

                return;
            }


            try {

                setLoading(true);

                setMessage("");


                const response =
                    await api.post(
                        `/api/interviews/${interviewId}/complete`
                    );


                console.log(
                    "Interview completed:",
                    response.data
                );


                // ------------------------------------------------
                // IMPORTANT
                // ------------------------------------------------
                // Save result before removing ID.
                // ------------------------------------------------

                localStorage.setItem(
                    "lastInterviewResult",
                    JSON.stringify(
                        response.data
                    )
                );


                // ------------------------------------------------
                // Remove active interview
                // ------------------------------------------------

                localStorage.removeItem(
                    "currentInterviewId"
                );


                // ------------------------------------------------
                // Navigate to result page
                // ------------------------------------------------

                navigate(
                    "/interview-result",
                    {
                        replace: true
                    }
                );

            }

            catch (error) {

                console.error(
                    "Complete interview error:",
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


                setMessage(
                    error.response?.data?.message ||
                    "Unable to complete interview."
                );

            }

            finally {

                setLoading(false);

            }

        };


    // =====================================================
    // NO ACTIVE INTERVIEW
    // =====================================================

    if (!interviewId) {

        return (

            <div className="interview-page">

                <div className="interview-container">

                    <h1>
                        AI Mock Interview
                    </h1>


                    <h2>
                        No Active Interview
                    </h2>


                    <p>
                        No active interview was found.
                    </p>


                    <button
                        onClick={() =>
                            navigate(
                                "/start-interview"
                            )
                        }
                    >
                        Start New Interview
                    </button>

                </div>

            </div>

        );

    }


    // =====================================================
    // INITIAL LOADING
    // =====================================================

    if (
        loading &&
        !interviewInfo
    ) {

        return (

            <div className="interview-page">

                <div className="interview-container">

                    <h1>
                        AI Mock Interview
                    </h1>


                    <h2>
                        Preparing Your Interview...
                    </h2>


                    <p>
                        AI is preparing your questions.
                    </p>


                    <div className="interview-loader">

                        Please wait...

                    </div>

                </div>

            </div>

        );

    }


    // =====================================================
    // MAIN PAGE
    // =====================================================

    return (

        <div className="interview-page">

            <div className="interview-container">


                {/* =========================================
                    HEADER
                ========================================= */}

                <div className="interview-header">

                    <h1>
                        AI Mock Interview
                    </h1>

                    <p>
                        Technical Interview
                    </p>

                </div>


                {/* =========================================
                    INTERVIEW INFORMATION
                ========================================= */}

                {interviewInfo && (

                    <div className="interview-info">


                        <div>

                            <strong>
                                Language
                            </strong>

                            <span>
                                {
                                    interviewInfo
                                        .programmingLanguage
                                }
                            </span>

                        </div>


                        <div>

                            <strong>
                                Category
                            </strong>

                            <span>
                                {
                                    interviewInfo.category
                                }
                            </span>

                        </div>


                        <div>

                            <strong>
                                Difficulty
                            </strong>

                            <span>
                                {
                                    interviewInfo.difficulty
                                }
                            </span>

                        </div>


                        <div>

                            <strong>
                                Questions
                            </strong>

                            <span>
                                {
                                    questions.length
                                }
                            </span>

                        </div>

                    </div>

                )}


                {/* =========================================
                    MESSAGE
                ========================================= */}

                {message && (

                    <div className="interview-message">

                        {message}

                    </div>

                )}


                {/* =========================================
                    QUESTION
                ========================================= */}

                {questions.length > 0 && (

                    <div className="question-section">


                        {/* =================================
                            PROGRESS
                        ================================= */}

                        <div className="question-progress">

                            Question{" "}
                            {currentIndex + 1}
                            {" "}of{" "}
                            {questions.length}

                        </div>


                        {/* =================================
                            QUESTION CARD
                        ================================= */}

                        <div className="question-card">

                            <span className="question-label">
                                Interview Question
                            </span>


                            <h2>

                                {
                                    questions[
                                        currentIndex
                                    ]?.question
                                }

                            </h2>

                        </div>


                        {/* =================================
                            ANSWER
                        ================================= */}

                        {!result && (

                            <div className="answer-section">

                                <label>
                                    Your Answer
                                </label>


                                <textarea
                                    placeholder="Type your answer here..."
                                    value={answer}
                                    onChange={(event) =>
                                        setAnswer(
                                            event.target.value
                                        )
                                    }
                                    disabled={loading}
                                />


                                <button
                                    className="submit-answer-button"
                                    onClick={
                                        submitAnswer
                                    }
                                    disabled={
                                        loading
                                    }
                                >

                                    {
                                        loading
                                            ? "Evaluating..."
                                            : "Submit Answer"
                                    }

                                </button>

                            </div>

                        )}


                        {/* =================================
                            EVALUATION
                        ================================= */}

                        {result && (

                            <div className="evaluation-section">


                                <div className="score-card">

                                    <span>
                                        Your Score
                                    </span>


                                    <strong>
                                        {
                                            result.score
                                        }/10
                                    </strong>

                                </div>


                                <div className="evaluation-card">


                                    <h3>
                                        Feedback
                                    </h3>

                                    <p>
                                        {
                                            result.feedback ||
                                            "No feedback available."
                                        }
                                    </p>


                                    <h3>
                                        Strengths
                                    </h3>

                                    <p>
                                        {
                                            result.strengths ||
                                            "No strengths recorded."
                                        }
                                    </p>


                                    <h3>
                                        Improvements
                                    </h3>

                                    <p>
                                        {
                                            result.improvements ||
                                            "No improvements recorded."
                                        }
                                    </p>

                                </div>


                                <button
                                    className="next-question-button"
                                    onClick={
                                        nextQuestion
                                    }
                                    disabled={
                                        loading
                                    }
                                >

                                    {
                                        currentIndex <
                                        questions.length - 1
                                            ? "Next Question"
                                            : "Complete Interview"
                                    }

                                </button>

                            </div>

                        )}

                    </div>

                )}

            </div>

        </div>

    );

}

export default Interview;