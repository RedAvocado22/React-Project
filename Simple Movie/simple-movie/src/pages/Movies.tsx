import MovieCard from "../components/movie/MovieCard";
import { Movie } from "../types/Movie";
import { api_key, fetcher } from "../config";
import useSWR from "swr";
import { useState } from "react";

const Movies = () => {
    const [filter, setFilter] = useState("");
    const [url, setUrl] = useState(
        `https://api.themoviedb.org/3/movie/popular?api_key=5dff3c69041fc89761d96386def5dfd3&page=1`
    );

    const { data, isLoading } = useSWR(url, fetcher);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
        if (e.target.value) {
            setUrl(
                `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${e.target.value}&page=1`
            );
        } else {
            setUrl(
                `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=1`
            );
        }
    };

    const handlePageChange = (page: number) => {
        if (filter) {
            setUrl(
                `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${filter}&page=${page}`
            );
        } else {
            setUrl(
                `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=${page}`
            );
        }
    };

    const movies = data?.results || [];

    return (
        <div className="py-10 page-container">
            <div className="flex mb-5">
                <div className="flex-1">
                    <input
                        type="text"
                        className="w-full p-4 bg-slate-800 text-white outline-none"
                        placeholder="Type here to search"
                        onChange={(e) => {
                            setFilter(e.target.value);
                            const timeoutId = setTimeout(() => {
                                handleFilterChange(e);
                            }, 1000);
                            return () => clearTimeout(timeoutId);
                        }}
                        value={filter}
                    />
                </div>
            </div>
            <div className="grid grid-cols-4 gap-10">
                {movies.length > 0 &&
                    movies.map((item: Movie) => (
                        <MovieCard key={item.id} item={item}></MovieCard>
                    ))}
            </div>
            <div className="w-full text-center mt-10 flex gap-2 justify-center align-center">
                {Array(10)
                    .fill(0)
                    .map((_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-4 py-2 ${
                                url.includes(`page=${i + 1}`)
                                    ? "bg-primary"
                                    : "bg-slate-800"
                            } text-white rounded-lg`}
                        >
                            {i + 1}
                        </button>
                    ))}
            </div>
        </div>
    );
};

export default Movies;
