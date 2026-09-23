import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import StartInterview from "./pages/StartInterview";
import Interview from "./pages/Interview";
import InterviewHistory from "./pages/InterviewHistory";
import CodingInterview from "./pages/CodingInterview";
import CodingSetup from "./pages/CodingSetup";
import InterviewResult from "./pages/InterviewResult";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/start-interview"
                    element={<StartInterview />}
                />

                <Route
                    path="/interview"
                    element={<Interview />}
                />

                <Route
                    path="/interview-history"
                    element={<InterviewHistory />}
                />

                <Route
                    path="/coding-interview"
                    element={<CodingInterview />}
                />

                <Route
                    path="/coding-setup"
                    element={<CodingSetup />}
                />
				<Route
				    path="/company-preparation"
				    element={<CodingInterview />}
				 />

                <Route
                    path="/interview-result"
                    element={<InterviewResult />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;