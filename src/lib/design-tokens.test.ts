import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { test } from 'node:test'

const SRC = join(import.meta.dirname, '..')
const TOKENS = join(SRC, 'styles', 'tokens.css')
const COLOR_LITERAL = /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?)\(/g

const styleFiles = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return styleFiles(path)
    return /\.(astro|css)$/.test(entry.name) ? [path] : []
  })

// In .astro files only <style> blocks are CSS; markup may hold ids like href="#add".
const cssOf = (path: string): string => {
  const source = readFileSync(path, 'utf8')
  if (path.endsWith('.css')) return source
  return [...source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)]
    .map((match) => match[1])
    .join('\n')
}

const files = styleFiles(SRC)

test('colors are defined only in tokens.css', () => {
  const offenders = files
    .filter((path) => path !== TOKENS)
    .flatMap((path) =>
      [...cssOf(path).matchAll(COLOR_LITERAL)].map(
        (match) => `${relative(SRC, path)}: ${match[0]}`,
      ),
    )
  assert.deepEqual(offenders, [])
})

test('every var() points to a defined custom property', () => {
  const css = files.map(cssOf).join('\n')
  const defined = new Set([...css.matchAll(/(--[\w-]+)\s*:/g)].map((match) => match[1]))
  const missing = [...css.matchAll(/var\((--[\w-]+)\s*\)/g)]
    .map((match) => match[1])
    .filter((name) => name !== undefined && !defined.has(name))
  assert.deepEqual([...new Set(missing)], [])
})
