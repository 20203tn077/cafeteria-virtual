import { Review } from '../models/review.model.js'
import { randomDate, randomItem, randomNumber } from '../utils/random-utils.js'
import { startDate } from './start-date.js'
import { users } from './users.js'

const comments = [
  'Entregado a tiempo',
  'Excelente servicio',
  'Considero que el precio es algo elevado, pero creo que por la calidad vale la pena',
  'Se quiere jubilar',
  'Creo que trae muy pocos ingredientes, pero por el precio está bien',
  'Excelente comida a buen precio',
  'Muy buen sabor y buena presentación',
  'Me gusta. Es genial obtener exactamente lo que quiero cada vez',
  'Buena relación calidad-precio. La cantidad de comida justifica el precio, siempre quedo satisfecho',
  'Aunque la entrega podría mejorar en velocidad, la calidad de la comida lo compensa',
  'Increíble atención a los detalles en cada plato. Se nota el esfuerzo y la dedicación',
  'El menú tiene una variedad que siempre me ofrece opciones deliciosas para elegir',
  'La comida siempre llega fresca. La entrega es confiable',
  'El servicio al cliente es sólido. Rresolvieron rápidamente un pequeño problema con mi pedido',
  'Aprecio la generosidad en las porciones. Nunca me quedo con hambre después de ordenar',
  'Aunque los precios son un poco altos, la calidad de la comida hace que valga la pena',
  'La presentación de los platos es impecable',
  'La entrega tuvo un pequeño retraso, pero la comida aún estaba buena',
  'La porción fue un poco más pequeña de lo que esperaba, pero el sabor era decente',
  'Hubo un pequeño malentendido en mi pedido, pero el servicio al cliente lo solucionó eventualmente',
  'La comida llegó templada, no caliente, lo cual fue un inconveniente menor',
  'El sabor de la comida era aceptable, aunque no tan impresionante como esperaba',
  'La presentación de la comida no fue la mejor, pero el sabor hizo que valiera la pena',
  'El menú podría tener más opciones, pero lo que probé estuvo bien',
  'Aunque los precios son un poco altos, la calidad de la comida compensa',
]

export function getReviews() {
  return comments
  .map(comment => new Review(
    randomItem(users, u => u.role === 'Comprador'),
    randomNumber(3, 6),
    comment,
    randomDate(startDate)
  )).slice(0, randomNumber(2, 6)).sort((a, b) => b.createdAt - a.createdAt)
}
