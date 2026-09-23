import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleRegister = async (event) => {

        event.preventDefault();

        setMessage("");

        if (password !== confirmPassword) {

            setMessage("Passwords do not match.");

            return;
        }

        setLoading(true);

        try {

            const response = await api.post(
                "/api/auth/register",
                {
                    name: name,
                    email: email,
                    password: password
                }
            );

            console.log(
                "Register response:",
                response.data
            );

            // Save email temporarily
            localStorage.setItem(
                "otpEmail",
                email
            );

            setMessage(
                "OTP sent successfully to your email."
            );

            // Go to OTP page
            navigate("/verify-otp");

        } catch (error) {

            console.error(
                "Registration error:",
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
                error.response?.data ||
                "Registration failed."
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div>

            <h1>
                AI Mock Interview
            </h1>

            <h2>
                Create Account
            </h2>

            <form onSubmit={handleRegister}>

                <div>

                    <label>
                        Name
                    </label>

                    <br />

                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        required
                    />

                </div>

                <br />

                <div>

                    <label>
                        Email
                    </label>

                    <br />

                    <input
                        type="email"
                        placeholder="Enter your Gmail"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        required
                    />

                </div>

                <br />

                <div>

                    <label>
                        Password
                    </label>

                    <br />

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        required
                    />

                </div>

                <br />

                <div>

                    <label>
                        Confirm Password
                    </label>

                    <br />

                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(event) =>
                            setConfirmPassword(event.target.value)
                        }
                        required
                    />

                </div>

                <br />

                <button
                    type="submit"
                    disabled={loading}
                >

                    {loading
                        ? "Sending OTP..."
                        : "Register"
                    }

                </button>

            </form>

            {message && (

                <p>
                    {message}
                </p>

            )}

            <br />

            <button
                type="button"
                onClick={() => navigate("/")}
            >
                Already have an account? Login
            </button>

        </div>
    );
}

export default Register;