var total_pages = 1;
var this_page = 0;
var count_element = 0;
const tabla = document.querySelector('table.ani-table-info-1 tbody.ani-body');

function paginacion(data) {
    tabla.innerHTML = ``;
    let arreglo = data['data']
    let contador = 1;
    for (anime of arreglo) {

        let url = anime['url'];
        let img_url = anime['images']['jpg']['image_url'];
        let nombre = anime['title'];
        let estatus = anime['status'] === "Not yet aired" ? "Próximamente" : (anime['status'] === "Finished Airing" ? "Finalizado" : "En emisión");
        let tipo = anime['type'] === "TV" ? "TV" : (anime['type'] === "Movie" ? "Película" : "OVA");
        let num_episodios = anime['episodes'] === null ? "No hay dato" : anime['episodes'];

        let query = `
            <tr>
                <th scope="row">${(contador++)+(count_element*this_page)}</th>
                <td>
                    <div class="d-flex flex-column align-items-center justify-content-center text-align-center">
                        <img
                            src="${img_url}"
                            alt=""
                            style="height: 10rem; width: 7rem;"
                            />
                        <div>
                            <p class="fw-bold mb-1">${nombre}</p>
                        </div>
                    </div>
                </td>
                <td><p class="fw-normal mb-1">${estatus}</p></td>
                <td>${num_episodios}</td>
                <td>${tipo}</td>
                <td>
                    <a
                        class="btn btn-link btn-sm btn-rounded"
                        data-mdb-toggle="collapse"
                        href="${url}"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                        >
                        Ver más
                    </a>
                </td>
            </tr>
        `

        tabla.innerHTML += query;
    }
}

function mostrarPagina() {
    let texto = document.getElementById("Ani-num-page");
    let valor = texto.value
    let regex = new RegExp("[1-9][0-9]*");
    if (regex.test(valor)){
        let page = parseInt(valor);
        if (page > 0 && page <= total_pages) {
            let url = `https://api.jikan.moe/v4/anime?page=${page}`
            fetch(url).then(response => response.json()).then(data => {
                this_page = page - 1
                paginacion(data)
                texto.setAttribute('placeholder', valor);
                texto.textContent = '';
                let titulo = document.getElementById('Pagina-tabla');
                titulo.textContent = `Página ${valor} de ${total_pages}`
                const after = document.querySelector('li#ani-pitem-r');
                after.innerHTML = `${valor} de <span class="fw-bold">${total_pages}</span>`;
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
    let url = `https://api.jikan.moe/v4/anime?page=1`
    fetch(url).then(response => response.json()).then(data => {
        let paginas = data['pagination']['items']
        total_pages = Math.ceil(parseInt(paginas['total'], 10) / 25);
        count_element = parseInt(paginas['count'])
        const after = document.querySelector('li.ani-pitem-d');
        let li = document.createElement('li');
        li.id = 'ani-pitem-r'
        li.innerHTML = `1 de <span class="fw-bold">${total_pages}</span>`;
        li.className = 'mx-2 my-1';
        after.insertAdjacentElement('beforebegin', li);
        let titulo = document.getElementById('Pagina-tabla');
        titulo.textContent = `Página 1 de ${total_pages}`
        paginacion(data)
        
    }).catch(console.error)
}

document.addEventListener('DOMContentLoaded', () => {
    cargarDatos()
})