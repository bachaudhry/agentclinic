/**
 * Extract initials from a name (first letter of each word, max 2).
 */
export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Build a sanitized CSS class for a status badge.
 * Strips non-alphanumeric characters to prevent class injection.
 */
export function statusClass(status: string | null): string {
  if (!status) return "";
  const sanitized = status.replace(/[^a-z0-9-]/gi, "");
  return sanitized ? `status-${sanitized}` : "";
}

/**
 * Validate that a route param is a positive integer.
 * Returns the integer or null if invalid.
 */
export function parsePositiveInt(value: string): number | null {
  if (!/^\d+$/.test(value)) return null;
  const n = parseInt(value, 10);
  return n > 0 ? n : null;
}
