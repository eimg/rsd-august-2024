export default function Movie({ params }: { params: { id: string } }) {
	return (
		<div>
			<h2 className="text-lg font-bold">Movie {params.id}</h2>
		</div>
	);
}
