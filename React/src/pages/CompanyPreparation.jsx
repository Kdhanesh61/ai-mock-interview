import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CompanyPreparation.css";

function CompanyPreparation() {

    const navigate = useNavigate();

    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("Fresher");
    const [assessment, setAssessment] = useState("");

    const handleStart = () => {

        if (!company) {
            alert("Please select a company.");
            return;
        }

        if (!role) {
            alert("Please select a role.");
            return;
        }

        if (!assessment) {
            alert("Please select an assessment type.");
            return;
        }

        /*
         * Save the user's selection.
         * Later we will send this information
         * to Spring Boot and generate the
         * correct assessment.
         */

        localStorage.setItem(
            "selectedCompany",
            company
        );

        localStorage.setItem(
            "selectedRole",
            role
        );

        localStorage.setItem(
            "selectedExperience",
            experience
        );

        localStorage.setItem(
            "selectedAssessment",
            assessment
        );


        /*
         * For now:
         *
         * AI Interview -> existing Start Interview
         * Coding       -> existing Coding Setup
         *
         * Full Assessment will be connected
         * after we build the assessment backend.
         */

        if (assessment === "AI Interview") {

            navigate("/start-interview");

            return;
        }


        if (assessment === "Coding Assessment") {

            navigate("/coding-setup");

            return;
        }


        if (assessment === "Full Technical Assessment") {

            alert(
                "Full Technical Assessment will be connected in the next step."
            );

            return;
        }
    };


    return (

        <div className="company-page">

            {/* HEADER */}

            <header className="company-header">

                <button
                    className="back-button"
                    onClick={() => navigate("/dashboard")}
                >
                    ← Dashboard
                </button>


                <div className="company-brand">

                    <div className="company-brand-logo">
                        AI
                    </div>

                    <span>
                        Mock Interview
                    </span>

                </div>

            </header>


            {/* MAIN */}

            <main className="company-content">

                <div className="company-intro">

                    <span className="company-label">
                        INTERVIEW PREPARATION
                    </span>

                    <h1>
                        Prepare for your target role
                    </h1>

                    <p>
                        Select a company and role to practice
                        the skills that matter for your interview.
                    </p>

                </div>


                {/* FORM CARD */}

                <section className="company-card">


                    {/* COMPANY */}

                    <div className="form-group">

                        <label>
                            Company
                        </label>

                        <select
                            value={company}
                            onChange={(event) => {

                                setCompany(
                                    event.target.value
                                );

                                setRole("");
                            }}
                        >

                            <option value="">
                                Select a company
                            </option>

                            <option value="Accenture">
                                Accenture
                            </option>

                            <option value="TCS">
                                TCS
                            </option>

                            <option value="Infosys">
                                Infosys
                            </option>

                            <option value="Wipro">
                                Wipro
                            </option>

                            <option value="Cognizant">
                                Cognizant
                            </option>

                            <option value="Capgemini">
                                Capgemini
                            </option>

                            <option value="Deloitte">
                                Deloitte
                            </option>

                            <option value="EY">
                                EY
                            </option>

                            <option value="JPMorgan Chase">
                                JPMorgan Chase
                            </option>

                            <option value="Other">
                                Other / General
                            </option>

                        </select>

                    </div>


                    {/* ROLE */}

                    <div className="form-group">

                        <label>
                            Target Role
                        </label>

                        <select
                            value={role}
                            onChange={(event) =>
                                setRole(
                                    event.target.value
                                )
                            }
                        >

                            <option value="">
                                Select a role
                            </option>

                            <option value="Java Developer">
                                Java Developer
                            </option>

                            <option value="Software Developer">
                                Software Developer
                            </option>

                            <option value="Full Stack Developer">
                                Full Stack Developer
                            </option>

                            <option value="Backend Developer">
                                Backend Developer
                            </option>

                            <option value="Frontend Developer">
                                Frontend Developer
                            </option>

                            <option value="Python Developer">
                                Python Developer
                            </option>

                            <option value="Data Analyst">
                                Data Analyst
                            </option>

                            <option value="QA / Testing">
                                QA / Testing
                            </option>

                        </select>

                    </div>


                    {/* EXPERIENCE */}

                    <div className="form-group">

                        <label>
                            Experience Level
                        </label>

                        <select
                            value={experience}
                            onChange={(event) =>
                                setExperience(
                                    event.target.value
                                )
                            }
                        >

                            <option value="Fresher">
                                Fresher / 0-1 Year
                            </option>

                            <option value="1-2 Years">
                                1-2 Years
                            </option>

                            <option value="2-4 Years">
                                2-4 Years
                            </option>

                            <option value="4+ Years">
                                4+ Years
                            </option>

                        </select>

                    </div>


                    {/* ASSESSMENT */}

                    <div className="assessment-group">

                        <label>
                            What do you want to practice?
                        </label>


                        <div className="assessment-options">


                            {/* AI */}

                            <button
                                type="button"
                                className={
                                    assessment === "AI Interview"
                                        ? "assessment-option selected"
                                        : "assessment-option"
                                }
                                onClick={() =>
                                    setAssessment(
                                        "AI Interview"
                                    )
                                }
                            >

                                <div className="assessment-icon blue">
                                    🎤
                                </div>

                                <div>

                                    <strong>
                                        AI Interview
                                    </strong>

                                    <span>
                                        Technical interview
                                        questions with AI
                                    </span>

                                </div>

                                <div className="radio-circle">
                                    {assessment === "AI Interview"
                                        ? "✓"
                                        : ""
                                    }
                                </div>

                            </button>


                            {/* CODING */}

                            <button
                                type="button"
                                className={
                                    assessment === "Coding Assessment"
                                        ? "assessment-option selected"
                                        : "assessment-option"
                                }
                                onClick={() =>
                                    setAssessment(
                                        "Coding Assessment"
                                    )
                                }
                            >

                                <div className="assessment-icon dark">
                                    &lt;/&gt;
                                </div>

                                <div>

                                    <strong>
                                        Coding Assessment
                                    </strong>

                                    <span>
                                        Programming problems
                                        and test cases
                                    </span>

                                </div>

                                <div className="radio-circle">
                                    {assessment === "Coding Assessment"
                                        ? "✓"
                                        : ""
                                    }
                                </div>

                            </button>


                            {/* FULL */}

                            <button
                                type="button"
                                className={
                                    assessment === "Full Technical Assessment"
                                        ? "assessment-option selected"
                                        : "assessment-option"
                                }
                                onClick={() =>
                                    setAssessment(
                                        "Full Technical Assessment"
                                    )
                                }
                            >

                                <div className="assessment-icon purple">
                                    ★
                                </div>

                                <div>

                                    <strong>
                                        Full Technical Assessment
                                    </strong>

                                    <span>
                                        Multiple technical
                                        skill areas
                                    </span>

                                </div>

                                <div className="radio-circle">
                                    {assessment === "Full Technical Assessment"
                                        ? "✓"
                                        : ""
                                    }
                                </div>

                            </button>

                        </div>

                    </div>


                    {/* START */}

                    <button
                        className="start-assessment-button"
                        onClick={handleStart}
                    >
                        Start Assessment
                        <span>
                            →
                        </span>
                    </button>


                    <p className="practice-note">
                        You can practice at your own pace.
                        No timer is used in normal practice.
                    </p>

                </section>

            </main>

        </div>
    );
}

export default CompanyPreparation;