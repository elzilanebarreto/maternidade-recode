import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/style-comunidade.css";

function PostCard({ id, author, content, attachments, likes, comments, isLoggedIn, canEdit, onEdit, onDelete, photo }) {
  const [localLikes, setLocalLikes] = useState(likes);
  const [localComments, setLocalComments] = useState(comments);
  const [commentInput, setCommentInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [editImage, setEditImage] = useState(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setLocalLikes(likes);
    setLocalComments(comments);
  }, [likes, comments]);

  const handleImageError = (e) => {
    console.log('Erro ao carregar imagem:', e.target.src);
    setImgError(true);
    e.target.src = 'https://picsum.photos/40';
  };

  const handleLike = async () => {
    if (!isLoggedIn) return;
    const userId = localStorage.getItem("userId");
    if (!userId || isNaN(Number(userId)) || Number(userId) <= 0) {
      alert("Você precisa estar logado para curtir.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8080/posts/${id}/like`,
        { userId }
      );
      setLocalLikes(response.data);
    } catch (error) {
      alert(error.response?.data || "Erro ao curtir.");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    const userId = localStorage.getItem("userId");
    if (!userId || isNaN(Number(userId)) || Number(userId) <= 0) {
      alert("Você precisa estar logado para comentar.");
      return;
    }
    try {
      await axios.post("http://localhost:8080/comentarios", {
        texto: commentInput,
        post: { id: id },
        autor: { id: userId },
      });
      setLocalComments([...localComments, commentInput]);
      setCommentInput("");
    } catch (error) {
      alert(error.response?.data || "Erro ao comentar.");
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(id, { conteudo: editContent }, editImage);
    setEditMode(false);
    setEditImage(null);
  };

  const handleEditImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEditImage(e.target.files[0]);
    }
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
          <form onSubmit={handleEditSubmit} className="edit-form">
            <textarea
              className="form-control"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Edite seu post..."
            />
            <input
              type="file"
              className="form-control mb-2"
              onChange={handleEditImageChange}
              accept="image/*,video/*,image/gif"
            />
            {editImage && (
              <div className="attachments-preview">
                <img
                  src={URL.createObjectURL(editImage)}
                  alt="Nova prévia"
                  className="img-thumbnail"
                />
              </div>
            )}
            <div className="edit-controls">
              <button type="submit" className="btn btn-primary btn-sm">
                Salvar
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setEditMode(false);
                  setEditContent(content);
                  setEditImage(null);
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="post-content">
              <p className="card-text">{content}</p>
            </div>
            
            {attachments && attachments.length > 0 && (
              <div className="attachments">
                {attachments.map((attach, idx) => (
                  <img
                    key={idx}
                    src={attach}
                    alt={`Anexo ${idx + 1}`}
                    className="post-attachment"
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
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <input
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Escreva um comentário..."
                className="form-control comment-input"
              />
              <button type="submit" className="btn btn-primary btn-sm">
                Comentar
              </button>
            </form>
          )}

          {localComments && localComments.length > 0 && (
            <div className="comments-section">
              <h6>Comentários ({localComments.length})</h6>
              {localComments.map((comment, idx) => (
                <div key={idx} className="comment">
                  <span className="comment-author">Usuário:</span>
                  <span className="comment-content">{comment}</span>
                </div>
              ))}
            </div>
          )}

          {canEdit && (
            <div className="edit-controls">
              <button
                className="btn btn-warning btn-sm"
                onClick={() => setEditMode(true)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  if (window.confirm("Tem certeza que deseja excluir este post?")) {
                    onDelete(id);
                  }
                }}
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