function parseRequestBody (request, response, next) {
  try {
    return new Promise ((resolve, reject) => {
      let chunks = "";
      request.on("data", (chunk) => {
        chunks += chunk.toString();
      });
      request.on("end", () => {
        request.body = JSON.parse(chunks) ? JSON.parse(chunks) : {};
        next();
      });
    });
  } catch (error) {
    response.end(JSON.stringify(error));
  }
}

module.exports = parseRequestBody;