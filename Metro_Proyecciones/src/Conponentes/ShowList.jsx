import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/ShowList.css';

const ShowList = ({ setSelectedShow }) => {
    const [shows, setShows] = useState([]);

    useEffect(() => {
        const fetchShows = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/funciones/todas');
                setShows(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error al obtener las funciones:', error);
            }
        };
        fetchShows();
    }, []);

    return (
        <div className="show-list-container">
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>TÍTULO</th>
                        <th>FECHA Y HORA</th>
                        <th>LUGARES DISPONIBLES</th>
                    </tr>
                </thead>
                <tbody>
                    {shows.map((show, index,) => (
                        <tr key={index} onClick={() => setSelectedShow(show)}>
                            <td>{show.pelicula.titulo || 'N/A'}</td>
                            <td>{show.fecha && show.hora ? `${show.fecha} ${show.hora}` : 'N/A'}</td>
                            <td>{show.lugaresDisponibles ?? 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShowList;
