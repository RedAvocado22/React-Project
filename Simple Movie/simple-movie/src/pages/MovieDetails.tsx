import { useParams } from "react-router-dom";
import useSWR from "swr";
import { api_key, fetcher } from "../config";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../components/movie/MovieCard";
import { Genre, Movie } from "../types/Movie";

interface Cast {
    id: number;
    character: string;
    department: string;
    job: string;
    name: string;
    profile_path: string;
    popularity: number;
}

const MovieDetails = () => {
    const { movieId } = useParams();

    const { data, error, isLoading } = useSWR(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`,
        fetcher
    );

    const { data: videoData } = useSWR(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${api_key}`,
        fetcher
    );

    return (
        <>
            <div className="w-full h-[650px] relative">
                <div className="absolute inset-0 bg-black opacity-70"></div>
                <div
                    className="w-full h-full bg-cover bg-no-repeat bg-center"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original/${data?.backdrop_path})`,
                    }}
                ></div>
            </div>
            <div className="w-full mx-auto h-[500px] max-w-[800px] -mt-[200px] relative z-10 pb-10">
                <iframe
                    width="864"
                    height="486"
                    src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full object-fill"
                ></iframe>
            </div>
            <h1 className="text-center text-3xl font-bold text-white mb-10">
                {data?.title}
            </h1>
            <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10 text-white">
                {data?.overview}
            </p>
            {data?.genres.length > 0 && (
                <div className="flex items-center justify-center gap-x-5 mb-10">
                    {data?.genres.map((item: Genre) => (
                        <span
                            className="py-2 px-4 border-primary text-primary border rounded"
                            key={item.id}
                        >
                            {item.name}
                        </span>
                    ))}
                </div>
            )}
            <div className="page-container">
                <MovieCredits></MovieCredits>
                <MovieSimilar></MovieSimilar>
            </div>
        </>
    );
};

function MovieCredits() {
    const { movieId } = useParams();
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}`,
        fetcher
    );
    if (!data?.cast || data?.cast.length <= 0) return null;
    if (!data?.crew || data?.crew.length <= 0) return null;

    console.log(data);

    return (
        <div className="py-10 text-white">
            <h2 className="text-center text-3xl mb-10">Stars</h2>
            <div className="grid grid-cols-4 gap-5">
                {data?.cast
                    .sort((a: Cast, b: Cast) => b.popularity - a.popularity)
                    .slice(0, 4)
                    .map((item: Cast) => (
                        <div className="cast-item" key={item.id}>
                            <img
                                src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
                                className="w-full h-[350px] object-cover rounded-lg mb-3"
                                alt=""
                            />
                            <h3 className="text-xl font-medium">{item.name}</h3>
                        </div>
                    ))}
            </div>
            <h2 className="text-center text-3xl mb-10 mt-10">Creators</h2>
            <div className="grid grid-cols-4 gap-5">
                {data?.crew
                    .filter((item: Cast) => item.job === "Producer")
                    .slice(0, 4)
                    .map((item: Cast) => (
                        <div className="cast-item" key={item.id}>
                            <img
                                src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
                                className="w-full h-[350px] object-cover rounded-lg mb-3"
                                alt=""
                            />
                            <h3 className="text-xl font-medium">{item.name}</h3>
                        </div>
                    ))}
            </div>
        </div>
    );
}

function MovieSimilar() {
    const { movieId } = useParams();
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${api_key}`,
        fetcher
    );
    console.log(data);

    if (!data) return null;
    const { results } = data;
    if (!results || results.length <= 0) return null;
    return (
        <div className="py-10 text-white">
            <h2 className="text-3xl font-medium mb-10">Similar movies</h2>
            <div className="movie-list">
                <Swiper grabCursor={true} spaceBetween={40} slidesPerView={4}>
                    {results.length > 0 &&
                        results.map((item: Movie) => (
                            <SwiperSlide key={item.id}>
                                <MovieCard item={item}></MovieCard>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </div>
    );
}

export default MovieDetails;
