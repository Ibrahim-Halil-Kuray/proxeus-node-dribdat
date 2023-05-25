var express = require("express");
var path = require("path");
var logger = require("morgan");
var { initialize } = require("express-openapi");
var swaggerUi = require("swagger-ui-express");

var app = express();

app.listen(3030);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// OpenAPI routes
initialize({
  app,
  apiDoc: require("./api/api-doc"),
  paths: "./api/paths",
});

// OpenAPI UI
app.use(
  "/api",
  swaggerUi.serve,
  swaggerUi.setup(null, {
    swaggerOptions: {
      url: "http://localhost:3030/api-docs",
    },
  })
);

console.log(
  "OpenAPI documentation: http://localhost:3030/api"
);

module.exports = app;
