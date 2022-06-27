var total_pages = 1;
var this_page = 0;
var count_element = 0;
var tipo = "anime"
const thead = document.querySelector('table.ani-table-info-1 thead.ani-head');
const tabla = document.querySelector('table.ani-table-info-1 tbody.ani-body');
let texto = document.getElementById("Ani-num-page");
let selector = document.querySelector('select.format-selector')

async function paginacion(data) {
    let arreglo = data['data']
    let contador = 1;
    tabla.innerHTML = ""
    for (let anime of arreglo) {
        if (tipo === "anime")
            tabla.appendChild(filaAnime(anime, contador++, count_element, this_page));
        else
            tabla.appendChild(filaManga(anime, contador++, count_element, this_page));
    }
}

function mostrarPagina() {
    let valor = texto.value
    let regex = new RegExp("[1-9][0-9]*");
    if (regex.test(valor)){
        let page = parseInt(valor);
        if (page > 0 && page <= total_pages) {
            let url = `https://api.jikan.moe/v4/${tipo}?page=${page}`
            fetch(url).then(response => response.json()).then(data => {
                this_page = page - 1
                paginacion(data)
                texto.value = '';
                let titulo = document.getElementById('Pagina-tabla');
                titulo.textContent = `Página ${valor} de ${total_pages}`
                let li = document.getElementById('Ani-pitem-r');
                li.innerHTML = `${valor} de <span class="fw-bold">${total_pages}</span>`;
                cargarGenreStats(tipo, page)
            })
        }
        else {
            alert(`Ingresa un número mayor a 0 y menor o igual a ${total_pages}.`);
        }
    }
    else {
        alert("Por favor ingresa un solo número mayor a 0.");
    }
}

let cargarDatos = () => {
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
    thead.innerHTML = qu_thead;
    let url = `https://api.jikan.moe/v4/${tipo}?page=1`
    fetch(url).then(response => response.json()).then(data => {
        let paginas = data['pagination']['items']
        total_pages = Math.ceil(parseInt(paginas['total'], 10) / 25);
        count_element = parseInt(paginas['count'])
        let li = document.getElementById('Ani-pitem-r');
        li.innerHTML = `1 de <span class="fw-bold">${total_pages}</span>`;
        let titulo = document.getElementById('Pagina-tabla');
        titulo.textContent = `Página 1 de ${total_pages}`
        paginacion(data)
        
    }).catch(console.error)
}

document.addEventListener('DOMContentLoaded', () => {
    agregarGeneros()
    cargarDatos()
    crearGenreStats(tipo)
})

selector.addEventListener('change', () => {
    thead.innerHTML = "";
    tabla.innerHTML = ``;
    tipo = selector.options[selector.selectedIndex].value;
    selectorg.selectedIndex = 0;
    this_page = 0
    texto.value = '';
    let titulo = document.getElementById('Pagina-tabla');
    titulo.textContent = `Página 1 de ${total_pages}`
    cargarDatos();
})

function cambiarPlot(seccion, id, all){
    if (all) {
        let url = `https://api.jikan.moe/v4/${tipo}/${id}`
        fetch(url).then(response => response.json()).then(data => {
            seccion.textContent = data["data"]["synopsis"]
        }).catch(console.error);
    } else seccion.textContent = "TODOS LOS ANIMES DISPONIBLES DE TODOS LOS GENEROS Y SUBGENEROS"
}