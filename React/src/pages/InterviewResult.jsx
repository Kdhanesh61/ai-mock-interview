import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function InterviewResult() {

    const navigate = useNavigate();

    const [interview, setInterview] = useState(null);

    const [loading, setLoading] = useState(true);

    const [message, setMessage] = useState("");


    // =====================================================
    // LOAD INTERVIEW RESULT
    // =====================================================

    useEffect(() => {

        const loadResult = async () => {

            try {

                setLoading(true);
                setMessage("");


                // -----------------------------------------
                // GET CURRENT INTERVIEW ID
                // -----------------------------------------

                const interviewId =
                    localStorage.getItem(
                        "currentInterviewId"
                    );


                console.log(
                    "Result Interview ID:",
                    interviewId
                );


                if (!interviewId) {

                    setMessage(
                        "No interview ID was found."
                    );

                    return;
                }


                // -----------------------------------------
                // GET INTERVIEW
                // -----------------------------------------

                const response =
                    await api.get(
                        `/api/interviews/${interviewId}`
                    );


                console.log(
                    "Interview Result:",
                    response.data
                );


                setInterview(
                    response.data
                );


            } catch (error) {

                console.error(
                    "Error loading interview result:",
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
                    "Unable to load interview result."
                );


            } finally {

                setLoading(false);
            }
        };


        loadResult();

    }, []);


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div>

                <h1>
                    AI Mock Interview
                </h1>

                <h2>
                    Loading Result...
                </h2>

                <p>
                    Please wait.
                </p>

            </div>
        );
    }


    // =====================================================
    // ERROR
    // =====================================================

    if (message) {

        return (

            <div>

                <h1>
                    AI Mock Interview
                </h1>

                <h2>
                    Interview Result
                </h2>

                <p>
                    {message}
                </p>


                <br />


                <button
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    Go to Dashboard
                </button>


                {" "}


                <button
                    onClick={() =>
                        navigate("/start-interview")
                    }
                >
                    Start New Interview
                </button>

            </div>
        );
    }


    // =====================================================
    // RESULT VALUES
    // =====================================================

    const title =
        interview?.title || "Interview";


    const interviewType =
        interview?.interviewType || "N/A";


    const programmingLanguage =
        interview?.programmingLanguage || "N/A";


    const category =
        interview?.category || "N/A";


    const difficulty =
        interview?.difficulty || "N/A";


    const questionCount =
        interview?.questionCount ?? 0;


    const status =
        interview?.status || "N/A";


    const score =
        interview?.score ?? 0;


    const startedAt =
        interview?.startedAt || "N/A";


    const completedAt =
        interview?.completedAt || "N/A";


    // =====================================================
    // RESULT PAGE
    // =====================================================

    return (

        <div>

            {/* =================================================
                HEADER
            ================================================= */}

            <h1>
                AI Mock Interview
            </h1>

            <h2>
                Interview Result
            </h2>


            <hr />


            {/* =================================================
                INTERVIEW TITLE
            ================================================= */}

            <h3>
                {title}
            </h3>


            {/* =================================================
                INTERVIEW DETAILS
            ================================================= */}

            <p>

                <strong>
                    Interview Type:
                </strong>{" "}

                {interviewType}

            </p>


            <p>

                <strong>
                    Programming Language:
                </strong>{" "}

                {programmingLanguage}

            </p>


            <p>

                <strong>
                    Category:
                </strong>{" "}

                {category}

            </p>


            <p>

                <strong>
                    Difficulty:
                </strong>{" "}

                {difficulty}

            </p>


            <p>

                <strong>
                    Number of Questions:
                </strong>{" "}

                {questionCount}

            </p>


            <p>

                <strong>
                    Status:
                </strong>{" "}

                {status}

            </p>


            <br />


            {/* =================================================
                SCORE
            ================================================= */}

            <h2>
                Your Score
            </h2>


            <h1>
                {score}
            </h1>


            <p>
                Score out of 100
            </p>


            <br />


            {/* =================================================
                TIME INFORMATION
            ================================================= */}

            <h3>
                Interview Information
            </h3>


            <p>

                <strong>
                    Started At:
                </strong>{" "}

                {startedAt}

            </p>


            <p>

                <strong>
                    Completed At:
                </strong>{" "}

                {completedAt}

            </p>


            <br />
            <br />


            {/* =================================================
                ACTION BUTTONS
            ================================================= */}

            <button
                onClick={() =>
                    navigate("/dashboard")
                }
            >
                Go to Dashboard
            </button>


            {" "}


            <button
                onClick={() =>
                    navigate("/start-interview")
                }
            >
                Start New Interview
            </button>

        </div>
    );
}

export default InterviewResult;