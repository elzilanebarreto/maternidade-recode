import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import Categories from "./Categories";
import "../styles/style-comunidade.css";

function ComunidadeContent() {
  const [posts, setPosts] = useState([]);
  const [novoPost, setNovoPost] = useState({ titulo: "", conteudo: "" });
  const [anexo, setAnexo] = useState(null);
  const [message, setMessage] = useState("");
  const [loggedInUserId] = useState(1); // Simula o ID do usuário logado (ajuste conforme necessário)

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/posts");
      setPosts(response.data);
    } catch (error) {
      setMessage("Erro ao carregar posts: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoPost({ ...novoPost, [name]: value });
  };

  const handleFileChange = (e) => {
    setAnexo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    const user = {
      id: loggedInUserId,
      nomeCompleto: "Usuário Exemplo",
      fotoPerfil: "/default.jpg",
    }; // Adjust as needed
    data.append(
      "post",
      new Blob([JSON.stringify({ ...novoPost, autor: user })], {
        type: "application/json",
      })
    );
    if (anexo) {
      data.append("imagem", anexo);
    }
    try {
      const response = await axios.post("http://localhost:8080/posts", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPosts([response.data, ...posts]);
      setNovoPost({ titulo: "", conteudo: "" });
      setAnexo(null);
      setMessage("Post criado com sucesso!");
    } catch (error) {
      setMessage(
        "Erro ao criar post: " + error.response?.data || error.message
      );
    }
  };

  const handleEdit = async (postId, updatedPost) => {
    const data = new FormData();
    const user = {
      id: loggedInUserId,
      nomeCompleto: "Usuário Exemplo",
      fotoPerfil: "/default.jpg",
    }; // Ajuste conforme necessário
    data.append(
      "post",
      new Blob([JSON.stringify({ ...updatedPost, autor: user })], {
        type: "application/json",
      })
    );
    if (anexo) {
      data.append("imagem", anexo);
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/posts/${postId}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setPosts(
        posts.map((post) => (post.id === postId ? response.data : post))
      );
      setMessage("Post editado com sucesso!");
    } catch (error) {
      setMessage(
        "Erro ao editar post: " + error.response?.data || error.message
      );
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:8080/posts/${postId}`, {
        params: { userId: loggedInUserId }, // Envie o userId como parâmetro
      });
      setPosts(posts.filter((post) => post.id !== postId));
      setMessage("Post excluído com sucesso!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Erro desconhecido ao excluir post";
      setMessage("Erro ao excluir post: " + errorMessage);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-3">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-control mb-2"
                  name="titulo"
                  value={novoPost.titulo}
                  onChange={handleChange}
                  placeholder="Título do post"
                />
                <textarea
                  className="form-control mb-2"
                  name="conteudo"
                  value={novoPost.conteudo}
                  onChange={handleChange}
                  placeholder="Escreva algo..."
                />
                <input
                  type="file"
                  className="form-control mb-2"
                  onChange={handleFileChange}
                  accept="image/*,video/*,image/gif"
                />
                <button type="submit" className="btn btn-primary">
                  Postar
                </button>
                {anexo && (
                  <div className="attachments-preview mt-2">
                    <img
                      src={URL.createObjectURL(anexo)}
                      alt="Prévia"
                      className="img-thumbnail"
                      style={{ maxWidth: "100px", marginRight: "10px" }}
                    />
                  </div>
                )}
              </form>
              {message && <p className="text-center text-danger">{message}</p>}
            </div>
          </div>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              author={post.autor?.nomeCompleto || "Usuário Desconhecido"}
              photo={
                post.autor?.fotoPerfil
                  ? `http://localhost:8080${post.autor.fotoPerfil}`
                  : "https://picsum.photos/40"
              }
              content={post.conteudo}
              attachments={
                post.imagem
                  ? [`http://localhost:8080${post.imagem}`]
                  : ["https://picsum.photos/100"]
              }
              likes={post.likes || 0}
              comments={post.comments || []}
              isLoggedIn={true}
              canEdit={post.autor?.id === loggedInUserId}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
        <div className="col-md-4">
          <Categories />
        </div>
      </div>
    </div>
  );
}

export default ComunidadeContent;
