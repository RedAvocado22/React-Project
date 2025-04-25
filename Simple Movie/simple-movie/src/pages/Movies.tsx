import MovieCard from "../components/movie/MovieCard";
import { Movie } from "../types/Movie";
import { api_key, fetcher } from "../config";
import useSWR from "swr";
import { useState } from "react";
import ReactPaginate from "react-paginate";

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
            {isLoading && (
                <div className="w-10 h-10 rounded-full border-4 border-t-4 border-primary animate-spin border-t-transparent mx-auto"></div>
            )}
            <div className="grid grid-cols-4 gap-10">
                {movies.length > 0 &&
                    movies.map((item: Movie) => (
                        <MovieCard key={item.id} item={item}></MovieCard>
                    ))}
            </div>
            <div className="mt-10"></div>
            <div className="text-white">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={
                        data?.total_pages > 500 ? 500 : data?.total_pages || 10
                    }
                    pageRangeDisplayed={5}
                    onPageChange={({ selected }) =>
                        handlePageChange(selected + 1)
                    }
                    containerClassName={
                        "flex gap-2 justify-center items-center"
                    }
                    previousClassName={
                        "px-4 py-2 bg-slate-800 text-white rounded-lg cursor-pointer"
                    }
                    nextClassName={
                        "px-4 py-2 bg-slate-800 text-white rounded-lg"
                    }
                    pageClassName={
                        "px-4 py-2 bg-slate-800 text-white rounded-lg"
                    }
                    activeClassName={"!bg-primary"}
                    disabledClassName={"opacity-50 cursor-not-allowed"}
                />
            </div>
        </div>
    );
};

export default Movies;
