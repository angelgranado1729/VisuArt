import {ADMIN_OBRAS_URL,ADMIN_TOURS_URL,ADMIN_RESERVE_URL,LOGIN_URL,CONTACT_URL,REGISTER_URL } from "../../constants/urls";

export const MenuData = [
    {
        title: "Obras",
        url: ADMIN_OBRAS_URL,
        cName: "admin_navbar-links"

    },
    {
        title: "Tours",
        url: ADMIN_TOURS_URL,
        cName: "admin_navbar-links"
    },
    {
        title: "Reservas",
        url: ADMIN_RESERVE_URL,
        cName: "admin_navbar-links"
    },
    
    {
        title: "Perfil",
        url: REGISTER_URL,
        cName: "admin_navbar-links-mobile"
    },
    {
        title: "Salir",
        url: LOGIN_URL,
        cName: "admin_navbar-links-mobile-transparent"
    }
]