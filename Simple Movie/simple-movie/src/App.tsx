import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./components/layout/Main";
import { lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const Movies = lazy(() => import("./pages/Movies"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Main></Main>}>
                    <>
                        <Route path="/" element={<Home></Home>}></Route>
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
