# Exercise 3.5

## Preparation

1. Navigate to `resources/3.5` via `cd resources/3.5`.
2. Install dependencies via `npm i`.
3. Start server via `node server.js`.

## Tasks

1. Navigate to <http://localhost:8080> in your browser.
2. Open console and fetch <http://localhost:8080/data> via 
   ```js
   const response = await fetch('http://localhost:8080/data');
   const text = await response.text();
   console.log(text);
   ```
3. You should see the following message in your console:
   ```
   If you can see this, then there are no CORS issues!
   ```
4. Navigate to <https://google.com> in your browser
and repeat steps 3 and 4.
5. You get an error message related to CORS.
6. Update the code in `server.js` to resolve the issue.