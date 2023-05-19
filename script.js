let root = document.getElementById('root');
let url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9b702a6b89b0278738dab62417267c49'
let container = document.querySelector(".container");
let searchInp = document.getElementById('searchInp');
let api_key = 'api_key=7460d7b244aba833f74c699194ad403a'
let img_url = 'https://image.tmdb.org/t/p/w500'
let search_url = 'https://api.themoviedb.org/3/search/movie?api_key=7460d7b244aba833f74c699194ad403a&query='
let searchBtn = document.getElementById('search')
let logo = document.getElementById('general')
let yt = 'https://www.youtube.com/watch?v='
let trailer = document.createElement('div')
trailer.setAttribute('id','trailers')
let actors = document.createElement('div')
actors.setAttribute('id','actors')


fetch(url)
.then((r)=>r.json())
.then((res)=>res.results.forEach(e=>createCard(e)))  

function createCard(film) {
    let card = document.createElement('div')
    card.setAttribute('class', 'card')
    card.innerHTML=`
    <img src='${img_url+film.poster_path}'/>
    <p>${film.title}</p>
    <p style="display: none;" class='vote1'>${film.vote_average}</p>
    `
    root.appendChild(card)
    card.addEventListener('click',()=>{
        root.innerHTML = ''
        root.appendChild(container);
        root.appendChild(actors)
        root.appendChild(trailer)
    container.innerHTML = `
    <img id="background"  src = "${img_url+film.backdrop_path}"/>
  
   <div class="about">
   <div id="img"> 
   <img src = "${img_url+film.poster_path}">
    </div>
    <div id="text">
        <h4 style="color:white;"> ${film.title}<span style="color:#c24c7e"> ${film.release_date}</span></h4>
        <p style="color:white;">${film.overview}<p>
    </div>
    </div>
`
fetch(`https://api.themoviedb.org/3/movie/${film.id}/credits?api_key=9b702a6b89b0278738dab62417267c49`)
.then((r)=>r.json()).then((r)=>{
    r.cast.forEach((e)=> createActor(e))
    
    })
    fetch(`https://api.themoviedb.org/3/movie/${film.id}/videos?api_key=9b702a6b89b0278738dab62417267c49`)
    .then((r)=> r.json())
    .then((r)=>{
        r.results.forEach((e)=> createTrailer(e))
    })
})

card.addEventListener('mouseenter',()=>{
    let vote = document.getElementsByClassName('vote1');
    vote.setAttribute('class','vote')
})

// card.addEventListener('mouseleave',()=>{
   
// })
}


    
searchBtn.addEventListener('click',()=>{
    if(root.childElementCount !== 0){
        if (searchInp.value!== '') {
            while (root.firstChild) {
                root.removeChild(root.lastChild)
            }
        }
        fetch(search_url+searchInp.value)
        .then((r)=>r.json())
        .then((res)=>res.results.forEach(e=>createCard(e))
        
       )  }else{
        root.innerHTML = `<h1 style="color:white;"> այսպիսի արյունք չի գտնվել '${searchInp.value}' </h1>`
       }
    }
)

logo.addEventListener('click',()=>{
actors.innerHTML = ''
trailer.innerHTML = ''
searchInp.value = ''
root.innerHTML = ''
 fetch(url)
.then((r)=>r.json())
.then((res)=>res.results.forEach(e=>createCard(e)))  


})



function createActor(film) {
    let actor = document.createElement('div')
    actor.setAttribute('class','actor')
    actor.innerHTML =  `
    <img src='${img_url+film.profile_path}'/>
    <p>${film.name}</p>
    `
    actors.appendChild(actor)
}

function createTrailer(film) {
    let video = document.createElement('div')
    video.setAttribute('class','trailer')
    video.innerHTML = `
    <iframe class='video' src="https://www.youtube.com/embed/${film.key}" frameborder="0" ></iframe>
    `
    trailer.appendChild(video)
}












