
let ng = document.querySelector("select#Number-genres")

function compararGeneros() {
    let fg = document.querySelector("select#Format-genres")
    let listaValGenres = []
    let listaValNums = []
    let numb = parseInt(ng.options[ng.selectedIndex].value)
    for (let i = 1; i <= numb; i++) {
        let s = document.querySelector(`select#genre-sel-${i}`)
        let v = s.options[s.selectedIndex].value
        if (!listaValGenres.includes(v)){
            listaValGenres.push(v)
            listaValNums.push((fg.options[fg.selectedIndex].value === "anime") ? arreglo[0][0].get(v) : arreglo[1][0].get(v))
        }
    }

    if (listaValGenres.length === numb) {
        // Doughnut Chart
        let canvas = document.getElementById("doughnut-chart")
        let parent = canvas.parentNode
        parent.removeChild(canvas)
        canvas = document.createElement("canvas")
        canvas.id = "doughnut-chart"
        parent.appendChild(canvas)
        var ctx6 = canvas.getContext("2d");
        var myChart6 = new Chart(ctx6, {
            type: "doughnut",
            data: {
                labels: listaValGenres,
                datasets: [{
                    backgroundColor: COLORSTATS[numb - 2],
                    data: listaValNums
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
    else {
        aniAlert(ng, `Al parecer un género se está repitiendo.\nPor favor elija ${numb} valores diferentes.`)
    }
}

function agregarOpcionesGenero() {
    ng.addEventListener("change", () => {
        let numb = parseInt(ng.options[ng.selectedIndex].value)
        for (let i = 3; i < 6; i++) {
            if (i <= numb) document.querySelector(`select#genre-sel-${i}`).disabled = false
            else document.querySelector(`select#genre-sel-${i}`).disabled = true
        }
    })

    for (let i = 1; i <= 5; i++) {
        let selec = document.querySelector(`select#genre-sel-${i}`)
        for (let g of GENEROS) {
            let query = `<option value="${g}">${g}</option>`
            selec.innerHTML += query
        }
        selec.querySelectorAll('option')[i - 1].selected = true
    }
}