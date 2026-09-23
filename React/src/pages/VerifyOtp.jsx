import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function VerifyOtp() {

    const navigate = useNavigate();

    const [otp, setOtp] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const email =
        localStorage.getItem("otpEmail");

    const handleVerifyOtp = async (event) => {

        event.preventDefault();

        setMessage("");

        if (!email) {

            setMessage(
                "Email not found. Please register again."
            );

            return;
        }

        if (otp.length !== 6) {

            setMessage(
                "Please enter a 6-digit OTP."
            );

            return;
        }

        setLoading(true);

        try {

            const response = await api.post(
                "/api/auth/verify-otp",
                {
                    email: email,
                    otp: otp
                }
            );

            console.log(
                "OTP verification response:",
                response.data
            );

            localStorage.removeItem(
                "otpEmail"
            );

            setMessage(
                "Registration successful! Redirecting to login..."
            );

            setTimeout(() => {

                navigate("/");

            }, 1500);

        } catch (error) {

            console.error(
                "OTP verification error:",
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
                "Invalid or expired OTP."
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
                Verify Email
            </h2>

            <p>
                OTP has been sent to:
            </p>

            <strong>
                {email || "Email not found"}
            </strong>

            <br />
            <br />

            <form onSubmit={handleVerifyOtp}>

                <div>

                    <label>
                        Enter OTP
                    </label>

                    <br />

                    <input
                        type="text"
                        inputMode="numeric"
                        maxLength="6"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(event) =>
                            setOtp(
                                event.target.value.replace(
                                    /\D/g,
                                    ""
                                )
                            )
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
                        ? "Verifying..."
                        : "Verify OTP"
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
                onClick={() => navigate("/register")}
            >
                Back to Registration
            </button>

        </div>
    );
}

export default VerifyOtp;