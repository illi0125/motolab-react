/** SweetAlertHandling **/
import Swal from "sweetalert2";
import { Messages } from "./config";

export const sweetErrorHandling = async (err: any) => {
  const error = err.response?.data ?? err;
  const message = error?.message ?? Messages.error1;
  await Swal.fire({
    icon: "error",
    text: message,
    showConfirmButton: false,
  });
};

export const sweetTopSuccessAlert = async (
  msg: string,
  duration: number = 2000,
) => {
  await Swal.fire({
    position: "top-end",
    icon: "success",
    title: msg,
    showConfirmButton: false,
    timer: duration,
  });
};

export const sweetTopSmallSuccessAlert = async (
  msg: string,
  duration: number = 2000,
) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
  });

  Toast.fire({
    icon: "success",
    title: msg,
  }).then();
};

export const sweetFailureProvider = (
  msg: string,
  show_button: boolean = false,
  forward_url: string = "",
) => {
  Swal.fire({
    icon: "error",
    title: msg,
    showConfirmButton: show_button,
    confirmButtonText: "OK",
  }).then(() => {
    if (forward_url !== "") {
      window.location.replace(forward_url);
    }
  });
};

export const sweetConfirmHandler = async (
  title: string = "Do you want to proceed with payment?",
  confirmButtonText: string = "Yes, Proceed",
  cancelButtonText: string = "Cancel",
): Promise<boolean> => {
  const result = await Swal.fire({
    title,
    icon: "question",
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    background: "#0b0f17",
    color: "#ffffff",
    confirmButtonColor: "#06b6d4",
    cancelButtonColor: "#374151",
    reverseButtons: true, // Puts primary action on the right side
  });

  return result.isConfirmed;
};

export const sweetDeleteConfirmHandler = async (
  title: string = "Do you want to delete the order?",
  text: string = "This action cannot be undone.",
): Promise<boolean> => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    background: "#0b0f17",
    color: "#ffffff",
    confirmButtonColor: "#ef4444", // Red color for delete action
    cancelButtonColor: "#374151",
    reverseButtons: true,
  });

  return result.isConfirmed;
};

export const sweetVerifyConfirmHandler = async (
  title: string = "Have you received your order?",
  text: string = "Please confirm that your order has been delivered successfully.",
): Promise<boolean> => {
  const result = await Swal.fire({
    title,
    text,
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Yes, I received it",
    cancelButtonText: "Not yet",
    background: "#0b0f17",
    color: "#ffffff",
    confirmButtonColor: "#10b981", // Emerald green for verification/success
    cancelButtonColor: "#374151",
    reverseButtons: true,
  });

  return result.isConfirmed;
};
