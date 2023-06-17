import 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import styles from "./RegisterPage.module.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HOME_URL, REGISTER_URL } from "../../constants/urls";
import {
    loginWithEmailAndPassword,
    signInWithGoogle,
} from "../../firebase/auth";
import {
    ArrowLeft,
    Google,
    Facebook,
    EyeFill,
    EyeSlashFill
} from "react-bootstrap-icons";



export function RegisterPage() {
    const [imageUrl, setImageUrl] = useState('');

    const storage = getStorage();
    const imageRef = ref(storage, import.meta.env.VITE_IMG_VISUARTE_LOGO);

    useEffect(() => {
        getDownloadURL(imageRef)
            .then((url) => {
                setImageUrl(url);
            })
            .catch((error) => {
                console.log("Error al obtener la URL de descarga de la imagen:", error);
            });
    }, []);


    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });
    const [loginError, setLoginError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const onSuccess = () => {
        navigate(HOME_URL);
    };

    const onFail = (_error) => {
        setLoginError(true);
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        setLoginError(false);
        await loginWithEmailAndPassword({
            userData: formData,
            onSuccess,
            onFail,
        });
    };

    const onChange = (event) => {
        const { name, value } = event.target;

        setFormData((oldData) => ({ ...oldData, [name]: value }));
    };

    const handleGoogleClick = async () => {
        await signInWithGoogle({
            onSuccess: () => navigate(HOME_URL),
        });
    };

    const handleFacebookClick = async () => {
        // await signInWithGoogle({
        //     onSuccess: () => navigate(HOME_URL),
        // });
    };

    const handleEmailClick = () => {
        if (!formData.email) {
            setErrors((prevErrors) => ({ ...prevErrors, email: true }));
        }
    };

    const handlePasswordClick = () => {
        if (!formData.password) {
            setErrors((prevErrors) => ({ ...prevErrors, password: true }));
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.backButton}>
                <Link to={HOME_URL}>
                    <ArrowLeft size={40} color="#000000" />
                </Link>
            </div>

            <div className={styles.logoContainer}>
                <img src={imageUrl} alt="logo" />
            </div>
            <div className={styles.ButtonsContainer}>
                <h1 className={styles.title}>Crea tu cuenta</h1>
                <div className={styles.decorationTop}></div>

                {/* Facebook Google Buttons */}
                <div className={styles.buttonsLoginContainer}>
                    <button
                        type="button"
                        className={styles.facebookButton}
                        onClick={handleFacebookClick}
                    >
                        <span className={styles.facebookIcon}>
                            <Facebook size={40} color="#429EBD" />
                        </span>
                        <p>Inicia con Facebook</p>
                    </button>
                    <button
                        type="button"
                        className={styles.googleButton}
                        onClick={handleGoogleClick}
                    >
                        <span className={styles.googleIcon}>
                            <Google size={40} color="#F7AD19" />
                        </span>
                        <p>Inicia con Google</p>
                    </button>
                </div>

                <div className={styles.decorationBottom}></div>

            </div>
        </div>
    );
}
