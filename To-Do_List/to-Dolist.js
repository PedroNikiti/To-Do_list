import styles from './to-Dolist.module.css'
import { useState } from 'react'

function ToDoList(){

    const [tarefas, setTarefas] = useState([])
    const [novaTarefa, setNovaTarefa] = useState("")
    const [editando, setEditando] = useState(null) 

    function cadastrar(event){ 
        event.preventDefault()

        if(novaTarefa.trim() === ""){
            alert("Digite uma tarefa antes de cadastrar.")
            return
        }

        if(editando !== null){
            const copia = [...tarefas]
            copia[editando].texto = novaTarefa
            setTarefas(copia)
            setEditando(null)
            alert("Tarefa editada com sucesso!")
        } else {
            setTarefas([...tarefas, { texto: novaTarefa }])
            alert("Tarefa cadastrada com sucesso!")
        }

        setNovaTarefa("")
    }

    function editar(index){
        setNovaTarefa(tarefas[index].texto)
        setEditando(index)
    }

    function finalizar(index){
        const copia = tarefas.filter((_, i) => i !== index)
        setTarefas(copia)
        alert("Tarefa finalizada e removida da lista!")
    }

    function excluir(index){
        const copia = tarefas.filter((_, i) => i !== index)
        setTarefas(copia)
        alert("Tarefa excluída com sucesso!")
    }

    return(
        <div className={styles.container}>
            <h1>Minha lista</h1>

            <form onSubmit={cadastrar}>
                <input 
                    type="text" 
                    placeholder="Digite sua tarefa" 
                    value={novaTarefa}
                    onChange={(event) => setNovaTarefa(event.target.value)} 
                />
                <button type="submit">
                    {editando !== null ? "Salvar" : "Cadastrar"}
                </button>
            </form>

            <ul>
                {tarefas.map((tarefa, index) => (
                    <li key={index}>
                        <span>{tarefa.texto}</span>
                        <div>
                            <button onClick={() => editar(index)}>Editar</button>
                            <button onClick={() => finalizar(index)}>Finalizar</button>
                            <button onClick={() => excluir(index)}>Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ToDoList
