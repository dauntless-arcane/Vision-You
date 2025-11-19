// src/utils/parseVisionYou.ts
export function parseVisionYouResponse(response: any) {
  // Accept either an object (already parsed) or string JSON
  try {
    if (!response) {
      return { success: false, error: 'Empty response', raw: response };
    }

    if (typeof response === 'object') {
      return { success: true, data: response };
    }

    // sometimes response is a JSON-string inside another object; try to stringify safely
    const parsed = JSON.parse(response);
    return { success: true, data: parsed };
  } catch (e) {
    console.error('parseVisionYouResponse failed:', e);
    return { success: false, error: 'Failed to parse JSON', raw: response };
  }
}
