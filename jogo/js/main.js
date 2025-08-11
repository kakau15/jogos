// Animação da bola: queda + quique + rotação suave
anime({
  targets: '#ball',
  translateY: [
    { value: 500, duration: 1500, easing: 'easeInQuad' },
    { value: 400, duration: 300, easing: 'easeOutQuad' },
    { value: 500, duration: 300, easing: 'easeInQuad' },
  ],
  rotate: {
    value: '1turn',
    duration: 2400,
    easing: 'linear',
  },
  loop: true,
});

function startGame() {
  alert('Iniciando o jogo...');
  // Aqui você pode adicionar redirecionamento ou iniciar o jogo
}
