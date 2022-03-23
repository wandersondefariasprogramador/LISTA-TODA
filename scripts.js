let input = document.getElementById("input-principal")
let button = document.getElementById("botao-adicionar")
let tarefa = document.getElementById("nome-tarefa-id")
let listaCompleta = document.getElementById("tarefas")

let arrayDeTarefas = []
recarregarTarefas()


function mostrarTarefas() {
    let novaLi = ""

    arrayDeTarefas.forEach((tarefa, index) => {

        novaLi = novaLi + `
        <li class="item-tarefa ${tarefa.concluida == true ? "concluido" : ""} ">
            <button class="botao-foguete" onclick="concluirTarefa(${index})">
                <i class="fas fa-rocket"></i>
            </button>
            <p class="nome-tarefa ${tarefa.concluida == true ? "concluido" : ""}" id="nome-tarefa-id">${tarefa.tarefa}</p>
            <button class="botao-delete" onclick="deletarTarefa(${index})">
                <i class="fas fa-trash"></i>
            </button>
        </li>
`
    })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem("lista", JSON.stringify(arrayDeTarefas))

}


function deletarTarefa(index) {
    arrayDeTarefas.splice(index, 1)

    mostrarTarefas()
}

function adicionarTarefa() {
    if (input.value != "") {
        arrayDeTarefas.push({
            tarefa: input.value,
            concluida: false

        })

        mostrarTarefas()
        input.value = ""
    } else {
        alert('O campo de tarefas não pode estar vazio!')
    }

}

function concluirTarefa(index) {
    arrayDeTarefas[index].concluida = !arrayDeTarefas[index].concluida

    mostrarTarefas()
}

function recarregarTarefas() {
    let minhasTarefas = localStorage.getItem("lista")

    arrayDeTarefas = JSON.parse(minhasTarefas)

    if (arrayDeTarefas == null) {
        arrayDeTarefas = [{ tarefa: 'Seja bem vindo', concluida: false }]

        mostrarTarefas()

    } else {

        mostrarTarefas()
    }


}

button.addEventListener("click", adicionarTarefa)

document.addEventListener('keydown', function (e) {
    if (e.key == "Enter") { adicionarTarefa() }
});