export function randomNumber(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

export function randomItem(list, predicate) {
  if (predicate) list = list.filter(predicate)
  return list[randomNumber(0, list.length)]
}

export function randomItems(amount, list, predicate) {
  const res = []
  for (let i = 0; i < amount; i++) res.push(randomItem(list, predicate))
  return res
}

export function randomDate(start, end) {
  return new Date(+start + Math.random() * ((end ?? new Date()) - start))
}