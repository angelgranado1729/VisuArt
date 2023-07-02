//el codigo de arriba es el codigo de beatriz viejo. 
//si hay que añadir mas campos se debe agregar un estado para cada campo, un input para que el usuario pueda editar el valor
//, y luego incluye el valor en el objeto que se pasa a "updateUser"
import  { useState ,usefect } from 'react';
import { useUserContext } from "../../../contexts/UserContext";
import Subtitle from "../../../components/Subtitle/Subtitle";
import "./UserProfilePage.css"
import { HOME_URL , USER_PROFILE_EDIT_URL } from "../../../constants/urls";
import { updateUser } from "../../../firebase/users";
import { Link } from "react-router-dom";
import { db , storage} from "../../../firebase/firebase-config";
import React, { useEffect } from "react";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as getRef } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import {  updateUserPassword} from "../../../firebase/auth";
import { reauthenticateWithCredential, EmailAuthProvider , getAuth} from "firebase/auth";


const UserProfilePage = () => {
    const { user } = useUserContext();
    const [name] = useState(user.name);
    const [email] = useState(user.email);
    const [email2, setEmail2] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [okemail , setOkemail] = useState(false);
    const [okpassword , setOkpassword] = useState(false);
    const [password2, setPassword2] = useState(null);
    // const { dataUsuario, setDataUsuario } = useContext(UserContext);
    // const [image, setImage] = useState(null);
  
    const [url, setUrl] = useState(null);
  
  
    // muestra la foto (rescata el valor para mostrarlo)
    const watch = async () => {
      const ref = getRef(storage, "usersphotos/" + user.id);
      const downloadURL = await getDownloadURL(ref);
      setUrl(downloadURL);
      console.log(downloadURL);
    
    };
    // funcion para actualizar la informacion de los inputs y los actualiza en la base de datos 
    const updateinfo = async (event) => {
      
      console.log(okemail);
      console.log (okpassword);
      console.log (event);
  
      if (okemail === true && okpassword === true){
      const userDoc = doc(db, "users", user.id);
      await updateDoc(userDoc, {  
        name: name,
        email: email,
      })} else {
        alert("El email o la contraseña no coinciden")
      }
  
    };
    // verificar si el email en los dos campos de input son iguales y no permitir que se actualice si no lo son
    const checkEmail = () => {
      if ( email === email2) {
        setOkemail(true);
        return true;
      } else {
        setOkemail(false);
        return false;
      }
    };
    // verificar si la contrasena en los dos campos de input son iguales y no permitir que se actualice si no lo son
  
    const checkPassword = () => {
      if (password === password2) {
        setOkpassword(true);
        return true;
      } else {
        setOkpassword(false);
        return false;
        
      }
    };
    // const checkEmailPassword = () => {
    //   let e = checkEmail();
    //   let a = checkPassword();
    //   console.log(okemail);
    //   console.log(okpassword);
    //   updateinfo(e,a);
  
    // };
  
    // const checkEmailPassword = () => {
    //   let e = checkEmail();
    //   let a = checkPassword();
    //   console.log(okemail);
    //   console.log(okpassword);
    //   if (e && a) {
    //     const auth = getAuth(); // Get the Auth instance
    //     const user = auth.currentUser;
    //     if (user) {
    //       // Get the user document from Firestore
    //       const userDoc = doc(db, "users", user.uid);
    //       getDoc(userDoc).then((docSnapshot) => {
    //         if (docSnapshot.exists()) {
    //           const userData = docSnapshot.data();
    //           if (userData.provider === "google" || userData.provider === "facebook") {
    //             // The user registered with Google or Facebook, do not allow password change
    //             alert("No puedes cambiar tu contraseña porque te registraste con Google o Facebook.");
    //           } else {
    //             // The user did not register with Google or Facebook, proceed with password change
    //             const credential = EmailAuthProvider.credential(user.email, password); // Use the current password to create the credential
    //             reauthenticateWithCredential(user, credential)
    //               .then(() => {
    //                 // User re-authenticated.
    //                 updateUserPassword({
    //                   newPassword: password,
    //                   onSuccess: () => {
    //                     console.log("Password updated successfully.");
    //                     // Handle success (e.g., show a success message to the user)
    //                   },
    //                   onFail: () => {
    //                     console.log("Failed to update password.");
    //                     // Handle failure (e.g., show an error message to the user)
    //                   },
    //                 });
    //               })
    //               .catch((error) => {
    //                 // An error happened.
    //                 console.error("Failed to re-authenticate user", error);
    //                 if (error.code === "auth/wrong-password") {
    //                   // The password is incorrect
    //                   alert("La contraseña proporcionada es incorrecta. Por favor, inténtalo de nuevo.");
    //                 }
    //               });
    //           }
    //         }
    //       });
    //     }
    //   }
    //   updateinfo(e,a);
    // };
    
          
  
    const checkEmailPassword = () => {
      let e = checkEmail();
      let a = checkPassword();
      console.log(okemail);
      console.log(okpassword);
      if (e && a) {
        const auth = getAuth(); // Get the Auth instance
        const user = auth.currentUser;
        if (user) {
          const provider = user.providerData[0].providerId; // Get the provider ID of the first provider
          if (provider === "google.com" || provider === "facebook.com") {
            // The user registered with Google or Facebook, do not allow password change
            alert("No puedes cambiar tu contraseña porque te registraste con Google o Facebook.");
          } else {
            // The user did not register with Google or Facebook, proceed with password change
            const credential = EmailAuthProvider.credential(user.email, password); // Use the current password to create the credential
            reauthenticateWithCredential(user, credential)
              .then(() => {
                // User re-authenticated.
                updateUserPassword({
                  newPassword: password,
                  onSuccess: () => {
                    console.log("Password updated successfully.");
                    // Handle success (e.g., show a success message to the user)
                  },
                  onFail: () => {
                    console.log("Failed to update password.");
                    // Handle failure (e.g., show an error message to the user)
                  },
                });
              })
              .catch((error) => {
                // An error happened.
                console.error("Failed to re-authenticate user", error);
                if (error.code === "auth/wrong-password") {
                  // The password is incorrect
                  alert("La contraseña proporcionada es incorrecta. Por favor, inténtalo de nuevo.");
                }
              });
          }
        }
      }
      updateinfo(e,a);
    };
    
    
    
    
    
  
  
  
  // esto sirve para montarla por primera vez la foto y ademas actualizarla
    const doUpload = async (event) => {
      const file = event.target.files[0];
      console.log(user);
      const ref = getRef(storage, "usersphotos/" + user.id);
  
      const uploadTaskSnapshot = await uploadBytes(ref, file);
      console.info("Finished uploading!");
  
      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
      console.log('File available at', downloadURL);
  
      const userDoc = doc(db, "users", user.id);
      await updateDoc(userDoc, {
          photo: true,
      });
  
  
      setUrl(downloadURL);
      watch();
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // const storageRef = firebase.storage().ref();
      // const imageRef = storageRef.child(`images/${image.name}`);
      // await imageRef.put(image);
      // const imageURL = await imageRef.getDownloadURL();
      
      try {
        await updateUser(user.id, {
          name,
          email /*, otros campos que se quieran añadir });*/,
        });
        // Aquí se agrega la lógica para manejar el éxito de la operación
      } catch (error) {
        // Aquí se manejan los errores
      }
    };
  
  
    useEffect(() => {
      watch()
  }, [])


    return (
      <div className="App-v2">
        <header className="back-header top-editprofile">
          <Link to={HOME_URL}>
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/visuart-17959.appspot.com/o/LogosVisuArt%2FvisuartBlueLogo.jpg?alt=media&token=ab0e88ba-968b-4b0f-9b83-42c8e0183e66"
            alt=""
          />
        </header>
        <div className="decorations-container">
          <div className="editprofile-decoration1"></div>
          <div className="editprofile-decoration2"></div>
          <div className="editprofile-container">
          <div className="editprofile-img">
            <img className="imagenusuario" src={url  || "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"}/>
            </div>
            <i className="fa-solid fa-pen-to-square"></i>
            <Subtitle subtitle="Edita tus datos:" />
            <div className="input-container">
              <div className="column">
                <div className="input">
                  <label>Nombre</label>
                  <input type="text" value={name} readOnly />
                  <span></span>
                </div>
                <div className="input">
                  <label>Correo</label>
                  <input type="text" value={email} readOnly />
                  <span>correo@ejemplo.com</span>
                </div>
              </div>
              <div className="column-center">
                <p></p>
              </div>
              <div className="column">
                <div className="input">
                  <label>Verifica tu contraseña actual</label>
                  <input type="text" value={"********"} readOnly />
                  <span>Más 6 de dígitos e incluya carácteres especiales</span>
                </div>
                <div className="input">
                  <label>Tu nueva contraseña</label>
                  <input type="text" value={"********"} readOnly />
                  <span>Más 6 de dígitos e incluya carácteres especiales</span>
                </div>
                {/* Agregar mas inputs segun lo que podamos anadir en firebase */}
              </div>
            </div>
            <Link to={USER_PROFILE_EDIT_URL}>
              <button className="editprofile-btn">Editar perfil</button>
            </Link>
            {/* aqui poner el url de reservas de usuario */}
            <Link to={USER_PROFILE_EDIT_URL}> 
              <button className="editprofile-btn margen">Ver mis reservas</button>
            </Link>
          </div>
        </div>
      </div>
    );
}

export default UserProfilePage

