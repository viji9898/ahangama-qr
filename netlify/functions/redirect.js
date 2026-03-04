// netlify/functions/redirect.js

exports.handler = async (event) => {
  const BASE_URL = "https://ahangama.com";

  try {
    const rawPath = (event.path || "/").trim();
    const segments = rawPath.split("/").filter(Boolean);

    // Helper to extract structured segments
    const readKV = (key) => {
      const index = segments.indexOf(key);
      return index >= 0 && segments[index + 1] ? segments[index + 1] : null;
    };

    // Extract structured parameters
    const goal = readKV("g") || "h"; // default home
    const venue = readKV("v") || "qr-root";
    const surface = readKV("s");
    const creative = readKV("c");

    // Build utm_content
    const contentParts = [venue];
    if (surface) contentParts.push(surface);
    if (creative) contentParts.push(creative);

    const utmParams = new URLSearchParams({
      utm_source: "qr",
      utm_medium: "offline",
      utm_campaign: "qr_launch_2026",
      utm_content: contentParts.join("__"),
      utm_term: goal,
    });

    // Preserve non-UTM incoming query params
    const incomingQuery = event.queryStringParameters || {};

    Object.entries(incomingQuery).forEach(([key, value]) => {
      if (!key.toLowerCase().startsWith("utm_") && value != null) {
        utmParams.set(key, value);
      }
    });

    const redirectUrl = `${BASE_URL}/?${utmParams.toString()}`;

    return {
      statusCode: 302,
      headers: {
        Location: redirectUrl,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    };
  } catch (error) {
    console.error("QR Redirect Error:", error);

    return {
      statusCode: 302,
      headers: {
        Location: BASE_URL,
      },
    };
  }
};
