const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { postsRouter } = require("./routers/posts");
app.use("/", postsRouter);

app.listen(8080, () => {
    console.log("API running at 8080...");
});
