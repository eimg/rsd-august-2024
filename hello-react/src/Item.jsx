import { useAppContext } from "./ThemedApp";

const styles = {
    display: "flex",
    justifyContent: "space-between",
    padding: 20,
    borderBottom: "1px solid transparent",
}

export default function Item({ item, remove }) {
    const { mode } = useAppContext();

	return <li style={{ ...styles, borderColor: mode == "dark" ? "#555" : "#ccc" }}>
        {item.content}
        <button onClick={() => remove(item.id)}>Del</button>
    </li>;
}
