// Configuração do mapa
// É importante declarar a variável 'map' apenas uma vez.
// A centralização do mapa em Belo Horizonte já está correta.
const map = L.map('map').setView([-19.9167, -43.9345], 12); // Nível de zoom inicial pode ser 12 ou 13, dependendo da sua preferência.

// Adiciona o mapa base do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // A atribuição correta e mais comum para o OpenStreetMap
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Adiciona um marcador no centro de BH (ex: Praça Sete)
// É uma boa prática usar const para variáveis que não serão reatribuídas.
const pracaSeteMarker = L.marker([-19.9193, -43.9386]).addTo(map);
pracaSeteMarker.bindPopup('<b>Praça Sete</b><br>Centro de Belo Horizonte').openPopup();

// --- Gráfico de criminalidade ---
// Certifique-se de que você tem um elemento <canvas id="crime-chart"></canvas> no seu HTML.
const crimeCtx = document.getElementById('crime-chart').getContext('2d');

// Definição do gráfico de linha usando Chart.js
const crimeChart = new Chart(crimeCtx, {
    type: 'line', // Tipo do gráfico: 'line' para linha
    data: {
        // Rótulos para o eixo X (meses)
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{
            // Rótulo da série de dados
            label: 'Ocorrências Registradas',
            // Seus dados de exemplo
            data: [1200, 1900, 1700, 2000, 1800, 2100],
            // Cor da linha do gráfico
            borderColor: 'rgb(255, 99, 132)',
            // Preenchimento abaixo da linha (opcional, defina como false para não preencher)
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Uma cor semi-transparente para o preenchimento
            tension: 0.1, // Curvatura da linha (0.0 para linha reta, 0.1-0.4 para suave)
            fill: true // Preencher a área abaixo da linha
        }]
    },
    options: {
        // Opções adicionais para o gráfico, como responsividade
        responsive: true,
        maintainAspectRatio: false, // Permite que o gráfico não mantenha a proporção original do canvas
        scales: {
            y: {
                beginAtZero: true // Garante que o eixo Y comece em zero
            }
        },
        plugins: {
            legend: {
                display: true // Mostra a legenda do gráfico
            }
        }
    }
});