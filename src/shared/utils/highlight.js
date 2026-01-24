export const escapeHTML = (unsafeString) => {
  return unsafeString
    .replaceAll(/&/g, "&amp;")
    .replaceAll(/</g, "&lt;")
    .replaceAll(/>/g, "&gt;")
    .replaceAll(/"/g, "&quot;")
    .replaceAll(/'/g, "&#039;");
};

export const escapeRegExp = (unsafeString) => {
  return unsafeString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const highlightCaseInsensitive = (text, searchQuery) => {
  const safeText = escapeHTML(text);
  const queryFormatted = searchQuery.trim();

  if (queryFormatted.length === 0) {
    return safeText;
  }

  const pattern = new RegExp(escapeRegExp(queryFormatted), "ig");

  return safeText.replace(pattern, `<mark>$&</mark>`);
};
