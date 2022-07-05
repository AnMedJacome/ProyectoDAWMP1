let generos = new Map()
generos.set('Action', {"num":0})
generos.set('Adventure', {"num":0})
generos.set('Avant Garde', {"num":0})
generos.set('Boys Love', {"num":0})
generos.set('Comedy', {"num":0})
generos.set('Drama', {"num":0})
generos.set('Fantasy', {"num":0})
generos.set('Girls Love', {"num":0})
generos.set('Gourmet', {"num":0})
generos.set('Horror', {"num":0})
generos.set('Mystery', {"num":0})
generos.set('Romance', {"num":0})
generos.set('Sci-Fi', {"num":0})
generos.set('Slice of Life', {"num":0})
generos.set('Sports', {"num":0})
generos.set('Supernatural', {"num":0})
generos.set('Suspense', {"num":0})



var this_page = 0;
var tipo = "anime"

let selectorg = document.querySelector('select#genre-selector')
let bloque = document.querySelector('div.ani-prom-genre');
let space = bloque.querySelector('div.carousel-inner');
let barra = bloque.querySelector('ol.carousel-indicators');
let hi_queries = []

let allGenresInfo = () => {
    
    let fig = document.createElement("figure");
    fig.className = "imghvr-slide-up mb-3 mx-2"
        let img = document.createElement('img')
        img.src = "https://wallpaperaccess.com/full/5088961.jpg"
        img.className = "ani-genre-pic"
        img.display = "block"
        img.alt = "Todos"
        img.backgroundColor = "#3d3017"
        let fcaption = document.createElement("figcaption")
            fcaption.className = "scrolldes-block"
            fcaption.innerHTML = `
            <h5>Sipnosis</h5>
            <p id="Sinopsis-rec">---</p>
            `
    fig.appendChild(img);
    fig.appendChild(fcaption);
    return fig
}

async function agregarGeneros(){
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
            if (generos.has(genero['name'])) {
                generos.get(genero['name'])['num'] += 1
            }
    }
}

async function crearGenreStats(tipo) {
    for(let valor of generos) {
        valor['num'] = 0
    }

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

    var url = `https://anmedjacome.github.io/ProyectoDAWMP1/Proyecto2/recursos/json/${tipo}/${tipo}%20(0).json`
    await contarAnimesGeneros(url)

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

async function cargarGenreStats(tipo) {
    let generos = await getJSONData("http://localhost:8080/Proyectos/ProyectoDAWMP1/Proyecto2/recursos/json/genres/recomendacion.json")
    var url = `https://anmedjacome.github.io/ProyectoDAWMP1/Proyecto2/recursos/json/${tipo}/${tipo}%20(${this_page}).json`
    for(let [clave, valor] of generos) {
        generos.get(clave)['num'] = 0
    }
    await contarAnimesGeneros(url)

    let counter = 1

    for (let [clave, valor] of generos) {
        let div_stats = document.getElementById(`Div-stats-${counter++}`)
        div_stats.innerHTML = `
            <p class="mb-2">${clave}</p>
            <h6 class="mb-0">${valor["num"]}</h6>
        `
    }
}

selectorg.addEventListener('change', async () => {
    
    let val = selectorg.options[selectorg.selectedIndex].value;
    let arreglo = document.querySelector('table.ani-table-info-1 tbody.ani-body');
    let list_anime = arreglo.getElementsByClassName('ani-table-row');
    let seccion = document.querySelector('h6.ani-title-info')

    for (let arr of list_anime) {
        let gnr_arr = arr.value;
        arr.style.display = searchGenre(gnr_arr, val);
    }

    let gnerox = await getJSONData("http://localhost:8080/Proyectos/ProyectoDAWMP1/Proyecto2/recursos/json/genres/recomendacion.json")

    var gener = (val !== "Todos") ? gnerox[val]["pic"] : ""
    let img = document.querySelector("figure.imghvr-slide-up img.ani-genre-pic")
    img.src = (val !== "Todos") ? gener["url"] : "https://wallpaperaccess.com/full/5088961.jpg"
    img.alt = (val !== "Todos") ? gener["nombre"] : "Todos"
    img.backgroundColor = "#3d3017"
    seccion.textContent = (val !== "Todos") ? "Recomendacion del género: " + gener["nombre"] : "Todos los géneros"
    seccion = document.querySelector('div.ani-plot')
    let type = (selector[selector.selectedIndex].value === "anime") ? "anime_id" : "manga_id"
    document.querySelector("div#genre-info").textContent = (val !== "Todos") ? gnerox[val]["description"] : "TODOS LOS ANIMES DISPONIBLES DE TODOS LOS GENEROS Y SUBGENEROS"
    cambiarPlot(seccion, gener[type], (val !== "Todos"))
})

function searchGenre(gnr_arr, val) {
    for ( let e of gnr_arr) {
        if (val === "Todos" || e["name"] === val) return ""
    }
    return "none"
}