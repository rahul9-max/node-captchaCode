const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Set up middleware to parse JSON request bodies
app.use(express.json());

// Define a route for solving a Captcha image
app.get('/captcha', async (req, res) => {
  try {
    // Extract the image URL from the request query parameters
    const imageUrl = req.query.imageUrl;

    // Make a GET request to the image URL and convert the response to a binary buffer
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');

    // Send the image buffer as a response with the appropriate content type
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(imageBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server listening on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
