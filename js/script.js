'use strict';

import { getStudentsWith100Hours } from './student.js';
import { getStudentsWith300Hours } from './students.js';
import { getStudentsWith400Hours } from './studentss.js';
import { fetchGitHubProfiles } from './github.js';
import { getStudentNotas } from './notas.js';

const d = document;

const $root = d.getElementById('root');
const $git = d.getElementById('git');
const $student = d.getElementById('student');
const $students = d.getElementById('students');
const $studentss = d.getElementById('studentss');
const $notas = d.getElementById('notas');

const fallbackImage = './assets/desconocido.PNG';

const checkboxTodos = d.getElementById('op1');
const checkboxGitHubBio = d.getElementById('op2');
const checkbox100Hours = d.getElementById('op3');
const checkbox300Hours = d.getElementById('op4');
const checkbox400Hours = d.getElementById('op5');
const checkboxNotas = d.getElementById('op6');

function clearAllSections() {
  [$root, $git, $student, $students, $studentss, $notas].forEach(section => {
    section.innerHTML = '';
  });
}

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

function fetchAndDisplayStudents() {
  fetch('file.json')
    .then(res => res.json())
    .then(info => {
      const cards = info.map(est => {
        const student = est.student || 'Estudiante sin nombre';
        const username = est.usernameGithub?.trim();
        const hasUsername = username && username !== '';

        const imageSrc = hasUsername
          ? `https://github.com/${username}.png`
          : fallbackImage;

        const githubLink = hasUsername
          ? `<a href="https://github.com/${username}" target="_blank" class="card-link">GitHub</a>`
          : `<span class="text-muted">GitHub no disponible</span>`;

        return `
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
            </div>
          </div>
        `;
      });

      $root.innerHTML = `
        <div class="d-flex flex-wrap justify-content-center">
          ${cards.join('')}
        </div>
      `;
    })
    .catch(err => console.error('Error al cargar JSON:', err));
}

// 🔹 Evento: Mostrar todos
checkboxTodos.addEventListener('change', () => {
  if (checkboxTodos.checked) {
    deactivateOthers(checkboxTodos);
    clearAllSections();
    fetchAndDisplayStudents();
  } else {
    clearAllSections();
  }
});

// 🔹 Evento: Bio GitHub
checkboxGitHubBio.addEventListener('change', () => {
  if (checkboxGitHubBio.checked) {
    deactivateOthers(checkboxGitHubBio);
    clearAllSections();
    fetch('file.json')
      .then(res => res.json())
      .then(data => fetchGitHubProfiles(data, $git, fallbackImage))
      .catch(err => console.error('Error al cargar JSON:', err));
  } else {
    $git.innerHTML = '';
  }
});

// 🔹 Evento: 100 horas
checkbox100Hours.addEventListener('change', () => {
  if (checkbox100Hours.checked) {
    deactivateOthers(checkbox100Hours);
    clearAllSections();
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

// 🔹 Evento: 300 horas
checkbox300Hours.addEventListener('change', () => {
  if (checkbox300Hours.checked) {
    deactivateOthers(checkbox300Hours);
    clearAllSections();
    fetch('file.json')
      .then(res => res.json())
      .then(data => {
        const cards = getStudentsWith300Hours(data, fallbackImage);
        $students.innerHTML = `
          <div class="d-flex flex-wrap justify-content-center">
            ${cards.join('')}
          </div>
        `;
      })
      .catch(err => console.error('Error al cargar JSON:', err));
  } else {
    $students.innerHTML = '';
  }
});

// 🔹 Evento: 400 horas
checkbox400Hours.addEventListener('change', () => {
  if (checkbox400Hours.checked) {
    deactivateOthers(checkbox400Hours);
    clearAllSections();
    fetch('file.json')
      .then(res => res.json())
      .then(data => {
        const cards = getStudentsWith400Hours(data, fallbackImage);
        $studentss.innerHTML = `
          <div class="d-flex flex-wrap justify-content-center">
            ${cards.join('')}
          </div>
        `;
      })
      .catch(err => console.error('Error al cargar JSON:', err));
  } else {
    $studentss.innerHTML = '';
  }
});

// 🔹 Evento: Notas
checkboxNotas.addEventListener('change', () => {
  if (checkboxNotas.checked) {
    deactivateOthers(checkboxNotas);
    clearAllSections();
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

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
}

// Esta línea es crucial para que funcione el onclick en HTML
window.toggleSidebar = toggleSidebar;
