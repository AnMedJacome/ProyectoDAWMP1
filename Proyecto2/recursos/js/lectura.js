const NUM_FILE = 7

function addToCarousel(){
    let slider = document.querySelector('div.carousel-container')
    let planisha = `
        <div class="owl-container">
            <div class="owl-carousel">
    `
    for (let ind = 2 ; ind <= NUM_FILE; ind++){
        planisha += `
                <div class="item">
                    <img src="recursos/img/fondo/fondo-${ind}.png" alt="">
                </div>
        `
    }
    slider.innerHTML = `
                ${planisha}
            </div>
        </div>
    `
    console.log(slider.innerHTML)
}

addToCarousel();