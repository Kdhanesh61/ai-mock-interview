import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function InterviewHistory() {

    const navigate = useNavigate();

    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {

        loadInterviews();

    }, []);

    const loadInterviews = async () => {

        try {

            const response = await api.get(
                "/api/interviews/my"
            );

            console.log(
                "Interview history:",
                response.data
            );

            setInterviews(response.data);

        } catch (error) {

            console.error(
                "Interview history error:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                "Unable to load interview history."
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div>

            <h1>
                Interview History
            </h1>

            <button
                onClick={() =>
                    navigate("/dashboard")
                }
            >
                Back to Dashboard
            </button>

            <br />
            <br />

            {loading && (
                <p>
                    Loading interviews...
                </p>
            )}

            {message && (
                <p>
                    {message}
                </p>
            )}

            {!loading &&
                !message &&
                interviews.length === 0 && (

                    <p>
                        No interviews found.
                    </p>
                )}

            {!loading &&
                interviews.length > 0 && (

                    <div>

                        {interviews.map(
                            (interview) => (

                                <div
                                    key={interview.id}
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "20px",
                                        marginBottom: "15px",
                                        borderRadius: "8px"
                                    }}
                                >

                                    <h2>
                                        {interview.title}
                                    </h2>

                                    <p>
                                        Category:{" "}
                                        {interview.category}
                                    </p>

                                    <p>
                                        Difficulty:{" "}
                                        {interview.difficulty}
                                    </p>

                                    <p>
                                        Status:{" "}
                                        {interview.status}
                                    </p>

                                    <p>
                                        Score:{" "}
                                        {interview.score ?? "Not evaluated"}
                                    </p>

                                </div>
                            )
                        )}

                    </div>
                )}

        </div>
    );
}

export default InterviewHistory;