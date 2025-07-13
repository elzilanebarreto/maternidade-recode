-- Geração de Modelo físico
-- Sql ANSI 2003 - brModelo.

CREATE TABLE User (
    id BIGINT PRIMARY KEY,
    nome_completo VARCHAR(255),
    userName VARCHAR(255),
    email VARCHAR(255),
    data_nascimento DATETIME,
    senha VARCHAR(255),
    foto_perfil VARCHAR(255)
);

CREATE TABLE Post (
    id BIGINT PRIMARY KEY,
    titulo VARCHAR(255),
    conteudo VARCHAR(255),
    data_criacao DATETIME,
    likes INTEGER,
    imagem VARCHAR(255),
    autor_id BIGINT,
    FOREIGN KEY (autor_id) REFERENCES User(id)
);

CREATE TABLE Likes (
    id BIGINT PRIMARY KEY,
    post_id BIGINT,
    user_id BIGINT,
    FOREIGN KEY (post_id) REFERENCES Post(id),
    FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE Comentario (
    id BIGINT PRIMARY KEY,
    texto VARCHAR(255),
    data_registro DATETIME,
    autor_id BIGINT,
    post_id BIGINT,
    FOREIGN KEY (autor_id) REFERENCES User(id),
    FOREIGN KEY (post_id) REFERENCES Post(id)
);