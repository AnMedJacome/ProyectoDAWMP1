let celda = (padre, hijo, clase, contenido) => {
    let cell =  document.createElement(padre);
        let ins = document.createElement(hijo);
        ins.className = clase
        ins.textContent = contenido
    cell.appendChild(ins)
    return cell
}

function filaAnime(anime, contador, count_element, this_page) {
    let url = anime['url'];
    let img_url = anime['images']['jpg']['image_url'];
    let nombre = anime['title'];
    let estatus = anime['status'] === "Not yet aired" ? "Próximamente" : (anime['status'] === "Finished Airing" ? "Finalizado" : "En emisión");
    let tipo = anime['type'] === "TV" ? "TV" : (anime['type'] === "Movie" ? "Película" : "OVA");
    let num_episodios = anime['episodes'] === null ? "No hay dato" : anime['episodes'];
    
    let row = document.createElement('tr');
    row.className = "ani-table-row"
    row.value = anime['genres']

        let h_cell = document.createElement('th');
        h_cell.scope = "row"
        h_cell.textContent = contador+(count_element*this_page)
    row.appendChild(h_cell)


        let cell = document.createElement('td');
            let div = document.createElement('div');
            div.className = "d-flex flex-column align-items-center justify-content-center text-align-center"
                let img = document.createElement("img");
                img.src = img_url;
                img.alt = "";
                img.style = "height: 10rem; width: 7rem;"
            div.appendChild(img)
            div.appendChild(celda("div", "p", "fw-bold mb-1", nombre))
        cell.appendChild(div)
    row.appendChild(cell)

        cell = celda('td', 'p', "fw-bold mb-1", estatus)
    row.appendChild(cell)

        cell = celda('td', 'p', "", num_episodios)
    row.appendChild(cell)

        cell = celda('td', 'p', "", tipo)
    row.appendChild(cell)
        cell =  document.createElement('td');
            let a = `    
                <a
                    class=""
                    href="${url}"
                    role="button"
                    aria-expanded="false"
                    target="_blank"
                    >
                    Ver más
                </a>
            `
        cell.innerHTML = a;
    row.appendChild(cell)
    return(row)
}

function filaManga(anime, contador, count_element, this_page) {
    let url = anime['url'];
    let img_url = anime['images']['jpg']['image_url'];
    let nombre = anime['title'];
    let estatus = anime['status'] === "Publishing" ? "En publicación" : (anime['status'] === "Finished" ? "Finalizado" : "Pausado");
    let tipo = anime['type'];
    let num_caps = anime['chapters'] === null ? "No hay dato" : anime['chapters'];
    let num_volumen = anime['volumes'] === null ? "No hay dato" : anime['volumes'];
    
    let row = document.createElement('tr');
    row.className = "ani-table-row"
    row.value = anime['genres']

        let h_cell = document.createElement('th');
        h_cell.scope = "row"
        h_cell.textContent = contador+(count_element*this_page)
    row.appendChild(h_cell)

        let cell = document.createElement('td');
            let div = document.createElement('div');
            div.className = "d-flex flex-column align-items-center justify-content-center text-align-center"
                let img = document.createElement("img");
                img.src = img_url;
                img.alt = "";
                img.style = "height: 10rem; width: 7rem;"
            div.appendChild(img)
            div.appendChild(celda("div", "p", "fw-bold mb-1", nombre))
        cell.appendChild(div)
    row.appendChild(cell)

        cell = celda('td', 'p', "fw-bold mb-1", estatus)
    row.appendChild(cell)

        cell = celda('td', 'p', "", num_volumen)
    row.appendChild(cell)


        cell = celda('td', 'p', "", num_caps)
    row.appendChild(cell)

        cell = celda('td', 'p', "", tipo)
    row.appendChild(cell)

        cell =  document.createElement('td');
            let a = `    
                <a
                    class=""
                    data-mdb-toggle="collapse"
                    href="${url}"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                    >
                    Ver más
                </a>
            `
        cell.innerHTML = a;
    row.appendChild(cell)
    return(row)
}