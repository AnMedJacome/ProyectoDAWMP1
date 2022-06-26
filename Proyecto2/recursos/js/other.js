function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('DOMContentLoaded', () => {

    let query = `
        <div class="footer-background rounded-top p-4">
            <div class="row">
                <div class="col-12 col-sm-6 text-center text-sm-start">
                    &copy; <a class="enlace" href="">2022 AnIndeX</a>, Derechos Reservados.
                    <br><br>Datos obtenidos de <a class="enlace" href="https://myanimelist.net/" target="_blank">MyAnimeList</a>
                    <br>API utilizada: <a class="enlace" href="https://jikan.moe/" target="_blank">Jikan.moe</a>
                </div>
                <div class="col-12 col-sm-6 text-center text-sm-start">
                    Desarrollado por: <a class="enlace" href="https://imagineboulux-fv.ajmedina03.repl.co" target="_blank">ImagiNeboulux</a>
                    <br><br>Autores de plantilla
                    <br>&nbsp;&nbsp;Diseñado por: <a class="enlace" href="https://htmlcodex.com" target="_blank">HTMLCodex</a>
                    <br>&nbsp;&nbsp;Distribuido por: <a class="enlace" href="https://themewagon.com" target="_blank">ThemeWagon</a>
                </div>
            </div>
        </div>
    `
    let div = document.createElement('div')
    div.className = 'container-fluid pt-4 px-4'
    div.innerHTML = query
    let main_div = document.querySelector('div.main-container')
    main_div.insertAdjacentElement('beforeend', div)
})