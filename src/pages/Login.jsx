import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/style-login.css';
import axios from 'axios';
import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Enviando:', { username, password });
    axios.post('http://localhost:8080/api/login', {
      username: username,
      password: password
    }, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        console.log('Resposta do servidor:', response.data);
        const { message, userId } = response.data;
        setMessage(message);
        if (message === 'Login bem-sucedido' && userId) {
          localStorage.setItem('userId', userId);
          // Busque e salve o nome completo
          axios.get(`http://localhost:8080/users/user-photo/${userId}`)
            .then(resp => {
              const { nomeCompleto } = resp.data;
              const firstName = nomeCompleto ? nomeCompleto.split(' ')[0] : '';
              localStorage.setItem('userFullName', firstName);
              window.location.href = `/comunidade-login?identifier=${encodeURIComponent(username)}`;
            })
            .catch(() => {
              window.location.href = `/comunidade-login?identifier=${encodeURIComponent(username)}`;
            });

        };
      });
  };

  return (
    <>
      <Header />
      <main className="corpo">
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <form className="form shadow-lg" onSubmit={handleSubmit}>
            <p className="title text-center">Faça Login</p>
            <div className="row">
              <div className="col-12">
                <label>
                  <input
                    required
                    placeholder=" "
                    type="text"
                    className="input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <span>Username ou E-mail</span>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <label>
                  <input
                    required
                    placeholder=" "
                    type="password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span>Senha</span>
                </label>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12 text-center">
                <input type="submit" className="submit-login" value="Entrar" />
              </div>
            </div>
            {message && <p className="text-center text-danger">{message}</p>}
            <div className="row justify-content-center mt-3">
              <div className="col-md-12 text-center">
                <button type="button" className="btn-gmail">
                  <i className="fab fa-google"></i> Entrar com Gmail
                </button>
              </div>
            </div>
            <div className="row justify-content-center mt-3">
              <div className="col-md-12 text-center">
                <Link to="/cadastro" className="create-account">
                  Criar Conta
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;