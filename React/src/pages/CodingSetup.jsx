import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CodingSetup.css";

function CodingSetup() {

    const navigate = useNavigate();

    const [language, setLanguage] =
        useState("Java");

    const [difficulty, setDifficulty] =
        useState("Medium");


    const handleStart = () => {

        localStorage.setItem(
            "codingLanguage",
            language
        );

        localStorage.setItem(
            "codingDifficulty",
            difficulty
        );

        navigate("/coding-interview");
    };


    return (

        <div className="coding-setup">

            <div className="coding-setup-card">

                <div className="coding-setup-icon">
                    💻
                </div>

                <h1>
                    Coding Interview
                </h1>

                <p className="coding-setup-description">
                    Choose your programming language
                    and difficulty level before starting.
                </p>


                {/* LANGUAGE */}

                <div className="setup-group">

                    <label>
                        Programming Language
                    </label>

                    <select
                        value={language}
                        onChange={(event) =>
                            setLanguage(
                                event.target.value
                            )
                        }
                    >

                        <option value="Java">
                            ☕ Java
                        </option>

                        <option value="Python">
                            🐍 Python
                        </option>

                        <option value="C">
                            C
                        </option>

                        <option value="C++">
                            C++
                        </option>

                    </select>

                </div>


                {/* DIFFICULTY */}

                <div className="setup-group">

                    <label>
                        Difficulty
                    </label>

                    <select
                        value={difficulty}
                        onChange={(event) =>
                            setDifficulty(
                                event.target.value
                            )
                        }
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

                    </select>

                </div>


                {/* FEATURES */}

                <div className="coding-features">

                    <div>
                        ✓ Online code editor
                    </div>

                    <div>
                        ✓ Run your code
                    </div>

                    <div>
                        ✓ Test cases
                    </div>

                    <div>
                        ✓ AI code evaluation
                    </div>

                </div>


                {/* BUTTONS */}

                <div className="setup-buttons">

                    <button
                        className="back-button"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        Back
                    </button>


                    <button
                        className="start-coding-button"
                        onClick={handleStart}
                    >
                        Start Coding →
                    </button>

                </div>

            </div>

        </div>
    );
}

export default CodingSetup;