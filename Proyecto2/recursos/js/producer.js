const TOTAL_PAGES = 20;
const COUNT_ELEMENT = 25;
const TBODY = document.querySelector('table.ani-table-info-1 tbody.ani-body');

var this_page = 0;

let texto = document.getElementById("Ani-num-page");

let celdaC = (padre, hijo, id, contenido) => {
    let cell =  document.createElement(padre);
        let ins = document.createElement(hijo);
        ins.Id = id
        ins.textContent = contenido
    cell.appendChild(ins)
    return cell
}

function filaCompany(company, contador, count_element, this_page) {
    let url = company['url'];
    let nombre = company['name'];
    let num_animes = company['count'];
    
    let row = document.createElement('tr');
    row.className = "ani-table-row"

        let h_cell = document.createElement('th');
        h_cell.scope = "row"
        h_cell.textContent = contador+(count_element*this_page)
    row.appendChild(h_cell)
    
        let cell = document.createElement('td');
            let a = `    
            <a
                class=""
                href="${url}"
                role="button"
                aria-expanded="false"
                target="_blank"
                >
                ${nombre}
            </a>
        `
        cell.innerHTML = a
    row.appendChild(cell)

        cell = celdaC('td', 'p', "", num_animes)
    row.appendChild(cell)

        cell = celdaC('td', 'p', `Company-selected-${contador}`, "Mostrar")
    row.appendChild(cell)
    return(row)
}

function mostrarAnime(data) {
    let arreglo = data['data']
    let contador = 1;
    TBODY.innerHTML = ""
    arreglo.foreach(anime => {
        TBODY.appendChild(filaAnime(anime, contador++, COUNT_ELEMENT, 0));
    })
}

async function paginacion(data) {
    let arreglo = data['data']
    let contador = 1;
    TBODY.innerHTML = ""
    let load = document.getElementById("Load-indicator");
    let bar = document.querySelector("div#Progress-bar-1");

    let load_text = load.textContent
    for (let company of arreglo) {
        let progress = contador * 10;
    
        if ((contador % 5) == 1) load.textContent = load_text + "."
        else load.textContent += "."

        bar.querySelector("div.progress-bar").style.width = progress.toString() + "vw"
        await sleep(80)

        TBODY.appendChild(filaCompany(company, contador++, COUNT_ELEMENT, this_page - 1));
    }
    
    load.textContent = "Cargado (〜￣▽￣)〜"
}

async function mostrarPagina() {
    let valor = texto.value
    let regex = new RegExp("[1-9][0-9]*");
    if (regex.test(valor)){
        let page = parseInt(valor);
        if (page > 0 && page <= TOTAL_PAGES) {

            this_page = page
            
            var url = `https://api.jikan.moe/v4/producers?page=${this_page}`
            let data = await getJSONData(url)
            texto.value = '';
            let titulo = document.getElementById('Pagina-tabla');
            titulo.textContent = `Página ${valor} de ${TOTAL_PAGES}`
            let li = document.getElementById('Ani-pitem-r');
            li.innerHTML = `${valor} de <span class="fw-bold">${TOTAL_PAGES}</span>`;
            paginacion(data)

        }
        else {
            alert(`Ingresa un número mayor a 0 y menor o igual a ${TOTAL_PAGES}.`);
        }
    }
    else {
        alert(`Por favor ingresa un solo número mayor a 0 y menor o igual a ${TOTAL_PAGES}.`);
    }
}

document.addEventListener('DOMContentLoaded', async () =>
{
    this_page = 1
    var url = `https://api.jikan.moe/v4/producers?page=1`
    let data = await getJSONData(url)
    let li = document.getElementById('Ani-pitem-r');
    li.innerHTML = `1 de <span class="fw-bold">${TOTAL_PAGES}</span>`;
    let titulo = document.getElementById('Pagina-tabla');
    titulo.textContent = `Página 1 de ${TOTAL_PAGES}`
    paginacion(data)
})

async function getJSONData(url) {
    let respuesta = await fetch(url);
    let data = await respuesta.json();

    return data;
}

async function goToNext() {
    this_page = this_page + 1;
    var url = `https://api.jikan.moe/v4/producers?page=${this_page}`
    let data = await getJSONData(url)
    texto.value = '';
    let titulo = document.getElementById('Pagina-tabla');
    titulo.textContent = `Página ${this_page} de ${TOTAL_PAGES}`
    let li = document.getElementById('Ani-pitem-r');
    li.innerHTML = `${this_page + 1} de <span class="fw-bold">${TOTAL_PAGES}</span>`;
    paginacion(data)

    if (this_page === TOTAL_PAGES) {
        let siguiente = document.querySelector("li#Btn-item-d")
        siguiente.className = "page-item rounded-circle my-3 disabled"
    }
    else if (this_page === 2) {
        let anterior = document.querySelector("li#Btn-item-a")
        anterior.className = "page-item rounded-circle my-3"
    }
}

async function goToPrevious() {
    this_page = this_page - 1;
    var url = `https://api.jikan.moe/v4/producers?page=${this_page}`
    let data = await getJSONData(url)
    texto.value = '';
    let titulo = document.getElementById('Pagina-tabla');
    titulo.textContent = `Página ${this_page} de ${TOTAL_PAGES}`
    let li = document.getElementById('Ani-pitem-r');
    li.innerHTML = `${this_page + 1} de <span class="fw-bold">${TOTAL_PAGES}</span>`;
    paginacion(data)

    if (this_page === 1) {
        let anterior = document.querySelector("li#Btn-item-a")
        anterior.className = "page-item rounded-circle my-3 disabled"
    }
    else if (this_page === TOTAL_PAGES - 1) {
        let siguiente = document.querySelector("li#Btn-item-d")
        siguiente.className = "page-item rounded-circle my-3 ani-shadow"
    }    
}