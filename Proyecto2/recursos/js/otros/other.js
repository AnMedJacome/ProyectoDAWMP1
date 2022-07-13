function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function aniAlert(tag, mensaje) {
    let div = document.createElement('div');
    div.className = "alert alert-warning alert-dismissible fade show element-animated short fade-in"
    div.role = "alert";
    div.innerHTML = `
        <i class="fa fa-exclamation-circle me-2"></i>${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `
    tag.insertAdjacentElement("beforebegin", div)
    setTimeout(() => {
        p_node = div.parentNode
        p_node.removeChild(div)
    }, 5000)
}


var spinner = function () {
    if (!!document.querySelector("div.fast")){
        setTimeout(function () {
            document.querySelector('div#spinner').classList.remove('show');
        }, 100);
    }
};

document.querySelector('a.sidebar-toggler-1').addEventListener("click", () => {
    document.querySelector('div.content').classList.toggle("open");
    document.querySelector('div.sidebar').classList.toggle("open");
});


console.log("DOMContentLoaded");
spinner();
console.log("DOMContentLoaded");