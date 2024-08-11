const styles = {
    display: "flex",
    justifyContent: "space-between",
    padding: 20,
    borderBottom: "1px solid #ddd",
}

export default function Item({ item, remove }) {
	return <li style={styles}>
        {item.content}
        <button onClick={() => remove(item.id)}>Del</button>
    </li>;
}
