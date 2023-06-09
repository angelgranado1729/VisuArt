import 'firebase/firestore';
import styles from "./LoginPage.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FORGOT_PASSWORD_URL, HOME_URL, REGISTER_URL } from "../../../constants/urls";
import {
    loginWithEmailAndPassword,
    signInWithGoogle,
    signInWithFacebook,
} from "../../../firebase/auth";
import {
    ArrowLeft,
    Google,
    Facebook,
    EyeFill,
    EyeSlashFill
} from "react-bootstrap-icons";

import { CustomToast } from "../../../components/CustomToast/CustomToast";

export function LoginPage() {
    const imageURL = 'https://firebasestorage.googleapis.com/v0/b/visuart-17959.appspot.com/o/LogosVisuArt%2FvisuartGrayLogo.png?alt=media&token=bbebf007-b27c-47dc-a494-5b31663b7a39';
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [successLogin, setSuccessLogin] = useState(false);

    const onSuccess = () => {
        setSuccessLogin(true);
        setShowToast(true);
        navigate(HOME_URL);
    };

    const onFail = (_error) => {
        setSuccessLogin(false);
        setShowToast(true);
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        setErrors({
            email: false,
            password: false,
        });

        setSuccessLogin(false);
        setShowToast(false);

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
        await signInWithFacebook({
            onSuccess: () => navigate(HOME_URL),
        });
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

            <div className={styles.formContainer}>
                <div className={styles.logoContainer}>
                    <img src={imageURL} />
                </div>
                <h1 className={styles.title}>
                    Bienvenido de nuevo
                </h1>
                <div className={styles.decorationTop}></div>

                <form className={styles.form} onSubmit={onSubmit}>
                    {/* EMAIL FIELD */}
                    <div
                        className={`${styles.inputContainer} ${errors.email ? styles.errorInput : ""
                            }`}
                    >
                        <label htmlFor="email">
                            <span>Correo electrónico</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="correo@ejemplo.com"
                            onClick={handleEmailClick}
                            onChange={onChange}
                        />
                        {errors.email && (
                            <span className={styles.errorMsg}>
                                Por favor, ingresa tu correo electrónico.
                            </span>
                        )}
                    </div>

                    {/* PASSWORD FIELD */}
                    <div
                        className={styles.inputContainer}
                    >
                        <label htmlFor="password">
                            <span>Contraseña</span>
                        </label>

                        <div className={`${styles.passwordInput} ${errors.password ? styles.errorInputPassword : ""}`}>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="***************"
                                onChange={onChange}
                                onClick={handlePasswordClick}
                                className={styles.passwordInputField}
                                required
                            />

                            <button
                                type="button"
                                className={styles.passwordToggle}
                                required
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeSlashFill size={20} color="background: #00000080" />
                                ) : (
                                    <EyeFill size={20} color="#00000080" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <span className={styles.errorMsg}>
                                Por favor, ingresa tu contraseña.
                            </span>
                        )}
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        Iniciar sesión
                    </button>

                    <div className={styles.forgotPassword}>
                        <Link to={FORGOT_PASSWORD_URL} className={styles.redirectLink}>
                            <p>¿Olvidaste tu contraseña?</p>
                        </Link>
                    </div>

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
                </form>
                <div className={styles.decorationBottom}></div>
                <p className={styles.loginRedirect}>
                    ¿Aún no tienes una cuenta?
                    <Link to={REGISTER_URL} className={styles.redirectLink}>
                        Regístrate aquí
                    </Link>
                </p>

                {/* CustomToast */}
                {
                    showToast && successLogin && (
                        <CustomToast
                            typeToast="success"
                            title="¡Bienvenido!"
                            message="Has iniciado sesión correctamente."
                            time={5000}
                        />
                    )
                }

                {
                    showToast && !successLogin && (
                        <CustomToast
                            typeToast="error"
                            title="¡Error!"
                            message="Correo o contraseña incorrecta. Intenta ingresar nuevo o crea una nueva cuenta"
                            time={5000}
                        />
                    )
                }

            </div>
        </div>
    );
}
