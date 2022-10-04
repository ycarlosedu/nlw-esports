export function convertHourStringToMinutes(hourString: string) {
  const [hours, minutes] = hourString.split(':').map(Number)

  const minutesAmount = (hours * 60) + minutes
  return minutesAmount
}

export function convertHourMinutesToString(hourMinutes: number) {
  const hours = Math.floor(hourMinutes / 60)
  const minutes = hourMinutes % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}