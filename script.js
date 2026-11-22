// Menú móvil responsivo
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // Acordeón interactivo en Pantalla 3 (Mitos)
  const mythButtons = document.querySelectorAll('.myth-btn');
  mythButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const isOpen = content.classList.contains('open');
      content.classList.toggle('open');
      const icon = btn.querySelector('.icon');
      if (icon) icon.textContent = isOpen ? '+' : '−';
    });
  });
});

// Calculadora interactiva en Pantalla 1 (¿Por qué activarnos?)
function evaluarActividad() {
  const minutosInput = document.getElementById('minutosSemanales');
  const resultado = document.getElementById('resultadoActividad');
  if (!minutosInput || !resultado) return;

  const minutos = parseInt(minutosInput.value, 10);
  resultado.style.display = 'block';

  if (isNaN(minutos) || minutos < 0) {
    resultado.style.background = '#fef3c7';
    resultado.textContent = 'Por favor ingresa un número válido de minutos (ejemplo: 60).';
    return;
  }

  if (minutos < 150) {
    const faltan = 150 - minutos;
    resultado.style.background = '#fef3c7';
    resultado.innerHTML = `Actualmente realizas <strong>${minutos} minutos</strong> a la semana. Te faltan <strong>${faltan} minutos</strong> para alcanzar la meta mínima de la OMS (150 min/semana). ¡Empieza agregando 15 minutos de caminata al día!`;
  } else {
    resultado.style.background = '#ccfbf1';
    resultado.innerHTML = `¡Excelente! Con <strong>${minutos} minutos</strong> semanales cumples la recomendación de la OMS (150+ minutos). Mantén tus pausas activas diarias.`;
  }
}

// Temporizador interactivo de Pausa Activa (5 minutos) en Pantalla 2
let timerInterval = null;
let secondsLeft = 300; // 5 minutos

function updateTimerDisplay() {
  const display = document.getElementById('timerDisplay');
  if (!display) return;
  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');
  display.textContent = `${mins}:${secs}`;
}

function iniciarPausaActiva() {
  if (timerInterval) return;
  const status = document.getElementById('timerStatus');
  if (status) status.textContent = '¡Pausa activa en curso! Realiza estiramientos suaves de cuello, hombros y espalda.';

  timerInterval = setInterval(() => {
    if (secondsLeft > 0) {
      secondsLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      if (status) status.textContent = '¡Felicitaciones! Completaste tu pausa activa de 5 minutos.';
    }
  }, 1000);
}

function reiniciarPausaActiva() {
  clearInterval(timerInterval);
  timerInterval = null;
  secondsLeft = 300;
  updateTimerDisplay();
  const status = document.getElementById('timerStatus');
  if (status) status.textContent = 'Presiona "Iniciar 5 minutos" cada 2 horas de trabajo sentado.';
}
