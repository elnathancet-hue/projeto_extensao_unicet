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
        <strong style="font-size:0.875rem"><i class="bi bi-mortarboard"></i> Curso</strong>
        <button type="button" class="btn btn-sm btn-outline-danger" style="font-size:0.688rem; padding:2px 8px" onclick="removerBlocoCurso('${id}')">
          <i class="bi bi-x-lg"></i> Remover
        </button>
      </div>

      <div class="mb-3">
        <select class="form-select" onchange="selecionarCurso('${id}', this.value)">
          <option value="">Selecione o curso</option>
          ${options}
        </select>
      </div>

      <div id="area-coord-${id}" class="d-none" style="background:#e8f3ec; border:1px solid #b6dfc4; border-radius:8px; padding:8px 12px; margin-bottom:12px; font-size:0.813rem"></div>

      <!-- Resumo dos selecionados (visível quando lista está fechada) -->
      <div id="resumo-profs-${id}" style="display:none"></div>

      <!-- Lista de seleção (colapsável) -->
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
  if (bloco) bloco.remove();
}

function selecionarCurso(id, cursoId) {
  const curso = cursosData.find(c => String(c.id) === String(cursoId));
  const areaCoord = document.getElementById(`area-coord-${id}`);
  const listaProfs = document.getElementById(`lista-profs-${id}`);
  const resumoProfs = document.getElementById(`resumo-profs-${id}`);

  if (!areaCoord || !listaProfs || !resumoProfs) return;

  if (!curso) {
    areaCoord.classList.add('d-none');
    areaCoord.innerHTML = '';
    listaProfs.innerHTML = '';
    resumoProfs.style.display = 'none';
    resumoProfs.innerHTML = '';
    return;
  }

  areaCoord.innerHTML = curso.coordenador
    ? `<i class="bi bi-person-badge" style="color:#1c6e36"></i> <strong>Coordenador:</strong> ${curso.coordenador.nome}`
    : `<i class="bi bi-person-badge" style="color:#9ca3af"></i> <strong>Coordenador:</strong> <span class="text-muted">Não definido</span>`;
  areaCoord.classList.remove('d-none');

  if (!Array.isArray(curso.professores) || curso.professores.length === 0) {
    listaProfs.innerHTML = `<p class="text-muted mb-0" style="font-size:0.75rem"><i class="bi bi-info-circle"></i> Nenhum professor vinculado a este curso.</p>`;
    resumoProfs.style.display = 'none';
    return;
  }

  // Render the selectable list (starts visible)
  listaProfs.innerHTML = `
    <div style="border:1px solid #e5e7eb; border-radius:8px; padding:12px; background:#fafbfc">
      <div class="d-flex justify-content-between align-items-center" style="margin-bottom:10px">
        <span style="font-size:0.75rem; font-weight:600; color:#374151">
          <i class="bi bi-people"></i> Selecione os professores
        </span>
        <span class="text-muted" style="font-size:0.688rem" id="contador-${id}">0 selecionado(s)</span>
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:6px;">
        ${curso.professores.map(prof => `
          <label class="prof-chip" for="prof_${id}_${prof.id_pessoa}" style="
            display:inline-flex; align-items:center; gap:6px;
            padding:6px 12px; border-radius:20px;
            border:1.5px solid #d1d5db; background:#fff;
            font-size:0.813rem; cursor:pointer;
            transition:all 0.15s ease; user-select:none;
          ">
            <input class="form-check-input" type="checkbox" value="${prof.id_pessoa}" id="prof_${id}_${prof.id_pessoa}"
              data-nome="${prof.nome}" style="width:14px; height:14px; margin:0; flex-shrink:0"
              onchange="toggleProfChip(this, '${id}')">
            <span>${prof.nome}</span>
          </label>
        `).join('')}
      </div>
      <div style="margin-top:10px; text-align:right">
        <button type="button" class="btn btn-sm btn-primary" style="font-size:0.688rem; padding:4px 14px; border-radius:6px" onclick="confirmarProfessores('${id}')">
          <i class="bi bi-check-lg"></i> Confirmar
        </button>
      </div>
    </div>
  `;

  resumoProfs.style.display = 'none';
  resumoProfs.innerHTML = '';
}

function toggleProfChip(checkbox, blocoId) {
  const chip = checkbox.closest('.prof-chip');
  if (!chip) return;

  if (checkbox.checked) {
    chip.style.borderColor = '#1c6e36';
    chip.style.background = '#e8f3ec';
    chip.style.fontWeight = '600';
  } else {
    chip.style.borderColor = '#d1d5db';
    chip.style.background = '#fff';
    chip.style.fontWeight = 'normal';
  }

  // Update counter
  const bloco = document.getElementById(`bloco-${blocoId}`);
  if (bloco) {
    const total = bloco.querySelectorAll('input.form-check-input:checked').length;
    const contador = document.getElementById(`contador-${blocoId}`);
    if (contador) {
      contador.textContent = total + ' selecionado(s)';
      contador.style.color = total > 0 ? '#1c6e36' : '';
      contador.style.fontWeight = total > 0 ? '600' : '';
    }
  }
}

function confirmarProfessores(id) {
  const listaProfs = document.getElementById(`lista-profs-${id}`);
  const resumoProfs = document.getElementById(`resumo-profs-${id}`);
  if (!listaProfs || !resumoProfs) return;

  const checks = listaProfs.querySelectorAll('input.form-check-input:checked');
  const selecionados = Array.from(checks).map(cb => ({
    id: cb.value,
    nome: cb.getAttribute('data-nome')
  }));

  // Hide the full list
  listaProfs.style.display = 'none';

  // Build summary with tags + edit button
  if (selecionados.length === 0) {
    resumoProfs.innerHTML = `
      <div style="border:1px solid #e5e7eb; border-radius:8px; padding:10px 12px; background:#fafbfc; display:flex; justify-content:space-between; align-items:center">
        <span style="font-size:0.75rem; color:#9ca3af"><i class="bi bi-person-x"></i> Nenhum professor selecionado</span>
        <button type="button" class="btn btn-sm btn-outline-primary" style="font-size:0.688rem; padding:2px 10px; border-radius:6px" onclick="editarProfessores('${id}')">
          <i class="bi bi-pencil"></i> Editar
        </button>
      </div>
    `;
  } else {
    const tags = selecionados.map(p => `
      <span style="display:inline-flex; align-items:center; gap:4px; padding:4px 10px; border-radius:16px; background:#e8f3ec; border:1px solid #b6dfc4; font-size:0.75rem; font-weight:600; color:#14532d">
        <i class="bi bi-person-check" style="font-size:0.688rem"></i> ${p.nome}
      </span>
    `).join('');

    resumoProfs.innerHTML = `
      <div style="border:1px solid #e5e7eb; border-radius:8px; padding:10px 12px; background:#fafbfc">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px">
          <span style="font-size:0.75rem; font-weight:600; color:#374151">
            <i class="bi bi-people-fill" style="color:#1c6e36"></i> ${selecionados.length} professor(es) selecionado(s)
          </span>
          <button type="button" class="btn btn-sm btn-outline-primary" style="font-size:0.688rem; padding:2px 10px; border-radius:6px" onclick="editarProfessores('${id}')">
            <i class="bi bi-pencil"></i> Editar
          </button>
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:6px">${tags}</div>
      </div>
    `;
  }

  resumoProfs.style.display = 'block';
}

function editarProfessores(id) {
  const listaProfs = document.getElementById(`lista-profs-${id}`);
  const resumoProfs = document.getElementById(`resumo-profs-${id}`);
  if (!listaProfs || !resumoProfs) return;

  resumoProfs.style.display = 'none';
  listaProfs.style.display = 'block';
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

    resultado.push({ cursoId, professores });
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
      setCursosData(JSON.parse(el.textContent));
    } catch (error) {
      console.error('Erro ao carregar cursosData:', error);
      setCursosData([]);
    }
  }

  window.adicionarBlocoCurso = adicionarBlocoCurso;
  window.removerBlocoCurso = removerBlocoCurso;
  window.selecionarCurso = selecionarCurso;
  window.prepararEnvio = prepararEnvio;
  window.toggleProfChip = toggleProfChip;
  window.confirmarProfessores = confirmarProfessores;
  window.editarProfessores = editarProfessores;

  const preSelecionadosEl = document.getElementById('cursos-selecionados-data');
  if (preSelecionadosEl) {
    try {
      const preData = JSON.parse(preSelecionadosEl.textContent);
      if (Array.isArray(preData) && preData.length > 0) {
        preData.forEach(item => {
          adicionarBlocoCurso();

          const blocos = document.querySelectorAll('.bloco-curso');
          if (blocos.length === 0) return;
          const ultimoBloco = blocos[blocos.length - 1];

          const select = ultimoBloco.querySelector('select');
          if (select) {
            select.value = item.cursoId;
            const idDoBloco = ultimoBloco.id.replace('bloco-', '');
            selecionarCurso(idDoBloco, item.cursoId);

            if (Array.isArray(item.professores)) {
              item.professores.forEach(profId => {
                const checkbox = ultimoBloco.querySelector(`input.form-check-input[value="${profId}"]`);
                if (checkbox) {
                  checkbox.checked = true;
                  toggleProfChip(checkbox, idDoBloco);
                }
              });
              // Auto-confirm to show summary
              confirmarProfessores(idDoBloco);
            }
          }
        });
      }
    } catch (error) {
      console.error('Erro ao carregar seleções prévias:', error);
    }
  }
});
