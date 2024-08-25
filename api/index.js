const express = require("express");
const app = express();

app.get("/contents", function(req, res) {
    res.json({ msg: 'API Content' });
});

app.get("/contents/:id", function(req, res) {
    const { id } = req.params;
    res.json({ msg: `Contents Single ${id}` });
});

app.listen(8080, () => {
    console.log("API running at 8080...");
});
