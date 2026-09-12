// Passenger / cPanel Node.js entry point - delegates to Next.js
// Setup Node.js App: set Startup File = server.js
// This file is required for some hosting.com Passenger configs that expect a physical file.
// If your Setup Node.js App allows custom startup command "npm start", this file is optional
// but harmless - it simply runs `next start` on the PORT injected by Passenger.
const { createServer } = require('http');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      await handle(req, res);
    } catch (err) {
      console.error('Error handling request', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }).listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`> Touchup ready on http://${hostname}:${port} [${dev ? 'dev' : 'prod'}]`);
  });
});
