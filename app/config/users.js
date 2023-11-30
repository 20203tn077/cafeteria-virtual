import { User } from '../models/user.model.js'

export const users = [
  new User('Ricardo', 'Cárdenas', 'Guevara', '20203tn077@utez.edu.mx', '20203tn077', 'Comprador', '1234'),
  new User(
    'Liz Claudia',
    'Espinosa',
    'Gutiérrez',
    '20203tn128@utez.edu.mx',
    '20203tn128',
    'Vendedor',
    '1234',
    'Lunes y viernes de 5 a 5:30 p. m.\nMartes a jueves de 5:30 a 6 p. m.',
    'Explanada al lado de docencia 1\nÁrea verde de docencia 4\nCafetería el balcón'
  ),
  new User(
    'Luba Tzitlali',
    'Almazán',
    'Orlova',
    '20203tn068@utez.edu.mx',
    '20203tn068',
    'Vendedor',
    '1234',
    'Lunes a jueves de 5 a 6 p. m.\nViernes de 3 a 5:30 p. m.',
    'Explanada al lado de docencia 1\nÁrea verde de docencia 4'
  ),
  new User('Ricardo', 'Rodríguez', 'González', '20203tn145@utez.edu.mx', '20203tn145', 'Comprador', '1234'),
  new User('Carlos Manuel', 'González', 'Rodríguez', '20203tn133@utez.edu.mx', '20203tn133', 'Comprador', '1234'),
  new User('Roy Axxel', 'Salgado', 'Martínez', '20203tn052@utez.edu.mx', '20203tn052', 'Comprador', '1234'),
  new User(
    'Miriam Guadalupe',
    'Saucedo',
    'Bustamante',
    '20203tn055@utez.edu.mx',
    '20203tn055',
    'Vendedor',
    '1234',
    'Lunes a viernes de 11 a 12 a. m. y de 5 a 5:30 p. m.',
    'Área verde de docencia 4\nEscaleras de CEDIM'
  ),
]
