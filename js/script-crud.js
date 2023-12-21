//variaveis
const btnAdicionarTarefa = document.querySelector(".app__button--add-task")
const formTarefas = document.querySelector(".app__form-add-task")
const textarea = document.querySelector(".app__form-textarea")
const ulTarefas= document.querySelector(".app__section-task-list")

const tarefaList = JSON.parse(localStorage.getItem('tarefas')) || [] //lista

//funções

function criarHtmlTarefa(tarefa)
{
	const li = document.createElement('li')
	li.classList.add("app__section-task-list-item")

	const svg = document.createElement('svg')
	svg.innerHTML= `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
	`
	const paragrafo = document.createElement('p')
	paragrafo.textContent = tarefa.descricao
	paragrafo.classList.add("app__section-task-list-item-description")


	const botao= document.createElement('button')
	botao.classList.add("app_button-edit")

	const imgBotao = document.createElement('img')
	imgBotao.setAttribute("src", "imagens/edit.png")

	botao.append(imgBotao)

	li.append(svg)
	li.append(paragrafo)
	li.append(botao)

	return li
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
	ulTarefas.append(elementoTarefa)
	tarefaList.push(tarefaItem) //push adiciona um valor em uma lista


	/*localStorga armazena arquivos no dominio por tempo indeterminado,
	é limitado a 5MB e aceita somente string e JSON*/
	localStorage.setItem('tarefas', JSON.stringify(tarefaList)) 
	/*localstorage.setItem adiciona um item na localstorgea,
	JSON.stringify transforma um objeto em uma strign*/
	textarea.value = ''
	formTarefas.classList.toggle('hidden')
})

//processamentos
tarefaList.forEach(tarefa =>{
	const elementoTarefa = criarHtmlTarefa(tarefa)
	ulTarefas.append(elementoTarefa)
})