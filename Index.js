//UI

$(document).ready(function loading() {
    $(".loader").fadeOut(1500, function () {
        $("body").css("overflow","auto")
    $(".screenLoading").fadeOut(500, function () {
    })
});
});
var typed = new Typed('#element', {
    strings: ['MMORPG games', 'Shooter games', 'Sailing games',
                'Anime games', 'Superhero games', "Pixel games"],
    typeSpeed: 50,
    backSpeed: 50,
    loop: true,
  });
    $("#xClose").click(function(){
        $("#alert").fadeOut(400);
        $("footer").css("display", "block");
        $("body").css("overflow", "auto");
        $("#containerOfGame").css("display", "block");
        $("#row").css("display", "flex");

        });

    $(".navText").click(function() {
        $(".navText").removeClass("active");
        $(this).addClass("active");
        const category = $(this).attr("category");
        getGames(category);
    });
    $(document).on("click", "#containerOfGame", function () {
        $("#alert").fadeIn(400);
        $("footer").css("display", "none");
        $("body").css("overflow", "hidden");
        $("#containerOfGame").css("display", "none");
        $("#row").css("display", "none");
        const gameId = $(this).attr("gameid")
        displayDetails(gameId);
    });

//END OF UI

//API

let gamescontainer = [];
async function getGames(category) {
    const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'f9ea172ee3mshf0037570413e34bp14c0e8jsn6eb6c5e3c505',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}}
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
    const response = await api.json();
    gamescontainer = response;
    addGames();
};

function addGames(){
    let cartona="";
    for(i=0;i<gamescontainer.length;i++){
        cartona+=`<div class="col-md-3 g-4">
            <div gameid="${gamescontainer[i].id}" id="containerOfGame" class="containerOfGame container pointer col-md-12 rounded-1 pb-2 p-0 shadow-sm">
                <img src="${gamescontainer[i].thumbnail}" class="imgg w-100 p-0 rounded-top-1">
                <div class="col-md-12 d-flex justify-content-between mt-3 py-2 w-100">
                    <h2 class="title col-md-6 fw-bold fs-5 ps-3 mb-0 align-self-center ">${gamescontainer[i].title}</h2>
                    <div class="offset-md-2"></div>
                    <button class="btn btn-free p-1 fw-bold rounded-3 col-md-4 me-3 ">Free</button>
                </div>
                <p class="ptext lead fs-6 ps-3 pe-3 my-2 ">${gamescontainer[i].short_description}</p>
                <div class="col-md-12 d-flex justify-content-between py-2 w-100 px-3">
                    <div class="backIcon rounded-1 d-flex justify-content-center align-items-center align-self-center">
                        <i class="icon-2 fw-bolder fa-solid fa-plus"></i>
                    </div>
                    <i class="icon fa-brands fa-windows"></i>
                </div>
            </div>
        </div>`;
    }
    document.getElementById("row").innerHTML = cartona;
}
getGames('mmorpg');



async function displayDetails(gameId) {
    const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'f9ea172ee3mshf0037570413e34bp14c0e8jsn6eb6c5e3c505',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}}
    const idOfGame = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`, options);
    const urlResponse = await idOfGame.json();
    $("#alert .container .col-md-4 img").attr("src", urlResponse.thumbnail);
    $("#alert .container .col-md-8 h2").html(urlResponse.title);
    $("#alert .container .col-md-8 .details").html(urlResponse.description);
};

