import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    // =====================================================
    // STATE
    // =====================================================

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");


    // =====================================================
    // LOGIN
    // =====================================================

    const handleLogin = async (event) => {

        event.preventDefault();

        setMessage("");


        // =================================================
        // VALIDATION
        // =================================================

        if (!email.trim()) {

            setMessage("Please enter your email.");

            return;
        }


        if (!password.trim()) {

            setMessage("Please enter your password.");

            return;
        }


        setLoading(true);


        try {

            // =================================================
            // LOGIN REQUEST
            // =================================================

            const response = await api.post(
                "/api/auth/login",
                {
                    email: email.trim(),
                    password: password
                }
            );


            console.log(
                "Login response:",
                response.data
            );


            // =================================================
            // GET TOKEN
            // =================================================

            const token =
                response.data?.token;


            if (!token) {

                setMessage(
                    "Login successful, but authentication token was not received."
                );

                return;
            }


            // =================================================
            // SAVE TOKEN
            // =================================================

            localStorage.setItem(
                "token",
                token
            );


            console.log(
                "JWT token saved successfully."
            );


            // =================================================
            // GO TO DASHBOARD
            // =================================================

            navigate("/dashboard");


        } catch (error) {

            console.error(
                "Login error:",
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
                "Invalid email or password. Please try again."
            );


        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="login-page">

            <div className="login-container">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="login-header">

                    <h1>
                        AI Mock Interview
                    </h1>

                    <p>
                        Practice. Improve. Succeed.
                    </p>

                </div>


                {/* =================================================
                    LOGIN CARD
                ================================================= */}

                <div className="login-card">

                    <h2>
                        Welcome Back
                    </h2>

                    <p className="login-subtitle">
                        Login to continue your interview practice
                    </p>


                    {/* =================================================
                        FORM
                    ================================================= */}

                    <form
                        onSubmit={handleLogin}
                    >


                        {/* =================================================
                            EMAIL
                        ================================================= */}

                        <div className="form-group">

                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(
                                        event.target.value
                                    )
                                }
                                disabled={loading}
                                autoComplete="email"
                                required
                            />

                        </div>


                        {/* =================================================
                            PASSWORD
                        ================================================= */}

                        <div className="form-group">

                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target.value
                                    )
                                }
                                disabled={loading}
                                autoComplete="current-password"
                                required
                            />

                        </div>


                        {/* =================================================
                            ERROR MESSAGE
                        ================================================= */}

                        {message && (

                            <div className="login-message">

                                {message}

                            </div>

                        )}


                        {/* =================================================
                            LOGIN BUTTON
                        ================================================= */}

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Logging in..."
                                : "Login"
                            }

                        </button>


                    </form>


                    {/* =================================================
                        REGISTER
                    ================================================= */}

                    <div className="register-section">

                        <p>
                            Don't have an account?
                        </p>

                        <button
                            type="button"
                            className="register-button"
                            onClick={() =>
                                navigate("/register")
                            }
                            disabled={loading}
                        >
                            Create New Account
                        </button>

                    </div>


                </div>


                {/* =================================================
                    FOOTER
                ================================================= */}

                <p className="login-footer">
                    © 2026 AI Mock Interview
                </p>


            </div>

        </div>
    );
}

export default Login;