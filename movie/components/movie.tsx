"use client";

import { useRouter } from "next/navigation";

type MovieType = {
    id: number;
	title: string;
	poster_path: string;
	release_date: string;
};

export default function Movie({ movie }: { movie: MovieType }) {
	const images = "http://image.tmdb.org/t/p/w185";
    const router = useRouter();

	return (
		<div className="flex flex-col justify-center text-center mb-2 basis-1/5 hover:scale-105 transition-all cursor-pointer" onClick={() => {
            router.push(`/movie/${movie.id}`);
        }}>
			<img
				src={images + movie.poster_path}
				alt="Poster"
			/>
			<h3>{movie.title}</h3>
			<span className="text-gray-400">
				{movie.release_date.split("-")[0]}
			</span>
		</div>
	);
}
