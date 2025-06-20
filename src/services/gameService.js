import { generateGameToken } from './jwtService';

export const GAME_CONFIG = {
  baseUrl: import.meta.env.VUE_APP_GAME_URL,
  iframeSettings: {
    width: '100%',
    height: '600px',
    allow: 'fullscreen',
    frameBorder: '0'
  }
};

/**
 * Generates iframe HTML with signed JWT
 * @param {object} user - Authenticated user object
 * @returns {string} HTML iframe string
 */
export const getGameIframe = (user) => {
  const token = generateGameToken(user);
  return `
    <iframe
      src="${GAME_CONFIG.baseUrl}?token=${token}"
      width="${GAME_CONFIG.iframeSettings.width}"
      height="${GAME_CONFIG.iframeSettings.height}"
      frameborder="${GAME_CONFIG.iframeSettings.frameBorder}"
      allow="${GAME_CONFIG.iframeSettings.allow}">
    </iframe>
  `;
};

/**
 * Handles game events from postMessage
 */
export const setupGameEventListeners = () => {
  window.addEventListener('message', (event) => {
    // Verify event origin
    if (event.origin !== new URL(GAME_CONFIG.baseUrl).origin) return;

    const { type, data } = parseEventData(event.data);
    
    switch (type) {
      case 'BET_PLACED':
        handleBetPlaced(data);
        break;
      case 'GAME_RESULT':
        handleGameResult(data);
        break;
      case 'BALANCE_UPDATE':
        handleBalanceUpdate(data);
        break;
      default:
        console.log('Unhandled game event:', type);
    }
  });
};

// Helper functions
const parseEventData = (data) => {
  try {
    return JSON.parse(data);
  } catch {
    return { type: 'UNKNOWN', data };
  }
};

const handleBetPlaced = (betData) => {
  console.log('Bet placed:', betData);
  // Implement bet handling logic
};

const handleGameResult = (result) => {
  console.log('Game result:', result);
  // Implement result handling
};

const handleBalanceUpdate = (update) => {
  console.log('Balance update:', update);
  // Update local balance
};