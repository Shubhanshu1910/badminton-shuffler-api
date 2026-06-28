export const Messages = {
  SUCCESS: {
    CREATED: 'Resource created successfully.',
    UPDATED: 'Resource updated successfully.',
    DELETED: 'Resource deleted successfully.',
    FETCHED: 'Data fetched successfully.',
  },

  ERROR: {
    NOT_FOUND: 'Resource not found.',
    INTERNAL_SERVER_ERROR: 'Internal server error.',
    BAD_REQUEST: 'Invalid request.',
    UNAUTHORIZED: 'Unauthorized.',
    FORBIDDEN: 'Forbidden.',
    CONFLICT: 'Resource already exists.',
  },

  PLAYER: {
    CREATED: 'Player created successfully.',
    UPDATED: 'Player updated successfully.',
    DELETED: 'Player deleted successfully.',
    FETCHED: 'Player fetched successfully.',
    LIST_FETCHED: 'Players fetched successfully.',
  },

  SESSION: {
    CREATED: 'Session created successfully.',
    UPDATED: 'Session updated successfully.',
    DELETED: 'Session deleted successfully.',
  },

  HEALTH: {
    CHECK: 'Health check successful.',
  },
} as const;