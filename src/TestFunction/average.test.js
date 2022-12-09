import average from './average'

test('Calcule la moyenne du tableau qui doit être égale à 10', () => {
  expect(average([20, 0, 5, 15])).toBe(10)
})
