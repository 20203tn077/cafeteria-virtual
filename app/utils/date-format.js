const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const WEEK = 7 * DAY
const MONTH = 30.4375 * DAY
const YEAR = 12 * MONTH

const round = Math.floor

export function relative(date = new Date()) {
  let diff = new Date().valueOf() - date.valueOf()
  const prefix = diff < 0 ? 'En ' : 'Hace '
  diff = Math.abs(diff)

  if (diff < MINUTE) return `${prefix} un momento`

  let unit

  if (diff < HOUR) unit = [MINUTE, 'minuto', 'minutos']
  else if (diff < DAY) unit = [HOUR, 'hora', 'horas']
  else if (diff < WEEK) unit = [DAY, 'día', 'días']
  else if (diff < MONTH) unit = [WEEK, 'semana', 'semanas']
  else if (diff < YEAR) unit = [MONTH, 'mes', 'meses']
  else unit = [YEAR, 'año', 'años']

  const amount = round(diff / unit[0])

  return `${prefix} ${amount} ${unit[amount === 1 ? 1 : 2]}`
}

export function dateString(date = new Date()) {
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
}

export function timeString(date = new Date()) {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

export function dateTimeString(date = new Date()) {
  return `${dateString(date)} ${timeString(date)}`
}
