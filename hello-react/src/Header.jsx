export default function Header({ showForm, setShowForm }) {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}>
			<h1>Hello React</h1>
			<button
				style={{
					width: 32,
					border: "0 none",
					backgroundColor: showForm ? "red" : "green",
				}}
				onClick={() => setShowForm(!showForm)}>
				{showForm ? "-" : "+"}
			</button>
		</div>
	);
}
