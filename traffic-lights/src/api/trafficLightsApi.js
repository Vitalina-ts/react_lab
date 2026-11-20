const API_URL = import.meta.env.VITE_GAS_WEB_APP_URL?.trim();

function getApiUrl() {
  if (!API_URL) {
    throw new Error(
      "VITE_GAS_WEB_APP_URL is missing. Set it in .env to your deployed GAS /exec URL, then restart Vite.",
    );
  }

  let url;
  try {
    url = new URL(API_URL);
  } catch {
    throw new Error(
      "VITE_GAS_WEB_APP_URL must be a valid Google Apps Script /exec URL.",
    );
  }

  if (
    url.protocol !== "https:" ||
    url.hostname !== "script.google.com" ||
    !/^\/macros\/s\/[^/]+\/exec$/.test(url.pathname) ||
    url.pathname.includes("REPLACE_WITH_DEPLOYMENT_ID") ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "VITE_GAS_WEB_APP_URL must be the real versioned Google Apps Script URL ending in /exec.",
    );
  }

  return url.toString();
}

async function parseEnvelope(response) {
  let payload;

  try {
    payload = await response.json();
  } catch {
    throw new Error("The server returned an invalid JSON response.");
  }

  if (!response.ok) {
    throw new Error(`The server request failed with status ${response.status}.`);
  }

  if (!payload || payload.ok !== true) {
    throw new Error(
      payload?.error?.message || "The server could not complete the request.",
    );
  }

  if (!payload.data || typeof payload.data !== "object") {
    throw new Error("The server returned an invalid response envelope.");
  }

  return payload.data;
}

export async function listTrafficLights() {
  const response = await fetch(`${getApiUrl()}?action=list`);
  const data = await parseEnvelope(response);

  if (!Array.isArray(data.trafficLights)) {
    throw new Error("The server response does not contain a traffic-light list.");
  }

  return data.trafficLights;
}

export async function updateTrafficLightState(id, currentSignal) {
  const response = await fetch(getApiUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      action: "updateState",
      id,
      currentSignal,
    }),
  });
  const data = await parseEnvelope(response);

  if (!data.trafficLight || typeof data.trafficLight !== "object") {
    throw new Error("The server response does not contain the saved traffic light.");
  }

  return data.trafficLight;
}
