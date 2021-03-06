const TOTAL_PAGES = 100;
const COUNT_ELEMENT = 25;
const THEAD = document.querySelector('table.ani-table-info-1 thead.ani-head');
const TBODY = document.querySelector('table.ani-table-info-1 tbody.ani-body');
const LOAD = document.getElementById("Load-indicator");
const BAR = document.querySelector("div#Progress-bar-1");

var thisPage = 0;
var tipo = "anime"

let texto = document.getElementById("Ani-num-page");
let selector = document.querySelector('select.format-selector')

async function paginacion(data) {
    let arreglo = data['data']
    let contador = 1;
    TBODY.innerHTML = ""

    let load_text = LOAD.textContent
    for (let anime of arreglo) {
        let progress = (contador * 100)/arreglo.length;
    
        if ((contador % 5) == 1) LOAD.textContent = load_text + "."
        else LOAD.textContent += "."

        BAR.querySelector("div.progress-bar").style.width = progress.toString() + "vw"
        await sleep(80)

        if (tipo === "anime")
            TBODY.appendChild(filaAnime(anime, contador++, COUNT_ELEMENT, thisPage));
        else
            TBODY.appendChild(filaManga(anime, contador++, COUNT_ELEMENT, thisPage));
    }
    BAR.querySelector("div.progress-bar").style.width = "100vw"
    LOAD.textContent = "Cargado (〜￣▽￣)〜"
    await sleep(1000)
    document.querySelector('div#spinner').classList.remove('show');
    document.getElementById("Load-indicator").style.display = "none"
    document.querySelector("div#Progress-bar-1").style.display = "none"
}

let active = () => {
    let spin = document.querySelector('div#spinner')
    spin.classList.add('show')
    LOAD.style.display = ""
    LOAD.textContent = "Cargando"
    BAR.querySelector("div.progress-bar").style.width = "0vw"
    BAR.style.display = ""
}

let cargarDatos = async () => {
    let qu_thead = (tipo === "anime") ? `
        <tr>
            <th class="titulo-primario" scope="col">#</th>
            <th class="titulo-primario" scope="col">Título</th>
            <th class="titulo-primario" scope="col">Estatus</th>
            <th class="titulo-primario" scope="col"># Episodios</th>
            <th class="titulo-primario" scope="col">Tipo</th>
            <th class="titulo-primario" scope="col">Información</th>
        </tr>
    ` : `
        <tr>
            <th class="titulo-primario" scope="col">#</th>
            <th class="titulo-primario" scope="col">Título</th>
            <th class="titulo-primario" scope="col">Estatus</th>
            <th class="titulo-primario" scope="col"># Volúmenes</th>
            <th class="titulo-primario" scope="col"># Capítulos</th>
            <th class="titulo-primario" scope="col">Tipo</th>
            <th class="titulo-primario" scope="col">Información</th>
        </tr>
    `;
    THEAD.innerHTML = qu_thead;
    thisPage = 0
    var url = `https://anmedjacome.github.io/ProyectoDAWMP1/Proyecto2/recursos/json/${tipo}/${tipo}%20(${thisPage}).json`
    let data = await getJSONData(url)
    let li = document.getElementById('Ani-pitem-r');
    li.innerHTML = `1 de <span class="fw-bold">${TOTAL_PAGES}</span>`;
    let titulo = document.getElementById('Pagina-tabla');
    titulo.textContent = `Página 1 de ${TOTAL_PAGES}`
    paginacion(data)
}

document.addEventListener('DOMContentLoaded', () =>
{
    agregarGeneros()
    cargarDatos()
    crearGenreStats(tipo)
})

selector.addEventListener('change', () => {
    THEAD.innerHTML = "";
    TBODY.innerHTML = ``;
    tipo = selector.options[selector.selectedIndex].value;
    selectorg.selectedIndex = 0
    texto.value = '';
    let titulo = document.getElementById('Pagina-tabla');
    titulo.textContent = `Página 1 de ${TOTAL_PAGES}`
    active()
    let seccion = document.querySelector('div.ani-plot')
    cambiarPlot(seccion, null, false)
    cargarDatos();
    crearGenreStats(tipo)
})

async function cambiarPlot(seccion, id, all){
    if (all) {
        let purl = `https://api.jikan.moe/v4/${tipo}/${id}/full`
        let data = await getJSONData(purl)
        let alr = document.querySelector("p#Sinopsis-rec")
        alr.textContent = data["data"]["synopsis"]
        seccion.querySelector("dd.ani-plot-yr").textContent = data["data"]["year"]

        let subseccion = seccion.querySelector("dd.ani-plot-gn");
        subseccion.textContent = ""
        data["data"]["genres"].forEach((element) => {
            subseccion.textContent += ` <${element["name"]}>`
        });

        subseccion = seccion.querySelector("dd.ani-plot-th");
        subseccion.textContent = ""
        data["data"]["themes"].forEach((element) => {
            subseccion.textContent += ` <${element["name"]}>`
        });

        subseccion = seccion.querySelector("dd.ani-plot-rl")
        subseccion.innerHTML = ""
        data["data"]["relations"].forEach((element) => {
            let row = document.createElement("div")
            row.className = "row"
                let dt = document.createElement("dt")
                dt.className = "col-sm-4"
                dt.textContent = element["relation"]
                let dd = document.createElement("dd")
                dd.className = "col-sm-8"
                let an_counter = 1
                element["entry"].forEach( (nrl) => {
                    let tag_a = document.createElement("a")
                    tag_a.href = nrl["url"]
                    tag_a.textContent = ` [${an_counter++}] `
                    dd.appendChild(tag_a)
                })
            row.appendChild(dt)
            row.appendChild(dd)
            subseccion.appendChild(row)
        });
    } else {
        document.querySelector("div#genre-info").textContent = "TODOS LOS ANIMES DISPONIBLES DE TODOS LOS GENEROS Y SUBGENEROS"
        seccion.querySelector("dd.ani-plot-yr").textContent = "---"
        seccion.querySelector("dd.ani-plot-gn").textContent = "---"
        seccion.querySelector("dd.ani-plot-th").textContent = "---"
        seccion.querySelector("dd.ani-plot-rl").textContent = "---"
    }
}

async function getJSONData(url) {
    let respuesta = await fetch(url);
    let data = await respuesta.json();

    return data;
}

async function mostrarPagina() {
    let valor = texto.value
    let regex = new RegExp("[1-9][0-9]*");
    if (regex.test(valor)){
        let page = parseInt(valor);
        if (page > 0 && page <= TOTAL_PAGES) {

            thisPage = page - 1
            active()
            
            var url = `https://anmedjacome.github.io/ProyectoDAWMP1/Proyecto2/recursos/json/${tipo}/${tipo}%20(${thisPage}).json`
            let data = await getJSONData(url)
            paginacion(data)
            texto.value = '';
            let titulo = document.getElementById('Pagina-tabla');
            titulo.textContent = `Página ${valor} de ${TOTAL_PAGES}`
            let li = document.getElementById('Ani-pitem-r');
            li.innerHTML = `${valor} de <span class="fw-bold">${TOTAL_PAGES}</span>`;
            cargarGenreStats(tipo)
            let seccion = document.querySelector('div.ani-plot')
            cambiarPlot(seccion, null, false)
            selectorg.selectedIndex = 0;

            if (thisPage === 0) document.querySelector("li#Btn-item-a").classList.add("disabled")
            else document.querySelector("li#Btn-item-a").classList.remove("disabled")

            if (thisPage === TOTAL_PAGES - 1) document.querySelector("li#Btn-item-s").classList.add("disabled")
            else document.querySelector("li#Btn-item-s").classList.remove("disabled")

        }
        else {
            aniAlert(texto, `Ingresa un número mayor a 0 y menor o igual a ${TOTAL_PAGES}.`)
        }
    }
    else {
        aniAlert(texto, `Por favor ingresa un solo número mayor a 0 y menor o igual a ${TOTAL_PAGES}.`)
    }
}

async function goToNext() {
    active()
    thisPage = thisPage + 1;
    var url = `https://anmedjacome.github.io/ProyectoDAWMP1/Proyecto2/recursos/json/${tipo}/${tipo}%20(${thisPage}).json`
    let data = await getJSONData(url)
    paginacion(data)
    texto.value = '';
    let titulo = document.getElementById('Pagina-tabla');
    titulo.textContent = `Página ${thisPage + 1} de ${TOTAL_PAGES}`
    let li = document.getElementById('Ani-pitem-r');
    li.innerHTML = `${thisPage + 1} de <span class="fw-bold">${TOTAL_PAGES}</span>`;
    cargarGenreStats(tipo)
    let seccion = document.querySelector('div.ani-plot')
    cambiarPlot(seccion, null, false)
    selectorg.selectedIndex = 0;

    if (thisPage > 0) document.querySelector("li#Btn-item-a").classList.remove("disabled")
    if (thisPage === TOTAL_PAGES - 1) document.querySelector("li#Btn-item-s").classList.add("disabled")
}

async function goToPrevious() {
    active()
    thisPage = thisPage - 1;
    var url = `https://anmedjacome.github.io/ProyectoDAWMP1/Proyecto2/recursos/json/${tipo}/${tipo}%20(${thisPage}).json`
    let data = await getJSONData(url)
    paginacion(data)
    texto.value = '';
    let titulo = document.getElementById('Pagina-tabla');
    titulo.textContent = `Página ${thisPage + 1} de ${TOTAL_PAGES}`
    let li = document.getElementById('Ani-pitem-r');
    li.innerHTML = `${thisPage + 1} de <span class="fw-bold">${TOTAL_PAGES}</span>`;
    cargarGenreStats(tipo)
    let seccion = document.querySelector('div.ani-plot')
    cambiarPlot(seccion, null, false)
    selectorg.selectedIndex = 0;
    if (thisPage < TOTAL_PAGES - 1) document.querySelector("li#Btn-item-s").classList.remove("disabled")
    if (thisPage === 0) document.querySelector("li#Btn-item-a").classList.add("disabled")
}