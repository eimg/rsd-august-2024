import Movie from "@/components/movie";

interface Movie {
	id: number;
	title: string;
	release_date: string;
	poster_path: string;
}

async function fetchMovies(id: number | string): Promise<Movie[]> {
	const res = await fetch(
		`https://api.themoviedb.org/3/discover/movie?with_genres=${id}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
			},
		}
	);

	const data = await res.json();
	return data.results;
}

export default async function Genre({
	params,
}: {
	params: { name: string; id: string };
}) {
    const movies = await fetchMovies(params.id);

	return (
		<div>
			<h2 className="text-lg pb-2 mb-4 border-b">
                <b className="font-bold me-2">Category:</b>
                {params.name}
            </h2>
			<div className="flex gap-4 flex-wrap justify-evenly">
				{movies.map(movie => {
					return <Movie movie={movie} />;
				})}
			</div>
		</div>
	);
}
