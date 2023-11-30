import { Product } from '../models/product.model.js'
import { randomItem, randomItems, randomNumber } from '../utils/random-utils.js'
import { getReviews } from './reviews.js'
import { users } from './users.js'

export const products = [
  new Product(
    'Tacos',
    'Orden de 5 tacos al pastor con piña',
    45,
    randomNumber(0, 11),
    'tacos.jpeg',
    randomItem(users, u => u.role === 'Vendedor'),
    getReviews()
  ),
  new Product(
    'Torta de jamón',
    'con queso, lechuga, jitomate y cebolla',
    30,
    randomNumber(0, 11),
    'torta-jamon.jpg',
    randomItem(users, u => u.role === 'Vendedor'),
    getReviews()
  ),
  new Product(
    'Agua de horchata',
    'Vaso de agua de horchata de medio litro',
    12,
    randomNumber(0, 11),
    'agua-horchata.jpg',
    randomItem(users, u => u.role === 'Vendedor'),
    getReviews()
  ),
  new Product(
    'Hot dog',
    'Hot dog con tocino y aderezo a elegir, incluye papas',
    40,
    randomNumber(0, 11),
    'hot-dog.jpg',
    randomItem(users, u => u.role === 'Vendedor'),
    getReviews()
  ),
  new Product(
    'Hamburguesa sencilla',
    'Hamburguesa de res con queso, lechuga, jitomate y cebolla',
    35,
    randomNumber(0, 11),
    'hamburguesa-sencilla.jpg',
    randomItem(users, u => u.role === 'Vendedor'),
    getReviews()
  ),
  new Product(
    'Hamburguesa hawaiana',
    'Hamburguesa de res con piña, queso, lechuga, jitomate y cebolla',
    40,
    randomNumber(0, 11),
    'hamburguesa-hawaiana.jpg',
    randomItem(users, u => u.role === 'Vendedor'),
    getReviews()
  ),
  new Product(
    'Chilaquiles verdes',
    'Chilaquiles con frijoles, aguacate y cebolla morada',
    45,
    randomNumber(0, 11),
    'chilaquiles.jpg',
    randomItem(users, u => u.role === 'Vendedor'),
    getReviews()
  ),
  new Product(
    'Molletes',
    '3 molletes tradicionales (frijoles, queso y pico de gallo)',
    45,
    randomNumber(0, 11),
    'molletes.png',
    randomItem(users, u => u.role === 'Vendedor'),
    getReviews()
  ),
  new Product(
    'Tostadas',
    'Tostadas preparadas con frijoles, lechuga, aguacate, jitomate, queso y crema',
    30,
    randomNumber(0, 11),
    'tostadas.jpg',
    randomItem(users, u => u.role === 'Vendedor'),
    getReviews()
  ),
  new Product(
    'Bastones de verdura',
    '15 bastones de pepino, zanahoria y jícama',
    20,
    randomNumber(0, 11),
    'bastones.jpeg',
    randomItem(users, u => u.role === 'Vendedor'),
    getReviews()
  ),
  new Product(
    'Torta de milanesa',
    'Torta de milanesa con queso, lechuga, jitomate y cebolla',
    40,
    randomNumber(0, 11),
    'torta-milanesa.jpg',
    randomItem(users, u => u.role === 'Vendedor'),
    getReviews()
  ),
  new Product(
    'Enchiladas suizas',
    'Orden de 5 enchiladas suizas con pollo',
    45,
    randomNumber(0, 11),
    'enchiladas-suizas.png',
    randomItem(users, u => u.role === 'Vendedor'),
    getReviews()
  ),
  new Product(
    'Arroz congrí',
    'Arroz con frijoles, pero que aparentemente no es lo mismo que arroz con frijoles porque el arroz se coce con el caldo de los frijoles',
    10,
    randomNumber(0, 11),
    'arroz-con-gris.jpg',
    randomItem(users, u => u.role === 'Vendedor'),
    getReviews()
  ),
]
