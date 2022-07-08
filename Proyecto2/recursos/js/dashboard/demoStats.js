function mostrarPorDemografia() {
    var ctx2 = document.getElementById("Num-gnre-total").getContext("2d");
    var myChart2 = new Chart(ctx2, {
        type: "line",
        data: {
            labels: GENEROS,
            datasets: [
                {
                    label: "Anime",
                    data: [
                        (arreglo[0][0]).get("Action"), (arreglo[0][0]).get("Adventure"), (arreglo[0][0]).get("Avant Garde"), (arreglo[0][0]).get("Boys Love"), (arreglo[0][0]).get("Comedy"),
                        (arreglo[0][0]).get("Drama"), (arreglo[0][0]).get("Fantasy"), (arreglo[0][0]).get("Girls Love"), (arreglo[0][0]).get("Gourmet"), (arreglo[0][0]).get("Horror"),
                        (arreglo[0][0]).get("Mystery"), (arreglo[0][0]).get("Romance"), (arreglo[0][0]).get("Sci-Fi"), (arreglo[0][0]).get("Slice of Life"), (arreglo[0][0]).get("Sports"),
                        (arreglo[0][0]).get("Supernatural"), (arreglo[0][0]).get("Suspense")
                    ],
                    backgroundColor: "rgba(252, 215, 139, 0.8)",
                    fill: true,
                    pointStyle: 'rectRot',
                    pointRadius: 5,
                    pointBorderColor: '#3d3017'
                },
                {
                    label: "Manga",
                    data: [
                        (arreglo[1][0]).get("Action"), (arreglo[1][0]).get("Adventure"), (arreglo[1][0]).get("Avant Garde"), (arreglo[1][0]).get("Boys Love"), (arreglo[1][0]).get("Comedy"),
                        (arreglo[1][0]).get("Drama"), (arreglo[1][0]).get("Fantasy"), (arreglo[1][0]).get("Girls Love"), (arreglo[1][0]).get("Gourmet"), (arreglo[1][0]).get("Horror"),
                        (arreglo[1][0]).get("Mystery"), (arreglo[1][0]).get("Romance"), (arreglo[1][0]).get("Sci-Fi"), (arreglo[1][0]).get("Slice of Life"), (arreglo[1][0]).get("Sports"),
                        (arreglo[1][0]).get("Supernatural"), (arreglo[1][0]).get("Suspense")
                    ],
                    backgroundColor: "rgba(227, 178, 86, 0.8)",
                    fill: true,
                    pointStyle: 'rectRot',
                    pointRadius: 5,
                    pointBorderColor: '#1C160B'
                }
            ]
        },
        options: {
                responsive: true,
                legend: {
                    labels: {
                        fontColor: "white",
                        fontSize: 18
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            color: "#bd9448",
                            font: {
                              size: 10,
                              lineHeight: 1.2
                            },
                            stepSize: 400,
                            beginAtZero: true
                        }
                    },
                    x: {
                        ticks: {
                            color: "#e3b256",
                            font: {
                              size: 10,
                              lineHeight: 1.2
                            },
                            beginAtZero: true
                        }
                    }
                }
        }
    });
}