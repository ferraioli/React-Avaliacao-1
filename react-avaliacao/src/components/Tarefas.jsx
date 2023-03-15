import { useState } from "react";
import "./Tarefas.css";
import deleteIMG from "../assets/delete.svg";
import squareEdit from "../assets/squareEdit.svg";

function Tarefas(props) {
  const [id, setId] = useState("");
  const [data, setData] = useState("");
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");

  const [tarefa, setTarefa] = useState([]);

  function addItem(event) {
    event.preventDefault();

    if (titulo === "" || data === "") {
      alert("Preencha um titulo");
    }
    setTarefa([
      ...tarefa,
      {
        id: Date.now(),
        titulo: titulo,
        categoria: categoria,
        descricao: descricao,
        data: data,
      },
    ]);
    setData("");
    setCategoria("");
    setId("");
    setDescricao("");
    setTitulo("");
  }

  const excluirItem = (id) => {
    if (confirm("Deseja Realmente excluir?")) {
      const result = tarefa.filter((item) => item.id !== id);
      setTarefa(result);
    }
  };

  const editarItem = (e) => {
    e.preventDefault()
    const copyTarefa = [...tarefa]
    const indice = copyTarefa.findIndex((tarefa)=> tarefa.id === id)

    copyTarefa[indice].data = data;
    copyTarefa[indice].categoria = categoria;
    copyTarefa[indice].descricao = descricao;
    copyTarefa[indice].titulo = titulo;

    setTarefa(copyTarefa)

    setData("");
    setCategoria("");
    setId("");
    setDescricao("");
    setTitulo("");

  }

  const mudarEstado = (item) =>{
    setData(item.data);
    setCategoria(item.categoria);
    setId(item.id);
    setDescricao(item.descricao);
    setTitulo(item.titulo);
  }
  return (
     <div id="main-container">
      <div id="componente-cadastro">
        <form onSubmit={id ? editarItem: addItem}>
          <h3>Cadastrar tarefa</h3>
          <input
            type="text"
            onChange={(e) => {
              setTitulo(e.target.value);
            }}
            placeholder="Titulo"
            value={titulo}
          />
          <select
            name=""
            id="categoria"
            onChange={(event) => {
             setCategoria(event.target.value);
            }}
            placeholder="Categoria"
            value={categoria}
          >
            <option value="Selecione">Selecione</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Lazer">Lazer</option>
            <option value="Prioridades">Prioridades</option>
            <option value="Outros">Outros</option>
          </select>
          <input
            type="date"
            name=""
            id=""
            value={data}
            onChange={(e) => {
              setData(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Descrição"
            onChange={(e) => {
              setDescricao(e.target.value);
            }}
            value={descricao}
          />
          <input type="submit" id="submit" value={id ? "Editar": "Salvar"} />
        </form>
      </div>
      <div id="componente-tarefas">
        {tarefa.length > 0 ? (
          <div>
            <h1>Minhas Tarefas</h1>
            {tarefa.map((el) => {
              return (
                <div key={el.id} id="card-tarefa">
                  <h2>{el.titulo}</h2>
                  <p id="data">{el.data}</p>
                  <p id="categoria">{el.categoria}</p>
                  <p id="descricao">{el.descricao}</p>
                  <img
                    src={squareEdit}
                    onClick={() => {
                      mudarEstado(el);
                    }}
                    alt="editar"
                  />
                  <img
                    src={deleteIMG}
                    alt="excluir"
                    onClick={() => {
                      excluirItem(el.id);
                    }}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h1>Minhas Tarefas</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tarefas;
