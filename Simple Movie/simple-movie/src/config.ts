export const fetcher = async (
    input: RequestInfo,
    init: RequestInit,
    ...args: any[]
) => {
    const res = await fetch(input, init);
    return res.json();
};

export const api_key = "5dff3c69041fc89761d96386def5dfd3";

export const API = {
    baseUrl: "https://api.themoviedb.org/3",
    imageUrl: "https://image.tmdb.org/t/p/original",
    getMovies: (
        type: string = "popular",
        page: number = 1,
        query: string = ""
    ) =>
        `${API.baseUrl}/movie/${type}?api_key=${api_key}&page=${page}&query=${query}`,
    getGenres: () => `${API.baseUrl}/genre/movie/list?api_key=${api_key}`,
    getMovieCredits: (id: number = -1) =>
        `${API.baseUrl}/movie/${id}/credits?api_key=${api_key}`,
    getMovieSimilar: (id: number = -1) =>
        `${API.baseUrl}/movie/${id}/similar?api_key=${api_key}`,
    getImage: (path: string) => `${API.imageUrl}/${path}`,
    getMovieDetails: (id: number = -1) =>
        `${API.baseUrl}/movie/${id}?api_key=${api_key}`,
    getMovieVideos: (id: number = -1) =>
        `${API.baseUrl}/movie/${id}/videos?api_key=${api_key}`,
};
