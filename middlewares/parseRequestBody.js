function parseRequestBody (request, response) {
  try {
    return new Promise ((resolve, reject) => {
      let chunks = "";
      request.on("data", (chunk) => {
        chunks += chunk.toString();
      });
      request.on("end", () => {
        request.body = JSON.parse(chunks) ? JSON.parse(chunks) : {};
        resolve();
      });
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = parseRequestBody;