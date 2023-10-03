import { toast } from "react-toastify";

export const createToast = (message, options = {}) =>
  toast.info(message, options);
