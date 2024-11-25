export default {
  async fetch(request, env) {
    // Backend logic for testing APIs
    async function testAPI(endpoint, authorization) {
      const url = `https://${endpoint}/v1/chat/completions`;
      const payload = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Say this is a test!" }],
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authorization}`,
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (data.choices && data.choices[0].message.content.includes("is a test!")) {
          return `<p><b>${endpoint}</b>: Test Successful</p>`;
        } else {
          return `<p><b>${endpoint}</b>: Test Failed<br><pre>${JSON.stringify(data, null, 2)}</pre></p>`;
        }
      } catch (error) {
        return `<p><b>${endpoint}</b>: Test Failed<br><pre>${error.message}</pre></p>`;
      }
    }

    // HTML Template with frontend logic
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API Tester</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
          button { padding: 10px 20px; background-color: #007BFF; color: white; border: none; border-radius: 5px; cursor: pointer; }
          button:hover { background-color: #0056b3; }
          .result { margin-top: 20px; }
          .result p { margin: 5px 0; }
          pre { background-color: #f8f9fa; padding: 10px; border: 1px solid #ddd; border-radius: 5px; white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <h1>API Tester</h1>
        <p>Click the button below to test the API endpoints:</p>
        <button id="startTestButton">Start Testing</button>
        <div id="countdown"></div>
        <div id="results" class="result"></div>
        <script>
          document.getElementById('startTestButton').addEventListener('click', async () => {
            const resultsContainer = document.getElementById('results');
            const countdownContainer = document.getElementById('countdown');
            resultsContainer.innerHTML = '<p>Testing in progress...</p>';
            countdownContainer.innerHTML = '';

            const response = await fetch('/run-tests', { method: 'POST' });
            const results = await response.json();
            countdownContainer.innerHTML = '';
            resultsContainer.innerHTML = results.join('');
          });
        </script>
      </body>
      </html>
    `;

    // Backend API endpoint to handle testing
    if (request.url.endsWith("/run-tests")) {
      const endpoints = env.API_ENDPOINTS.split(",");
      const authorization = env.AUTHORIZATION;

      // Run tests on all endpoints
      const testResults = await Promise.all(
        endpoints.map((endpoint) => testAPI(endpoint, authorization))
      );

      return new Response(JSON.stringify(testResults), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Serve the HTML page
    return new Response(html, {
      headers: { "Content-Type": "text/html" },
    });
  },
};
