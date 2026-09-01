import { readFileSync } from 'node:fs'
import { sampleData, site } from '../src/data/site.ts'
import { findPlaceholders } from '../src/lib/placeholders.ts'

const services: unknown = JSON.parse(readFileSync('src/data/services.json', 'utf8'))
const found = [
  ...findPlaceholders(site, 'src/data/site.ts'),
  ...findPlaceholders(services, 'src/data/services.json'),
]

if (found.length === 0 && !sampleData) {
  console.log('No placeholders left. `pnpm build:release` is unblocked.')
} else if (found.length === 0) {
  console.log(
    'No [PLACEHOLDER] tokens left, but src/data/site.ts still has sampleData = true (sample values). Replace them and set it to false.',
  )
  process.exitCode = 1
} else {
  console.log(`${found.length} placeholder(s) to fill:\n`)
  for (const line of found) console.log(`  ${line}`)
  process.exitCode = 1
}
