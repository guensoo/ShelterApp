import Swal from 'sweetalert2';
import { createContext, useContext } from 'react';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const showAlert = async ({
    title,
    text,
    icon = 'info',
    showCancelButton = false,
    confirmButtonText = '확인',
    cancelButtonText = '취소',
  }) => {
    return await Swal.fire({
      title,
      text,
      icon,
      showCancelButton,
      confirmButtonText,
      cancelButtonText,
    });
  };

  const showToast = async ({
    title,
    icon = 'success',
    timer = 1500
  }) => {
    return await Swal.fire({
      title,
      icon,
      timer,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
    });
  };

  return (
    <AlertContext.Provider value={{ showAlert, showToast }}>
      {children}
    </AlertContext.Provider>
  );
};
