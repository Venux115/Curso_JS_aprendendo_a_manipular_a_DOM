//variaveis
const btnAdicionarTarefa = document.querySelector(".app__button--add-task")
const formTarefas = document.querySelector(".app__form-add-task")
const textarea = document.querySelector(".app__form-textarea")

const tarefaList = [] //lista

//click's
btnAdicionarTarefa.addEventListener("click", () => {
	formTarefas.classList.toggle("hidden") //toggle alterna a classe, ou seja, se existir remove, senão ele adiciona
})

formTarefas.addEventListener("submit", (evento) => {
	evento.preventDefault(); //remove ações automaticas
	
	const tarefaItem = { //objeto
		descricao: textarea.value
	}

	tarefaList.push(tarefaItem) //push adiciona um valor em uma lista

	/*localStorga armazena arquivos no dominio por tempo indeterminado,
	é limitado a 5MB e aceita somente string e JSON*/
	localStorage.setItem('tarefas', JSON.stringify(tarefaList)) 
	/*localstorage.setItem adiciona um item na localstorgea,
	JSON.stringify transforma um objeto em uma strign*/
})