import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import Register from "./pages/Register";

function App() {
    return (
        <>
            <AuthProvider>
                <Routes>
                    <Route
                        path="/register"
                        element={<Register></Register>}
                    ></Route>
                </Routes>
            </AuthProvider>
        </>
    );
}

export default App;
