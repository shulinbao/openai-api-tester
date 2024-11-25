# openai-api-tester

[中文](https://github.com/shulinbao/openai-api-tester)

A testing tool for OpenAI-format APIs that can be deployed on Cloudflare Workers.  

Currently, it supports the following features:  
- Testing multiple API endpoints by configuring the `API_ENDPOINTS` environment variable.  
- Customizing API keys using the `AUTHORIZATION` environment variable.  
- Returning error response details when failures occur.  
- Automatically reporting errors if the request exceeds a 10-second timeout.  

Due to the limitations of [one-api](https://github.com/songquanpeng/one-api) and similar API management systems, which can only measure response times but not diagnose specific channel issues, this tool aims to address these pain points at minimal cost.

---

## Deployment Guide
1. Go to the `Workers & Pages` section in your Cloudflare dashboard and create a new Worker.  
2. Enter a name for the Worker and click `Deploy`.  
3. Open the Worker settings, click the `Edit Code` button in the upper-right corner, and replace the default content with the `worker.js` file from this project. Click `Deploy` to save your changes.  
4. Return to the Worker settings, select the `Settings` tab, and find the `Variables and Secrets` section. Configure the environment variables as described below, then click `Deploy` to save your changes.  
5. Visit the Worker’s URL and click `Start Testing` to begin testing.

---

## Environment Variables
| Variable        | Value             | Type      | Description                                                                                   |
|------------------|-------------------|-----------|-----------------------------------------------------------------------------------------------|
| API_ENDPOINTS    | API server URLs   | Type      | Do not include the `/v1` or subsequent parts of the URL. Use commas to separate multiple endpoints, e.g., `api.1.com,api.2.com,api.3.com`. |
| AUTHORIZATION    | API key           | Secret    | Example: `sk-xxxxxxxx`.                                                                      |

---

## FAQ
### My different API servers use different keys. How can I set them up?
Currently, this is not supported. Please wait for future updates.

### The API works correctly, but the test results return `Unexpected token 'e', "error code: 1042" is not valid JSON`. What’s going on?
Your API may be running on a Cloudflare Worker. Cloudflare does not allow API Workers and this project to run under the same account. Consider creating a secondary account.
