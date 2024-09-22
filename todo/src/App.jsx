import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add, del, toggle } from "./todoSlice";

export default function App() {
    const nameRef = useRef();

    const items = useSelector(state => state.todo.items.filter(item => !item.done)); 
    const done = useSelector(state => state.todo.items.filter(item => item.done)); 

    const disatch = useDispatch();

    return (
		<div>
			<h1>Redux Todo ({items.length})</h1>

			<form
				onSubmit={e => {
					e.preventDefault();
					disatch(add(nameRef.current.value));
					e.currentTarget.reset();
				}}>
				<input ref={nameRef} />
				<button>Add</button>
			</form>

			<ul>
				{items.map(item => {
					return (
						<li key={item.id}>
							<a
								href="#"
								onClick={() => {
									disatch(del(item.id));
								}}>
								Del
							</a>
							<a
								href="#"
								onClick={() => {
									disatch(toggle(item.id));
								}}>
								Check
							</a>
							{item.name}
						</li>
					);
				})}
			</ul>

			<ul>
				{done.map(item => {
					return (
						<li key={item.id}>
							<a
								href="#"
								onClick={() => {
									disatch(del(item.id));
								}}>
								Del
							</a>
							<a
								href="#"
								onClick={() => {
									disatch(toggle(item.id));
								}}>
								Undo
							</a>
							<s>{item.name}</s>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
