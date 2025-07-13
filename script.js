document.addEventListener('DOMContentLoaded', function() {
  // --- Configuração do Tema ---
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Verificar preferência do sistema
  if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  // Alternar tema
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('theme', 'dark');
    }
  });
  
  // --- Navegação por Abas ---
  const navLinks = document.querySelectorAll('.main-nav a');
  const sections = document.querySelectorAll('.dashboard-section');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remover classe active de todos os links
      navLinks.forEach(navLink => navLink.classList.remove('active'));
      
      // Adicionar classe active ao link clicado
      this.classList.add('active');
      
      // Obter a seção alvo
      const targetSection = this.getAttribute('data-section');
      
      // Esconder todas as seções
      sections.forEach(section => section.classList.add('hidden'));
      
      // Mostrar a seção alvo
      document.getElementById(`${targetSection}-section`).classList.remove('hidden');
    });
  });
  
  // --- Configuração do Mapa Principal ---
  const map = L.map('map').setView([-19.9167, -43.9345], 13);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  // Adicionar marcadores de pontos de interesse
  const pontosInteresse = [
    {
      nome: "Praça Sete",
      coordenadas: [-19.9193, -43.9386],
      tipo: "praca",
      descricao: "Principal praça do centro de Belo Horizonte"
    },
    {
      nome: "Mercado Central",
      coordenadas: [-19.9219, -43.9401],
      tipo: "comercio",
      descricao: "Tradicional mercado com variedade de produtos"
    },
    {
      nome: "Praça da Liberdade",
      coordenadas: [-19.9318, -43.9385],
      tipo: "praca",
      descricao: "Conjunto arquitetônico e cultural"
    },
    {
      nome: "Estação Central",
      coordenadas: [-19.9196, -43.9427],
      tipo: "transporte",
      descricao: "Principal estação de metrô de BH"
    }
  ];
  
  // Ícones personalizados
  const iconTypes = {
    praca: L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    }),
    comercio: L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    }),
    transporte: L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })
  };
  
  // Adicionar marcadores ao mapa
  pontosInteresse.forEach(ponto => {
    L.marker(ponto.coordenadas, {
      icon: iconTypes[ponto.tipo]
    }).addTo(map)
      .bindPopup(`<b>${ponto.nome}</b><br>${ponto.descricao}`);
  });
  
  // Simular rotas de ônibus (dados fictícios)
  const rotasOnibus = [
    {
      nome: "Linha 54",
      pontos: [
        [-19.9193, -43.9386],
        [-19.9250, -43.9350],
        [-19.9300, -43.9400],
        [-19.9350, -43.9450]
      ],
      cor: "#ff6b6b"
    },
    {
      nome: "Linha 2102",
      pontos: [
        [-19.9193, -43.9386],
        [-19.9150, -43.9450],
        [-19.9100, -43.9500]
      ],
      cor: "#48dbfb"
    }
  ];
  
  rotasOnibus.forEach(rota => {
    L.polyline(rota.pontos, {
      color: rota.cor,
      weight: 4,
      opacity: 0.7,
      dashArray: '10, 10'
    }).addTo(map).bindPopup(`<b>${rota.nome}</b>`);
  });
  
  // Controles do mapa
  document.getElementById('zoom-in').addEventListener('click', () => {
    map.zoomIn();
  });
  
  document.getElementById('zoom-out').addEventListener('click', () => {
    map.zoomOut();
  });
  
  document.getElementById('locate-me').addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        map.flyTo([position.coords.latitude, position.coords.longitude], 15);
        L.marker([position.coords.latitude, position.coords.longitude], {
          icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })
        }).addTo(map).bindPopup('<b>Sua localização</b>').openPopup();
      });
    } else {
      alert('Geolocalização não é suportada pelo seu navegador.');
    }
  });
  
  // --- Mapa de Criminalidade ---
  const crimeMap = L.map('crime-map').setView([-19.9167, -43.9345], 12);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(crimeMap);
  
  // Adicionar áreas de calor para criminalidade (dados simulados)
  const areasCriminalidade = [
    {
      nome: "Norte",
      coordenadas: [-19.8500, -43.9500],
      raio: 2000,
      intensidade: 0.8
    },
    {
      nome: "Leste",
      coordenadas: [-19.9200, -43.9000],
      raio: 1500,
      intensidade: 0.6
    },
    {
      nome: "Oeste",
      coordenadas: [-19.9300, -43.9700],
      raio: 1800,
      intensidade: 0.7
    }
  ];
  
  areasCriminalidade.forEach(area => {
    L.circle(area.coordenadas, {
      radius: area.raio,
      color: '#ff4757',
      fillColor: '#ff4757',
      fillOpacity: area.intensidade * 0.3,
      weight: 1
    }).addTo(crimeMap).bindPopup(`<b>Área: ${area.nome}</b><br>Índice de criminalidade: ${Math.round(area.intensidade * 100)}%`);
  });
  
  // --- Gráfico de Criminalidade ---
  const crimeCtx = document.getElementById('crime-chart').getContext('2d');
  
  const crimeChart = new Chart(crimeCtx, {
    type: 'bar',
    data: {
      labels: ['Homicídio', 'Furto', 'Roubo', 'Latrocínio', 'Lesão Corporal'],
      datasets: [{
        label: 'Ocorrências em 2024',
        data: [312, 4820, 3150, 24, 1890],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
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
            text: 'Número de Ocorrências'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Tipo de Crime'
          }
        }
      },
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Distribuição de Crimes em Belo Horizonte (2024)',
          font: {
            size: 16
          }
        },
        datalabels: {
          display: false
        }
      }
    },
    plugins: [ChartDataLabels]
  });
  
  // Filtro de tempo para criminalidade
  document.getElementById('crime-time-filter').addEventListener('change', function() {
    const year = this.value;
    // Simular mudança de dados (na prática, faria uma requisição AJAX)
    const dataMap = {
      '2024': [312, 4820, 3150, 24, 1890],
      '2023': [340, 5100, 3350, 28, 1950],
      '2022': [380, 5400, 3600, 32, 2100],
      '2021': [410, 5800, 3900, 35, 2300]
    };
    
    crimeChart.data.datasets[0].data = dataMap[year];
    crimeChart.update();
  });
  
  // --- Gráfico de Transporte ---
  const transportCtx = document.getElementById('transport-chart').getContext('2d');
  
  const transportChart = new Chart(transportCtx, {
    type: 'line',
    data: {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      datasets: [
        {
          label: 'Ônibus em Operação',
          data: [120, 180, 1500, 1400, 1600, 1300],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.1)',
          tension: 0.3,
          fill: true
        },
        {
          label: 'Passageiros Transportados (mil)',
          data: [5, 10, 450, 300, 500, 350],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.1)',
          tension: 0.3,
          fill: true,
          yAxisID: 'y1'
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
            text: 'Ônibus em Operação'
          }
        },
        y1: {
          position: 'right',
          beginAtZero: true,
          title: {
            display: true,
            text: 'Passageiros (mil)'
          },
          grid: {
            drawOnChartArea: false
          }
        },
        x: {
          title: {
            display: true,
            text: 'Horário do Dia'
          }
        }
      },
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Uso do Transporte Público em Tempo Real',
          font: {
            size: 16
          }
        }
      }
    }
  });
  
  // Filtro de tempo para transporte
  document.getElementById('transport-time-filter').addEventListener('change', function() {
    const timeRange = this.value;
    // Simular mudança de dados
    if (timeRange === 'realtime') {
      transportChart.data.labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
      transportChart.data.datasets[0].data = [120, 180, 1500, 1400, 1600, 1300];
      transportChart.data.datasets[1].data = [5, 10, 450, 300, 500, 350];
    } else if (timeRange === 'day') {
      transportChart.data.labels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
      transportChart.data.datasets[0].data = [1500, 1550, 1520, 1480, 1600, 1300, 1100];
      transportChart.data.datasets[1].data = [450, 460, 455, 440, 480, 380, 300];
    } else if (timeRange === 'week') {
      transportChart.data.labels = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'];
      transportChart.data.datasets[0].data = [1500, 1450, 1520, 1480];
      transportChart.data.datasets[1].data = [450, 430, 460, 440];
    } else if (timeRange === 'month') {
      transportChart.data.labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
      transportChart.data.datasets[0].data = [1400, 1350, 1450, 1500, 1550, 1600];
      transportChart.data.datasets[1].data = [420, 400, 430, 450, 460, 480];
    }
    
    transportChart.update();
  });
  
  // --- Gráfico Econômico ---
  const economicCtx = document.getElementById('economic-chart').getContext('2d');
  
  const economicChart = new Chart(economicCtx, {
    type: 'bar',
    data: {
      labels: ['Mineração', 'Indústria', 'Serviços', 'Comércio', 'Construção', 'Agropecuária'],
      datasets: [
        {
          label: 'Participação no PIB (%)',
          data: [28, 22, 35, 10, 3, 2],
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Crescimento Anual (%)',
          data: [3.2, 2.8, 4.1, 3.5, 1.9, 2.3],
          backgroundColor: 'rgba(153, 102, 255, 0.7)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
          type: 'line',
          yAxisID: 'y1'
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
            text: 'Participação no PIB (%)'
          }
        },
        y1: {
          position: 'right',
          beginAtZero: true,
          title: {
            display: true,
            text: 'Crescimento Anual (%)'
          },
          grid: {
            drawOnChartArea: false
          }
        },
        x: {
          title: {
            display: true,
            text: 'Setor Econômico'
          }
        }
      },
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Composição do PIB de Belo Horizonte por Setor',
          font: {
            size: 16
          }
        },
        datalabels: {
          display: true,
          anchor: 'end',
          align: 'top',
          formatter: (value, context) => {
            return context.datasetIndex === 0 ? `${value}%` : `+${value}%`;
          }
        }
      }
    },
    plugins: [ChartDataLabels]
  });
  
  // Filtro de tempo para economia
  document.getElementById('economy-time-filter').addEventListener('change', function() {
    const year = this.value;
    // Simular mudança de dados
    const pibMap = {
      '2024': [28, 22, 35, 10, 3, 2],
      '2023': [30, 23, 33, 9, 3, 2],
      '2022': [32, 24, 31, 8, 3, 2],
      '2021': [34, 25, 29, 7, 3, 2]
    };
    
    const crescimentoMap = {
      '2024': [3.2, 2.8, 4.1, 3.5, 1.9, 2.3],
      '2023': [2.8, 2.5, 3.8, 3.2, 1.7, 2.0],
      '2022': [1.5, 1.2, 2.5, 2.0, 0.5, 1.2],
      '2021': [-1.2, -0.8, 0.5, -0.3, -1.5, 0.2]
    };
    
    economicChart.data.datasets[0].data = pibMap[year];
    economicChart.data.datasets[1].data = crescimentoMap[year];
    economicChart.update();
  });
  
  // --- Botão de Atualização ---
  document.getElementById('refresh-data').addEventListener('click', function() {
    // Simular atualização de dados
    this.classList.add('rotating');
    
    // Mostrar notificação
    showNotification('Atualizando dados...', 'info');
    
    setTimeout(() => {
      this.classList.remove('rotating');
      showNotification('Dados atualizados com sucesso!', 'success');
      
      // Atualizar aleatoriamente alguns dados para simular mudança
      const randomUpdate = Math.random();
      if (randomUpdate > 0.5) {
        crimeChart.data.datasets[0].data = crimeChart.data.datasets[0].data.map(
          value => value + Math.floor(Math.random() * 50 - 25)
        );
        crimeChart.update();
      } else {
        transportChart.data.datasets[0].data = transportChart.data.datasets[0].data.map(
          value => value + Math.floor(Math.random() * 100 - 50)
        );
        transportChart.update();
      }
    }, 1500);
  });
  
  // Função para mostrar notificações
  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
  
  // Adicionar estilo para notificações
  const notificationStyle = document.createElement('style');
  notificationStyle.textContent = `
    .notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 5px;
      color: white;
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.3s ease;
      z-index: 1000;
    }
    
    .notification.show {
      transform: translateY(0);
      opacity: 1;
    }
    
    .notification.info {
      background-color: #3498db;
    }
    
    .notification.success {
      background-color: #2ecc71;
    }
    
    .notification.error {
      background-color: #e74c3c;
    }
    
    .rotating {
      animation: rotate 1s linear infinite;
    }
    
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(notificationStyle);
});