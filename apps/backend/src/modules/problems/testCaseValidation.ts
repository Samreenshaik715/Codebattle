export function isLikelyHumanReadableFormat(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) {
    return false;
  }

  // Common human-readable test input formats like "nums = [1,2,3], target = 9"
  const assignmentPattern = /^[A-Za-z_][A-Za-z0-9_]*\s*=\s*.+$/u;
  if (assignmentPattern.test(trimmed)) {
    return true;
  }

  // Multi-field assignments separated by commas or semicolons.
  const humanReadableFieldPattern = /[A-Za-z_][A-Za-z0-9_]*\s*=\s*[^,;]+/u;
  if (humanReadableFieldPattern.test(trimmed) && /[,;\[\]{}]/u.test(trimmed)) {
    return true;
  }

  return false;
}
