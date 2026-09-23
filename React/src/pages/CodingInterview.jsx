import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import api from "../services/api";
import "./CodingInterview.css";

function CodingInterview() {

    const navigate = useNavigate();

    // -----------------------------------------
    // Interview
    // -----------------------------------------

    const [interviewId, setInterviewId] = useState(null);

    const [question, setQuestion] = useState(null);

    const [loading, setLoading] = useState(true);

    const [message, setMessage] = useState("");


    // -----------------------------------------
    // Language and difficulty
    // -----------------------------------------

    const [language, setLanguage] = useState(
        localStorage.getItem("codingLanguage") || "Java"
    );

    const [difficulty] = useState(
        localStorage.getItem("codingDifficulty") || "Medium"
    );


    // -----------------------------------------
    // Starter code
    // -----------------------------------------

    const javaCode = `public class Main {

    public static void main(String[] args) {

        System.out.println("Hello, World!");

    }
}`;


    const pythonCode = `print("Hello, World!")`;


    const cCode = `#include <stdio.h>

int main() {

    printf("Hello, World!\\n");

    return 0;
}`;


    const cppCode = `#include <iostream>

using namespace std;

int main() {

    cout << "Hello, World!" << endl;

    return 0;
}`;


    const getStarterCode = (selectedLanguage) => {

        if (selectedLanguage === "Python") {
            return pythonCode;
        }

        if (selectedLanguage === "C") {
            return cCode;
        }

        if (selectedLanguage === "C++") {
            return cppCode;
        }

        return javaCode;
    };


    // -----------------------------------------
    // Code
    // -----------------------------------------

    const [code, setCode] = useState(
        getStarterCode(
            localStorage.getItem("codingLanguage") || "Java"
        )
    );


    // -----------------------------------------
    // Console
    // -----------------------------------------

    const [output, setOutput] = useState("");

    const [error, setError] = useState("");

    const [running, setRunning] = useState(false);


    // -----------------------------------------
    // Test cases
    // -----------------------------------------

    const [testCases] = useState([]);


    // -----------------------------------------
    // Load interview
    // -----------------------------------------

    useEffect(() => {

        loadInterview();

    }, []);


    const loadInterview = async () => {

        try {

            setLoading(true);

            setMessage("");


            const storedInterviewId =
                localStorage.getItem(
                    "currentInterviewId"
                );


            if (storedInterviewId) {

                setInterviewId(
                    storedInterviewId
                );


                try {

                    const response =
                        await api.get(
                            `/api/questions/interview/${storedInterviewId}`
                        );


                    const questions =
                        response.data;


                    if (
                        questions &&
                        questions.length > 0
                    ) {

                        setQuestion(
                            questions[0]
                        );
                    }

                } catch (questionError) {

                    console.log(
                        "Question loading skipped:",
                        questionError
                    );
                }

            } else {

                console.log(
                    "No current interview ID found."
                );
            }

        } catch (error) {

            console.error(
                "Coding interview loading error:",
                error
            );

            setMessage(
                "Unable to load coding interview."
            );

        } finally {

            setLoading(false);
        }
    };


    // -----------------------------------------
    // Language change
    // -----------------------------------------

    const handleLanguageChange = (event) => {

        const newLanguage =
            event.target.value;


        setLanguage(
            newLanguage
        );


        localStorage.setItem(
            "codingLanguage",
            newLanguage
        );


        setCode(
            getStarterCode(
                newLanguage
            )
        );


        setOutput("");

        setError("");
    };


    // -----------------------------------------
    // Monaco language
    // -----------------------------------------

    const getMonacoLanguage = () => {

        if (language === "Python") {
            return "python";
        }

        if (language === "C") {
            return "c";
        }

        if (language === "C++") {
            return "cpp";
        }

        return "java";
    };


    // -----------------------------------------
    // Run code
    // -----------------------------------------

    const handleRunCode = async () => {

        if (!code.trim()) {

            setError(
                "Please enter some code."
            );

            return;
        }


        setRunning(true);

        setOutput("");

        setError("");


        try {

            const response =
                await api.post(
                    "/api/code/run",
                    {
                        interviewId:
                            interviewId
                                ? Number(interviewId)
                                : null,

                        language:
                            language,

                        code:
                            code
                    }
                );


            console.log(
                "Code execution response:",
                response.data
            );


            if (response.data.success) {

                setOutput(
                    response.data.output ||
                    "Program executed successfully."
                );

                setError("");

            } else {

                setOutput("");

                setError(
                    response.data.error ||
                    "Code execution failed."
                );
            }

        } catch (error) {

            console.error(
                "Run code error:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Unable to execute code."
            );

        } finally {

            setRunning(false);
        }
    };


    // -----------------------------------------
    // Reset
    // -----------------------------------------

    const handleReset = () => {

        setCode(
            getStarterCode(
                language
            )
        );

        setOutput("");

        setError("");
    };


    // -----------------------------------------
    // Dashboard
    // -----------------------------------------

    const handleBack = () => {

        navigate(
            "/dashboard"
        );
    };


    // -----------------------------------------
    // Loading
    // -----------------------------------------

    if (loading) {

        return (

            <div className="coding-loading">

                <h2>
                    Loading Coding Interview...
                </h2>

            </div>
        );
    }


    // -----------------------------------------
    // UI
    // -----------------------------------------

    return (

        <div className="coding-page">


            {/* HEADER */}

            <header className="coding-header">

                <div className="coding-logo">

                    <h1>
                        AI Mock Interview
                    </h1>

                    <span>
                        Coding Practice
                    </span>

                </div>


                <button
                    className="back-dashboard-button"
                    onClick={handleBack}
                >
                    ← Dashboard
                </button>

            </header>


            {/* MESSAGE */}

            {message && (

                <div className="coding-message">

                    {message}

                </div>
            )}


            {/* MAIN */}

            <main className="coding-main">


                {/* LEFT PANEL */}

                <section className="problem-panel">


                    <span className="problem-label">
                        CODING PROBLEM
                    </span>


                    <h2 className="problem-title">

                        {question
                            ? question.question
                            : "Practice Coding Problem"}

                    </h2>


                    {question ? (

                        <div className="problem-details">

                            <span className="difficulty-badge">

                                {difficulty}

                            </span>


                            <p>

                                Category:{" "}

                                <strong>
                                    {question.category ||
                                        "Programming"}
                                </strong>

                            </p>


                            <p>
                                Solve this problem using
                                the selected programming
                                language.
                            </p>

                        </div>

                    ) : (

                        <div className="practice-description">

                            <h3>
                                Practice Mode
                            </h3>

                            <p>
                                Write and run your code
                                without a timer.
                            </p>

                            <p>
                                Select a programming
                                language and start
                                practicing.
                            </p>

                        </div>
                    )}


                    {/* TEST CASES */}

                    <div className="test-case-preview">

                        <h3>
                            Test Cases
                        </h3>


                        {testCases.length === 0 ? (

                            <div className="no-test-cases">

                                Test cases will appear
                                here when available.

                            </div>

                        ) : (

                            testCases.map(
                                (testCase, index) => (

                                    <div
                                        className="test-case"
                                        key={
                                            testCase.id ||
                                            index
                                        }
                                    >

                                        <strong>
                                            Test Case{" "}
                                            {index + 1}
                                        </strong>

                                        <p>
                                            Input:{" "}
                                            {testCase.input}
                                        </p>

                                        <p>
                                            Expected:{" "}
                                            {
                                                testCase.expectedOutput
                                            }
                                        </p>

                                    </div>
                                )
                            )
                        )}

                    </div>

                </section>


                {/* RIGHT PANEL */}

                <section className="editor-panel">


                    {/* TOOLBAR */}

                    <div className="editor-toolbar">


                        {/* LANGUAGE */}

                        <div className="language-selector">

                            <label>
                                Language
                            </label>


                            <select
                                className="language-select"
                                value={language}
                                onChange={
                                    handleLanguageChange
                                }
                            >

                                <option value="Java">
                                    Java
                                </option>

                                <option value="Python">
                                    Python
                                </option>

                                <option value="C">
                                    C
                                </option>

                                <option value="C++">
                                    C++
                                </option>

                            </select>

                        </div>


                        {/* BUTTONS */}

                        <div className="editor-actions">

                            <button
                                className="reset-button"
                                onClick={
                                    handleReset
                                }
                            >
                                Reset
                            </button>


                            <button
                                className="run-button"
                                onClick={
                                    handleRunCode
                                }
                                disabled={running}
                            >

                                {running
                                    ? "Running..."
                                    : "▶ Run Code"}

                            </button>

                        </div>

                    </div>


                    {/* MONACO */}

                    <div className="monaco-container">

                        <Editor
                            height="100%"
                            language={
                                getMonacoLanguage()
                            }
                            value={code}
                            onChange={
                                (value) =>
                                    setCode(
                                        value || ""
                                    )
                            }
                            theme="vs-dark"
                            options={{

                                minimap: {
                                    enabled: true
                                },

                                fontSize: 14,

                                automaticLayout:
                                    true,

                                wordWrap:
                                    "on",

                                scrollBeyondLastLine:
                                    false,

                                padding: {
                                    top: 15
                                },

                                suggestOnTriggerCharacters:
                                    true,

                                quickSuggestions:
                                    true
                            }}
                        />

                    </div>


                    {/* CONSOLE */}

                    <div className="console-panel">


                        <div className="console-header">

                            <span>
                                Console
                            </span>

                            <span>
                                {language}
                            </span>

                        </div>


                        <div className="console-body">


                            {running && (

                                <div className="console-running">

                                    Running your code...

                                </div>
                            )}


                            {!running &&
                                !output &&
                                !error && (

                                    <div className="console-empty">

                                        Click{" "}

                                        <strong>
                                            Run Code
                                        </strong>

                                        {" "}to execute
                                        your program.

                                    </div>
                                )}


                            {!running &&
                                output && (

                                    <pre className="console-output">

                                        {output}

                                    </pre>
                                )}


                            {!running &&
                                error && (

                                    <pre className="console-error">

                                        {error}

                                    </pre>
                                )}

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default CodingInterview;