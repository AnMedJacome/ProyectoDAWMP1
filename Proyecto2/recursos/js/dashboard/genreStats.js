function mostrarPorGenero() {
    var ctx1 = $("#Num-demo-total").get(0).getContext("2d");
    var myChart1 = new Chart(ctx1, {
        type: "bar",
        data: {
            labels: DEMOGRAFIA,
            datasets: [
                {
                    label: "Anime",
                    data: [
                        (arreglo[0][1]).get("Josei"), (arreglo[0][1]).get("Kids"), (arreglo[0][1]).get("Seinen"),
                        (arreglo[0][1]).get("Shoujo"), (arreglo[0][1]).get("Shounen")
                    ],
                    backgroundColor: "rgba(252, 215, 139, 0.8)",
                },
                {
                    label: "Manga",
                    data:  [
                        (arreglo[1][1]).get("Josei"), (arreglo[1][1]).get("Kids"), (arreglo[1][1]).get("Seinen"),
                        (arreglo[1][1]).get("Shoujo"), (arreglo[1][1]).get("Shounen")
                    ],
                    backgroundColor: "rgba(227, 178, 86, 0.8)",
                },
            ]
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