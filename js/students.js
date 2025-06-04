'use strict';

function getStudentsWith300Hours(data, fallbackImage) {
  return data
    .filter(item => item.intensity?.trim().toLowerCase() === '300 hours')
    .map(item => renderStudentCard(item, fallbackImage));
}

function renderStudentCard(item, fallbackImage) {
  const student = item.student || 'Estudiante sin nombre';
  const username = item.usernameGithub?.trim();
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
        <p class="card-text">Intensidad: ${item.intensity}</p>
      </div>
    </div>
  `;
}

export { getStudentsWith300Hours };
