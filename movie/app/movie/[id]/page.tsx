import { Badge } from "@/components/ui/badge";

type Movie = {
	id: number;
	title: string;
	release_date: string;
	backdrop_path: string;
	genres: { name: string }[];
	overview: string;
};

type Cast = {
	id: number;
	name: string;
	character: string;
	profile_path: string;
};

async function fetchCast(id: string | number): Promise<Cast[]> {
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${id}/credits`,
		{
			headers: {
				Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
			},
		}
	);

	const data = await res.json();
	return data.cast;
}

async function fetchMovie(id: string | number): Promise<Movie> {
	const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
		headers: {
			Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
		},
	});

	return await res.json();
}

export default async function Movie({ params }: { params: { id: string } }) {
	const movie = await fetchMovie(params.id);
	const cast = await fetchCast(params.id);

	const images = "http://image.tmdb.org/t/p/w1280";
	const profile = "http://image.tmdb.org/t/p/w185";

	return (
		<div>
			<h2 className="text-lg font-bold pb-2 mb-2 border-b">
				{movie.title}
			</h2>
			<div className="mb-4">
				{movie.genres.map(genre => {
					return <Badge variant="outline">{genre.name}</Badge>;
				})}
			</div>
			<img
				src={images + movie.backdrop_path}
				alt="Backdrop"
			/>
			<div className="mt-4">{movie.overview}</div>

			<h3 className="font-bold text-lg my-4 border-b pb-2">Cast</h3>
			<div className="flex flex-wrap gap-2 justify-evenly">
				{cast.map(person => {
					return (
						<div className="flex flex-col justify-end items-center mb-4">
							{person.profile_path ? (
								<img
									src={profile + person.profile_path}
									alt="Profile"
								/>
							) : (
								<div className="h-[250px]"></div>
							)}
							<h4 className="font-bold">{person.name}</h4>
							<span className="text-gray-500">{person.character}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
