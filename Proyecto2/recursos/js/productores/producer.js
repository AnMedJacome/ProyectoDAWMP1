let totalPages = 20;
const COUNT_ELEMENT = 25;
const TBODY = document.querySelector('table.ani-table-info-2 tbody.ani-prod-body');
const TBODYR = document.querySelector('table.ani-table-info-1 tbody.ani-body');
const LOAD = document.getElementById("Load-indicator");
const BAR = document.querySelector("div#Progress-bar-1");

var this_page = 0;

let texto = document.getElementById("Ani-num-page");

let active = () => {
    let spin = document.querySelector('div#spinner')
    spin.classList.add('show')
    LOAD.style.display = ""
    LOAD.textContent = "Cargando"
    BAR.querySelector("div.progress-bar").style.width = "0vw"
    BAR.style.display = ""
}

function filaCompany(company, contador, count_element, this_page) {
    let url = company['url'];
    let nombre = company['name'];
    let num_animes = company['count'];
    
    let row = document.createElement('tr');
    row.className = "ani-prod-table-row"

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

        cell =  document.createElement('td');
            let ins = document.createElement('p');
            ins.textContent = num_animes
        cell.appendChild(ins)
    row.appendChild(cell)

        cell =  document.createElement('td');
            ins = document.createElement('p');
            ins.Id = `Company-selected-${contador}`
            ins.className = "produc-cursor text-shadow-color-c"
            ins.textContent = "Mostrar"
            ins.addEventListener("click", async () => {
                document.querySelector("h6.ani-title-info").textContent = `Animes producidos por ${nombre}`
                let spin = document.querySelector('div#spinner')
                spin.classList.add('show')
                LOAD.style.display = ""
                LOAD.textContent = "Cargando"
                BAR.querySelector("div.progress-bar").style.width = "0vw"
                BAR.style.display = ""
                let contador = 1;
                TBODYR.innerHTML = ""
                let load_text = LOAD.textContent

                for(let i = 0 ; i < 100 ; i++) {
                    let data = await getJSONData(`https://anmedjacome.github.io/ProyectoDAWMP1/Proyecto2/recursos/json/anime/anime%20(${i}).json`)
                    let arr_anime = data["data"]
                    for (let anime of arr_anime) {
                        let an_productores = anime["producers"]
                        for (let producer of an_productores) 
                            if (producer["name"] === nombre) TBODYR.appendChild(filaAnime(anime, contador++, COUNT_ELEMENT, 0));
                        let an_studios = anime["studios"]
                        for (let studio of an_studios) 
                            if (studio["name"] === nombre) TBODYR.appendChild(filaAnime(anime, contador++, COUNT_ELEMENT, 0));
                    }
                    let progress = contador;
                
                    if ((contador % 5) == 1) LOAD.textContent = load_text + "."
                    else LOAD.textContent += "."
            
                    BAR.querySelector("div.progress-bar").style.width = progress.toString() + "vw"
                }
                BAR.querySelector("div.progress-bar").style.width = "100vw"
                LOAD.textContent = "Cargado (〜￣▽￣)〜"
                await sleep(1000)
                spin.classList.remove('show');
                LOAD.style.display = "none"
                BAR.style.display = "none"
            })
        cell.appendChild(ins)
    row.appendChild(cell)
    return(row)
}

async function paginacion(data) {
    let arreglo = data['data']
    let contador = 1;
    TBODY.innerHTML = ""

    let load_text = LOAD.textContent
    for (let company of arreglo) {
        let progress = (contador * 100) / arreglo.length;
    
        if ((contador % 5) == 1) LOAD.textContent = load_text + "."
        else LOAD.textContent += "."

        BAR.querySelector("div.progress-bar").style.width = progress.toString() + "vw"

        TBODY.appendChild(filaCompany(company, contador++, COUNT_ELEMENT, this_page - 1));
    }
    
    BAR.querySelector("div.progress-bar").style.width = "100vw"
    LOAD.textContent = "Cargado (〜￣▽￣)〜"
    await sleep(1000)
    document.querySelector('div#spinner').classList.remove('show');
    LOAD.style.display = "none"
    BAR.style.display = "none"
}

document.addEventListener('DOMContentLoaded', async () =>
{
    this_page = 1
    var url = `https://api.jikan.moe/v4/producers?page=1`
    let data = await getJSONData(url)
    totalPages = parseInt(data["pagination"]["last_visible_page"])
    let li = document.getElementById('Ani-pitem-r');
    li.innerHTML = `1 de <span class="fw-bold">${totalPages}</span>`;
    let titulo = document.getElementById('Pagina-tabla');
    titulo.textContent = `Página 1 de ${totalPages}`
    paginacion(data)
})

async function getJSONData(url) {
    let respuesta = await fetch(url);
    let data = await respuesta.json();

    return data;
}

async function mostrarPagina() {
    active()
    let valor = texto.value
    let regex = new RegExp("[1-9][0-9]*");
    if (regex.test(valor)){
        let page = parseInt(valor);
        if (page > 0 && page <= totalPages) {

            this_page = page
            
            var url = `https://api.jikan.moe/v4/producers?page=${this_page}`
            let data = await getJSONData(url)
            texto.value = '';
            let titulo = document.getElementById('Pagina-tabla');
            titulo.textContent = `Página ${valor} de ${totalPages}`
            let li = document.getElementById('Ani-pitem-r');
            li.innerHTML = `${valor} de <span class="fw-bold">${totalPages}</span>`;
            paginacion(data)

            if (this_page === totalPages) document.querySelector("li#Btn-item-s").classList.add("disabled")
            else document.querySelector("li#Btn-item-s").classList.remove("disabled")

            if (this_page === 1) document.querySelector("li#Btn-item-a").classList.add("disabled")
            else document.querySelector("li#Btn-item-a").classList.remove("disabled")

        }
        else {
            alert(`Ingresa un número mayor a 0 y menor o igual a ${totalPages}.`);
        }
    }
    else {
        alert(`Por favor ingresa un solo número mayor a 0 y menor o igual a ${totalPages}.`);
    }
}

async function goToNext() {
    active()
    this_page = this_page + 1;
    var url = `https://api.jikan.moe/v4/producers?page=${this_page}`
    let data = await getJSONData(url)
    texto.value = '';
    let titulo = document.getElementById('Pagina-tabla');
    titulo.textContent = `Página ${this_page} de ${totalPages}`
    let li = document.getElementById('Ani-pitem-r');
    li.innerHTML = `${this_page + 1} de <span class="fw-bold">${totalPages}</span>`;
    paginacion(data)

    if (this_page === totalPages) document.querySelector("li#Btn-item-s").classList.add("disabled")
    if (this_page > 1) document.querySelector("li#Btn-item-a").classList.remove("disabled")
}

async function goToPrevious() {
    active()
    this_page = this_page - 1;
    var url = `https://api.jikan.moe/v4/producers?page=${this_page}`
    let data = await getJSONData(url)
    texto.value = '';
    let titulo = document.getElementById('Pagina-tabla');
    titulo.textContent = `Página ${this_page} de ${totalPages}`
    let li = document.getElementById('Ani-pitem-r');
    li.innerHTML = `${this_page + 1} de <span class="fw-bold">${totalPages}</span>`;
    paginacion(data)

    if (this_page === 1) document.querySelector("li#Btn-item-a").classList.add("disabled")
    if (this_page < totalPages) document.querySelector("li#Btn-item-s").classList.remove("disabled")
}