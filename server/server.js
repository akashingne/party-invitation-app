const http = require("http");
const app = require("./app");

const port = process.env.PORT || 4000;

const server = http.createServer(app);
// const server = http.createServer((req, res, next) => {
//   res.write("Hello");
//   res.end();
// });

server.listen(port, () => {
  console.log(`Server is running on port number ${port}`);
});
