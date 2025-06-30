import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import Categories from './Categories';
import '../styles/style-comunidade.css';

function ComunidadeContent() {
  const [posts, setPosts] = useState([]);
  const [novoPost, setNovoPost] = useState({ titulo: '', conteudo: '' });
  const [anexo, setAnexo] = useState(null);
  const [message, setMessage] = useState('');
  const [loggedInUserId, setLoggedInUserId] = useState(() => {
    return localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId'), 10) : null;
  });
  const [userProfile, setUserProfile] = useState({
    fotoPerfil: localStorage.getItem('userPhoto') || '/default.jpg',
    nomeCompleto: localStorage.getItem('userFullName') || 'Usuário'
  });

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId');
    console.log('User ID from localStorage:', userIdFromStorage);
    if (userIdFromStorage) {
      const userId = parseInt(userIdFromStorage, 10);
      setLoggedInUserId(userId);
      fetchUserProfile(userId);
    }
    fetchPosts();
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      console.log('Buscando foto de perfil para userId:', userId);
      const response = await axios.get(`http://localhost:8080/users/user-photo/${userId}`, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('Resposta da foto de perfil:', response.data);
      const { fotoPerfil, nomeCompleto } = response.data;
      setUserProfile({ fotoPerfil: fotoPerfil || '/default.jpg', nomeCompleto: nomeCompleto || 'Usuário' });
      localStorage.setItem('userPhoto', fotoPerfil || '/default.jpg');
      localStorage.setItem('userFullName', nomeCompleto || 'Usuário');
    } catch (error) {
      console.error('Erro ao carregar foto de perfil:', error.response ? error.response.data : error.message);
    }
  };
  const fetchPosts = async () => {
    try {
      console.log('Buscando postagens em:', 'http://localhost:8080/posts');
      const response = await axios.get('http://localhost:8080/posts', {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('Postagens recebidas:', response.data);
      setPosts(response.data);
    } catch (error) {
      console.error('Erro ao carregar postagens:', error.response ? error.response.data : error.message);
      setMessage('Erro ao carregar postagens: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loggedInUserId) {
      setMessage('Usuário não autenticado! Por favor, faça login novamente.');
      return;
    }
    if (!novoPost.titulo.trim() || !novoPost.conteudo.trim()) {
      setMessage('Por favor, preencha tanto o título quanto o conteúdo.');
      return;
    }
    const data = new FormData();
    const user = {
      id: loggedInUserId,
      nomeCompleto: userProfile?.nomeCompleto || 'Usuário',
      fotoPerfil: userProfile?.fotoPerfil || '/default.jpg'
    };
    data.append('post', new Blob([JSON.stringify({ ...novoPost, autor: user })], { type: 'application/json' }));
    if (anexo) {
      data.append('imagem', anexo);
    }

    try {
      const response = await axios.post('http://localhost:8080/posts', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setPosts([response.data, ...posts]);
      setNovoPost({ titulo: '', conteudo: '' });
      setAnexo(null);
      setMessage('Post criado com sucesso!');
      if (loggedInUserId) fetchUserProfile(loggedInUserId); // Atualiza o perfil
    } catch (error) {
      setMessage('Erro ao criar post: ' + error.response?.data || error.message);
    }
  };

  const handleEdit = async (postId, updatedPost, newImage) => {
    if (!loggedInUserId) {
      setMessage('Usuário não autenticado!');
      return;
    }
    if (!updatedPost.conteudo.trim()) {
      setMessage('O conteúdo não pode estar vazio.');
      return;
    }
    const data = new FormData();
    const user = {
      id: loggedInUserId,
      nomeCompleto: userProfile?.nomeCompleto || 'Usuário',
      fotoPerfil: userProfile?.fotoPerfil || '/default.jpg'
    };
    data.append('post', new Blob([JSON.stringify({ ...updatedPost, autor: user })], { type: 'application/json' }));
    if (newImage) {
      data.append('imagem', newImage);
    }

    try {
      const response = await axios.put(`http://localhost:8080/posts/${postId}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setPosts(posts.map(post => post.id === postId ? response.data : post));
      setMessage('Post editado com sucesso!');
    } catch (error) {
      setMessage('Erro ao editar post: ' + error.response?.data || error.message);
    }
  };

  const handleDelete = async (postId) => {
    if (!loggedInUserId) {
      setMessage('Usuário não autenticado!');
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/posts/${postId}`, {
        params: { userId: loggedInUserId }
      });
      setPosts(posts.filter(post => post.id !== postId));
      setMessage('Post excluído com sucesso!');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido ao excluir post';
      setMessage('Erro ao excluir post: ' + errorMessage);
    }
  };

  // Função para lidar com a seleção de arquivos
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAnexo(e.target.files[0]);
    } else {
      setAnexo(null);
    }
  };

  const handleNovoPostChange = (e) => {
    const { name, value } = e.target;
    setNovoPost(prev => ({
      ...prev,
      [name]: value
    }));
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
                  onChange={handleNovoPostChange}
                  placeholder="Título do post"
                />
                <textarea
                  className="form-control mb-2"
                  name="conteudo"
                  value={novoPost.conteudo}
                  onChange={handleNovoPostChange}
                  placeholder="Escreva algo..."
                />
                <input
                  type="file"
                  className="form-control mb-2"
                  onChange={handleFileChange}
                  accept="image/*,video/*,image/gif"
                />
                <button type="submit" className="btn btn-primary">Postar</button>
                {anexo && (
                  <div className="attachments-preview mt-2">
                    <img
                      src={URL.createObjectURL(anexo)}
                      alt="Prévia"
                      className="img-thumbnail"
                      style={{ maxWidth: '100px', marginRight: '10px' }}
                    />
                  </div>
                )}
              </form>
              {message && <p className="text-center text-danger">{message}</p>}
            </div>
          </div>
          {posts.length > 0 ? (
            posts.map((post) => {
              const photo = post.autor?.fotoPerfil
                ? `http://localhost:8080${post.autor.fotoPerfil}`
                : 'http://localhost:8080/uploads/default.jpg';
              console.log('Photo para post', post.id, ':', photo, 'Autor fotoPerfil:', post.autor?.fotoPerfil, 'UserProfile fotoPerfil:', userProfile.fotoPerfil);
              return (
                <PostCard
                  key={post.id}
                  id={post.id}
                  author={post.autor?.nomeCompleto || 'Usuário Desconhecido'}
                  photo={photo}
                  content={post.conteudo}
                  attachments={post.imagem ? [`http://localhost:8080${post.imagem}`] : []}
                  likes={post.likes || 0}
                  comments={post.comments || []}
                  isLoggedIn={!!loggedInUserId}
                  canEdit={post.autor?.id === loggedInUserId}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              );
            })
          ) : (
            <p className="text-center">Nenhuma postagem disponível.</p>
          )}
        </div>
        <div className="col-md-4">
          <Categories />
        </div>
      </div>
    </div>
  );
}

export default ComunidadeContent;