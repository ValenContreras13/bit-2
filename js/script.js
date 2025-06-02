'use strict';

const d = document;
const $root = d.getElementById('root');
const $git = d.getElementById('git');
const $student = d.getElementById('student');
const $students = d.getElementById('students');
const $studentss = d.getElementById('studentss');
const $notas = document.getElementById('notas');

const fallbackImage = './assets/desconocido.PNG';

// === Checkboxes ===
const checkboxTodos = document.getElementById('op1');
const checkboxGitHubBio = document.getElementById('op2');
const checkbox100Hours = document.getElementById('op3');
const checkbox300Hours = document.getElementById('op4');
const checkbox400Hours = document.getElementById('op5');
const checkboxNotas = document.getElementById('op6');

// Desactiva todos los demás checkboxes excepto el activo
function deactivateOthers(activeCheckbox) {
  const checkboxes = [
    checkboxTodos,
    checkboxGitHubBio,
    checkbox100Hours,
    checkbox300Hours,
    checkbox400Hours,
    checkboxNotas
  ];

  checkboxes.forEach(cb => {
    if (cb !== activeCheckbox) cb.checked = false;
  });
}

// Mostrar todos los estudiantes (sin bio GitHub)
function fetchAndDisplayStudents() {
  fetch('file.json')
    .then(res => res.json())
    .then(info => {
      let cards = '';

      for (let i = 0; i < info.length; i++) {
        const student = info[i].student || 'Estudiante sin nombre';
        const username = info[i].usernameGithub?.trim();
        const hasUsername = username && username !== '';

        const imageSrc = hasUsername
          ? `https://github.com/${username}.png`
          : fallbackImage;

        const githubLink = hasUsername
          ? `<a href="https://github.com/${username}" target="_blank" class="card-link">GitHub</a>`
          : `<span class="text-muted">GitHub no disponible</span>`;

        cards += `
          <div class="card m-3" style="width: 18rem;">
            <img 
              class="card-img-top" 
              src="${imageSrc}" 
              alt="Imagen de ${student}" 
              onerror="this.onerror=null; this.src='${fallbackImage}';"
            >
            <div class="card-body">
              <h5 class="card-title">${student}</h5>
              ${githubLink}
              <p class="card-text"></p>
            </div>
          </div>
        `;
      }

      $root.innerHTML = `
        <div class="d-flex flex-wrap justify-content-center">
          ${cards}
        </div>
      `;

      $git.innerHTML = '';
      $student.innerHTML = '';
      $notas.innerHTML = '';
    })
    .catch(err => {
      console.error('Error al cargar JSON:', err);
    });
}

// Alternar sidebar
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
}

// === EVENTOS DE FILTROS ===

checkboxTodos.addEventListener('change', () => {
  if (checkboxTodos.checked) {
    deactivateOthers(checkboxTodos);
    fetchAndDisplayStudents();
  } else {
    $root.innerHTML = '';
  }
});

checkboxGitHubBio.addEventListener('change', () => {
  if (checkboxGitHubBio.checked) {
    deactivateOthers(checkboxGitHubBio);

    $root.innerHTML = '';
    $student.innerHTML = '';
    $notas.innerHTML = '';

    fetch('file.json')
      .then(res => res.json())
      .then(data => fetchGitHubProfiles(data, $git, fallbackImage))
      .catch(err => console.error('Error al cargar JSON:', err));
  } else {
    $git.innerHTML = '';
  }
});

checkbox100Hours.addEventListener('change', () => {
  if (checkbox100Hours.checked) {
    deactivateOthers(checkbox100Hours);

    $root.innerHTML = '';
    $git.innerHTML = '';
    $notas.innerHTML = '';

    fetch('file.json')
      .then(res => res.json())
      .then(data => {
        const cards = getStudentsWith100Hours(data, fallbackImage);
        $student.innerHTML = `
          <div class="d-flex flex-wrap justify-content-center">
            ${cards.join('')}
          </div>
        `;
      })
      .catch(err => console.error('Error al cargar JSON:', err));
  } else {
    $student.innerHTML = '';
  }
});

checkbox300Hours.addEventListener('change', () => {
  if (checkbox300Hours.checked) {
    deactivateOthers(checkbox300Hours);

    $root.innerHTML = '';
    $git.innerHTML = '';
    $student.innerHTML = '';
    $notas.innerHTML = '';

    fetch('file.json')
      .then(res => res.json())
      .then(data => {
        const cards = getStudentsWith300Hours(data, fallbackImage);
        $student.innerHTML = `
          <div class="d-flex flex-wrap justify-content-center">
            ${cards.join('')}
          </div>
        `;
      })
      .catch(err => console.error('Error al cargar JSON:', err));
  } else {
    $student.innerHTML = '';
  }
});

checkbox400Hours.addEventListener('change', () => {
  if (checkbox400Hours.checked) {
    deactivateOthers(checkbox400Hours);

    $root.innerHTML = '';
    $git.innerHTML = '';
    $student.innerHTML = '';
    $notas.innerHTML = '';

    fetch('file.json')
      .then(res => res.json())
      .then(data => {
        const cards = getStudentsWith400Hours(data, fallbackImage);
        $student.innerHTML = `
          <div class="d-flex flex-wrap justify-content-center">
            ${cards.join('')}
          </div>
        `;
      })
      .catch(err => console.error('Error al cargar JSON:', err));
  } else {
    $student.innerHTML = '';
  }
});

checkboxNotas.addEventListener('change', () => {
  if (checkboxNotas.checked) {
    deactivateOthers(checkboxNotas);

    $root.innerHTML = '';
    $git.innerHTML = '';
    $student.innerHTML = '';
    $students.innerHTML = '';
    $studentss.innerHTML = '';
    $notas.innerHTML = '';

    fetch('file.json')
      .then(res => res.json())
      .then(data => {
        const cards = getStudentNotas(data, fallbackImage);
        $notas.innerHTML = `
          <div class="d-flex flex-wrap justify-content-center">
            ${cards.join('')}
          </div>
        `;
      })
      .catch(err => console.error('Error al cargar JSON:', err));
  } else {
    $notas.innerHTML = '';
  }
});
