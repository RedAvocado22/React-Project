import React, { useState } from "react";
import { fetcher } from "../../fetcher";
import useSWR from "swr";
import { Movie, Genre } from "../../types/Movie";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface BannerItemProps {
    item: Movie;
    genres: Genre[];
}

const Banner = () => {
    const { data: movieList } = useSWR(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=5dff3c69041fc89761d96386def5dfd3",
        fetcher
    );

    const { data: genreList } = useSWR(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=5dff3c69041fc89761d96386def5dfd3",
        fetcher
    );

    const movies = movieList?.results || [];
    const genres = genreList?.genres || [];
    // console.log(movies);

    return (
        <section className="banner page-container h-[650px] mb-20">
            <Swiper grabCursor={true} slidesPerView={"auto"}>
                {movies.length > 0 &&
                    movies.map((item: Movie) => (
                        <SwiperSlide key={item.id}>
                            <BannerItem
                                item={item}
                                genres={genres}
                            ></BannerItem>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </section>
    );
};

function BannerItem({ item, genres }: BannerItemProps) {
    return (
        <div className="w-full h-full rounded-lg relative">
            <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgb(0,0,0,0.5)] to-[rgb(0,0,0,0.5)] rounded-lg"></div>
            <img
                src={`https://image.tmdb.org/t/p/w1280/${item.backdrop_path}`}
                alt=""
                className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute left-5 bottom-5 w-full text-white">
                <h2 className="text-3xl font-bold mb-3">{item.title}</h2>
                <div className="flex items-center gap-x-3 mb-8">
                    {item.genre_ids.map((id) => {
                        const genre = genres?.find((g) => g.id === id);
                        return genre ? (
                            <span
                                key={genre.id}
                                className="p-4 border border-white rounded-md"
                            >
                                {genre.name}
                            </span>
                        ) : null;
                    })}
                </div>
                <button className="py-3 px-6 rounded-lg bg-primary text-white font-medium">
                    Watch now
                </button>
            </div>
        </div>
    );
}
export default Banner;
