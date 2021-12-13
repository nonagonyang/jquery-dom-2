
// <!-- Part Two - Movies App!

// Build an application that uses jQuery to do the following:
// Contains a form with two inputs for a title and rating along with a button to submit the form.
// When the form is submitted, capture the values for each of the inputs and append them to the DOM along with a button to remove each title and rating from the DOM.
// When the button to remove is clicked, remove each title and rating from the DOM. -->
function stringlength(title){ 
let inputText= title.value; 
if(inputText.length<=2){ 
alert(`Please input the movie title more than two characters`);
return false;}
else{ 
return true;
}
}



let movieID=1;
let moviesList = [];

//fill table by retriving data from user input.
//input will be extracted and added to the table when the submission button is clicked
$("#submitBtn").on("click",function(e){
    e.preventDefault();

    //retrive movie info from user input
    let title = $("#movie_title").val();
    let rating =$("#rating").val();

    //update memory
    movieID++
    let movieData={title,rating,movieID}
    moviesList.push(movieData)  

    //update DOM
    if(title.length>=2 && rating>=0 && rating<=10 ){
        $(generateTableRow(movieData)).appendTo("#movie_table") 
    }
})


function generateTableRow(movieData) {
    return `
      <tr>
        <td>${movieData.title}</td>
        <td>${movieData.rating}</td>
        <td>
          <button id= ${movieData.movieID} class= "deleteBtn">Delete</button>
        </td>
      <tr>
    `;
  }

//remove the relevant table row when user clicks deleteBtn
$("tbody").on("click",".deleteBtn",function(e){
    //update DOM
    $(e.target).closest("tr").remove()
    //update memory
    let deleteIndex = moviesList.findIndex(movie => movie.movieID === $(e.target).attr("id"))
    moviesList.splice(deleteIndex,1)
})


//Sort Table by Clicking the Table Headers
//when the header of the table is clicked, sort the JS table and update DOM
//Click Header "title"Sort the list of movies alphabetically based on the movie titles 
//Click header "rating"Sort the list of movies based on rating 
$("th").on("click",function(evt){
    $("#table_body").empty();
    let sortedMovies = moviesList.sort(function(a,b){
        if ($(evt.target).attr("id")==="title"){
            if ( a.title < b.title ){
                return -1;
              }
              if ( a.title > b.title ){
                return 1;
              }
              return 0;
            }
        if ($(evt.target).attr("id")==="rating"){
            return a.rating - b.rating
        }

    });
    for (let movie of sortedMovies) {
        $(generateTableRow(movie)).appendTo("#movie_table")
      }

})







    
   

