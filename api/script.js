const jwt = require("jsonwebtoken");
const secret = "3roijslksd8";

const user = { name: 'Bob', age: 22 };

// const token = jwt.sign(user, secret);
// console.log(token);

const result = jwt.verify(
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQm9iIiwiYWdlIjoyMiwiaWF0IjoxNzI3NjAxNzIxfQ.73TemZ3HcV9HOpaVcrsgJ3LN7BRkr0jwDzKRTwDoe3E", secret
);

console.log(result);
