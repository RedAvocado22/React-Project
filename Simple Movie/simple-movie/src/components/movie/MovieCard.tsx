import { useNavigate } from "react-router-dom";
import { Movie } from "../../types/Movie";

interface MovieCardProps {
    item: Movie;
}

const MovieCard = ({ item }: MovieCardProps) => {
    const navigate = useNavigate();

    return (
        <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
            <img
                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                alt={item.title}
                className="w-full h-[300px] object-cover rounded-lg mb-3"
            />
            <div className="flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-3 h-14 line-clamp-2 overflow-hidden">
                    <a href={`/movies/${item.id}`}>{item.title}</a>
                </h3>
                <div className="flex items-center justify-between opacity-50 text-sm mb-5">
                    <span>{new Date(item.release_date).getFullYear()}</span>
                    <span>{item.vote_average}</span>
                </div>
                <button
                    className="py-3 px-6 rounded-lg capitalize bg-primary w-full mt-auto cursor-pointer"
                    onClick={() => navigate(`/movies/${item.id}`)}
                >
                    Watch now
                </button>
            </div>
        </div>
    );
};

export default MovieCard;
