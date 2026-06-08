export const createId = (prefix = 'id') => `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
