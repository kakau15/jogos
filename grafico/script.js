const ctx = document.getElementById('graficoBarras').getContext('2d');

const grafico = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    datasets: [{
      label: 'Horas Trabalhadas',
      data: [8, 7, 9, 6, 8],
      backgroundColor: '#007BFF',
      borderColor: '#004080',
      borderWidth: 1,
      borderRadius: 4
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#004080',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      tooltip: {
        backgroundColor: '#004080',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#007BFF',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#004080'
        },
        grid: {
          color: 'rgba(0, 64, 128, 0.1)'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Horas',
          color: '#004080',
          font: {
            weight: 'bold'
          }
        },
        ticks: {
          color: '#004080'
        },
        grid: {
          color: 'rgba(0, 64, 128, 0.1)'
        }
      }
    }
  }
});