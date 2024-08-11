function Element(props) {
	return <p>{props.content}</p>;
}

ReactDOM.render(
	<Element content="React with Babel + Webpack Dev Server" />,
	document.getElementById("app")
);
