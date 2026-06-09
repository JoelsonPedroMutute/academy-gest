import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

export default defineNuxtPlugin((nuxtApp) => {
    const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        customClass: {
            popup: 'font-toast'
        },
        didOpen: (toast: any) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

   const modal = Swal.mixin({
  customClass: {
    popup: 'font-toast',
    confirmButton: 'btn btn-success px-4 fw-semibold',
    cancelButton: 'btn btn-outline-secondary px-4 fw-semibold me-2',
    actions: 'd-flex flex-row-reverse gap-2',
  },
  buttonsStyling: false,
});

    nuxtApp.provide('swal', {
        toast, // Para toasts rápidos
        modal  // Para modais interativos
    });
});
