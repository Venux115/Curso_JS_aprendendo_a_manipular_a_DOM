//variaveis
const btnAdicionarTarefa = document.querySelector(".app__button--add-task")
const formTarefas = document.querySelector(".app__form-add-task")
const textarea = document.querySelector(".app__form-textarea")
const ulTarefas= document.querySelector(".app__section-task-list")

const tarefaList = JSON.parse(localStorage.getItem('tarefas')) || [] //lista
/*  JSON.parse transforma o JSON em um objeto javascript
    localStorage.getItem() pega o valor armazenado no localStoragem com 
    o indice informado no parametro.*/


//funções

function criarHtmlTarefa(tarefa)
{
	const li = document.createElement('li') //criando elemento
	li.classList.add("app__section-task-list-item")//adionando classe

	const svg = document.createElement('svg') // criando elemento
	svg.innerHTML= `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
	` //adicionando HTML dentro do elemento

	const paragrafo = document.createElement('p') //criando elemento
	paragrafo.textContent = tarefa.descricao //adicionando texto no elemento
	paragrafo.classList.add("app__section-task-list-item-description") //adionando classe


	const botao= document.createElement('button')//criando elemento
	botao.classList.add("app_button-edit")//adionando classe

	const imgBotao = document.createElement('img') //criando elemento
	imgBotao.setAttribute("src", "imagens/edit.png") //adicionando atributo src

	botao.append(imgBotao) //inserindo elemento imgBotao dentro do elemento botao

	li.append(svg)//inserindo elemento svg dentro do elemento li
	li.append(paragrafo)//inserindo elemento paragrafo dentro do elemento li
	li.append(botao)//inserindo botao svg dentro do elemento li

	return li //retornando elemento li
}

//click's
btnAdicionarTarefa.addEventListener("click", () => {
	formTarefas.classList.toggle("hidden") //toggle alterna a classe, ou seja, se existir remove, senão ele adiciona
})

formTarefas.addEventListener("submit", (evento) => {
	evento.preventDefault(); //remove ações automaticas
	
	const tarefaItem = { //objeto
		descricao: textarea.value
	}
	const elementoTarefa = criarHtmlTarefa(tarefaItem)
	ulTarefas.append(elementoTarefa)//insere um elemento dentro de outro

	tarefaList.push(tarefaItem) //push adiciona um valor em uma lista
	
	localStorage.setItem('tarefas', JSON.stringify(tarefaList)) 
	/*localStorga armazena arquivos no dominio por tempo indeterminado,
	é limitado a 5MB e aceita somente string e JSON.
	localstorage.setItem adiciona um item na localstorgea,
	JSON.stringify transforma um objeto em uma strign*/

	textarea.value = '' //limpa textarea
	formTarefas.classList.toggle('hidden')//esconde o formulário
})

//processamentos
tarefaList.forEach(tarefa => { //para cada elemento na lista ele executa a função
	const elementoTarefa = criarHtmlTarefa(tarefa)
	ulTarefas.append(elementoTarefa)
})