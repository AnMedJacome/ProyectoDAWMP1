const GENEROS = ["Action", "Adventure", "Avant Garde", "Boys Love", "Comedy", "Drama", "Fantasy", "Girls Love", "Gourmet", 
"Horror", "Mystery", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Suspense"]
const DEMOGRAFIA  = ["Josei", "Kids", "Seinen", "Shoujo", "Shounen"]

async function numAniManGenres(tipo) {
    let respuesta = await fetch(`http://localhost:8080/recursos/json/genres/${tipo}.json`);
    let data = await respuesta.json();
    let arreglo = data["data"]
    let numeros = []
    for (let item of arreglo) {
        if (GENEROS.includes(item["name"]))
            numeros.push(parseInt(item["count"]))
    }
    return numeros
}
async function numAniManDemo(tipo) {
    let respuesta = await fetch(`http://localhost:8080/recursos/json/genres/${tipo}.json`);
    let data = await respuesta.json();
    let arreglo = data["data"]
    let numeros = []
    for (let item of arreglo) {
        if (DEMOGRAFIA.includes(item["name"]))
            numeros.push(parseInt(item["count"]))
    }
    return numeros
}

async function getNumberGenres()  {
    let ambos = []
    ambos.push(await numAniManGenres("anime"))
    ambos.push(await numAniManGenres("manga"))
    return ambos
}

async function getNumberDemo()  {
    let ambos = []
    ambos.push(await numAniManDemo("anime"))
    ambos.push(await numAniManDemo("manga"))
    return ambos
}

(async function ($) {
    "use strict";

    // Progress Bar
    /*
    $('.pg-bar').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});
    */


    // Worldwide Sales Chart
    if ($("#Num-gnre-total").get(0) !== null) {
        let arreglo = await getNumberGenres()
        var ctx2 = $("#Num-gnre-total").get(0).getContext("2d");
        var myChart2 = new Chart(ctx2, {
            type: "line",
            data: {
                labels: GENEROS,
                datasets: [{
                        label: "Anime",
                        data: arreglo[0],
                        backgroundColor: "rgba(252, 215, 139, 0.8)",
                        fill: true
                    },
                    {
                        label: "Manga",
                        data: arreglo[1],
                        backgroundColor: "rgba(227, 178, 86, 0.8)",
                        fill: true
                    }
                ]
                },
            options: {
                responsive: true
            }
        });
    }


    // Salse & Revenue Chart
    if ($("#Num-demo-total").get(0) !== null) {
        let arreglo = await getNumberDemo()
        var ctx1 = $("#Num-demo-total").get(0).getContext("2d");
        var myChart1 = new Chart(ctx1, {
            type: "bar",
            data: {
                labels: DEMOGRAFIA,
                datasets: [{
                        label: "Anime",
                        data: arreglo[0],
                        backgroundColor: "rgba(252, 215, 139, 0.8)"
                    },
                    {
                        label: "Manga",
                        data: arreglo[1],
                        backgroundColor: "rgba(227, 178, 86, 0.8)"
                    },
                ]
                },
            options: {
                responsive: true
            }
        });
    }
    

/*
    // Single Line Chart
    var ctx3 = $("#line-chart").get(0).getContext("2d");
    var myChart3 = new Chart(ctx3, {
        type: "line",
        data: {
            labels: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
            datasets: [{
                label: "Salse",
                fill: false,
                backgroundColor: "rgba(235, 22, 22, .7)",
                data: [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15]
            }]
        },
        options: {
            responsive: true
        }
    });


    // Single Bar Chart
    var ctx4 = $("#bar-chart").get(0).getContext("2d");
    var myChart4 = new Chart(ctx4, {
        type: "bar",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(235, 22, 22, .7)",
                    "rgba(235, 22, 22, .6)",
                    "rgba(235, 22, 22, .5)",
                    "rgba(235, 22, 22, .4)",
                    "rgba(235, 22, 22, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });


    // Pie Chart
    var ctx5 = $("#pie-chart").get(0).getContext("2d");
    var myChart5 = new Chart(ctx5, {
        type: "pie",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(235, 22, 22, .7)",
                    "rgba(235, 22, 22, .6)",
                    "rgba(235, 22, 22, .5)",
                    "rgba(235, 22, 22, .4)",
                    "rgba(235, 22, 22, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });


    // Doughnut Chart
    var ctx6 = $("#doughnut-chart").get(0).getContext("2d");
    var myChart6 = new Chart(ctx6, {
        type: "doughnut",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(235, 22, 22, .7)",
                    "rgba(235, 22, 22, .6)",
                    "rgba(235, 22, 22, .5)",
                    "rgba(235, 22, 22, .4)",
                    "rgba(235, 22, 22, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });
*/
    
})(jQuery);