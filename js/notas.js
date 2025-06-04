'use strict';

function getStudentNotas(data, fallbackImage) {
  return data.map(est => {
    const student = est.student || 'Estudiante sin nombre';
    const username = est.usernameGithub?.trim();
    const hasUsername = username && username !== '';

    const image = hasUsername
      ? `https://github.com/${username}.png`
      : fallbackImage;

    const github = hasUsername
      ? `<a href="https://github.com/${username}" target="_blank" class="card-link">GitHub</a>`
      : `<span class="text-muted">GitHub no disponible</span>`;

    // Notas bit-website
    const websiteScores = est.projects?.find(p => p.name === 'bit-website')?.score || [];
    const websiteTotal = websiteScores.reduce((sum, val) => sum + val, 0);

    // Notas bit-1
    const bit1Scores = est.projects?.find(p => p.name === 'bit-1')?.score || [];
    const bit1Total = bit1Scores.reduce((sum, val) => sum + val, 0);

    // Promedio entre ambos totales
    const promedioFinal = ((websiteTotal + bit1Total) / 2).toFixed(2);

    return `
      <div class="card m-3" style="width: 18rem;">
        <img 
          class="card-img-top" 
          src="${image}" 
          alt="Foto de ${student}" 
          onerror="this.onerror=null; this.src='${fallbackImage}';"
        >
        <div class="card-body">
          <h5 class="card-title">${student}</h5>
          ${github}
          <p class="card-text">
            <strong>Notas bit-website:</strong> [${websiteScores.join(', ')}]<br>
            <strong>Notas bit-1:</strong> [${bit1Scores.join(', ')}]<br>
            <strong>Total bit-1:</strong> ${bit1Total}<br><br>
            <strong>Promedio final:</strong> ${promedioFinal}
          </p>
        </div>
      </div>
    `;
  });
}

export { getStudentNotas };
