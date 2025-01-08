import { displayNotification } from "./notification.js";

document.getElementById('searchButton').addEventListener('click', searchMovies);
let api_key = 'YOUR API KEY'; // Ingresa tu API KEY aqui.
let urlBase = 'https://api.themoviedb.org/3/search/movie';
let urlImage = 'https://image.tmdb.org/t/p/w500';

function searchMovies(){
  const searchBar = document.getElementById('searchInput');
  let searchInput = searchBar.value;
  
  if(searchInput === ''){
    cleanResults();
    displayNotification("Por favor, ingrese el nombre de alguna pelicula.");
    searchBar.focus();
    return;
  }

  fetch(`${urlBase}?api_key=${api_key}&query=${encodeURIComponent(searchInput)}&language=es-ES`)
  .then(response => response.json())
  .then(response => displayMovies(response.results))
  .catch(error => console.log(error));
}

function displayMovies(movies){
  const resultContainer = document.getElementById('results');
  cleanResults();

  // Valido si se encontraron peliculas.
  if(movies.length === 0){
    displayNotification("No se encontraron resultados.");
    return;
  }

  movies.forEach((movie, index) => {
    let movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');

    let title = document.createElement('h2');
    title.textContent = movie.title;

    let releaseDate = document.createElement('p');
    releaseDate.textContent = 'Fecha de lanzamiento: ' + movie.release_date;

    let overview = document.createElement('p');
    overview.textContent = movie.overview ? movie.overview : "Sinopsis no disponible." ;

    let posterPath = '';
    // Valido si se encontro un poster.
    if(movie.poster_path){
      posterPath = urlImage + movie.poster_path;
    } else if(!movie.poster_path){
      posterPath = '../../assets/images/Mortimer.png';
    }
    
    let poster = document.createElement('img');
    poster.src = posterPath;
    
    movieDiv.appendChild(poster);
    movieDiv.appendChild(title);
    movieDiv.appendChild(releaseDate);
    movieDiv.appendChild(overview);

    resultContainer.appendChild(movieDiv);

    setTimeout(() => { 
      movieDiv.classList.add('show'); 
    }, index * 100); // Aumenta el retraso para cada elemento para un efecto de cascada
    
  });
}

function cleanResults(){
  const resultContainer = document.getElementById('results');
  resultContainer.innerHTML = '';
}