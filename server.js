const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");


app.listen(3000, () => console.log('Server started at port : 3000'));
