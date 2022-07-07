const GENEROS = ["Action", "Adventure", "Avant Garde", "Boys Love", "Comedy", "Drama", "Fantasy", "Girls Love", "Gourmet", 
"Horror", "Mystery", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Suspense"]
const DEMOGRAFIA  = ["Josei", "Kids", "Seinen", "Shoujo", "Shounen"]
const THEMES = [
    ["Space","Time Travel","Parody","Mecha","Anthropomorphic"], ["Music", "Adult Cast", "Idols (Male)", "Idols (Female)", "Racing"],
    ["Crossdressing", "Reverse Harem", "Harem", "Romantic Subtext", "Love Polygon"], ["School", "Visual Arts", "Video Game", "Gag Humor", "Performing Arts"],
    ["Martial Arts", "Team Sports", "Strategy Game", "Combat Sports", "Samurai"], ["Educational", "Historical", "Otaku Culture", "Medical", "Workplace"],
    ["Mahou Shoujo", "Magical Sex Shift", "Mythology", "Isekai", "Reincarnation"], ["Detective", "Delinquents", "Psychological", "Organized Crime", "Military"],
    ["Showbiz", "Pets", "CGDCT", "Iyashikei", "Childcare"], ["Gore", "Survival", "High Stakes Game", "Super Power", "Vampire"]
]
const THEMES_T = [
    "Space","Time Travel","Parody","Mecha","Anthropomorphic", "Music", "Adult Cast", "Idols (Male)", "Idols (Female)", "Racing",
    "Crossdressing", "Reverse Harem", "Harem", "Romantic Subtext", "Love Polygon", "School", "Visual Arts", "Video Game", "Gag Humor", "Performing Arts",
    "Martial Arts", "Team Sports", "Strategy Game", "Combat Sports", "Samurai", "Educational", "Historical", "Otaku Culture", "Medical", "Workplace",
    "Mahou Shoujo", "Magical Sex Shift", "Mythology", "Isekai", "Reincarnation", "Detective", "Delinquents", "Psychological", "Organized Crime", "Military",
    "Showbiz", "Pets", "CGDCT", "Iyashikei", "Childcare", "Gore", "Survival", "High Stakes Game", "Super Power", "Vampire"
]
const LOAD = document.getElementById("Load-indicator");
const BAR = document.querySelector("div#Progress-bar-1");

var contador = 1;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchValues(tipo){
    let respuesta = await fetch(`https://api.jikan.moe/v4/genres/${tipo}`);
    let data = await respuesta.json();
    return data["data"]
}

async function getNumAniMan(arreglo) {
    let numeros = []

    let gs = new Map()
    let dem = new Map()
    let thm = new Map()

    let load_text = "Cargando"
    for (let item of arreglo) {
        let progress = (contador * 100)/arreglo.length
        let it = item["name"]

        if (GENEROS.includes(it)) {
            gs.set(it, parseInt(item["count"]))
        }

        else if (DEMOGRAFIA.includes(it)) {
            dem.set(it, parseInt(item["count"]))
        }

        else if (THEMES_T.includes(it)) {
            thm.set(it, parseInt(item["count"]))
        }
        
        if ((contador % 5) == 1) LOAD.textContent = load_text + "."
        else LOAD.textContent += "."
        BAR.querySelector("div.progress-bar").style.width = progress.toString() + "vw"
    }

    numeros.push(gs)
    numeros.push(dem)
    numeros.push(thm)

    return numeros
}

async function getArrayAniMan(andata, mandata)  {
    let both = []
    both.push(await getNumAniMan(andata))
    both.push(await getNumAniMan(mandata))
    return both
}

(async function ($) {
    "use strict";

    let load_text = LOAD.textContent
        
    if ((contador % 5) == 1) LOAD.textContent = load_text + "."
    else LOAD.textContent += "."
    let progress = contador++

    BAR.querySelector("div.progress-bar").style.width = progress.toString() + "vw"
    var spinner = async function () {
        let an_arreglo = await fetchValues("anime")
        let man_arreglo = await fetchValues("manga")
        let arreglo = await getArrayAniMan(an_arreglo, man_arreglo)
        console.log(arreglo)
        if (document.getElementById("Num-gnre-total") != null) {
            var ctx2 = $("#Num-gnre-total").get(0).getContext("2d");
            var myChart2 = new Chart(ctx2, {
                type: "line",
                data: {
                    labels: GENEROS,
                    datasets: [
                        {
                            label: "Anime",
                            data: [
                                (arreglo[0][0]).get("Action"), (arreglo[0][0]).get("Adventure"), (arreglo[0][0]).get("Avant Garde"), (arreglo[0][0]).get("Boys Love"), (arreglo[0][0]).get("Comedy"),
                                (arreglo[0][0]).get("Drama"), (arreglo[0][0]).get("Fantasy"), (arreglo[0][0]).get("Girls Love"), (arreglo[0][0]).get("Gourmet"), (arreglo[0][0]).get("Horror"),
                                (arreglo[0][0]).get("Mystery"), (arreglo[0][0]).get("Romance"), (arreglo[0][0]).get("Sci-Fi"), (arreglo[0][0]).get("Slice of Life"), (arreglo[0][0]).get("Sports"),
                                (arreglo[0][0]).get("Supernatural"), (arreglo[0][0]).get("Suspense")
                            ],
                            backgroundColor: "rgba(252, 215, 139, 0.8)",
                            fill: true,
                            pointStyle: 'rectRot',
                            pointRadius: 5,
                            pointBorderColor: '#3d3017'
                        },
                        {
                            label: "Manga",
                            data: [
                                (arreglo[1][0]).get("Action"), (arreglo[1][0]).get("Adventure"), (arreglo[1][0]).get("Avant Garde"), (arreglo[1][0]).get("Boys Love"), (arreglo[1][0]).get("Comedy"),
                                (arreglo[1][0]).get("Drama"), (arreglo[1][0]).get("Fantasy"), (arreglo[1][0]).get("Girls Love"), (arreglo[1][0]).get("Gourmet"), (arreglo[1][0]).get("Horror"),
                                (arreglo[1][0]).get("Mystery"), (arreglo[1][0]).get("Romance"), (arreglo[1][0]).get("Sci-Fi"), (arreglo[1][0]).get("Slice of Life"), (arreglo[1][0]).get("Sports"),
                                (arreglo[1][0]).get("Supernatural"), (arreglo[1][0]).get("Suspense")
                            ],
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
    
    
        // Salse & Revenue Chart
        if (document.getElementById("Num-demo-total") != null) {
            var ctx1 = $("#Num-demo-total").get(0).getContext("2d");
            var myChart1 = new Chart(ctx1, {
                type: "bar",
                data: {
                    labels: DEMOGRAFIA,
                    datasets: [
                        {
                            label: "Anime",
                            data: [
                                (arreglo[0][1]).get("Josei"), (arreglo[0][1]).get("Kids"), (arreglo[0][1]).get("Seinen"),
                                (arreglo[0][1]).get("Shoujo"), (arreglo[0][1]).get("Shounen")
                            ],
                            backgroundColor: "rgba(252, 215, 139, 0.8)",
                        },
                        {
                            label: "Manga",
                            data:  [
                                (arreglo[1][1]).get("Josei"), (arreglo[1][1]).get("Kids"), (arreglo[1][1]).get("Seinen"),
                                (arreglo[1][1]).get("Shoujo"), (arreglo[1][1]).get("Shounen")
                            ],
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
        for(let i = 1 ; i < 11 ; i++) {
            var ctx5 = $(`#pie-ani-chart-${i}`).get(0).getContext("2d");
            var myChart5 = new Chart(ctx5, {
                type: "pie",
                data: {
                    labels: THEMES[i - 1],
                    datasets: [{
                        backgroundColor: [
                            "rgba(252, 215, 139, 0.69)",
                            "rgba(252, 198, 96, 0.69)",
                            "rgba(189, 148, 72, 0.69)",
                            "rgba(125, 98, 47, 0.69)",
                            "rgba(61, 48, 23, 0.69)"
                        ],
                        data: [
                            arreglo[0][2].get(THEMES[i - 1][0]), arreglo[0][2].get(THEMES[i - 1][1]),
                            arreglo[0][2].get(THEMES[i - 1][2]), arreglo[0][2].get(THEMES[i - 1][3]),
                            arreglo[0][2].get(THEMES[i - 1][4])
                        ]
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
        console.log("LISTA MANGA")
        for(let i = 1 ; i < 11 ; i++) {
            var ctx5 = $(`#pie-man-chart-${i}`).get(0).getContext("2d");
            var myChart5 = new Chart(ctx5, {
                type: "pie",
                data: {
                    labels: THEMES[i - 1],
                    datasets: [{
                        backgroundColor: [
                            "rgba(252, 215, 139, 0.69)",
                            "rgba(252, 198, 96, 0.69)",
                            "rgba(189, 148, 72, 0.69)",
                            "rgba(125, 98, 47, 0.69)",
                            "rgba(61, 48, 23, 0.69)"
                        ],
                        data: [
                            arreglo[1][2].get(THEMES[i - 1][0]), arreglo[1][2].get(THEMES[i - 1][1]),
                            arreglo[1][2].get(THEMES[i - 1][2]), arreglo[1][2].get(THEMES[i - 1][3]),
                            arreglo[1][2].get(THEMES[i - 1][4])
                        ]
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
                        "rgba(252, 215, 139, 0.69)",
                        "rgba(252, 198, 96, 0.69)",
                        "rgba(189, 148, 72, 0.69)",
                        "rgba(125, 98, 47, 0.69)",
                        "rgba(61, 48, 23, 0.69)"
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
        BAR.querySelector("div.progress-bar").style.width = "100vw"
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
    
})(jQuery);
