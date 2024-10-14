import { toast } from "react-toastify";

export const notify = {
  default: () => toast("Diğer Bildirimler !"),
  success: () =>
    toast.success("Başarılı !", {
      position: "top-right",
      style: {
        background: "linear-gradient(to right, #434343, #3BC14A)",
        color: "#ffffff",
      },
    }),
  error: () =>
    toast.error("İşlem Gerçekleştirilemedi !", {
      position: "top-left",
      style: {
        background: "linear-gradient(to right, #434343, #ff0022 )",
        color: "#ffffff",
      },
    }),
  warn: ({ placeholder }) =>
    toast.warn(placeholder, {
      position: "top-left",
      style: {
        background: "linear-gradient(to right, #434343, #f1d302 )",
        color: "#ffffff",
      },
    }),
  info: ({ placeholder }) =>
    toast.info(placeholder, {
      position: "bottom-center",
      style: {
        background: "linear-gradient(to right, #434343, #00a7e1 )",
        color: "#ffffff",
      },
    }),
  custom: ({ placeholder }) =>
    toast(placeholder, {
      position: "bottom-right",
      className: "foo-bar",
    }),
};
