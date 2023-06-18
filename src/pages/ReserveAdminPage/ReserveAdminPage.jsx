import React, { useState, useEffect } from "react";
import { app, auth, db, storage } from "../../firebase/firebase-config";
import { getDocs, query, collection, where } from "firebase/firestore";
import Sidebar from "../../components/Sidebar/Sidebar";
import Title from "../../components/Title/Title";
import "./ReserveAdminPage.css";
import { Table } from "reactstrap";
import { Button } from 'reactstrap';

/* Página de administración de reservas
   Se obtiene la información de la coleccion de Reservas  y con los  ID de tour y usuario accedemos
   a las colecciones de Tours y Usuarios para obtener sus nombres y mostrarlos en la tabla.
 */

const ReserveAdminPage = () => {
  const [reservations, setReservations] = useState([]);
  const [tours, setTours] = useState({});
  const [users, setUsers] = useState({});


  // Obtener la data de las reservas
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservationsQuery = query(collection(db, "Reservas"));
        const reservationsSnapshot = await getDocs(reservationsQuery);
        if (!reservationsSnapshot.empty) {
          const reservationsData = reservationsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setReservations(reservationsData);

          // Obtener los IDs de los tours y usuarios
          const tourIds = reservationsData.map((reservation) => reservation.tour_id);
          const userIds = reservationsData.map((reservation) => reservation.user_id);

          // Obtener la info de tour
          const toursQuery = query(collection(db, "Tours"), where("__name__", "in", tourIds));
          const toursSnapshot = await getDocs(toursQuery);
          if (!toursSnapshot.empty) {
            const toursData = {};
            toursSnapshot.docs.forEach((doc) => {
              const tourData = doc.data();
              toursData[doc.id] = tourData.name;
            });
            setTours(toursData);
          }

          // Obtener la info de usuario
          const usersQuery = query(collection(db, "users"), where("__name__", "in", userIds));
          const usersSnapshot = await getDocs(usersQuery);
          if (!usersSnapshot.empty) {
            const usersData = {};
            usersSnapshot.docs.forEach((doc) => {
              const userData = doc.data();
              usersData[doc.id] = userData.name;
            });
            setUsers(usersData);
          }
        }
      } catch (error) {
        console.error("Error obteniendo la data", error);
      }
    };

    fetchReservations();
  }, []);


  // Estructura de la Tabla de reporte.  
  return (
    <div className="App">
      <Sidebar />
      <div className="main-admin">
        <Title title="Gestor de Reservas " />
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Usuario</th>
              <th>Tour</th>
              <th>Fecha</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={reservation.id}>
                <td>{index + 1}</td>
                <td>{users[reservation.user_id]}</td>
                <td>{tours[reservation.tour_id]}</td>
                <td>{reservation.fecha}</td>
                <td> <Button color="primary">Editar</Button> </td>

              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ReserveAdminPage;