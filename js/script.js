'use strict';

const d = document;
const $root = d.getElementById('root');
const $git = d.getElementById('git');
const fallbackImage = './assets/desconocido.PNG'; // Asegúrate de que este archivo exista

// Función: Muestra todos los estudiantes (sin bio de GitHub)
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

      $git.innerHTML = ''; // Limpiar el otro contenedor
    })
    .catch(err => {
      console.error('Error al cargar JSON:', err);
    });
}

// Función para abrir/cerrar sidebar
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
}

// ==== EVENTOS DE FILTROS ==== //
const checkboxTodos = document.getElementById('op1');
const checkboxGitHubBio = document.getElementById('op2');

// Mostrar todos los estudiantes (sin bio)
checkboxTodos.addEventListener('change', () => {
  if (checkboxTodos.checked) {
    checkboxGitHubBio.checked = false; // Desactiva el otro checkbox
    fetchAndDisplayStudents();
  } else {
    $root.innerHTML = '';
  }
});

// Mostrar estudiantes con bio de GitHub
checkboxGitHubBio.addEventListener('change', () => {
  if (checkboxGitHubBio.checked) {
    checkboxTodos.checked = false; // Desactiva el otro checkbox
    $root.innerHTML = ''; // Limpiar el contenedor anterior

    fetch('file.json')
      .then(res => res.json())
      .then(data => fetchGitHubProfiles(data, $git, fallbackImage)) // Usar contenedor "git"
      .catch(err => console.error('Error al cargar JSON:', err));
  } else {
    $git.innerHTML = '';
  }
});
