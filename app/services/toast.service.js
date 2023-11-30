export class ToastService {
  getPendingMessage() {
    const data = localStorage.getItem('pendingMessage')
    localStorage.removeItem('pendingMessage')
    return data
  }

  setPendingMessage(message) {
    localStorage.setItem('pendingMessage', message)
  }
}
