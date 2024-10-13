interface Movie {
	title: string;
	release_date: string;
    poster_path: string;
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
	const movies = await fetchTrending();

	const images = "http://image.tmdb.org/t/p/w185";

	return (
		<div>
			<h2 className="text-lg font-bold pb-2 mb-4 border-b">Trending</h2>
			<div className="flex gap-4 flex-wrap justify-around">
				{movies.map(movie => {
					return (
						<div className="w-[185px] text-center mb-2">
							<img
								src={images + movie.poster_path}
								alt=""
							/>
							<h3>{movie.title}</h3>
							<span className="text-gray-400">
								{movie.release_date.split("-")[0]}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
