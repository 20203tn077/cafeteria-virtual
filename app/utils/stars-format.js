export function stars(amount) {
  return '<i class="bi bi-star-fill"></i>'.repeat(amount) + '<i class="bi bi-star"></i>'.repeat(5 - amount)
}
