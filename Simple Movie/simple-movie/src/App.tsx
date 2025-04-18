import "./App.css";
import Banner from "./components/banner/Banner";
import MovieList from "./components/movie/MovieList";

export default function App() {
    return (
        <>
            <header className="header flex items-center justify-center gap-x-5 text-white py-10 mb-10">
                <span className="text-primary">Home</span>
                <span>Movies</span>
            </header>

            <Banner></Banner>

            <section className="movies-layout page-container mb-20">
                <h2 className="capitalize text-white mb-5 text-3xl font-bold">
                    Now playing
                </h2>
                <MovieList></MovieList>
            </section>

            <section className="movies-layout page-container mb-20">
                <h2 className="capitalize text-white mb-5 text-3xl font-bold">
                    Top rated
                </h2>
                <MovieList type="top_rated"></MovieList>
            </section>

            <section className="movies-layout page-container mb-20">
                <h2 className="capitalize text-white mb-5 text-3xl font-bold">
                    Trending
                </h2>
                <MovieList type="popular"></MovieList>
            </section>
        </>
    );
}
