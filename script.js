const senhaInput = document.getElementById('senha');
const toggleSenhaBtn = document.getElementById('toggleSenha');
const chamadoForm = document.getElementById('chamadoForm');
const executorOptions = document.getElementById('executorOptions');
const tipoServicoInput = document.getElementById('tipoServico');
const listaChamados = document.getElementById('listaChamados');
const emptyState = document.getElementById('emptyState');

if (toggleSenhaBtn && senhaInput) {
  toggleSenhaBtn.addEventListener('click', () => {
    const mostrar = senhaInput.type === 'password';
    senhaInput.type = mostrar ? 'text' : 'password';
    toggleSenhaBtn.textContent = mostrar ? 'Ocultar' : 'Mostrar';
  });
}

if (executorOptions && tipoServicoInput) {
  executorOptions.addEventListener('click', (event) => {
    const button = event.target.closest('.executor-btn');

    if (!button) {
      return;
    }

    const tipoSelecionado = button.dataset.tipo;

    if (!tipoSelecionado) {
      return;
    }

    executorOptions.querySelectorAll('.executor-btn').forEach((item) => {
      item.classList.remove('active');
    });

    button.classList.add('active');
    tipoServicoInput.value = tipoSelecionado;
  });
}

if (chamadoForm && listaChamados && emptyState && tipoServicoInput) {
  chamadoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const tituloInput = chamadoForm.querySelector('#titulo');
    const titulo = tituloInput.value.trim();
    const tipoServico = tipoServicoInput.value;

    if (!titulo || !tipoServico) {
      return;
    }

    const chamado = document.createElement('article');
    chamado.className = `chamado-item ${tipoServico}`;

    const tipoLabel = tipoServico === 'governanca' ? 'Governança' : 'Manutenção';

    chamado.innerHTML = `
      <strong>${titulo}</strong>
      <small>Executado por: ${tipoLabel}</small>
    `;

    listaChamados.prepend(chamado);
    emptyState.hidden = true;

    chamadoForm.reset();
    tipoServicoInput.value = '';
    executorOptions.querySelectorAll('.executor-btn').forEach((item) => {
      item.classList.remove('active');
    });
  });
}
