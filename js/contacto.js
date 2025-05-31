'use strict';
const form = document.getElementById("contactForm");

form.addEventListener("submit", (event) => {
  // event.preventDefault();

  const nombre = form.elements["nombre"].value;
  const email = form.elements["email"].value;
  const mensaje = form.elements["mensaje"].value;

  console.log(nombre);
  console.log(email);
  console.log(mensaje);

  const result = 
  `Biernvenid@: ${nombre} Te informamos que ha sido exitoso el envio del formularioa tu email: ${email} llegara una copia con el Mensaje ingresago: ${mensaje}`;
  alert(result);
});
