import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import { api_key, fetcher } from "../../config";
import { Movie } from "../../types/Movie";
import "swiper/css";

//https://api.themoviedb.org/3/movie/550?api_key=5dff3c69041fc89761d96386def5dfd3

const MovieList = ({ type = "now_playing" }) => {
    const [movies, setMovies] = useState<Movie[]>([]);

    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/${type}?api_key=${api_key}`,
        fetcher
    ); 

    useEffect(() => {
        if (data) {
            setMovies(data.results);
        }
    }, [data]);

    // console.log(data);

    return (
        <div className="movie-list">
            <Swiper
                grabCursor={true}
                spaceBetween={40}
                slidesPerView={4}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
            >
                {movies.length > 0 &&
                    movies.map((item) => (
                        <SwiperSlide key={item.id}>
                            <MovieCard item={item}></MovieCard>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
};

export default MovieList;
