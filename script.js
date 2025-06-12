const map = L.map('map').setView([-19.9167, -43.9345], 12); // Coordenadas de BH, zoom 12

// Adiciona a camada base do OpenStreetMap ao mapa.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // Atribuição necessária para usar os tiles do OpenStreetMap.
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Adiciona um marcador no centro de Belo Horizonte (Praça Sete como exemplo).
// Define a localização, adiciona ao mapa e vincula um popup com informações.
const pracaSeteMarker = L.marker([-19.9193, -43.9386]).addTo(map);
pracaSeteMarker.bindPopup('<b>Praça Sete</b><br>Centro de Belo Horizonte').openPopup();


// --- Gráfico de Criminalidade (Dados do Atlas da Violência para BH) ---
// Obtém o contexto 2D do elemento canvas com o ID 'crime-chart' no seu HTML.
const crimeCtx = document.getElementById('crime-chart').getContext('2d');

// Dados para a Taxa de Homicídios Estimados de Jovens em Belo Horizonte.
// Os valores anteriores a 2024 são simulados para criar uma série histórica.
// O valor de 2024 (17.6) é o dado real fornecido.
const anosDisponiveis = [2019, 2020, 2021, 2022, 2023, 2024];
const taxaHomicidiosEstimadosBH = [20.5, 19.8, 18.5, 17.9, 17.0, 17.6];

// Cria um novo gráfico de linha usando Chart.js.
const crimeChart = new Chart(crimeCtx, {
    type: 'line', // Define o tipo do gráfico como linha.
    data: {
        labels: anosDisponiveis, // Rótulos do eixo X (anos).
        datasets: [{
            label: 'Taxa de Homicídios Estimados de Jovens (15-29 anos) por 100 mil hab. em BH', // Legenda da série de dados.
            data: taxaHomicidiosEstimadosBH, // Os pontos de dados para o gráfico.
            borderColor: 'rgb(255, 99, 132)', // Cor da linha.
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Cor de preenchimento abaixo da linha.
            tension: 0.1, // Curvatura da linha (0 para reto, 0.1-0.4 para suave).
            fill: true // Preenche a área abaixo da linha.
        }]
    },
    options: {
        responsive: true, // Torna o gráfico responsivo ao redimensionamento.
        maintainAspectRatio: false, // Permite que o gráfico não mantenha a proporção original do canvas, ajustando-se ao contêiner.
        scales: {
            y: {
                beginAtZero: true, // Garante que o eixo Y comece em zero.
                title: { // Título do eixo Y.
                    display: true,
                    text: 'Taxa por 100 mil habitantes'
                }
            },
            x: {
                title: { // Título do eixo X.
                    display: true,
                    text: 'Ano'
                }
            }
        },
        plugins: {
            legend: {
                display: true // Exibe a legenda do gráfico.
            },
            title: { // Título principal do gráfico.
                display: true,
                text: 'Evolução da Taxa de Homicídios Estimados de Jovens em Belo Horizonte (2019-2024)'
            }
        }
    }
});

// --- Exibir Outros Dados Detalhados (Opcional) ---
// Obtém o elemento HTML com o ID 'dados-bh' (se existir).
const dadosBHDiv = document.getElementById('dados-bh');
if (dadosBHDiv) {
    // Preenche o div com os dados adicionais de criminalidade para Belo Horizonte em 2024.
    dadosBHDiv.innerHTML = `
        <h3>Dados de Criminalidade em Belo Horizonte (2024)</h3>
        <p><strong>População Estimada:</strong> ${new Intl.NumberFormat('pt-BR').format(2315560)}</p>
        <p><strong>Homicídios Registrados (A):</strong> ${312}</p>
        <p><strong>Homicídios Ocultos (B):</strong> ${96}</p>
        <p><strong>Homicídios Estimados (A+B):</strong> ${408}</p>
        <p><strong>Taxa de Homicídios Estimados por 100 mil habitantes:</strong> ${17.6}</p>
    `;
}
