import { toast } from "react-toastify";

export function ToastInfo(text: string) {
  toast.info(text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export function ToastSuccess(text: string) {
  toast.success(text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export function ToastError(text: string) {
  toast.error(text, {
    position: "top-right",
    autoClose: 8000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
