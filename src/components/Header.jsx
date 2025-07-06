import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/style-header.css";
import logo from "../assets/logo3.png"; // ajuste se necessário

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Busca nome do usuário pelo userId salvo
  const fetchUserName = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/users/user-photo/${userId}`);
      const { nomeCompleto } = response.data;
      const nameParts = (nomeCompleto || "").trim().split(" ");
      const firstName = nameParts[0] || userId;
      setFullName(firstName);
      localStorage.setItem("userFullName", firstName);
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
      setFullName(userId);
    }
  };

  useEffect(() => {
    // Sempre checa o localStorage, não só a URL
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId && !isNaN(Number(storedUserId))) {
      setIsLoggedIn(true);
      fetchUserName(storedUserId);
    } else {
      setIsLoggedIn(false);
      setFullName("");
    }
    // Observa mudanças no localStorage (tab/window diferente)
    const onStorage = () => {
      const storedUserId = localStorage.getItem("userId");
      if (!storedUserId) {
        setIsLoggedIn(false);
        setFullName("");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [location]);

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFullName("");
    setShowDropdown(false);
    localStorage.removeItem("userId");
    localStorage.removeItem("userFullName");
    // Redireciona para login
    navigate("/login");
    // window.location.reload(); // Alternativamente, recarregue a página
  };

  return (
    <header className="header-principal">
      <Link to="/" className="logo">
        <img src={logo} alt="Logo Comunidade de Mães" />
      </Link>
      <nav className="navbar navbar-expand-lg cabecalho">
        <div className="container-fluid">
          <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarNav"
            aria-controls="sidebarNav"
            aria-expanded="false"
            aria-label="Abrir menu de navegação"
          >
            <span className="material-icons">menu</span>
          </button>
          {/* Menu Desktop */}
          <div className="collapse navbar-collapse desktop-nav" id="desktopNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Início</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/desafios">Desafios da Maternidade</Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={isLoggedIn ? "/comunidade-login" : "/comunidade"}
                >
                  Comunidade
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sobre">Sobre Nós</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contato">Contatos</Link>
              </li>
              {isLoggedIn ? (
                <li className="nav-item position-relative">
                  <span className="nav-link" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
                    <span className="material-icons">person</span>
                    {/* Exibe o primeiro nome ao lado do ícone */}
                    <span style={{ marginLeft: 6 }}>{fullName}</span>
                  </span>
                  {showDropdown && (
                    <div className="dropdown-menu" style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      backgroundColor: '#e8c7b4',
                      border: '1px solid #cc6200',
                      borderRadius: '5px',
                      padding: '5px',
                      zIndex: 1000,
                      display: showDropdown ? 'block' : 'none'
                    }}>
                      <p>Olá, {fullName}</p>
                      <a href="#" className="dropdown-item" onClick={handleLogout}>Logout</a>
                    </div>
                  )}
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <span className="material-icons">login</span> Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
          {/* Barra Lateral Mobile */}
          <div className="collapse navbar-collapse sidebar-nav" id="sidebarNav">
            <button className="close-btn" aria-label="Fechar menu">
              <span className="material-icons">close</span>
            </button>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Início</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/desafios">Desafios da Maternidade</Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={isLoggedIn ? "/comunidade-login" : "/comunidade"}
                >
                  Comunidade
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sobre">Sobre Nós</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contato">Contatos</Link>
              </li>
              {isLoggedIn ? (
                <li className="nav-item position-relative">
                  <span className="nav-link" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
                    <span className="material-icons">person</span>
                    <span style={{ marginLeft: 6 }}>{fullName}</span>
                  </span>
                  {showDropdown && (
                    <div className="dropdown-menu" style={{
                      position: window.innerWidth <= 991 ? 'absolute' : 'absolute',
                      top: window.innerWidth <= 991 ? '60px' : '100%',
                      right: window.innerWidth <= 991 ? '20px' : 0,
                      left: window.innerWidth <= 991 ? '20px' : 'auto',
                      padding: '5px',
                      zIndex: 2000,
                      display: showDropdown ? 'block' : 'none'
                    }}>
                      <p>Olá, {fullName}</p>
                      <a href="#" className="dropdown-item" onClick={handleLogout}>Logout</a>
                    </div>
                  )}
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <span className="material-icons">login</span> Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;