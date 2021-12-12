import { toast } from 'react-toastify';

export const showInfoToast = (message) =>
    toast.info(message, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });

export const showErrorToast = (message) =>
    toast.error(message, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
