//variaveis
const btnAdicionarTarefa = document.querySelector(".app__button--add-task")
const formTarefas = document.querySelector(".app__form-add-task")
const textarea = document.querySelector(".app__form-textarea")
const ulTarefas= document.querySelector(".app__section-task-list")
const btnCancelar = document.querySelector(".app__form-footer__button--cancel")
const paragrafoDescricaoTarefa = document.querySelector(".app__section-active-task-description")
const btnRemoverTaskConcluida  = document.querySelector("#btn-remover-concluidas")
const btnRemoverTodasTasks = document.querySelector("#btn-remover-todas")

let tarefaSelecionada = null
let liTarefaSelecionada = null


let tarefaList = JSON.parse(localStorage.getItem('tarefas')) || [] //lista
/*  JSON.parse transforma o JSON em um objeto javascript
    localStorage.getItem() pega o valor armazenado no localStoragem com 
    o indice informado no parametro.*/


//funções

function atualizarDados(){
	localStorage.setItem('tarefas', JSON.stringify(tarefaList)) 
	/*localStorga armazena arquivos no dominio por tempo indeterminado,
	é limitado a 5MB e aceita somente string e JSON.
	localstorage.setItem adiciona um item na localstorgea,
	JSON.stringify transforma um objeto em uma strign*/
}

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
	
	botao.addEventListener("click", () => {
		const nova_descricao = prompt("Qual é o novo nome da tarefa?")
		
		if (nova_descricao) {
			paragrafo.textContent = nova_descricao
			tarefa.descricao = nova_descricao
			atualizarDados()
		}else{
			alert("Descrição não pode ser nula!")
		}
		

	})

	li.append(svg)//inserindo elemento svg dentro do elemento li
	li.append(paragrafo)//inserindo elemento paragrafo dentro do elemento li
	li.append(botao)//inserindo botao svg dentro do elemento li
	

	if(tarefa.completa){
		li.classList.add("app__section-task-list-item-complete")
		botao.setAttribute("disabled", true)
	}else{
		li.addEventListener("click", () => {
			const tasksAtivas = document.querySelectorAll(".app__section-task-list-item-active")
			tasksAtivas.forEach(elemento => {
					elemento.classList.remove("app__section-task-list-item-active")
				})

			if (tarefaSelecionada == tarefa)
			{
				paragrafoDescricaoTarefa.textContent = ''
				tarefaSelecionada = null
				liTarefaSelecionada = null
				return
			}

			tarefaSelecionada = tarefa
			liTarefaSelecionada = li
			paragrafoDescricaoTarefa.textContent = tarefa.descricao
			
			li.classList.add("app__section-task-list-item-active")
		})
	}

	return li //retornando elemento li
}

function fecharForm(){
	textarea.value = '' //limpa textarea
	formTarefas.classList.add('hidden')//esconde o formulário
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
	
	atualizarDados()
	
	fecharForm()
})

btnCancelar.addEventListener("click", () => {
	debugger
	fecharForm()
})


btnRemoverTaskConcluida.addEventListener('click', () =>
{
	
	const seletor = '.app__section-task-list-item-complete'
	document.querySelectorAll(seletor).forEach(elemento => {
		elemento.remove()

	})

	tarefaList = tarefaList.filter(tarefas => !tarefas.completa)
	atualizarDados()
})

btnRemoverTodasTasks.addEventListener('click', () =>
{
	
	const seletor = '.app__section-task-list-item'
	document.querySelectorAll(seletor).forEach(elemento => {
		elemento.remove()

	})

	tarefaList = []
	localStorage.clear()
})

document.addEventListener('FocoFinalizado', () => {
	
	if (tarefaSelecionada && liTarefaSelecionada) 
	{

		liTarefaSelecionada.classList.remove("app__section-task-list-item-active")
		liTarefaSelecionada.classList.add("app__section-task-list-item-complete")
		liTarefaSelecionada.querySelector("button").setAttribute("disabled", true)
		tarefaSelecionada.completa = true;
		atualizarDados()
	}
})



//processamentos
tarefaList.forEach(tarefa => { //para cada elemento na lista ele executa a função
	const elementoTarefa = criarHtmlTarefa(tarefa)
	ulTarefas.append(elementoTarefa)
})

