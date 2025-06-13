// Este script inicializa um mapa Leaflet centrado em Belo Horizonte,
// exibe um gráfico de linha de criminalidade de jovens e
// adiciona um gráfico de barras com dados econômicos simulados para Minas Gerais,
// além de mostrar dados detalhados em divs.

// --- Configuração do Mapa ---
const map = L.map('map').setView([-19.9167, -43.9345], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
const pracaSeteMarker = L.marker([-19.9193, -43.9386]).addTo(map);
pracaSeteMarker.bindPopup('<b>Praça Sete</b><br>Centro de Belo Horizonte').openPopup();


// --- Gráfico de Criminalidade (Dados do Atlas da Violência para BH) ---
const crimeCtx = document.getElementById('crime-chart').getContext('2d');

const anosDisponiveisCrime = [2019, 2020, 2021, 2022, 2023, 2024];
const taxaHomicidiosEstimadosBH = [20.5, 19.8, 18.5, 17.9, 17.0, 17.6]; // Dados simulados, 2024 é o real

const crimeChart = new Chart(crimeCtx, {
    type: 'line',
    data: {
        labels: anosDisponiveisCrime,
        datasets: [{
            label: 'Taxa de Homicídios Estimados de Jovens (15-29 anos) por 100 mil hab. em BH',
            data: taxaHomicidiosEstimadosBH,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            tension: 0.1,
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Taxa por 100 mil habitantes'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Ano'
                }
            }
        },
        plugins: {
            legend: {
                display: true
            },
            title: {
                display: true,
                text: 'Evolução da Taxa de Homicídios Estimados de Jovens em Belo Horizonte (2019-2024)'
            }
        }
    }
});

// --- Exibir Outros Dados de Criminalidade (Opcional) ---
const dadosBHDiv = document.getElementById('dados-bh');
if (dadosBHDiv) {
    dadosBHDiv.innerHTML = `
        <h3>Dados de Criminalidade em Belo Horizonte (2024)</h3>
        <p><strong>População Estimada:</strong> ${new Intl.NumberFormat('pt-BR').format(2315560)}</p>
        <p><strong>Homicídios Registrados (A):</strong> ${312}</p>
        <p><strong>Homicídios Ocultos (B):</strong> ${96}</p>
        <p><strong>Homicídios Estimados (A+B):</strong> ${408}</p>
        <p><strong>Taxa de Homicídios Estimados por 100 mil habitantes:</strong> ${17.6}</p>
    `;
}


// --- NOVO: Gráfico de Indicadores Econômicos de Minas Gerais ---
// Obtém o contexto 2D do elemento canvas com o ID 'economic-chart'.
const economicCtx = document.getElementById('economic-chart').getContext('2d');

// **Dados econômicos simulados para o estado de Minas Gerais**
// No futuro, estes dados poderiam ser carregados de uma API de dados abertos.
const anosEconomicos = [2020, 2021, 2022, 2023];
const pibEstadual = [750, 780, 810, 850]; // Exemplo em Bilhões de Reais
const receitaEstadual = [100, 110, 115, 120]; // Exemplo em Bilhões de Reais

const economicChart = new Chart(economicCtx, {
    type: 'bar', // Um gráfico de barras pode ser bom para comparar anos
    data: {
        labels: anosEconomicos,
        datasets: [
            {
                label: 'PIB Estadual (Bilhões R$)',
                data: pibEstadual,
                backgroundColor: 'rgba(54, 162, 235, 0.7)', // Azul
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Receita Estadual (Bilhões R$)',
                data: receitaEstadual,
                backgroundColor: 'rgba(75, 192, 192, 0.7)', // Verde-água
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Valor (Bilhões R$)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Ano'
                }
            }
        },
        plugins: {
            legend: {
                display: true
            },
            title: {
                display: true,
                text: 'Indicadores Econômicos de Minas Gerais (Simulados)'
            }
        }
    }
});

// --- NOVO: Exibir Dados Econômicos Detalhados (Opcional) ---
const dadosEconomicosDiv = document.getElementById('dados-economicos-mg');
if (dadosEconomicosDiv) {
    // Para simplificar, vamos exibir apenas os dados mais recentes (ex: 2023)
    const ultimoAno = anosEconomicos[anosEconomicos.length - 1];
    const ultimoPIB = pibEstadual[pibEstadual.length - 1];
    const ultimaReceita = receitaEstadual[receitaEstadual.length - 1];

    dadosEconomicosDiv.innerHTML = `
        <h3>Dados Econômicos de Minas Gerais (${ultimoAno})</h3>
        <p><strong>PIB Estadual:</strong> R$ ${new Intl.NumberFormat('pt-BR').format(ultimoPIB)} Bilhões</p>
        <p><strong>Receita Estadual:</strong> R$ ${new Intl.NumberFormat('pt-BR').format(ultimaReceita)} Bilhões</p>
        <p><em>(Dados simulados. Busque os dados reais no Portal de Dados Abertos de MG para precisão.)</em></p>
    `;
}