import Movie from "@/components/movie";

interface Movie {
    id: number;
	title: string;
	release_date: string;
    poster_path: string;
}

async function fetchPopular(): Promise<Movie[]> {
	const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
		headers: {
			Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
		},
	});

	const data = await res.json();
	return data.results;
}

async function fetchTrending(): Promise<Movie[]> {
	const res = await fetch("https://api.themoviedb.org/3/trending/movie/day", {
		headers: {
			Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
		},
	});

    const data = await res.json();
	return data.results
}

export default async function Home() {
	const trending = await fetchTrending();
    const popular = await fetchPopular();

	return (
		<div>
			<h2 className="text-lg font-bold pb-2 mb-4 border-b">Trending</h2>
			<div className="flex gap-4 flex-wrap justify-evenly">
				{trending.map(movie => {
					return <Movie movie={movie} />;
				})}
			</div>

			<h2 className="text-lg font-bold pb-2 mb-4 border-b mt-4">Popular</h2>
			<div className="flex gap-4 flex-wrap justify-evenly">
				{popular.map(movie => {
					return <Movie movie={movie} />;
				})}
			</div>
		</div>
	);
}
