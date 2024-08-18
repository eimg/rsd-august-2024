import { useState } from "react"

export default function App() {
    const [ count, setCount ] = useState(0);

    return (
		<div>
			<h1>Count - {count}</h1>
			<button onClick={() => setCount(count + 1)}>Increase</button>
		</div>
	);
}