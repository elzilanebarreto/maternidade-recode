import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/style-comunidade.css";

function PostCard({
  id,
  author,
  content,
  attachments,
  likes,
  comments,
  isLoggedIn,
  canEdit,
  onEdit,
  onDelete,
  photo,
}) {
  console.log("Renderizando foto para", author, ":", photo);
  const [localLikes, setLocalLikes] = useState(likes);
  const [localComments, setLocalComments] = useState(comments);
  const [commentInput, setCommentInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setLocalLikes(likes);
    setLocalComments(comments);
  }, [likes, comments]);

  const handleImageError = (e) => {
    console.log("Erro ao carregar imagem:", e.target.src);
    setImgError(true);
    e.target.src = "https://picsum.photos/40";
  };

  const handleLike = async () => {
    if (!isLoggedIn) return;
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.post(
        `http://localhost:8080/posts/${id}/like`,
        { userId }
      );
      setLocalLikes(response.data); // Atualiza likes com o valor retornado
    } catch (error) {
      alert(error.response?.data || "Erro ao curtir");
      console.error("Erro ao curtir:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    try {
      const userId = localStorage.getItem("userId");
      await axios.post("http://localhost:8080/comentarios", {
        texto: commentInput,
        post: { id: id },
        autor: { id: userId },
      });
      setLocalComments([...localComments, commentInput]);
      setCommentInput("");
    } catch (error) {
      console.error("Erro ao comentar:", error);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(id, { conteudo: editContent });
    setEditMode(false);
  };

  return (
    <div className="card mb-3">
      <div className="card-body fixed-width-card">
        <div className="post-header">
          <img
            src={imgError || !photo ? "https://picsum.photos/40" : photo}
            alt={`${author} foto`}
            className="user-photo"
            onError={handleImageError}
          />
          <span className="user-name">{author}</span>
        </div>
        {editMode ? (
          <form onSubmit={handleEditSubmit}>
            <textarea
              className="form-control mb-2"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-sm me-2">
              Salvar
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setEditMode(false)}
            >
              Cancelar
            </button>
          </form>
        ) : (
          <>
            <p className="card-text">{content}</p>
            {attachments.length > 0 && (
              <div className="attachments mb-2">
                {attachments.map((attach, idx) => (
                  <img
                    key={idx}
                    src={attach}
                    alt="Anexo"
                    className="post-attachment img-thumbnail"
                    style={{ maxWidth: "100px", marginRight: "10px" }}
                  />
                ))}
              </div>
            )}
          </>
        )}
        <div className="post-actions">
          <button
            className="btn btn-link"
            onClick={handleLike}
            disabled={!isLoggedIn}
          >
            <span className="material-icons">favorite</span> {localLikes}
          </button>
          {isLoggedIn && (
            <form onSubmit={handleCommentSubmit} className="d-flex">
              <input
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Comente..."
                className="form-control d-inline w-50"
              />
              <button type="submit" className="btn btn-primary btn-sm ms-2">
                Enviar
              </button>
            </form>
          )}
          {localComments.length > 0 && (
            <div className="mt-2">Comentários: {localComments.join(", ")}</div>
          )}
          {canEdit && (
            <div className="mt-2">
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => setEditMode(true)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(id)}
              >
                Excluir
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
