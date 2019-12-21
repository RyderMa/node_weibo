/**
 * @description test demo
 * @author malujie
 */


test('test 40 is not sum of 10 and 20', () => {
  const res = sum(10, 20)
  expect(res).not.toBe(40)
})

function sum(a, b) {
  return a + b;
}