import { readFileSync } from 'node:fs'
import { site } from '../src/data/site.ts'
import { findPlaceholders } from '../src/lib/placeholders.ts'

const events: unknown = JSON.parse(readFileSync('src/data/events.json', 'utf8'))
const found = [
  ...findPlaceholders(site, 'src/data/site.ts'),
  ...findPlaceholders(events, 'src/data/events.json'),
]

if (found.length === 0) {
  console.log('No placeholders left. `pnpm build` is unblocked.')
} else {
  console.log(`${found.length} placeholder(s) to fill:\n`)
  for (const line of found) console.log(`  ${line}`)
  process.exitCode = 1
}
