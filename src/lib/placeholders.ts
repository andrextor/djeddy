const PLACEHOLDER = /\[[A-ZÁÉÍÓÚÑ0-9_ +]+\]/

const collectStrings = (value: unknown, path: string, out: string[]): void => {
  if (typeof value === 'string') {
    if (PLACEHOLDER.test(value)) out.push(`${path}: ${value}`)
    return
  }
  if (Array.isArray(value)) {
    for (const [index, item] of value.entries()) collectStrings(item, `${path}[${index}]`, out)
    return
  }
  if (value !== null && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) collectStrings(child, `${path}.${key}`, out)
  }
}

/** Returns every string that still contains a [PLACEHOLDER] token, with its path. */
export const findPlaceholders = (value: unknown, root = 'site'): string[] => {
  const out: string[] = []
  collectStrings(value, root, out)
  return out
}

/** Fails a release build while the client's real data is missing. */
export const assertNoPlaceholders = (value: unknown, root = 'site'): void => {
  const found = findPlaceholders(value, root)
  if (found.length > 0) {
    throw new Error(
      `Release build blocked: ${found.length} placeholder(s) left.\n${found.join('\n')}`,
    )
  }
}
