var total_pages = 1;
var countElement = 25;
const TBODY = document.querySelector('table.ani-table-info-1 tbody.ani-body');
const LOAD = document.getElementById("Load-indicator");
const BAR = document.querySelector("div#Progress-bar-1");
let chyear = 0;

var thisPage = 0;

let texto = document.getElementById("Ani-num-page");
let selector = document.querySelector('select.format-selector')

async function paginacion(data) {
    let arreglo = data['data']
    let contador = 1;
    TBODY.innerHTML = ""

    let loadText = LOAD.textContent
    for (let anime of arreglo) {
        let progress = (contador * 100)/arreglo.length;
    
        if ((contador % 5) == 1) LOAD.textContent = loadText + "."
        else LOAD.textContent += "."

        BAR.querySelector("div.progress-bar").style.width = progress.toString() + "vw"
        await sleep(80)
        TBODY.appendChild(filaAnime(anime, contador++, countElement, thisPage));
    }
    BAR.querySelector("div.progress-bar").style.width = "100vw"
    LOAD.textContent = "Cargado (〜￣▽￣)〜"
    await sleep(1000)
    document.querySelector('div#spinner').classList.remove('show');
    document.getElementById("Load-indicator").classList.add('d-none')
    document.querySelector("div#Progress-bar-1").classList.add('d-none')
}

function getYear() {
    const SELECTOR = document.querySelector(`select#Genre-selector`)
    const YEAR = document.querySelector(`input#Seasons-year`)

    let text = YEAR.value
    let regex = new RegExp("(19([2-9][1-9]|1[7-9])|20([0-1][0-9]|2[0-3]))");

    if (regex.test(text)) {
        thisPage = 1
        let y = parseInt(text, 10);
        let season = SELECTOR.options[SELECTOR.selectedIndex].value
        active()
        if (y !== chyear) {
            chyear = y
            updateChart();
            createDescriptionList()
        }
        cambiarPlot(season)
        let tempo = SELECTOR.options[SELECTOR.selectedIndex].text
        document.querySelector('h5.ani-title-info').textContent = `TEMPORADA: ${tempo.toUpperCase()} ${y}`
        cargarDatos(y, season)
    }
    else {
        let div = document.createElement('div');
        div.className = "alert alert-warning alert-dismissible fade show element-animated short fade-in"
        div.role = "alert";
        div.innerHTML = `
            <i class="fa fa-exclamation-circle me-2"></i>Wow! Al parecer ingres&oacute; un año &quot;extra&ntilde;o&quot; o fuera del rango 1917 - 2023
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `
        YEAR.insertAdjacentElement("beforebegin", div)
        setTimeout(() => {
            p_node = div.parentNode
            p_node.removeChild(div)
        }, 5000)
    }
}

let active = () => {
    let spin = document.querySelector('div#spinner')
    spin.classList.add('show')
    LOAD.classList.remove('d-none')
    LOAD.textContent = "Cargando"
    BAR.querySelector("div.progress-bar").style.width = "0vw"
    BAR.classList.remove('d-none')
}

async function mostrarPagina() {
    let valor = texto.value
    let regex = new RegExp("[1-9][0-9]*");
    if (regex.test(valor)){
        let page = parseInt(valor);
        if (page > 0 && page <= total_pages) {

            thisPage = page - 1
            
            var url = `https://anmedjacome.github.io/ProyectoDAWMP1/Proyecto2/recursos/json/${tipo}/${tipo}%20(${thisPage}).json`
            let data = await getJSONData(url)
            active()
            paginacion(data)
            texto.value = '';
            let titulo = document.getElementById('Pagina-tabla');
            titulo.textContent = `Página ${valor} de ${total_pages}`
            let li = document.getElementById('Ani-pitem-r');
            li.innerHTML = `${valor} de <span class="fw-bold">${total_pages}</span>`;
            cargarGenreStats(tipo)
            let seccion = document.querySelector('div.ani-plot')
            cambiarPlot(seccion, null, false)
            selectorg.selectedIndex = 0;

        }
        else {
            let div = document.createElement('div');
            div.className = "alert alert-warning alert-dismissible fade show element-animated short fade-in"
            div.role = "alert";
            div.innerHTML = `
                <i class="fa fa-exclamation-circle me-2"></i>Ingresa un número mayor a 0 y menor o igual a ${total_pages}.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `
            texto.insertAdjacentElement("beforebegin", div)
            setTimeout(() => {
                p_node = div.parentNode
                p_node.removeChild(div)
            }, 5000)
        }
    }
    else {
        let div = document.createElement('div');
        div.className = "alert alert-warning alert-dismissible fade show element-animated short fade-in"
        div.role = "alert";
        div.innerHTML = `
            <i class="fa fa-exclamation-circle me-2"></i>Por favor ingresa un solo número mayor a 0 y menor o igual a ${total_pages}.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `
        texto.insertAdjacentElement("beforebegin", div)
        setTimeout(() => {
            p_node = div.parentNode
            p_node.removeChild(div)
        }, 5000)
    }
}

let cargarDatos = async (y, season) => {
    TBODY.innerHTML = ""
    const URL = `https://api.jikan.moe/v4/seasons/${y}/${season}?page=${thisPage}`
    let data = await getJSONData(URL)
    let li = document.getElementById('Ani-pitem-r');
    total_pages = data["pagination"]["items"]["total"]
    li.innerHTML = `1 de <span class="fw-bold">${total_pages}</span>`;
    let titulo = document.getElementById('Pagina-tabla');
    titulo.textContent = `Página ${thisPage} de ${total_pages}`
    paginacion(data)
}

async function updateChart() {
    let wurl = await getJSONData(`https://api.jikan.moe/v4/seasons/${chyear}/winter`)
    await sleep(1000)
    let spurl = await getJSONData(`https://api.jikan.moe/v4/seasons/${chyear}/spring`)
    await sleep(1000)
    let smurl = await getJSONData(`https://api.jikan.moe/v4/seasons/${chyear}/summer`)
    await sleep(1000)
    let furl = await getJSONData(`https://api.jikan.moe/v4/seasons/${chyear}/fall`)
    let pie = document.querySelector(`canvas#pie-sesons-chart`)
    let pieParent = pie.parentNode
    pieParent.removeChild(pie)
    pie = document.createElement('canvas')
    pie.id = "pie-sesons-chart"
    pieParent.appendChild(pie)
    var ctx5 = pie.getContext("2d");
    var myChart5 = new Chart(ctx5, {
        type: "pie",
        data: {
            labels: ["Invierno", "Primavera", "Verano", "Otoño"],
            datasets: [{
                backgroundColor: [
                    "rgba(126, 154, 197, 0.69)",
                    "rgba(216, 105, 163, 0.69)",
                    "rgba(190, 174, 55, 0.69)",
                    "rgba(158, 58, 43, 0.69)"
                ],
                data: [
                    wurl["pagination"]["items"]["total"], spurl["pagination"]["items"]["total"],
                    smurl["pagination"]["items"]["total"], furl["pagination"]["items"]["total"]
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

function createDescriptionList() {
    let dl = document.createElement("dl");
    dl.className = "row mb-0";
    dl.appendChild(createDT("Fecha:"));
    dl.appendChild(createDD(1));
    dl.appendChild(createDT("Actividades/Eventos por temporada en Japón:"));
    dl.appendChild(createDD(2));
    let seccion = document.getElementById("season-info-1")
    seccion.innerHTML = ""
    seccion.appendChild(dl);
}

function createDT(title) {
    let dt = document.createElement("dt");
    dt.className = "col-sm-4";
    dt.textContent = title;
    return dt;
}

function createDD(id){
    let dd = document.createElement("dd");
    dd.className = `col-sm-8 season-act-${id}`;
    return  dd;

}

document.addEventListener("DOMContentLoaded", () => {
    let fig = document.createElement("figure");
    fig.id = "Season-jp-info"
    fig.style.display = "none";
    fig.className = "imghvr-slide-up mt-3 mx-2"
        let img = document.createElement('img')
        img.src = ""
        img.id = "Season-desc-pic"
        img.className = "ani-genre-pic"
        img.display = "block"
        img.alt = ""
        img.backgroundColor = "#3d3017"
        let fcaption = document.createElement("figcaption")
            fcaption.id = "Season-pic-caption"
            fcaption.className = "scrolldes-block"
            fcaption.innerHTML = `---`
    fig.appendChild(img);
    fig.appendChild(fcaption);
    document.querySelector('h5.ani-title-info').insertAdjacentElement("afterend",fig);
})

async function cambiarPlot(season){
    let purl = "https://anmedjacome.github.io/ProyectoDAWMP1/Proyecto2/recursos/json/otros/estacion.json"
    let data = await getJSONData(purl)
    document.querySelector("figure#Season-jp-info").style.display = "";
    showSeasonpic(data[season], season)
    document.querySelector("dd.season-act-1").innerText = data[season]["fecha"]
    document.querySelector("dd.season-act-2").innerText = data[season]["actividades"]
}

let showSeasonpic = (data, season) => {
    let url = data["img"]
    let dato = data["datos"]
    let img = document.getElementById("Season-desc-pic")
    img.src = url
    img.alt = season
        let fcaption = document.getElementById("Season-pic-caption")
            fcaption.innerHTML = `
                <h5>Cultura Japonesa</h5>
                <div class="border rounded p-4 pb-0 mb-2">
                    <blockquote class="blockquote">
                        <p>${dato["texto"]}</p>
                    </blockquote>
                    <div class="blockquote-footer mt-4 text-end">
                        <a href="${dato["url"]}" target="_blank> <cite title="Source Title">${dato["autor"]}</cite></a>
                    </div>
                </div>
            `
}

async function getJSONData(url) {
    let respuesta = await fetch(url);
    let data = await respuesta.json();

    return data;
}

async function goToNext() {
    thisPage = thisPage + 1;
    var url = `https://anmedjacome.github.io/ProyectoDAWMP1/Proyecto2/recursos/json/${tipo}/${tipo}%20(${thisPage}).json`
    let data = await getJSONData(url)
    active()
    paginacion(data)
    texto.value = '';
    let titulo = document.getElementById('Pagina-tabla');
    titulo.textContent = `Página ${thisPage + 1} de ${total_pages}`
    let li = document.getElementById('Ani-pitem-r');
    li.innerHTML = `${thisPage + 1} de <span class="fw-bold">${total_pages}</span>`;
    cargarGenreStats(tipo)
    let seccion = document.querySelector('div.ani-plot')
    cambiarPlot(seccion, null, false)
    selectorg.selectedIndex = 0;

    if (thisPage === total_pages) {
        let siguiente = document.querySelector("li#Btn-item-d")
        siguiente.className = "page-item rounded-circle my-3 disabled"
    }
    else if (thisPage === 1) {
        let anterior = document.querySelector("li#Btn-item-a")
        anterior.className = "page-item rounded-circle my-3"
    }
}

async function goToPrevious() {
    thisPage = thisPage - 1;
    var url = `https://anmedjacome.github.io/ProyectoDAWMP1/Proyecto2/recursos/json/${tipo}/${tipo}%20(${thisPage}).json`
    let data = await getJSONData(url)
    active()
    paginacion(data)
    texto.value = '';
    let titulo = document.getElementById('Pagina-tabla');
    titulo.textContent = `Página ${thisPage + 1} de ${total_pages}`
    let li = document.getElementById('Ani-pitem-r');
    li.innerHTML = `${thisPage + 1} de <span class="fw-bold">${total_pages}</span>`;
    cargarGenreStats(tipo)
    let seccion = document.querySelector('div.ani-plot')
    cambiarPlot(seccion, null, false)
    selectorg.selectedIndex = 0;

    if (thisPage === 0) {
        let anterior = document.querySelector("li#Btn-item-a")
        anterior.className = "page-item rounded-circle my-3 disabled"
    }
    else if (thisPage === total_pages - 1) {
        let siguiente = document.querySelector("li#Btn-item-d")
        siguiente.className = "page-item rounded-circle my-3 ani-shadow"
    }    
}

document.addEventListener("DOMContentLoaded", async () => {
    await sleep(20)
    document.querySelector('div#spinner').classList.remove('show');
})