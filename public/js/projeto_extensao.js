let cursosData = [];

function setCursosData(data) {
  cursosData = Array.isArray(data) ? data : [];
}

let geradorIdBloco = 1;
function adicionarBlocoCurso() {
  const id = Date.now() + '-' + geradorIdBloco++;

  const options = cursosData.map(curso => `
    <option value="${curso.id}">${curso.nome}</option>
  `).join('');

  const html = `
    <div class="border rounded p-3 mb-3 bloco-curso" id="bloco-${id}">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <strong>Curso</strong>
        <button
          type="button"
          class="btn btn-sm btn-outline-danger"
          onclick="removerBlocoCurso('${id}')"
        >
          Remover
        </button>
      </div>

      <div class="mb-3">
        <select
          class="form-select"
          onchange="selecionarCurso('${id}', this.value)"
        >
          <option value="">Selecione o curso</option>
          ${options}
        </select>
      </div>

      <div id="area-coord-${id}" class="alert alert-success py-2 d-none"></div>

      <div id="lista-profs-${id}" class="mt-2"></div>
    </div>
  `;

  const container = document.getElementById('lista-global-cursos');
  if (container) {
    container.insertAdjacentHTML('beforeend', html);
  }
}

function removerBlocoCurso(id) {
  const bloco = document.getElementById(`bloco-${id}`);
  if (bloco) {
    bloco.remove();
  }
}

function selecionarCurso(id, cursoId) {
  const curso = cursosData.find(c => String(c.id) === String(cursoId));
  const areaCoord = document.getElementById(`area-coord-${id}`);
  const listaProfs = document.getElementById(`lista-profs-${id}`);

  if (!areaCoord || !listaProfs) return;

  if (!curso) {
    areaCoord.classList.add('d-none');
    areaCoord.innerHTML = '';
    listaProfs.innerHTML = '';
    return;
  }

  areaCoord.innerHTML = curso.coordenador
    ? `<strong>Coordenador:</strong> ${curso.coordenador.nome}`
    : `<strong>Coordenador:</strong> Não definido`;

  areaCoord.classList.remove('d-none');

  if (!Array.isArray(curso.professores) || curso.professores.length === 0) {
    listaProfs.innerHTML = `<p class="text-muted mb-0">Nenhum professor vinculado a este curso.</p>`;
    return;
  }

  listaProfs.innerHTML = `
    <label class="form-label fw-bold">Professores</label>
    <div class="border rounded p-2">
      ${curso.professores.map(prof => `
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value="${prof.id_pessoa}"
            id="prof_${id}_${prof.id_pessoa}"
          >
          <label class="form-check-label" for="prof_${id}_${prof.id_pessoa}">
            ${prof.nome}
          </label>
        </div>
      `).join('')}
    </div>
  `;
}

function prepararEnvio() {
  const blocos = document.querySelectorAll('.bloco-curso');
  const resultado = [];

  blocos.forEach(bloco => {
    const select = bloco.querySelector('select');
    const cursoId = select ? select.value : '';

    if (!cursoId) return;

    const professores = Array.from(
      bloco.querySelectorAll('input.form-check-input:checked')
    ).map(input => input.value);

    resultado.push({
      cursoId,
      professores
    });
  });

  const hidden = document.getElementById('dadosCursos');
  if (hidden) {
    hidden.value = JSON.stringify(resultado);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const el = document.getElementById('cursos-data');

  if (el) {
    try {
      const data = JSON.parse(el.textContent);
      setCursosData(data);
    } catch (error) {
      console.error('Erro ao carregar cursosData:', error);
      setCursosData([]);
    }
  }

  window.adicionarBlocoCurso = adicionarBlocoCurso;
  window.removerBlocoCurso = removerBlocoCurso;
  window.selecionarCurso = selecionarCurso;
  window.prepararEnvio = prepararEnvio;

  const preSelecionadosEl = document.getElementById('cursos-selecionados-data');
  if (preSelecionadosEl) {
    try {
      const preData = JSON.parse(preSelecionadosEl.textContent);
      if (Array.isArray(preData) && preData.length > 0) {
        preData.forEach(item => {
          adicionarBlocoCurso();
          
          // last added block is the one with the highest geradorIdBloco - 1
          // actually let's just find the last .bloco-curso
          const blocos = document.querySelectorAll('.bloco-curso');
          if (blocos.length === 0) return;
          const ultimoBloco = blocos[blocos.length - 1];
          
          const select = ultimoBloco.querySelector('select');
          if (select) {
            select.value = item.cursoId;
            // trigger the onchange event manually to load teachers
            const idDoBloco = ultimoBloco.id.replace('bloco-', '');
            selecionarCurso(idDoBloco, item.cursoId);
            
            // now check the checkboxes
            if (Array.isArray(item.professores)) {
              item.professores.forEach(profId => {
                const checkbox = ultimoBloco.querySelector(`input.form-check-input[value="${profId}"]`);
                if (checkbox) checkbox.checked = true;
              });
            }
          }
        });
      }
    } catch (error) {
      console.error('Erro ao carregar seleções prévias:', error);
    }
  }
});