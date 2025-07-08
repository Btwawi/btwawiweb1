export function truncateText(text: string | undefined, maxLength = 30): string {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export function truncateHtml(html: string, length = 50) {
  const text = html.replace(/<[^>]*>/g, "");
  return text.length > length ? text.substr(0, length) + "..." : text;
}
