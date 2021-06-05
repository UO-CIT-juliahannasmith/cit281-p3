/*
    CIT 281 Project 3
    Name: Julia Smith
*/

const fs = require("fs");
const fastify = require("fastify")();
const { coinCount } = require("./p3-module.js");

fastify.get("/", (request, reply) => {
  fs.readFile(`${__dirname}/index.html`, (err, data) => {
    if (err) {
      console.log(err);
      reply
        .code(500)
        .header("Content-Type", "text/html; charset=utf-8")
        .send("Error processing request");
    } else {
      console.log("URL:", request.url);
      reply
        .code(200)
        .header("Content-Type", "text/html; charset=utf-8")
        .send(data);
    }
  });
});

fastify.get("/coin", (request, reply) => {
  let { denom = 0, count = 0 } = request.query;
  denom = parseInt(denom);
  count = parseInt(count);

  let coinValue = coinCount({ denom: denom, count: count });

  reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(
      `<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`
    );
});

fastify.get("/coins", (request, reply) => {
  let { option = 0 } = request.query;
  option = parseFloat(option);
  let coinValue = "";

  const coins = [
    { denom: 25, count: 2 },
    { denom: 1, count: 7 },
  ];

  //Tried it with an if statement first
  /*if (option == 1) {
    coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
  } else if (option == 2) {
    coinValue = coinCount(...coins);
  } else {
    coinValue = 0;
  }
    */
    switch (option) {
        case 0:
            coinValue = 0;
            break;
        case 1:
            coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
            break;
        case 2:
            coinValue = coinCount(...coins);
            break;
    }

  reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(
      `<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`
    );
});

// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;

fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
