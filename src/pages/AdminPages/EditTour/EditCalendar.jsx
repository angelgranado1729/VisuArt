import React, { useState, useEffect } from "react";
import { Button, Table, FormGroup, Label, Toast, ToastBody } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import { doc, updateDoc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import Title from "../../../components/Title/Title";
import { DatePicker } from 'reactstrap-date-picker';
import { CustomToast } from "../../../components/CustomToast/CustomToast";
import "./EditCalendar.css";

const formatDate = (date) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString('en-GB', options);
  const [day, month, year] = formattedDate.split('/');
  return `${day}/${month}/${year}`;
};

const TourEditFechas = () => {
  const { nombre } = useParams();
  const [tour, setTour] = useState(null);
  const [fechas, setFechas] = useState([]);
  const [nuevaFecha, setNuevaFecha] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchTour = async () => {
      const tourSnapshot = await getDocs(
        query(collection(db, "Tours"), where("nombre", "==", nombre))
      );

      if (tourSnapshot.empty) {
        // El tour no se encontró en la base de datos
        return;
      }

      const tourData = tourSnapshot.docs[0].data();

      // Actualiza el estado solo con el tour correspondiente
      setTour({ id: tourSnapshot.docs[0].id, ...tourData });
      setFechas(tourData.fecha || []);
    };

    fetchTour();
  }, [nombre]);

  useEffect(() => {
    setShowToast(false); // Restablecer el estado de showToast a false cuando cambie nuevaFecha
  }, [nuevaFecha]);

  const handleAgregarFecha = async () => {
    
    if (!nuevaFecha || !tour) return;

    const formattedDate = formatDate(nuevaFecha);

    // Verificar si la fecha ya existe en el array de fechas
    if (fechas.includes(formattedDate)) {
      setShowToast(true);
      return;
    }

    const updatedFechas = [...fechas, formattedDate];

    await updateDoc(doc(db, "Tours", tour.id), {
      fecha: updatedFechas,
    });

    setFechas(updatedFechas);
    setNuevaFecha(""); // Limpiar el estado de nuevaFecha después de agregarla
    
  };

  const handleGoBack = () => {
    navigate("/admin-tours");
  };

  const handleEliminarFecha = async (index) => {
    if (!tour) return;

    const updatedFechas = [...fechas];
    updatedFechas.splice(index, 1);

    await updateDoc(doc(db, "Tours", tour.id), {
      fecha: updatedFechas,
    });

    setFechas(updatedFechas);
  };

  if (!tour) {
    return <div>Tour no encontrado</div>;
  }

  return (
    <div className="App">
      <AdminNavbar />
      <div style={{ marginLeft: '10%', marginRight: '10%'}}>
      <br />
      <br />
      <br />
        <Title title={`Gestor de Calendario: ${tour.nombre}`} />

        <FormGroup>
          <Label className="subtitles-calendar" for="nuevaFecha"> Nueva Fecha</Label>
          <DatePicker
            id="nuevaFecha"
            value={nuevaFecha}
            onChange={(value) => setNuevaFecha(value)}
            placeholder="Seleccione la fecha"
            dateFormat="YYYY-MM-DD"
          />
        </FormGroup>
        <Button
          color="success"
          onClick={handleAgregarFecha}
          style={{ marginBottom: "10px" }}
        >
          Agregar Fecha
        </Button>
        <br />
        <br />
        <Label className="subtitles-calendar" for="viejaFecha"> FECHAS AGREGADAS </Label>
        {fechas.length > 0 ? (
          <Table className="shadow-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Fecha</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {fechas.map((fecha, index) => (
                <tr key={index}>
                  <td style={{ width: "10%" }}>{index + 1}</td>
                  <td style={{ width: "80%" }}>{fecha}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Button
                        color="danger"
                        onClick={() => handleEliminarFecha(index)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No hay fechas agregadas.</p>
        )}

        <Button color="dark" onClick={handleGoBack}>
          Volver
        </Button>
      </div>
      <br />
      <br />

      {showToast && (
        <div className="custom-toast">
          <CustomToast
            typeToast="error"
            title="¡Error!"
            message="La fecha ya existe"
            time={5000}
          />
        </div>
      )}
    </div>
  );
};

export default TourEditFechas;
