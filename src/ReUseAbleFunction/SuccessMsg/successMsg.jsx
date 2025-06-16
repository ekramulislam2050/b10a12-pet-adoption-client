
import Swal from 'sweetalert2';
 
 const successMsg = (successMsg) => {

        if (successMsg) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: successMsg,
                showConfirmButton: false,
                timer: 1500
            });
        }

 };
 
 export default successMsg;