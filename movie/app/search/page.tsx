import type { MovieType } from "@/types/movie";
import Movie from "@/components/movie";

async function fetchSearch(q: string): Promise<MovieType[]> {
	const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${q}`, {
		headers: {
			Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
		},
	});

	const data = await res.json();
    return data.results;
}

export default async function Search({
	searchParams,
}: {
	searchParams: { q: string };
}) {
    const movies = await fetchSearch(searchParams.q);

	return (
		<div>
			<h2 className="text-2xl font-bold my-4 pb-2 border-b">
				Search: {searchParams.q}
			</h2>
			<div className="flex gap-4 flex-wrap justify-evenly">
				{movies.map(movie => {
					return <Movie movie={movie} />;
				})}
			</div>
		</div>
	);
}
