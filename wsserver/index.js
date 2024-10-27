const express = require("express");
const app = express();

require("express-ws")(app);

const cors = require("cors");
app.use(cors());

const clients = [];

app.ws("/chat", (ws, req) => {
	clients.push(ws);
	ws.on("message", msg => {
		clients.map(wsc => {
			wsc.send(msg);
		});
	});
});

app.listen(3200, () => {
	console.log("Chat WS server running at 3200");
});
