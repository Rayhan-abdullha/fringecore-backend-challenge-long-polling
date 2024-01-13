// challenge.mjs
const subscribers = {};

export async function blockingGet(key) {
  return new Promise((resolve) => {
    // Store the resolve function to respond when new data is available
    subscribers[key] = resolve;

    // Set a timeout of 30 seconds
    const timeoutId = setTimeout(() => {
      // If no data is received within the timeout, respond with null
      resolve(null);
      // Clear the subscriber after responding
      delete subscribers[key];
    }, 30000);
  });
}

export async function push(key, data) {
  // Notify only one subscriber with new data
  if (subscribers[key]) {
    subscribers[key](data);
    // Clear the subscriber after responding
    delete subscribers[key];
  }
}
