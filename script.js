/*Adicionar uma questão*/
var formAddQuestao = document.querySelector(".formAddQuestao");
var boxPerguntas = document.querySelector('.box');
var elementos = document.querySelectorAll("[type=radio]");


document.querySelector(".addQuestao").addEventListener("click", () => {
  if (formAddQuestao.classList.contains("none")) {
    formAddQuestao.classList.remove("none");
  }
});

//adicionando alternativas
var alternativas = document.querySelector(".alternativas");

document.querySelector(".addAlternativa").addEventListener("click", () => {
  var numAlt = document.querySelector("[name=numeroDeAlternativas]").value;
  numAlt = parseInt(numAlt);

  if (numAlt > 5 || numAlt < 2) {
    alert("Selecione no máximo 5 alternativas e no minimo 2");
  } else {

    document.querySelector('.quantAlt').classList.add('none');

    alternativas.innerHTML =
      '<h2 style="color:red; font-size: 15px;">Digite 0 para resposta incorreta e 1 para a resposta correta. SÓ SELECIONE UMA RESPOSTA CORRETA!</h2>';

    for (let i = 1; i <= numAlt; i++) {
      /*    <input type="text" name="alternativa" placeholder="Digite a alternativa...">
            <input type="number" name="certa-errada">
            <button class="salvarQuestao">Salvar</button>*/

      alternativas.innerHTML += `<input type="text" name="alternativa" placeholder="Digite a alternativa...">
    <input type="number" name="certa-errada">
    <br>`;
      if (i == numAlt) {
        alternativas.innerHTML += `<button class="salvarQuestao" onclick='salvarQuestao()'>Salvar</button>`;
      }
    }
  }
});


//salvar alternativas
function salvarQuestao(){
    let enunciado = document.querySelector('[name=enunciado]');
    let opc = document.querySelectorAll('[name=alternativa]');
    let ce = document.querySelectorAll('[name=certa-errada]');
    let cont = 0;
    let confirmSave = 0;

    if (enunciado.value=='') {
      alert('Digite o Enunciado');
      cont++;
    }

    opc.forEach((x,i)=>{
      
      let j = parseInt(ce[i].value);

      if (opc[i].value == '' || ce[i].value=='') {
        alert('Preencha todos os campos | Campo '+(i+1)+' não preenchido');
        confirmSave++;
      }else if (j < 0 || j > 1) {
        alert('Preencha corretamente o campo '+(i+1));
        confirmSave++;
      }
      if(j==1){
        cont++;
        if (cont>1) {
          alert('Selecione apenas uma resposta correta');
          confirmSave++;
        }
      }
    });

    if (cont<1) {
      alert('Selecione no minimo uma resposta correta');
      confirmSave++;
    }

    //Se for aprovado em todas as verificações prosseguir
    if (confirmSave==0) {

        boxPerguntas.innerHTML += `<div class="Pergunta">
      <h2>${enunciado.value}</h2>
    </div>

    <form class="formulario">`;
      for (let i = 0; i < ce.length; i++) {
        boxPerguntas.innerHTML += `<div class="resposta">
        <span>${opc[i].value}</span>
        <input type="radio" name="Opcao1" value="${ce[i].value}" />
      </div>`;
      }

      boxPerguntas.innerHTML += `</form>
      <hr />`

      document.querySelector('.previa').innerHTML += `<div>
      <h2 class="temaPrevia">${enunciado.value}</h2>
      <span>${opc.length}</span>
      </div>`

      formAddQuestao.classList.add("none");

      document.querySelector('.quantAlt').classList.remove('none');
      
      alternativas.innerHTML = '';

      enunciado.value = '';

      opc.forEach((x,i)=>{
        x.value = '';
        ce[i].value = '';
      });

      elementos = document.querySelectorAll("[type=radio]");
    }

}

    //SALVAR E INICIAR
/*
      document.querySelector('.questionario').classList.remove('none');
      respostas();*/

/*SELECIONANDO AS RESPOSTAS*/

function respostas(){
elementos.forEach((x, i) => {
  x.addEventListener("change", (e) => {
    let marcado = e.target.value;

    let el = (e.target.previousElementSibling.style.color = "white");

    let parentNode = e.target.parentNode;

    if (marcado == "1") {
      parentNode.style.backgroundColor = "green";
    } else if (marcado == "0") {
      parentNode.style.backgroundColor = "red";

      let correta = parentNode.parentNode.querySelector("[value='1']");

      correta.parentNode.style.backgroundColor = "green";
    }

    let els = parentNode.parentNode.querySelectorAll("[type=radio]");

    for (var n = 0; n < els.length; n++) {
      els[n].disabled = true;
    }
  });
});
}