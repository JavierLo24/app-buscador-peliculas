import { useState } from "react"


export const BuscadorPeli = () => {

    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const API_KEY = '7d57b64b9b5688d9d3a298ee6e666e4d'

    const [movie, setMovie] = useState('')
    const [pelicula, setPelicula] = useState([])

    const inputChange = (e) => {
        setMovie(e.target.value)
    }

    const fetchMovie = async () => {
        try {
            const response = await fetch(`${urlBase}?query=${movie}&api_key=${API_KEY}`)
            const data = await response.json()
            setPelicula(data.results)
        } catch (e) {
            console.error('Ha ocurrido un error', e)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        fetchMovie()
    }

    return (
        <div className="container">
            <h1 className="title">Buscador de películas</h1>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Digita una película"
                    value={movie}
                    onChange={inputChange}
                />
                <button type="submit" className="search-button">Buscar</button>
            </form>

            <div className="movie-list">
                {pelicula.map((peliculas) => (
                    <div key={peliculas.id} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/w500${peliculas.poster_path}`} alt="Movie IMG" />
                        <h2>{peliculas.title}</h2>
                        <p>{peliculas.overview}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
