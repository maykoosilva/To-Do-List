// Funções para manipular os botões e eventos
 
import { salvarLocalStorage } from '../js/task.js';
import { adicionarTarefas } from '../js/task.js';
import { adicionarImagemEditar } from '../js/task.js';
import { removerTarefasSelecionadas } from '../js/task.js';
import { editarElement } from '../js/task.js';
 
// BTN PARA ADICIONAR TAREFAS
const btnAdd = document.getElementById("btnAdd");
const btnRemove = document.getElementById("btnRemove");
const divTask = document.getElementById("task");
const ulTask = document.getElementById("contentTask");
const txtInput = document.getElementById("txtInput");
const contador = parseInt(localStorage.getItem('contador')) || 0; // Recupera o contador salvo

function carregarTarefas() 
    {
        const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas"));
        const contadorSalvo = parseInt(localStorage.getItem('contador')) || 0; // Recupera o contador salvo

        if (tarefasSalvas) {
            tarefasSalvas.forEach((task, index) => {
                console.log(`Task: ${task}`, index)
                // Criar a div da tarefa
                const newTask = document.createElement("div");
                newTask.className = "list_task";
                newTask.setAttribute("id", `list_task${index}`);
    
                const newInput = document.createElement("input");
                newInput.setAttribute("type", "checkbox");
                newInput.id = `task${index}`;
                newInput.name = `task`;
                newInput.checked = task.checked; // Verifica se a tarefa estava marcada

                if (newInput.checked) {
                    newTask.classList.add("list_task_marked");
                }

                newTask.appendChild(newInput);
    
                const list = document.createElement("li");
                list.textContent = task.text;
    
                newTask.appendChild(list);
                adicionarImagemEditar(newTask);
    
                contentTask.appendChild(newTask);
            });
        }
        const contador = contadorSalvo;
    }
    
    // Chama a função para carregar as tarefas assim que a página for carregada
    window.addEventListener("load", carregarTarefas);




btnAdd.addEventListener("click", ()=>
    {
        const valueInput = txtInput.value.trim()
        if (valueInput === "")
            {
                window.alert("Digite uma tarefa");
            }
        else
            {
                adicionarTarefas(txtInput)
            }
    })


// VERIFICAR QUAL INPUT FOI MARCADO
document.addEventListener("change", (evt)=>
    {
        // evt APRESENTA AS PROPRIEDADES, evt.target RETORNA O INPUT
        console.log(evt.target.name)
        if (evt.target && evt.target.name === "task" && evt.target.type === "checkbox")
            {
                // PEGA A DIV QUE ABRIGA O CHECKBOX
                const listTask = evt.target.parentElement;

                if (evt.target.checked)
                    {
                        listTask.classList.add("list_task_marked");
                    }
                else
                    {
                        listTask.classList.remove("list_task_marked");
                    }

                    salvarLocalStorage();
            }
    })


// ADICIONAR A FUNÇÃO REMOVER INPUT MARCADO
btnRemove.addEventListener("click", ()=>
    {
        removerTarefasSelecionadas()
    })


// SE A LISTA <UL> FOR MAIOR QUE A ALTURA DA DIV COM ID <TASK>, ENTÃO VAI APARECER UM SCROLL 

// Função para verificar overflow
function checkOverflow()
    {
        
        if (ulTask.scrollHeight > divTask.clientHeight)
            {
                divTask.style.overflowY = 'scroll';
                divTask.style.overflowX = 'hidden';
            }
        else
            {
                divTask.style.overflow = 'hidden';
            }
    }


// Criação de um MutationObserver para observar alterações no conteúdo
const observer = new MutationObserver(checkOverflow);

// Configura o MutationObserver para observar mudanças no conteúdo do innerElement
observer.observe(ulTask, {
    childList: true, // Observa a adição ou remoção de elementos filhos
    subtree: true, // Observa todos os descendentes do elemento
    characterData: true, // Observa alterações no texto
});

checkOverflow();



function elementBtnEditar()
    {
        const contentTask = document.getElementById("contentTask");

        contentTask.addEventListener("click", (evt)=>
            {
                if (evt.target && evt.target.classList.contains("btnEditar"))
                    {
                        const taskElementEditar = evt.target.closest(".list_task").querySelector("li");
                        editarElement(taskElementEditar)
                    }
            })
    }

elementBtnEditar()