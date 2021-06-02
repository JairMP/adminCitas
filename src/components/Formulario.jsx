import React, { Fragment, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({ crearCita }) => {

    //Crear State de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [error, actulizarError] = useState(false)

    //Funcion que se Ejecuta cada que el Usuario Escribe en un Input.

    const actualizarState = (e) => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    //Extraer los Valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    //Cuando el Usuario Agrega una Cita
    const submitCita = (e) => {
        e.preventDefault();

        //Validacion
        if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            actulizarError(true)
            return;
        }

        //Eliminar mensaje previo
        actulizarError(false)

        //Asignar un ID
        cita.id = uuidv4();

        //Crear Cita
        crearCita(cita);

        //Reiniciar el Formulario
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    return (
        <Fragment>
            <h2>Crear Cita</h2>
            { error ? <p className="alerta-error">Todos los Campos son Obligatorios</p>
                : null}
            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre del Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Dueño"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Síntomas</label>
                <textarea
                    name="sintomas"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}
                >
                </textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>

        </Fragment>
    );
}

Formulario.propTypes={
    crearCita: PropTypes.func.isRequired
}

export default Formulario;