$(document).ready(function(){
    $('#searchForm').on('submit', (e) => {
        e.preventDefault();
        let input= $('#searchText').val();
        getMovies(input)
    });
  });


  function getMovies(input) {
      let APIkey = '53e64713';
      axios.get(`http://www.omdbapi.com/?s=${input}&apikey=${APIkey}`)
      .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index , movie) =>{
            output += `
                <div class="col-lg-4 col-md-3 col-sm-12 well">
                    <div class="content-box text-center">
                        <div class="img-box">
                           <img src="${movie.Poster}">
                        </div>     
                        <p class ="movie-names">
                            ${movie.Title}
                        </p>   
                        
                        <a herf="#" class="btn btn-primary" onclick=movieSelected('${movie.imdbID}')>
                         Movie Details
                        </a>
                    </div>
                </div>

            `
        });

        $('#movies').html(output);
      })
      .catch((err) => {
        console.log(err)
      });
  }

  function movieSelected(id){
    sessionStorage.setItem('movieId', id); 
    window.location = 'movie.html';
    return false;
  }

  function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    let APIkey = '53e64713';
    axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=${APIkey}`)
    .then((response) => {
        console.log(response);
        let output = `
            <div class="col-lg-4">
                <div class="img">
                    <img src="${response.data.Poster}">
                </div>
            </div>
            <div class="col-lg-6">
            <div class="box-content"> 
                <p> 
                   Movie Name: ${response.data.Title}                
                </p>
                <p> 
                   MovieYear: ${response.data.Year}                
                </p>   
                <p> 
                   MovieRate: ${response.data.Rated}                
                </p>
                <p> 
                   Movie Des: ${response.data.Plot}                
                </p> 
                <p> 
                   Movie Language: ${response.data.Language}                
                </p>        
                
                <a href="http://www.imdb.com/title/${response.data.imdbID}" class="btn btn-block btn-primary" target="_blank">View imdb</a>
                <a href="index.html" class="btn btn-block btn-primary">Back To Search</a>                                                                                    
            </div>
        </div>
        `

        $('#show-movie').html(output)
    })
    .catch((err)=>{
        console.log(err)
    });

  }