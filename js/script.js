'use strict';

const d = document;
const $root = d.getElementById('root');

let cards = ''; 

fetch('file.json')
  .then((res) => res.json())
  .then((info) => {
    for (let i = 0; i < info.length; i++) {
      cards += `
        <div class="card m-3" style="width: 18rem;">
          <img class="card-img-top" src="https://github.com/${info[i].usernameGithub}.png" alt="Imagen de perfil de ${info[i].student}">
          <div class="card-body">
            <h5 class="card-title">${info[i].student}</h5>
            <a href="https://github.com/${info[i].usernameGithub}" target="_blank" rel="noopener noreferrer" class="card-link">GitHub</a>

            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
          </div>
        </div>
      `;
    }

    $root.innerHTML = `
      <div class="d-flex flex-wrap justify-content-center">
        ${cards}
      </div>
    `;
  })
  .catch((err) => {
    console.log('Error:', err);
  });

  function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("open");
  }
