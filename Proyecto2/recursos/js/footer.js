document.addEventListener('DOMContentLoaded', () => {

    let query = `
        <div id="Ani-footer" class="footer-background rounded-top p-4">
            <div class="row">
                <div class="col-12 col-sm-6 text-center text-sm-start">
                    &copy; <a class="enlace" href="#Ani-footer">2022 AnIndeX</a>, Derechos Reservados.
                    <br><br><h5>Referencias</h5>
                    <p>
                        Datos obtenidos de <a class="enlace" href="https://myanimelist.net/" target="_blank">MyAnimeList</a>
                        <br>API utilizada: <a class="enlace" href="https://jikan.moe/" target="_blank">Jikan.moe</a>
                    </p>
                </div>
                <div class="col-12 col-sm-6 text-center text-sm-start">
                    Desarrollado por: <a class="enlace" href="https://imagineboulux-fv.ajmedina03.repl.co" target="_blank">ImagiNeboulux</a>
                    <br><br><h5>Autores de plantilla</h5>
                    <p>
                        Diseñado por: <a class="enlace" href="https://htmlcodex.com" target="_blank">HTMLCodex</a>
                        <br>Distribuido por: <a class="enlace" href="https://themewagon.com" target="_blank">ThemeWagon</a>
                    </p>
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