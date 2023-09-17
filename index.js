const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = require("./module/replaceTemplate");

// template
let templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);

const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

// data
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObJs = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview Page
  if ((pathname === "/") | (pathname === "/overview")) {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObJs
      .map((el) => replaceTemplate(templateCard, el))
      .join(" ");

    templateOverview = templateOverview.replaceAll(
      "{%PRODUCT_CARDS%}",
      cardsHtml
    );
    res.end(templateOverview);

    // Product Page
  } else if (pathname === "/product") {
    const product = dataObJs.find((data) => data.id == query.id);
    const cardPage = replaceTemplate(templateProduct, product);
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(cardPage);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // Not Found
  } else {
    res.writeHead(404, {
      "Content-type": "text-html",
    });
    res.end("<h2>Page Not Found!</h2>");
  }
  console.log(req.url);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server has started");
});
