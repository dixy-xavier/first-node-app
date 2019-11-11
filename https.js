process.stdin.resume();
process.stdin.setEncoding('utf-8');

var __input_stdin = "";
var __input_stdin_array = "";
var __input_currentline = 0;

process.stdin.on('data', function (data) {
  __input_stdin += data;
});

const https = require('https');

/*
 * Complete the function below.
 * Use console.log to print the result, you should not return from the function.
 * Base url: https://jsonmock.hackerrank.com/api/movies/search/?Title=
 */

let titles = [];

function request(uri) {
  return new Promise(resolve => {
    https.get(uri, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on("end", () => {
        data = JSON.parse(data);
        resolve(data);
      });
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    }).end();
  });
}

function paginated(url, pageNo) {
  request(`${url}&page=${pageNo}`).then(res => {
    console.log(res);
    if (res.data && res.data.length) {
      titles.push(res.data);
    }
    if (res.page !== res.total_pages) paginated(url, pageNo + 1);
    else titles.sort();
    return titles;
  });
}

function getMovieTitles(substr) {
  const url = 'https://jsonmock.hackerrank.com/api/movies/search/?Title=';
  return  paginated(`${url}${substr}`, 1);
}

process.stdin.on('end', function () {});
