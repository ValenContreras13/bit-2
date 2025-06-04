'use strict';

function fetchGitHubProfiles(data, $root, fallbackImage) {
  $root.innerHTML = '';

  const cards = data.map(async (item) => {
    const student = item.student || 'Estudiante sin nombre';
    const username = item.usernameGithub?.trim();
    const hasUsername = username && username !== '';

    const imageSrc = hasUsername
      ? `https://github.com/${username}.png`
      : fallbackImage;

    const githubLink = hasUsername
      ? `<a href="https://github.com/${username}" target="_blank" class="card-link">GitHub</a>`
      : `<span class="text-muted">GitHub no disponible</span>`;

    let bioText = 'Descripción no disponible';

    if (hasUsername) {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) throw new Error('Perfil no encontrado');
        const githubData = await res.json();
        bioText = githubData.bio || 'Sin descripción en GitHub';
      } catch (error) {
        console.error(`Error con ${username}:`, error);
      }
    }

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
          <p class="card-text">${bioText}</p>
        </div>
      </div>
    `;
  });

  Promise.all(cards).then(cardList => {
    $root.innerHTML = `
      <div class="d-flex flex-wrap justify-content-center">
        ${cardList.join('')}
      </div>
    `;
  });
}

export { fetchGitHubProfiles };
