export const JWT_CONFIG = {
  clientId: import.meta.env.VUE_APP_CLIENT_ID,
  secret: import.meta.env.VUE_APP_SHARED_SECRET, // Note: This should not be exposed client-side
  algorithm: 'HS256',
  expiry: 300, // 5 minutes in seconds
  issuer: 'YOUR_PLATFORM_NAME'
};

/**
 * Fetches a game token from the server
 * @param {object} user - User data object
 * @returns {Promise<string>} Signed JWT token
 */
export const generateGameToken = async (user) => {
  const response = await fetch('/api/game/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user })
  });
  if (!response.ok) throw new Error('Failed to generate token');
  const { token } = await response.json();
  return token;
};

/**
 * Decodes and validates a JWT token (client-side validation)
 * @param {string} token - JWT token to validate
 * @returns {object} Decoded token payload
 */
export const validateGameToken = (token) => {
  // Note: Full validation should be server-side; this is basic decoding
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

  return JSON.parse(jsonPayload);
};