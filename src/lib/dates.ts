export interface EventDateParts {
  /** Two-digit day, e.g. "05" */
  day: string
  /** Three-letter uppercase month without trailing period, e.g. "SEP" */
  month: string
  /** ISO date (YYYY-MM-DD) for <time datetime> */
  iso: string
}

const dayFormatter = new Intl.DateTimeFormat('es', { day: '2-digit', timeZone: 'UTC' })
const monthFormatter = new Intl.DateTimeFormat('es', { month: 'short', timeZone: 'UTC' })

/** Dates in events.json are date-only, so they are formatted in UTC to avoid off-by-one days. */
export const formatEventDate = (date: Date): EventDateParts => ({
  day: dayFormatter.format(date),
  month: monthFormatter.format(date).replace('.', '').slice(0, 3).toUpperCase(),
  iso: date.toISOString().slice(0, 10),
})

export const startOfTodayUtc = (now: Date = new Date()): Date =>
  new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))

export const upcoming = <T extends { data: { date: Date } }>(
  items: readonly T[],
  now: Date = new Date(),
  limit = 3,
): T[] => {
  const today = startOfTodayUtc(now).getTime()
  return items
    .filter((item) => item.data.date.getTime() >= today)
    .sort((a, b) => a.data.date.getTime() - b.data.date.getTime())
    .slice(0, limit)
}
