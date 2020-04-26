// File system module
const FS = require('fs');
// Http module
const HTTP = require('http');
// Url analyzer
const URL = require('url');
// HTML producer
const PRODUCE_HTML = require('./modules/produceHtml');

// Read api data synchronously
const API_DATA = FS.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const API_DATA_OBJ = JSON.parse(API_DATA); // Parse API data to JavaScript Object
// Overview template
const OVERVIEW_TEMPLATE = FS.readFileSync(
  `${__dirname}/templates/overview-template.html`,
  'utf8'
);
// Card Template
const CARD_TEMPLATE = FS.readFileSync(
  `${__dirname}/templates/card-template.html`,
  'utf8'
);
// Product Template
const PRODUCT_TEMPLATE = FS.readFileSync(
  `${__dirname}/templates/product-template.html`,
  'utf8'
);

// Create local http server with routing
const SERVER = HTTP.createServer((req, res) => {
  // Create the URL query and pathname query parser to object.
  const { query, pathname } = URL.parse(req.url, true);

  // Routing
  if (pathname === '/' || pathname === '/overview') {
    // Overview page
    res.writeHead(200, { 'Content-Type': 'text/html' });
    // Loop through data object and insert data by mapping and returning a joined string
    const CARDS_HTML = API_DATA_OBJ.map((product) =>
      PRODUCE_HTML(CARD_TEMPLATE, product)
    ).join('');
    // Replace the cards' placeholder with CARDS_HTML string
    const OVERVIEW_HTML = OVERVIEW_TEMPLATE.replace(
      /{%PRODUCT_CARDS%}/,
      CARDS_HTML
    );
    // return Overview html
    res.end(OVERVIEW_HTML);
    //
  } else if (pathname === '/product') {
    // Product Page
    res.writeHead(200, { 'Content-Type': 'text/html' });
    // produce html
    const PRODUCT_HTML = PRODUCE_HTML(
      PRODUCT_TEMPLATE,
      API_DATA_OBJ[Number(query.id)]
    );
    // return html
    res.end(PRODUCT_HTML);
    //
  } else if (pathname === '/api') {
    // Api page
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(API_DATA);
    //
  } else {
    // Not found page
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>Page not found</h1>');
  }
});

// Listen for requests
SERVER.listen(5000, '127.0.0.1', () => {
  console.log('litsening...');
});
