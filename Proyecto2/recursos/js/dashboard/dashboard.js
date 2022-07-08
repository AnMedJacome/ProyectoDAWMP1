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
const COLORSTATS = [
    [
    "rgba(252, 215, 139, 0.69)",
    "rgba(61, 48, 23, 0.69)"
    ],
    [
    "rgba(252, 215, 139, 0.69)",
    "rgba(189, 148, 72, 0.69)",
    "rgba(61, 48, 23, 0.69)"
    ],
    [
    "rgba(252, 215, 139, 0.69)",
    "rgba(252, 198, 96, 0.69)",
    "rgba(125, 98, 47, 0.69)",
    "rgba(61, 48, 23, 0.69)"
    ],
    [
    "rgba(252, 215, 139, 0.69)",
    "rgba(252, 198, 96, 0.69)",
    "rgba(189, 148, 72, 0.69)",
    "rgba(125, 98, 47, 0.69)",
    "rgba(61, 48, 23, 0.69)"
    ]
]

var contador = 1;

var arreglo;

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
        
        if ((contador++ % 5) == 1) LOAD.textContent = load_text + "."
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

document.addEventListener("DOMContentLoaded", async () => {
    let load_text = LOAD.textContent
        
    if ((contador % 5) == 1) LOAD.textContent = load_text + "."
    else LOAD.textContent += "."
    let progress = contador++
    let an_arreglo = await fetchValues("anime")
    let man_arreglo = await fetchValues("manga")
    arreglo = await getArrayAniMan(an_arreglo, man_arreglo)

    if (document.getElementById("Num-gnre-total") !== null) mostrarPorDemografia()
    if (document.getElementById("Num-demo-total") != null) mostrarPorGenero()
    if (document.getElementById("Stats-defecto") != null) {
        for(let i = 1 ; i < 11 ; i++) {
            var ctx5 = document.getElementById(`pie-ani-chart-${i}`).getContext("2d");
            var myChart5 = new Chart(ctx5, {
                type: "pie",
                data: {
                    labels: THEMES[i - 1],
                    datasets: [{
                        backgroundColor: COLORSTATS[3],
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
        for(let i = 1 ; i < 11 ; i++) {
            var ctx5 = document.getElementById(`pie-man-chart-${i}`).getContext("2d");
            var myChart5 = new Chart(ctx5, {
                type: "pie",
                data: {
                    labels: THEMES[i - 1],
                    datasets: [{
                        backgroundColor: COLORSTATS[3],
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
    }
    if (document.getElementById("Comparar-stats") != null) agregarOpcionesGenero()

    BAR.querySelector("div.progress-bar").style.width = "100vw"
    LOAD.textContent = "Cargado (〜￣▽￣)〜"
    await sleep(1000);
    $('#spinner').removeClass('show');
})