import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";

function bigFn() {
	console.log("Running big func");
	return "big func";
}

export default function App() {
	const [count, setCount] = useState(0);

	const val = useMemo(() => {
		return bigFn();
	}, []);

	return (
		<div>
			<h1>
				Count - {count} & {val}
			</h1>
			<button onClick={() => setCount(count + 1)}>Increase</button>
		</div>
	);
}
