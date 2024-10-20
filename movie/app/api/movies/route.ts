import type { MovieType } from "@/types/movie";

async function fetchPopular(): Promise<MovieType[]> {
	const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
		headers: {
			Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
		},
	});

	const data = await res.json();
	return data.results;
}

export async function GET(req: Request) {
    const movies = await fetchPopular();

    return Response.json(movies);
}
