'use strict';

function getStudentNotas(data, fallbackImage) {
  return data.map(est => {
    // Extrae todos los puntajes de todos los proyectos
    const scores = est.projects.flatMap(p => p.score || []);
    
    // Suma total y calcula promedio
    const total = scores.reduce((sum, val) => sum + val, 0);
    const average = scores.length ? (total / scores.length).toFixed(2) : '0.00';

    // Imagen del estudiante
    const image = est.usernameGithub
      ? `https://github.com/${est.usernameGithub}.png`
      : fallbackImage;

    // Enlace a GitHub si existe
    const github = est.usernameGithub
      ? `<a href="https://github.com/${est.usernameGithub}" target="_blank" class="card-link">GitHub</a>`
      : `<span class="text-muted">GitHub no disponible</span>`;

    // Tarjeta HTML
    return `
      <div class="card m-3" style="width: 18rem;">
        <img 
          class="card-img-top" 
          src="${image}" 
          alt="Imagen de ${est.student}" 
          onerror="this.onerror=null; this.src='${fallbackImage}';"
        >
        <div class="card-body">
          <h5 class="card-title">${est.student}</h5>
          ${github}
          <p class="card-text">
            <strong>Nota total:</strong> ${total}<br>
            <strong>Promedio:</strong> ${average}
          </p>
        </div>
      </div>
    `;
  });
}
