import { ToastService } from '../services/toast.service.js'
import { notyf } from '../utils/notyf.js'

const toastService = new ToastService()

function checkForPendingMessage() {
  const message = toastService.getPendingMessage()
  if (message) notyf.success(message)
}

checkForPendingMessage()
