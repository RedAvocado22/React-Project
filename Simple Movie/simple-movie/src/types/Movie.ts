export interface Movie {
    id: number;
    adult: boolean;
    poster_path: string;
    backdrop_path: string;
    genre_ids: number[];
    overview: string;
    title: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
}

export interface Genre {
    id: number;
    name: string;
}
