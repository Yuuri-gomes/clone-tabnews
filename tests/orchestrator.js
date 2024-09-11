import retry from 'async-retry';

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      try {
        const response = await fetch("http://localhost:3000/api/v1/status");
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        await response.json();
      } catch (error) {
        throw error;
      }
    }
  }

}

export default {
  waitForAllServices,
}