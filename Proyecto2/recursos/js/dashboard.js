let generos = new Map();
generos.set("Action", {"num": 0, "pic": {"url": "https://images7.alphacoders.com/306/306919.jpg", "nombre": "Bleach", "anime_id": 269, "manga_id": 12}})
generos.set("Adventure", {"num": 0, "pic": {"url": "https://images7.alphacoders.com/729/thumb-1920-729209.jpg", "nombre": "Full Metal Alchemist", "anime_id": 121, "manga_id": 25}})
generos.set("Avant Garde", {"num": 0, "pic": {"url": "https://images8.alphacoders.com/695/695227.jpg", "nombre": "Neon Genesis Evangelion", "anime_id": 339, "manga_id": 698}})
generos.set("Boys Love", {"num": 0, "pic": {"url": "https://wallpapercave.com/wp/wp7283079.png", "nombre": "Given", "anime_id": 39533, "manga_id": 79085}})
generos.set("Comedy", {"num": 0, "pic": {"url": "https://wallpaperaccess.com/full/4804007.png", "nombre": "Danshi koukousei no nichijou", "anime_id": 11843, "manga_id": 26144}})
generos.set("Drama", {"num": 0, "pic": {"url": "https://wallpaperaccess.com/full/1083911.jpg", "nombre": "Natsume Yuujinchou", "anime_id": 4081, "manga_id": 1859}})
generos.set("Fantasy", {"num": 0, "pic": {"url": "https://images2.alphacoders.com/776/thumb-1920-776081.jpg", "nombre": "Little Witch Academia", "anime_id": 33489, "manga_id": 93692}})
generos.set("Girls Love", {"num": 0, "pic": {"url": "https://images8.alphacoders.com/695/695848.png", "nombre": "Yuru Yuri", "anime_id": 10495, "manga_id": 11593}})
generos.set("Gourmet", {"num": 0, "pic": {"url": "https://images6.alphacoders.com/697/thumb-1920-697221.png", "nombre": "Shokugeki no Souma", "anime_id": 28171, "manga_id": 45757}})
generos.set("Horror", {"num": 0, "pic": {"url": "https://images8.alphacoders.com/914/thumb-1920-914289.jpg", "nombre": "Mahou Shoujo Site", "anime_id": 36266, "manga_id": 57295}})
generos.set("Mystery", {"num": 0, "pic": {"url": "https://images5.alphacoders.com/945/thumb-1920-945730.png", "nombre": "Yakusoku no Neverland", "anime_id": 37779, "manga_id": 100128}})
generos.set("Romance", {"num": 0, "pic": {"url": "https://images7.alphacoders.com/871/871488.jpg", "nombre": "Hyouka", "anime_id": 12189, "manga_id": 41629}})
generos.set("Sci-Fi", {"num": 0, "pic": {"url": "https://wallpaperaccess.com/full/2012826.jpg", "nombre": "Eureka Seven", "anime_id": 237, "manga_id": 1037}})
generos.set("Slice of Life", {"num": 0, "pic": {"url": "https://wallpaperaccess.com/full/6351957.png", "nombre": "Hitoribocchi no ○○ Seikatsu", "anime_id": 37614, "manga_id": 89467}})
generos.set("Sports", {"num": 0, "pic": {"url": "https://wallpapercave.com/wp/wp4786465.png", "nombre": "Ryuuou no Oshigoto!", "anime_id": 35905, "manga_id": 94818}})
generos.set("Supernatural", {"num": 0, "pic": {"url": "https://images3.alphacoders.com/228/thumb-1920-228275.jpg", "nombre": "Shaman King", "anime_id": 42205, "manga_id": 50}})
generos.set("Suspense", {"num": 0, "pic": {"url": "https://wallpapercave.com/wp/wp1833405.jpg", "nombre": "Another", "anime_id": 11111, "manga_id": 24098}})


var this_page = 0;
var tipo = "anime"

let selectorg = document.querySelector('select#genre-selector')
let bloque = document.querySelector('div.ani-prom-genre');
let space = bloque.querySelector('div.carousel-inner');
let barra = bloque.querySelector('ol.carousel-indicators');
let hi_queries = []

function allGenresInfo(){
    let img = document.createElement('img')
    img.src = "https://wallpaperaccess.com/full/5088961.jpg"
    img.className = "ani-genre-pic mb-3 mx-2"
    img.display = "block"
    img.alt = "Todos"
    img.backgroundColor = "#3d3017"
    return img
}

function agregarGeneros(){
    let img = allGenresInfo()
    let seccion = document.querySelector('h6.ani-title-info')
    seccion.insertAdjacentElement("afterend", img)
    let g_iterator = generos.keys()
    let genero = g_iterator.next()
    let q = document.getElementById('genre-selector')
    while (!genero.done) {
        let option = `<option value="${genero.value}">${genero.value}</option>`
        q.innerHTML += option
        genero = g_iterator.next()
    }
}

async function contarAnimesGeneros(url) {
    let data = await getJSONData(url)
    let arreglo = data['data'];
    for (anime of arreglo) {
        let an_genres = anime['genres']
        for (genero of an_genres) 
            if (genero['name'] in generos) {
                generos[genero['name']]['num'] += 1
            }
    }
}

async function crearGenreStats(tipo) {
    for(let [clave, valor] of generos) {
        generos.get(clave)['num'] = 0
    }

    var url = `https://anmedjacome.github.io/ProyectoDAWMP1/Proyecto2/recursos/json/${tipo}/${tipo}%20(0).json`
    contarAnimesGeneros(url)

    let counter = 1
    space.innerHTML = ""
    barra.innerHTML = ""
    query = `
        <li
            data-mdb-target="#AniCarouselGenres"
            data-mdb-slide-to="0"
            class="active"
            aria-current="true"
        ></li>
    `
    barra.innerHTML += query

    for (let [clave, valor] of generos) {
        let query = `<div class="carousel-item ani-bg-table rounded d-flex flex-row align-items-center justify-content-around p-4`
        query += (clave ==="Action") ? ` active">` : `">`
        query += `
                <i class="fa fa-chart-pie fa-5x icon-color-1"></i>
                <div id="Div-stats-${counter}" class="ms-3">
                    <p class="mb-2">${clave}</p>
                    <h6 class="mb-0">${valor["num"]}</h6>
                </div>
            </div>
        `
        space.innerHTML += query
        if (counter < 17) {
            query = `
                <li
                    data-mdb-target="#AniCarouselGenres"
                    data-mdb-slide-to="${counter++}"
                    class=""
                ></li>
            `
            barra.innerHTML += query
        }
    }    
}

async function cargarGenreStats(tipo, page) {
    var url = `https://anmedjacome.github.io/ProyectoDAWMP1/Proyecto2/recursos/json/${tipo}/${tipo}%20(${this_page}).json`
    for(let [clave, valor] of generos) {
        generos.get(clave)['num'] = 0
    }
    this_page = page - 1
    contarAnimesGeneros(url)

    let counter = 1

    for (let [clave, valor] of generos) {
        let div_stats = document.getElementById(`Div-stats-${counter++}`)
        div_stats.innerHTML = `
            <p class="mb-2">${clave}</p>
            <h6 class="mb-0">${valor["num"]}</h6>
        `
    }
}

async function cargarAllGenreStats(tipo, page) {
    var url = `https://anmedjacome.github.io/ProyectoDAWMP1/Proyecto2/recursos/json/${tipo}/${tipo}%20(${this_page}).json`
    for(let [clave, valor] of generos) {
        generos.get(clave)['num'] = 0
    }
    let tmp = this_page
    for (let i = 0 ; i < 100 ; i++) {
        this_page = i
        contarAnimesGeneros(url)
    
        let counter = 1
    
        for (let [clave, valor] of generos) {
            let div_stats = document.getElementById(`Div-stats-${counter++}`)
            div_stats.innerHTML = `
                <p class="mb-2">${clave}</p>
                <h6 class="mb-0">${valor["num"]}</h6>
            `
        }
    }
    this_page = tmp
}

selectorg.addEventListener('change', () => {
    
    let val = selectorg.options[selectorg.selectedIndex].value;
    let arreglo = document.querySelector('table.ani-table-info-1 tbody.ani-body');
    let list_anime = arreglo.getElementsByClassName('ani-table-row');
    let seccion = document.querySelector('h6.ani-title-info')

    for (let arr of list_anime) {
        let gnr_arr = arr.value;
        arr.style.display = searchGenre(gnr_arr, val);
    }

    var gener = (val !== "Todos") ? generos.get(val)["pic"] : ""
    let img = document.querySelector("img.ani-genre-pic")
    img.src = (val !== "Todos") ? gener["url"] : "https://wallpaperaccess.com/full/5088961.jpg"
    img.alt = (val !== "Todos") ? gener["nombre"] : "Todos"
    img.backgroundColor = "#3d3017"
    seccion.textContent = (val !== "Todos") ? "Recomendacion del género: " + gener["nombre"] : "Todos los géneros"
    seccion = document.querySelector('div.ani-plot')
    let type = (selector[selector.selectedIndex].value === "anime") ? "anime_id" : "manga_id"
    cambiarPlot(seccion, gener[type], (val !== "Todos"))
})

function searchGenre(gnr_arr, val) {
    for ( let e of gnr_arr) {
        if (val === "Todos" || e["name"] === val) return ""
    }
    return "none"
}