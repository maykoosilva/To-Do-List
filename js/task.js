// Funções relacionadas a adicionar, remover e gerenciar tarefas
 
// TAG <UL>
const contentTask = document.getElementById("contentTask");

export function salvarLocalStorage() 
    {
        const tasks = [];
        const listTasks = document.querySelectorAll(".list_task");
        listTasks.forEach(element => {
            const task = {
                text: element.querySelector("li").textContent,
                checked: element.querySelector("input").checked,
                id: element.getAttribute("id")
            };
            tasks.push(task)
        });
        localStorage.setItem("tarefas", JSON.stringify(tasks));

        const lastId = listTasks.length > 0 ? parseInt(listTasks[listTasks.length - 1].id.replace('list_task', '')) + 1 : 0;
        localStorage.setItem('contador', lastId);
    }

let contador = parseInt(localStorage.getItem('contador')) || 0; 

export function adicionarTarefas(txtInput)
    {
        if (contador === 10)
            {
                window.alert("Limite de tarefas preenchidas");
                txtInput.value = "";
            }
        else
            {
                const task_added = txtInput.value;

                // CRIAR UMA DIV
                const newTask = document.createElement("div");
                // ADICIONAR UMA CLASSE A DIV CRIADA
                newTask.className = "list_task"
                newTask.setAttribute("id", `list_task${contador}`)

                // CRIAR UM INPUT
                const newInput = document.createElement("input");
                // ADICIONAR UM TIPO AO INPUT
                newInput.setAttribute("type", "checkbox");
                // ADICIONAR UM ID E UM NAME
                newInput.id = `task${contador}`;
                newInput.name = `task`;

                // ADICIONAR O CHECKBOX(newInput) Á DIV
                newTask.appendChild(newInput);

                // CRIAR UMA LISTA
                const list = document.createElement("li");
                // ADICIONAR O TEXTO DIGITADO PELO USUÁRIO Á LISTA
                list.textContent = task_added;

                // ADICIONAR A LISTA Á DIV
                newTask.appendChild(list)

                adicionarImagemEditar(newTask);

                // ADICIONAR A DIV Á TAG <UL> (contentTask)
                contentTask.appendChild(newTask)

                contador++

                salvarLocalStorage();

                txtInput.value = "";
            }
        
    }

export function adicionarImagemEditar(taskElement)
    {
        // ADICIONAR UMA IMAGEM SIGNIFICANDO A AÇÃO DE EDITAR
        const imgEditar = document.createElement("img");
        imgEditar.src = "../img/pen_edit_modify_pencil_icon_181536.png";
        imgEditar.alt = "imagem para editar campo de texto de tarefa adicionada";
        imgEditar.className = "btnEditar";
        taskElement.appendChild(imgEditar)
    }


export function removerTarefasSelecionadas()
    {
        const inputCheckbox = [...document.getElementsByName("task")];
        inputCheckbox.forEach((el) =>
            {
                if (el && el.name === "task" && el.type === "checkbox" && el.checked)
                    {
                        el.parentElement.remove("list_task");

                        salvarLocalStorage();
                    }
            });
    }

// EDITAR TAREFAS ADICIONADAS

export function editarElement(task)
    {
        const renewInputEditar = document.createElement("input");
        renewInputEditar.type = "text";
        renewInputEditar.value = `${task.textContent}`;

        task.textContent = "";

        task.appendChild(renewInputEditar);
        renewInputEditar.focus()
        
        renewInputEditar.addEventListener("blur", ()=>
            {

                task.textContent = `${renewInputEditar.value}`
                salvarLocalStorage();
            })

        document.addEventListener("keydown", (evt)=>
            {
                if (evt.key === "Enter")
                    {
                        task.textContent = `${renewInputEditar.value}`

                        renewInputEditar.blur();
                    }
            })

    }
