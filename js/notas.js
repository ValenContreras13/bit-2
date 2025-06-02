'use strict';

function getStudentNotas(data, fallbackImage) {
  return data.map(est => {

    const scores = est.projects.flatMap(p => p.score || []);
    
 
    const total = scores.reduce((sum, val) => sum + val, 0);
    const average = scores.length ? (total / scores.length).toFixed(2) : '0.00';

 
    const image = est.usernameGithub
      ? `https://github.com/${est.usernameGithub}.png`
      : fallbackImage;


    const github = est.usernameGithub
      ? `<a href="https://github.com/${est.usernameGithub}" target="_blank" class="card-link">GitHub</a>`
      : `<span class="text-muted">GitHub no disponible</span>`;


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
