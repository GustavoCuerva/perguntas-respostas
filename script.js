var elementos = document.querySelectorAll("[type=radio]");

elementos.forEach((x, i) => {
  x.addEventListener("change", (e) => {
    let marcado = e.target.value;

    let el = (e.target.previousElementSibling.style.color = "white");

    let parentNode = e.target.parentNode;

    if (marcado == "correta") {
      
        parentNode.style.backgroundColor = "green";

    } else if (marcado == "incorreta") {
      
        parentNode.style.backgroundColor = "red";

        let correta = parentNode.parentNode.querySelector("[value=correta]");

        correta.parentNode.style.backgroundColor = "green";
    }

    let els = parentNode.parentNode.querySelectorAll("[type=radio]");

    for (var n = 0; n < els.length; n++) {
      els[n].disabled = true;
    }
  });
});
