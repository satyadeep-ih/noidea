// Simple Node.js HTTP Server
const http = require('http');

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  // Set response headers
  res.writeHead(200, { 'Content-Type': 'text/html' });
  
  // Handle different routes
  if (req.url === '/') {
    res.end(`
      <html>
        <head>
          <title>Simple Node.js Server</title>
        </head>
        <body>
          <h1>Welcome to my Simple Node.js Server!</h1>
          <p>This is a basic example of a Node.js HTTP server.</p>
          <p>Try visiting <a href="/about">/about</a> or <a href="/api">/api</a></p>
        </body>
      </html>
    `);
  } else if (req.url === '/about') {
    res.end(`
      <html>
        <head>
          <title>About</title>
        </head>
        <body>
          <h1>About Page</h1>
          <p>This is the about page of our simple Node.js server.</p>
          <a href="/">Go back home</a>
        </body>
      </html>
    `);
  } else if (req.url === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Hello from the API!',
      timestamp: new Date().toISOString(),
      status: 'success'
    }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <head>
          <title>404 - Not Found</title>
        </head>
        <body>
          <h1>404 - Page Not Found</h1>
          <p>The page you're looking for doesn't exist.</p>
          <a href="/">Go back home</a>
        </body>
      </html>
    `);
  }
});

// Set the port (use environment variable or default to 3000)
const PORT = process.env.PORT || 3000;

// Start the server
server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down server...');
  server.close(() => {
    console.log('Server closed successfully');
    process.exit(0);
  });
});
