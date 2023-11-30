import { Message } from '../models/message.model.js'
import { randomDate, randomItem } from '../utils/random-utils.js'

export const conversations = [
  [
    new Message('Comprador', 'Hola'),
    new Message('Comprador', 'Tengo una duda, alguno de los alimentos lleva chile?'),
    new Message('Vendedor', 'Sí, uno de ellos, por qué?'),
    new Message('Comprador', 'Es que tengo alergia al chile, así que no puedo comer nada que lo lleve <span class="emoji">🥹</span>'),
    new Message('Vendedor', '¿Alergia al chile?'),
    new Message('Vendedor', '¿La tienes diagnosticada?'),
    new Message('Comprador', 'Pues sí <span class="emoji">😒</span>'),
    new Message('Comprador', 'Bueno'),
    new Message('Comprador', 'Mi mamá me dijo que tenía alergia, no creo que sea mentira'),
    new Message('Vendedor', 'Hmmm... entiendo'),
    new Message('Vendedor', 'Veré que se puede hacer'),
    new Message('Comprador', 'Vale, gracias <span class="emoji">😊</span>'),
  ],
  [
    new Message('Vendedor', 'Buenas tardes. Ya tengo tu pedido listo ¿Qué lugar y hora te queda bien para que te lo entregue?'),
    new Message('Comprador', '¿Eres del turno de la mañana?'),
    new Message('Vendedor', 'No, soy de ingeniería. Pero voy a las 10 precisamente a hacer entregas en la uni para los de lamañana'),
    new Message('Comprador', 'Ah, vale. Si llegas a esa hora entonces nos podemos ver afuera del edificio de CEVISET'),
    new Message('Vendedor', 'Me parece bien, ahí te veo entonces'),
  ],
  [
    new Message('Comprador', 'Hola'),
    new Message('Comprador', '¿Cómo estás?'),
    new Message('Comprador', 'Oye <span class="emoji">🙈🙈🙈</span>'),
    new Message('Comprador', '¿Crees que puedas usar mayonesa light para mi pedido?'),
    new Message('Comprador', 'Lo que pasa es que estoy a dieta'),
    new Message('Vendedor', '...'),
    new Message('Vendedor', 'Estás comprando 2 hamburguesas ¿Eso entra en tu dieta?'),
    new Message('Comprador', 'A ti'),
    new Message('Comprador', 'Bueno'),
    new Message('Comprador', 'En mi dieta no dice que no pueda comer hamburguesas'),
    new Message('Comprador', 'De todos modos tiene lechuga y jitomate, ¿no?'),
    new Message('Vendedor', 'Sí'),
    new Message('Comprador', 'Pues ya está, si tiene verdura, proteina y carbohidratos entonces está todo bien'),
    new Message('Vendedor', 'Hmmm...'),
    new Message('Vendedor', 'Ok, supongo que puedo ponerle mayonesa light'),
    new Message('Comprador', 'A meno <span class="emoji">🤭</span>'),
    new Message('Comprador', 'Gracias <span class="emoji">☺️</span>'),
    new Message('Comprador', 'Pero rapidito, porque ya quiero ñam ñam'),
  ],
  [
    new Message('Comprador', 'Hola'),
    new Message('Comprador', 'Quería ver si el pedido que mandé me lo podrías entregar mañana'),
    new Message('Comprador', 'Como apartarlo más que nada'),
    new Message('Vendedor', 'Claro'),
    new Message('Vendedor', 'Solo que mañana mi horario es un poco diferente ¿Puedes recogerlo de 4 a 5?'),
    new Message('Comprador', 'Sí, no habría problema'),
    new Message('Comprador', '¿Afuera de CEDIM sería?'),
    new Message('Vendedor', 'Sí, aunque voy a bajar hasta la cafetería, por si quieres recogerlo en la explanada de docencia uno u otro lugar'),
    new Message('Comprador', 'No, afuera de CEDIM está bien, yo voy a ir saliendo de docencia 4 y me quedo arriba'),
    new Message('Vendedor', 'Perfecto, allí nos vemos entonces'),
  ],
  [
    new Message('Comprador', 'Hola, tuve un pequeño contratiempo para llegar a la uni'),
    new Message('Comprador', '¿Es posible cambiar la hora de entrada?'),
    new Message('Vendedor', 'Hola, claro ¿Cuándo y dónde te gustaría recibir tu pedido ahora?'),
    new Message('Comprador', '¿Podría ser a las 5:30 en la explanada de docencia 1?'),
    new Message('Vendedor', 'Hmmm... a esa hora ya estoy en clases, pero puedes subir a docencia 2 y te puedo ver en el pasillo'),
    new Message('Comprador', 'Perfecto, me parece bien. Gracias por la flexibilidad'),
    new Message('Vendedor', '¡De nada!'),
  ],
  [
    new Message('Comprador', 'Hola, respecto al pedido que acabo de hacer no cambia nada, solo una duda'),
    new Message('Comprador', 'Soy docente de la DATID y mañana a las 11 se hará una reunión en la dirección ¿Puedes manejar pedidos grandes?'),
    new Message('Vendedor', 'Hola, sí ¿Cuántas personas serán y qué te gustaría pedir?'),
    new Message('Comprador', 'Seremos 10 personas. Necesitamos 10 ordenes de molletes y 15 carlotas de limón'),
    new Message('Vendedor', 'Entendido. ¿La entrega sería en la dirección de DATID en docencia 1?'),
    new Message('Comprador', 'Sí ¿Vas a traer las cosas en carro?'),
    new Message('Vendedor', 'Sí'),
    new Message('Comprador', 'Entonces si quieres solo estacionate en frente de docencia uno y ya salimos a ayudarte con las cosas'),
    new Message('Vendedor', 'Claro, me parece bien. Nos vemos mañana'),
  ],
]

export function getConversation(startDate) {
  const nextDay = new Date(startDate.valueOf() + 10 * 60 * 60 * 1000)
  const endDate = nextDay.valueOf() < new Date().valueOf() ? nextDay : new Date()
  const conversation = structuredClone(randomItem(conversations))
  const dates = conversation.map(() => randomDate(startDate, endDate)).sort((a, b) => a - b)
  for (let i = 0, message = conversation[i], date = dates[i]; i < conversation.length; i++, message = conversation[i], date = dates[i]) message.createdAt = date
  return conversation
}
