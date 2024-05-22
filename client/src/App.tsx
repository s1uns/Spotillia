import "./App.css";
import { Header } from "./layout/Header/Header";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Suspense, lazy, useState } from "react";
import "./styles/volume.css";

import Footer from "./components/Footer/Footer";
import Home from "./layout/Home/Home";

const Login = lazy(
    () => import(/* webpackChunkName: "Login" */ "./layout/Auth/Login"),
);

const Register = lazy(
    () => import(/* webpackChunkName: "Register" */ "./layout/Auth/Register"),
);

const NotFound = lazy(
    () =>
        import(/* webpackChunkName: "NotFound" */ "./layout/NotFound/NotFound"),
);

function App() {
    const user = localStorage.getItem("userId");
    const [isLogged, setIsLogged] = useState<boolean>(user?.length! > 0);
    const [currentPage, setCurrentPage] = useState<string>("Home");
    const [selectedHowl, setSelectedHowl] = useState(null);
    const [playing, setPlaying] = useState(false);

    return (
        <>
            <Header
                isLogged={isLogged}
                setIsLogged={setIsLogged}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <ToastContainer className="toast" />
            <Routes>
                <Route path="/" element={<Home playing={playing} setPlaying={setPlaying} selectedHowl={selectedHowl} setSelectedHowl={setSelectedHowl} />} />
                <Route
                    path="/login"
                    element={
                        <Suspense>
                            <Login
                                setIsLogged={setIsLogged}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </Suspense>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <Suspense>
                            <Register
                                setIsLogged={setIsLogged}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </Suspense>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer
                playing={playing}
                setPlaying={setPlaying}
                selectedHowl={selectedHowl}
            />
        </>
    );
}

export default App;
