import React, { useEffect } from 'react'
import styles from './ReservePage.css'
import FormItem from '../../components/FormItem/FormItem'
import Title from '../../components/Title/Title'
import Subtitle from '../../components/Subtitle/Subtitle'
import DropdownMenu from '../../components/DropdownMenu/DropdownMenu'
import { useTour } from '../../contexts/TourContext'
import { useTourList } from '../../hooks/useTourList'
import DropdownTour from '../../components/DropdownTour/DropdownTour'
import DropdownDates from '../../components/DropdownDates/DropdownDates'

function ReservePage() {
  const { tourList, listLoading, getTourList } = useTourList();
  const { tour, tourId, setTourID } = useTour();

    useEffect( () => {
        //Fetch de lista de tours
        getTourList();
    }, [])

/***
 * La pagina de reservas es una vista privada que requiere de una sesion activa para acceder
 * toma los datos de tour e id del context, que deberian iniciar como null y vacio inicialmente,
 * tambien realiza una llamada al hook del listado de tours para adquirir la lista de tours necesaria
 * para renderizar la version de Dropdown menu para tours, si se encuentra cargando, se mostrara 
 * un texto que indica el estado, si no, renderiza el componente de DropdownTour y DropdownDates, donde habra un listado
 * con los tours actuales en la coleccion, una vez el usuario seleccione un tour, DropdownDates se actualizara con las
 * fechas que tiene dicho tour, al salir de la pagina se debera reiniciar el context de tours (reserva) a menos que 
 * la vista sea el siguiente paso de la reserva. El usuario no debe poder ir al siguiente paso si no ha seleccionado una fecha.
 */
  return (
    <div className="App">
        <header className="back-header">
            <i className="fa-solid fa-arrow-left"></i>
        </header>

    <div className='centeredArea'>
        <Subtitle subtitle = "Reservar tu Tour"/>
        <p className='reserveSubSubtitle'>Terminos y condiciones de la reservacion bla bla hola</p>
        
        <section className='rForm'>
            <div className='inpArea'>
                {listLoading &&(<h1>Cargando...</h1>)}

                {!listLoading && tourList &&(
                    <DropdownTour tours = {tourList}/>
                )}

                {listLoading &&(<h1>Cargando...</h1>)}

                {!listLoading &&(
                    <DropdownDates/>
                )}

            </div>

            <div className='textArea'>
                <p> Aqui podrás explorar y disfrutar de las obras de arte que residen en nuestra institución. Nuestra misión es promover el arte y la cultura en nuestra comunidad, y para ello ofrecemos una variedad de tours que te permitirán conocer y apreciar nuestras colecciones de manera única e inspiradora. Únete a nosotros en esta experiencia cultural y descubre el valor y la belleza del arte en nuestro campus universitario</p>
            </div>
        </section>
    </div>

        <section className='buttonArea'>
            <button className='blue-btn'>Ver Calendario</button>
            <button className='blue-btn'>Ver otros tours</button>
            <button className='orange-btn'>Siguiente</button>
        </section>

    </div>

  )
}

export default ReservePage
































/*Creo que deberia buscar mejores nombres para las variables*/