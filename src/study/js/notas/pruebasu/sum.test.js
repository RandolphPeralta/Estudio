import { expect, test } from 'vitest'

function suma(a, b) {
  return a + b
}

test('suma 1 + 2 para igualar 3', () => {
  expect(suma(1, 2)).toBe(3)
})
