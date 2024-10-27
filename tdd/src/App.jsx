import { useRef, useState } from "react";
import { convert } from "../libs/fx";

export default function App() {
	const inputRef = useRef();
	const [result, setResult] = useState(0);
	return (
		<div>
			<h1 role="title">App</h1>
			<form
				onSubmit={e => {
					e.preventDefault();
					const value = inputRef.current.value;
					setResult(convert(value));
					e.currentTarget.reset();
				}}>
				<input
					type="text"
					role="input"
					ref={inputRef}
				/>
				<button role="button">Button</button>
			</form>
			<div role="result">{result}</div>
		</div>
	);
}
