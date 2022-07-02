const GENEROS = ["Action", "Adventure", "Avant Garde", "Boys Love", "Comedy", "Drama", "Fantasy", "Girls Love", "Gourmet", 
"Horror", "Mystery", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Suspense"]
const DEMOGRAFIA  = ["Josei", "Kids", "Seinen", "Shoujo", "Shounen"]
const LOAD = document.getElementById("Load-indicator");
const BAR = document.querySelector("div#Progress-bar-1");

var contador = 1;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getGenreValues(tipo){
    let respuesta = await fetch(`https://anmedjacome.github.io/ProyectoDAWMP1/Proyecto2/recursos/json/genres/${tipo}.json`);
    let data = await respuesta.json();
    return data["data"]
}

async function numAniManGenres(arreglo) {
    let numeros = []

    let load_text = LOAD.textContent
    for (let item of arreglo) {

        if (GENEROS.includes(item["name"])) {
        
            if ((contador % 5) == 1) LOAD.textContent = load_text + "."
            else LOAD.textContent += "."
            let progress = (contador++) * 5
        
            BAR.querySelector("div.progress-bar").style.width = progress.toString() + "vw"
            await sleep(30)
            
            numeros.push(parseInt(item["count"]))
        }
    }
    return numeros
}
async function numAniManDemo(arreglo) {
    let numeros = []

    let load_text = LOAD.textContent
    for (let item of arreglo) {

        if (GENEROS.includes(item["name"])) {
        
            if ((contador % 5) == 1) LOAD.textContent = load_text + "."
            else LOAD.textContent += "."
            let progress = (contador++) * 5
        
            BAR.querySelector("div.progress-bar").style.width = progress.toString() + "vw"
            await sleep(10)

            numeros.push(parseInt(item["count"]))
        }
    }
    return numeros
}

async function getNumberGenres(andata, mandata)  {
    let ambos = []
    ambos.push(await numAniManGenres(andata))
    ambos.push(await numAniManGenres(mandata))
    return ambos
}

async function getNumberDemo(andata, mandata)  {
    let ambos = []
    ambos.push(await numAniManDemo(andata))
    ambos.push(await numAniManDemo(mandata))
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
    let load_text = LOAD.textContent
        
    if ((contador % 5) == 1) LOAD.textContent = load_text + "."
    else LOAD.textContent += "."
    let progress = contador++

    BAR.querySelector("div.progress-bar").style.width = progress.toString() + "vw"
    var spinner = async function () {
        let an_arreglo = await getGenreValues("anime")
        let man_arreglo = await getGenreValues("manga")
        if (document.getElementById("Num-gnre-total") != null) {
            let arreglo = await getNumberGenres(an_arreglo, man_arreglo)
            var ctx2 = $("#Num-gnre-total").get(0).getContext("2d");
            var myChart2 = new Chart(ctx2, {
                type: "line",
                data: {
                    labels: GENEROS,
                    datasets: [{
                            label: "Anime",
                            data: arreglo[0],
                            backgroundColor: "rgba(252, 215, 139, 0.8)",
                            fill: true,
                            pointStyle: 'rectRot',
                            pointRadius: 5,
                            pointBorderColor: '#3d3017'
                        },
                        {
                            label: "Manga",
                            data: arreglo[1],
                            backgroundColor: "rgba(227, 178, 86, 0.8)",
                            fill: true,
                            pointStyle: 'rectRot',
                            pointRadius: 5,
                            pointBorderColor: '#1C160B'
                        }
                    ]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            labels: {
                                fontColor: "white",
                                fontSize: 18
                            }
                        },
                        scales: {
                            y: {
                                ticks: {
                                    color: "#bd9448",
                                    font: {
                                      size: 10,
                                      lineHeight: 1.2
                                    },
                                    stepSize: 400,
                                    beginAtZero: true
                                }
                            },
                            x: {
                                ticks: {
                                    color: "#e3b256",
                                    font: {
                                      size: 10,
                                      lineHeight: 1.2
                                    },
                                    beginAtZero: true
                                }
                            }
                        }
                    }
            });
        }
    
        if (document.getElementById("Num-demo-total") != null && document.getElementById("Num-gnre-total") != null) {
            if ((contador % 5) == 1) LOAD.textContent = load_text + "."
            else LOAD.textContent += "."
            progress = contador++
        
            await sleep(20)
        
            BAR.querySelector("div.progress-bar").style.width = progress.toString() + "vw"
        }
    
    
        // Salse & Revenue Chart
        if (document.getElementById("Num-demo-total") != null) {
            let arreglo = await getNumberDemo(an_arreglo, man_arreglo)
            var ctx1 = $("#Num-demo-total").get(0).getContext("2d");
            var myChart1 = new Chart(ctx1, {
                type: "bar",
                data: {
                    labels: DEMOGRAFIA,
                    datasets: [{
                            label: "Anime",
                            data: arreglo[0],
                            backgroundColor: "rgba(252, 215, 139, 0.8)",
                        },
                        {
                            label: "Manga",
                            data: arreglo[1],
                            backgroundColor: "rgba(227, 178, 86, 0.8)",
                        },
                    ]
                    },
                    options: {
                        responsive: true,
                        legend: {
                            labels: {
                                color: "white",
                                font: {
                                  size: 10,
                                },
                            }
                        },
                        scales: {
                            y: {
                                ticks: {
                                    color: "#bd9448",
                                    font: {
                                      size: 10,
                                      lineHeight: 1.2
                                    },
                                    stepSize: 400,
                                    beginAtZero: true
                                }
                            },
                            x: {
                                ticks: {
                                    color: "#e3b256",
                                    font: {
                                      size: 10,
                                      lineHeight: 1.2
                                    },
                                    beginAtZero: true
                                }
                            }
                        }
                    }
            });
        }
    
        
        // Pie Chart
        for(let i = 1 ; i < 12 ; i++) {
            var ctx5 = $(`#pie-man-chart-${i}`).get(0).getContext("2d");
            var myChart5 = new Chart(ctx5, {
                type: "pie",
                data: {
                    labels: ["Italy", "France", "Spain", "USA", "Argentina"],
                    datasets: [{
                        backgroundColor: [
                            "rgba(252, 215, 139, 0.69)",
                            "rgba(252, 198, 96, 0.69)",
                            "rgba(189, 148, 72, 0.69)",
                            "rgba(125, 98, 47, 0.69)",
                            "rgba(61, 48, 23, 0.69)"
                        ],
                        data: [(55*i)-(i*i*3), (49*i)-(i*i*3), (44*i)-(i*i*3), (24*i)-(i*i*3), (15*i)-(i*i*3)]
                    }]
                },
                options: {
                    responsive: true,
                    legend: {
                        labels: {
                            color: "white",
                            font: {
                              size: 10,
                            },
                        }
                    }
                }
            });
        }
        for(let i = 1 ; i < 11 ; i++) {
            var ctx5 = $(`#pie-ani-chart-${i}`).get(0).getContext("2d");
            var myChart5 = new Chart(ctx5, {
                type: "pie",
                data: {
                    labels: ["Italy", "France", "Spain", "USA", "Argentina"],
                    datasets: [{
                        backgroundColor: [
                            "rgba(252, 215, 139, 0.69)",
                            "rgba(252, 198, 96, 0.69)",
                            "rgba(189, 148, 72, 0.69)",
                            "rgba(125, 98, 47, 0.69)",
                            "rgba(61, 48, 23, 0.69)"
                        ],
                        data: [(55*i)-(i*i*3), (49*i)-(i*i*3), (44*i)-(i*i*3), (24*i)-(i*i*3), (15*i)-(i*i*3)]
                    }]
                },
                options: {
                    responsive: true,
                    legend: {
                        labels: {
                            color: "white",
                            font: {
                              size: 10,
                            },
                        }
                    }
                }
            });
        }
    
    
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
                responsive: true,
                legend: {
                    labels: {
                        color: "white",
                        font: {
                          size: 10,
                        },
                    }
                }
            }
        });
        
        LOAD.textContent = "Cargado (〜￣▽￣)〜"
        await sleep(1000);
        $('#spinner').removeClass('show');
    };
    spinner();

    // Sidebar Toggler
    $('.sidebar-toggler-1').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });
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


*/
    
})(jQuery);
