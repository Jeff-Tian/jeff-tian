export const escapeSpecialCharacters = s => !s ? '' : s.replace(/`/g, '').replace(/"/g, '').replace(/\\/g, '').replace(/'/g, '')
