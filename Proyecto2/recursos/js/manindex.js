var total_pages = 1;
const tabla = document.querySelector('table.ani-table-info-1 tbody.ani-body');

function paginacion(data) {
    tabla.innerHTML = ``;
    let arreglo = data['data']
    for (anime of arreglo) {
        let url = anime['url'];
        let img_url = anime['images']['jpg']['image_url'];
        let nombre = anime['title'];
        let estatus = anime['status'] === "Not yet aired" ? "Próximamente" : (anime['status'] === "Finished Airing" ? "Finalizado" : "En emisión");
        let tipo = anime['type'];
        let num_episodios = anime['episodes'] === null ? "Próximamente" : anime['episodes'];

        let query = `
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                    <img
                        src="${img_url}"
                        alt=""
                        style="height: 10rem; width: 7rem;"
                        />
                    <div class="ms-3">
                        <p class="fw-bold mb-1">${nombre}</p>
                    </div>
                    </div>
                </td>
                <td>
                    <p class="fw-normal mb-1">${estatus}</p>
                </td>
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
        if (page <= total_pages) {
            let url = `https://api.jikan.moe/v4/manga?page=${page}`
            fetch(url).then(response => response.json()).then(data => {
                paginacion(data)
                texto.setAttribute('placeholder', valor);
                texto.textContent = '';
                let titulo = document.getElementById('Pagina-tabla');
                titulo.textContent = `Página ${valor} de ${total_pages}`
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
    let url = `https://api.jikan.moe/v4/manga?page=1`
    fetch(url).then(response => response.json()).then(data => {
        total_pages = Math.ceil(parseInt(data['pagination']['items']['total'], 10) / 25);
        const after = document.querySelector('li.ani-pitem-d');
        let li = document.createElement('li');
        li.innerHTML = `de <span class="fw-bold">${total_pages}</span>`;
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