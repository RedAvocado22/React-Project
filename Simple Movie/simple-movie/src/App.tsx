import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./components/layout/Main";
import Home from "./pages/Home";
import Banner from "./components/banner/Banner";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Main></Main>}>
                    <>
                        <Route
                            path="/"
                            element={
                                <>
                                    <Banner></Banner>
                                    <Home></Home>
                                </>
                            }
                        ></Route>
                    </>
                    <Route path="*" element={<div>404 Not Found</div>}></Route>
                    <Route path="/movies" element={<Movies></Movies>}></Route>
                    <Route
                        path="/movies/:movieId"
                        element={<MovieDetails></MovieDetails>}
                    ></Route>
                </Route>
            </Routes>
        </>
    );
}
