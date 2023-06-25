

  const options = {method: 'GET'};

     function TrendingMovie() {
         let html = ''
         fetch('https://api.themoviedb.org/3/trending/all/day?api_key=00f190c8081e28e8456dfb59457bb2bd', options).then(res => res.json()).then(data => {
             for (let i = 0; i <= 3; i++) {
                 let html = "";
                 let newMovieId = data.results[3].id
                 console.log(data.results[3])
                 let poster = data.results[3].poster_path
                 let backDrop = (data.results[3].backdrop_path)
                 html += `<div class="trendingdiv">`
                 html += `<img class="trendingflix" src="trendingflix.svg" width="20px" height="20px" alt="logo">`
                 html += `<p class="trendingflix-title">${data.results[3].original_title}</p>`
                 html += `<img id="play-btn" onclick="showTrailer()" type="button" src="playbtn.svg" alt="btn">`
                 html += `<img class="trending-btn"  type="button" onclick="addMovies(${newMovieId})" src="addtowatchlistbtn.svg" alt="btn">`
                 html += `</div>`
                 html += `<div class="summarydiv">`
                 html += `<span class="trendingflix-summary">${data.results[2].overview}</p>`
                 html += `</div>`
                 fetch(`https://api.themoviedb.org/3/movie/${newMovieId}/videos?api_key=00f190c8081e28e8456dfb59457bb2bd&language=en-US`, options).then(res => res.json()).then(data => {
                     html += `<img class="mini-trailer-poster" src="https://image.tmdb.org/t/p/w500${poster}">`
                     html += `<img class="trailer-poster" src="https://image.tmdb.org/t/p/w500${backDrop}">`
                     html += `<iframe  class="trailer" loading="lazy"  style="border:none;" allow="autoplay" src="https://www.youtube.com/embed/${data.results[i].key}?autoplay=1&" ></iframe>`
                     $(".upcoming-movie").html(html);
                 })
             }

         })
     }

     TrendingMovie()

     function searchMovie() {
         let html = ''
         fetch(`https://api.themoviedb.org/3/search/multi?api_key=00f190c8081e28e8456dfb59457bb2bd&language=en-US&page=1&include_adult=falsehttps://api.themoviedb.org/3/search/company?api_key=00f190c8081e28e8456dfb59457bb2bd&query=${search}&page=1`, options).then(res => res.json()).then(data => {
             for (let i = 0; i <= data.length; i++) {
                 let poster = data.results[i].poster_path
                 let movieTitle = data.results[i].title
                 let movieRating = data.results[i].vote_average
                 html + `<div class="search-card">`
                 html += `<div class="search-card-body">`
                 html += `<img class="search-img" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="searchimg">`
                 html += `<h3 class="search-title">${movieTitle}</h3>`
                 html += `<h3 class="search-rating">${movieRating}</h3>`
                 html += `</div>`
                 html += `</div>`
                 $('.search-container').html(html)
             }
         })
     }


     function showTrailer() {
         $('.trendingdiv').css('display', 'none')
         $('.summarydiv').css('display', 'none')
         $('.mini-trailer-poster').css('display', 'none')
         $('.trailer-poster').css('display', 'none')
         $('.trailer').css('display', 'inline')
         $('.trailer').css('opacity', '100')
     }

     newMovies()

     function newMovies() {
         let html = ''
         fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=00f190c8081e28e8456dfb59457bb2bd&language=en-US&page=1', options).then(res => res.json()).then(data => {
             for (let i = 0; i <= 3; i++) {
                 html += `<div class="new-movies-div"><img class="movie rounded" src="https://image.tmdb.org/t/p/w500${data.results[i].poster_path}"><button id=${data.results[i].id} type="button" data-bs-toggle="modal" data-bs-target="#newMovieModal" class="newmovies-btn">Details</button></div>`
                 let newMovieId = data.results[i].id
             }
             $('.new-movies').html(html)
         })
     }

     newMovies()


     function recommendedMoviesOne() {
         let html = ''
         fetch('https://api.themoviedb.org/3/movie/%20646389/recommendations?api_key=00f190c8081e28e8456dfb59457bb2bd&language=en-US&page=1', options).then(res => res.json()).then(data => {
             for (let i = 0; i <= 1; i++) {
                 console.log(data.results[i])
                 html += `<div>`
                 html += `<div class="fill"> <img src="https://image.tmdb.org/t/p/w500${data.results[i].backdrop_path}" className="img" alt="..."></div>`
                 html += `<img src="https://image.tmdb.org/t/p/w500${data.results[i].poster_path}" class="mini-rec-poster" alt="...">`
                 html += `<button id=${data.results[i].id} data-bs-toggle="modal" data-bs-target="#recMovieModal" class="rec-movies-btn">Details</button>`
                 html += `<button id=${data.results[i].id} onclick="addMovies(${data.results[i].id})"  class="rec-watchlist-btn"> Add To WatchList</button>`
                 html += `</div>`
             }
             $('.recommended-movies').append(html)
         })
     }

     recommendedMoviesOne()


     function myMovies() {
         let html = ''
         fetch('http://localhost:3000/movies')
             .then(response => response.json())
             .then(movieData => {
                 movieData.map(data => {
                     html += `<div class="media-element"><img src="${data.imgUrl}" class="my-movies" alt="..."><button id=${data.id} data-bs-toggle="modal" data-bs-target="#exampleModal" class="my-movies-btn">Details</button></div>`
                 })
                 $('.media-scroller').html(html)
             })
             .catch(error => console.log(error))
     }

     myMovies()




     function modalDetails(id) {
         fetch(`http://localhost:3000/movies/${id}`)
             .then(response => response.json())
             .then(data => {
                 const {title, genre, imgUrl, rating, summary, id} = data; // get data fields from response
                 let movieId= id;
                 let html = "";
                 html += `<h3 id="modal-title"> ${title}</h3>`;
                 html += `<span class="modal-genre"> Genre: ${genre}</span>`;
                 html += `<p class="modal-rating"> Rating: ${rating}</p>`;
                 html += `<img class="modal-image" src="${imgUrl}"</p>`;
                 html += `<h2 class="modal-summary-header"> Summary:</h2>`;
                 html += `<p class="modal-summary"> ${summary}"</p>`;
                 $(".editRating").append(`<div class="input-group input-group-sm mb-3"> <br> <input type="text" class="editInput form-control" aria-label="Sizing example input" value="${rating}" name="editInput" aria-describedby="inputGroup-sizing-sm"> </div>`)
                 html += ` <button type="button" data-bs-toggle="modal" data-bs-target="#editRating" class="edit btn btn-danger">Edit Rating</button>`
                 html += `<br>`
                 html += ` <button id="${id}" type="button" onclick="deleteMovies(id)" class="delete btn btn-danger">Delete Movie</button>`
                 $(".modal-body").html(html)
                 $(".modal-footer").append(`<button type="button" id="${id}" onclick="editMovies(${id})" class="btn btn-danger">Save changes</button>`)
             })
             .catch(error => {
                 console.error(error);
             });

     }

     function newModalMovie(id) {
         fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=00f190c8081e28e8456dfb59457bb2bd&language=en-US\n`, options)
             .then(response => response.json())
             .then(data => {
                 const { title, poster_path, vote_average, summary, overview} = data;
                 let html = "";
                 let movieId = id
                 html += `<div class='card modalCard'>`
                 html += `<h3 id="modal-title"> ${title}</h3>`;
                 html += `<p class="modal-rating"> Rating: ${vote_average}</p>`;
                 html += `<h2 class="modal-summary-header"> Summary:</h2>`;
                 html += `<p class="modal-summary"> ${overview} </p>`;
                 html += `<div class='movieDiv'>`
                 html += `</div>`
                 html += ` <button id="${movieId}" type="button" onclick="addMovies(${id})" class="add-to-watchlist btn btn-danger">Add To Watchlist</button>`
                 html += `</div>`
                 $("#new-modal-body").html(html); //
             })
     }
function recModalMovie(id) {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=00f190c8081e28e8456dfb59457bb2bd&language=en-US\n`, options)
        .then(response => response.json())
        .then(data => {
            const {title, poster_path, vote_average, summary, overview,key} = data;
            let html = "";
            let movieId = id
            html += `<h3 id="modal-title"> ${title}</h3>`;
            html += `<p class="modal-rating"> Rating: ${vote_average}</p>`;
            html += `<h2 class="modal-summary-header"> Summary:</h2>`;
            html += `<p class="modal-summary"> ${overview} </p>`;
            html += `<button type="button" onclick="addMovies(${id})" class="add-to-watchlist btn btn-danger"> Add To Watchlist </button>`
            $("#rec-movie-modal").html(html); //
        })
}

     function getTrailer(id) {
         fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=00f190c8081e28e8456dfb59457bb2bd&language=en-US`, options)
             .then(response => response.json())
             .then(data => {
                 const {key} = data;
                 console.log(data.results[1].key)
                 let html = "";
                 html += `<iframe id="movie-trailers" style="border:none;" width="450" height="300" src="https://www.youtube.com/embed/${data.results[0].key}?autoplay=0&"></iframe>`
                 $(".movieDiv").html(html); //
             })
     }
function getTrailer2(id) {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=00f190c8081e28e8456dfb59457bb2bd&language=en-US`, options)
        .then(response => response.json())
        .then(data => {
            // const {key} = data;
            console.log(data.results)
            let html = "";
            html += `<iframe id="movie-trailers" style="border:none;" width="450" height="300" src="https://www.youtube.com/embed/${data.results[1].key}?autoplay=0&"></iframe>`
            $("#rec-movie-modal").append(html); //
        })
}



     function clearModal() {
         $('.btn-close').on("click", function () {
             $('.modal-body').empty()

         })
     }



      setTimeout(() => {
         $(".newmovies-btn").click(function (event) {
             console.log("view details")
             event.preventDefault();
             let id = event.target.id;
             newModalMovie(id)
             getTrailer(id)
             clearModal()

         })
     }, 1600)





     setTimeout(() => {
         $(".my-movies-btn").click(function (event) {
             console.log("view details")
             event.preventDefault();
             let id = event.target.id;
             modalDetails(id)
             clearModal()
         })
     }, 2000)


     function deleteMovies(id) {
         console.log('test')
         fetch(`http://localhost:3000/movies/${id}`, {
             method: 'DELETE',

         })
             .then(res => res.json())
             .then(data => console.log(data))
             .catch(error => console.log(error));
         location.reload()
     }

  function editMovies(id) {
         console.log(id)
      console.log( $(".editInput").val().toString())
      fetch(`http://localhost:3000/movies/${id}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify( {
              rating: $(".editInput").val().toString()
          })
      })
          .then(resp => resp.json())
          .then(data => data)
          .catch(error => console.error(error))
      location.reload()
  }
  function addMovies(id) {
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=00f190c8081e28e8456dfb59457bb2bd&language=en-US\n`, options)
          .then(response => response.json())
          .then(data => {
              console.log(data)
              let movieTitle = data.title;
              let movieRating = data.vote_average;
              let movieDescrip = data.overview;
              let movieImage = 'https://image.tmdb.org/t/p/w500' + data.poster_path;

              fetch('http://localhost:3000/movies', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      title: movieTitle,
                      genre: "N/A",
                      rating: movieRating + "/10",
                      imgUrl: movieImage,
                      summary: movieDescrip
                  })
              }).then(response => myMovies());
          });
  }



  setTimeout(() => {
      $(".rec-movies-btn").click(function (event) {
          console.log("rec modal")
          // event.preventDefault();
          let id = event.target.id;
          recModalMovie(id)
          getTrailer2(id)
          clearModal()
      })
  }, 2000)




