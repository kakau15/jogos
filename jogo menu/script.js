const secoes = ['menu', 'velha', 'quiz', 'numero'];

function mostrarSecao(id) {
  secoes.forEach(sec => {
    const el = document.getElementById(sec);
    if (el) {
      if (sec === id) {
        el.classList.remove('d-none');
        el.classList.add('active');
      } else {
        el.classList.add('d-none');
        el.classList.remove('active');
        if(sec === 'velha') limparTelaVelha();
      }
    }
  });

  if (id === 'velha') iniciarVelha();
  if (id === 'quiz') iniciarQuiz();
  if (id === 'numero') iniciarNumero();
}

function voltarMenu() {
  mostrarSecao('menu');
}

// Animação do menu com anime.js
anime({
  targets: '.letras',
  opacity: [0, 1],
  translateY: [-20, 0],
  duration: 1500,
  easing: 'easeOutExpo',
  delay: anime.stagger(100)
});

anime({
  targets: '.btn-menu',
  opacity: [0, 1],
  translateY: [30, 0],
  duration: 800,
  delay: anime.stagger(200, { start: 1000 }),
  easing: 'easeOutBack'
});

// -------- JOGO DA VELHA ---------
let confettiActive = false;
function iniciarVelha() {
  const tabuleiro = document.getElementById("tabuleiro");
  tabuleiro.innerHTML = '';
  let jogador = "X";
  let fim = false;
  let estado = Array(9).fill("");
  limparTelaVelha();

  for (let i = 0; i < 9; i++) {
    const celula = document.createElement("div");
    celula.className = "celula";
    celula.addEventListener("click", () => {
      if (!fim && celula.textContent === "") {
        celula.textContent = jogador;
        estado[i] = jogador;
        if (verificarVitoria(jogador, estado)) {
          document.getElementById("mensagemVelha").textContent = `Jogador ${jogador} venceu!`;
          fim = true;
          aplicarEstiloVitoria(jogador);
          soltarConfete(jogador);
        } else if (!estado.includes("")) {
          document.getElementById("mensagemVelha").textContent = "Empate!";
          fim = true;
        } else {
          jogador = jogador === "X" ? "O" : "X";
        }
      }
    });
    tabuleiro.appendChild(celula);
  }

  document.getElementById("mensagemVelha").textContent = "";
}

function verificarVitoria(jogador, estado) {
  const combosVitoria = [
    [0,1,2],[3,4,5],[6,7,8], // linhas
    [0,3,6],[1,4,7],[2,5,8], // colunas
    [0,4,8],[2,4,6]          // diagonais
  ];

  return combosVitoria.some(combo => combo.every(idx => estado[idx] === jogador));
}

function aplicarEstiloVitoria(jogador) {
  const velha = document.getElementById('velha');
  if(jogador === 'X'){
    velha.classList.add('vitoria-x');
  } else {
    velha.classList.add('vitoria-o');
  }
}

function limparTelaVelha() {
  confettiActive = false;
  const velha = document.getElementById('velha');
  velha.classList.remove('vitoria-x', 'vitoria-o');
  document.getElementById("mensagemVelha").textContent = "";
}

// Função para soltar confete no fundo da tela
function soltarConfete(jogador) {
  confettiActive = true;
  const colors = jogador === 'X' ? ['#007bff', '#0056b3', '#3399ff'] : ['#dc3545', '#a71d2a', '#e74c3c'];
  const duration = 3 * 1000; // 3 segundos
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end && confettiActive) {
      requestAnimationFrame(frame);
    }
  })();
}

// -------- QUIZ ---------
const perguntas = [
  {
    pergunta: "Quem é a maior pontuadora da seleção feminina de vôlei?",
    opcoes: ["Jaqueline Carvalho", "Sheilla Castro", "Fernanda Garay", "Tandara Caixeta"],
    correta: 2 // Fernanda Garay (índice 2)
  },
  {
    pergunta: "Em que ano a seleção feminina conquistou seu primeiro ouro olímpico?",
    opcoes: ["1996", "2008", "2012", "2016"],
    correta: 1 // 2008 (índice 1)
  },
  {
    pergunta: "Quem é a atual capitã da seleção feminina de vôlei?",
    opcoes: ["Thaisa Menezes", "Gabriela Guimarães (Gabi)", "Carol Gattaz", "Rosamaria Montibeller"],
    correta: 1 // Gabi (índice 1)
  },
  {
    pergunta: "Quantas medalhas olímpicas a seleção feminina possui?",
    opcoes: ["2", "3", "4", "5"],
    correta: 0 // 2 (índice 0)
  }
];

let perguntaAtual = 0;
let pontuacao = 0;

function iniciarQuiz() {
  perguntaAtual = 0;
  pontuacao = 0;
  mostrarPergunta();
}

function mostrarPergunta() {
  const container = document.getElementById('quiz-container');
  container.innerHTML = '';

  if (perguntaAtual >= perguntas.length) {
    container.innerHTML = `<h4 class="text-center">Quiz finalizado! Sua pontuação: ${pontuacao} / ${perguntas.length}</h4>`;
    return;
  }

  const p = document.createElement('p');
  p.textContent = perguntas[perguntaAtual].pergunta;
  container.appendChild(p);

  perguntas[perguntaAtual].opcoes.forEach((opcao, i) => {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.style.backgroundColor = ['#00b894','#0984e3','#fd79a8','#6c5ce7'][i];
    btn.textContent = opcao;
    btn.onclick = () => {
      if(i === perguntas[perguntaAtual].correta) {
        pontuacao++;
        btn.style.filter = 'brightness(1.3)';
      } else {
        btn.style.filter = 'brightness(0.7)';
      }
      // Desabilitar todos os botões para evitar múltiplos cliques
      Array.from(container.querySelectorAll('button')).forEach(b => b.disabled = true);

      setTimeout(() => {
        perguntaAtual++;
        mostrarPergunta();
      }, 1000);
    };
    container.appendChild(btn);
  });
}

// -------- ADIVINHE O NÚMERO --------
let numeroSecreto;
function iniciarNumero() {
  numeroSecreto = Math.floor(Math.random() * 50) + 1;
  document.getElementById('palpite').value = '';
  document.getElementById('mensagemNumero').textContent = '';
}

function verificarPalpite() {
  const palpiteInput = document.getElementById('palpite');
  const palpite = Number(palpiteInput.value);
  const mensagem = document.getElementById('mensagemNumero');

  if (!palpite || palpite < 1 || palpite > 50) {
    mensagem.textContent = "Por favor, digite um número válido entre 1 e 50.";
    mensagem.style.color = "red";
    return;
  }

  if (palpite === numeroSecreto) {
    mensagem.textContent = `Parabéns! Você acertou o número ${numeroSecreto}! 🎉`;
    mensagem.style.color = "green";
  } else if (palpite < numeroSecreto) {
    mensagem.textContent = "Tente um número maior!";
    mensagem.style.color = "#0d6efd";
  } else {
    mensagem.textContent = "Tente um número menor!";
    mensagem.style.color = "#0d6efd";
  }
}

