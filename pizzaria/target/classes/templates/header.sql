USE MASTER
GO

IF EXISTS(SELECT * FROM SYS.databases WHERE NAME = 'Pizzaria')
BEGIN
    DROP DATABASE Pizzaria
END
GO

CREATE DATABASE Pizzaria
GO

USE Pizzaria
GO 

CREATE TABLE LOGIN
(
    ID INT IDENTITY PRIMARY KEY,
    USUARIO CHAR(8) NOT NULL,
    EMAIL VARCHAR(100) NOT NULL,
    SENHA CHAR(8) NOT NULL,
    STATUS VARCHAR(10) NOT NULL
)

GO

CREATE TABLE CLIENTE 
(
    ID INT IDENTITY PRIMARY KEY,
    NOME VARCHAR(50) NOT NULL,
    TELEFONE VARCHAR(20) NOT NULL,
    EMAIL VARCHAR(100) NULL,
    DATA_NASC DATE NULL,
    CEP CHAR(8) NULL,
    LOGRADOURO VARCHAR(100) NOT NULL,
    CIDADE VARCHAR(100) NOT NULL,
    BAIRRO VARCHAR(100) NOT NULL,
    NUM_RESID VARCHAR(10) NOT NULL,
    COMPLEMENTO VARCHAR(100) NULL,
    STATUS VARCHAR(10) NOT NULL,
    LOGIN_ID INT,

    FOREIGN KEY (LOGIN_ID) REFERENCES LOGIN (ID)
)
GO

CREATE TABLE CATEGORIA_PRODUTO
(
    ID INT IDENTITY PRIMARY KEY,
    NOME_CATEGORIA VARCHAR(50) NOT NULL,
    STATUS VARCHAR(10) NOT NULL
)
GO

CREATE TABLE FUNCIONARIO 
(
    ID INT IDENTITY PRIMARY KEY,
    NOME VARCHAR(50) NOT NULL,
    TELEFONE VARCHAR(20) NOT NULL,
    EMAIL VARCHAR(100) NOT NULL,
    STATUS VARCHAR(10) NOT NULL,
    LOGIN_ID INT,

    FOREIGN KEY (LOGIN_ID) REFERENCES LOGIN (ID)
)
GO

CREATE TABLE SERVICO
(
    ID INT IDENTITY PRIMARY KEY,
    NOME VARCHAR(50) NOT NULL,
    PRECO DECIMAL (8,2) NOT NULL,
    STATUS VARCHAR(10) NOT NULL
)
GO 

CREATE TABLE PRODUTO 
(
    ID INT IDENTITY PRIMARY KEY,
    IMAGEM VARBINARY(MAX) NOT NULL,
    NOME_PROD VARCHAR(100) NOT NULL,
    DESCRICAO VARCHAR (100) NOT NULL,
    TAMANHO VARCHAR(10) NOT NULL,
    PRECO DECIMAL(8,2) NOT NULL,
    STATUS VARCHAR(10) NOT NULL,
    CATEGORIA_PRODUTO_ID INT NOT NULL,

    FOREIGN KEY (CATEGORIA_PRODUTO_ID) REFERENCES CATEGORIA_PRODUTO (ID)
)
GO

CREATE TABLE CUPOM 
(
    ID INT IDENTITY,
    NUMERO_CUPOM VARCHAR(6) NOT NULL,
    DATA_GERADO SMALLDATETIME NOT NULL,
    DATA_VALIDADE DATETIME NOT NULL,
    DATA_USO DATETIME NULL,
    VALOR DECIMAL(8,2) NOT NULL,
    CLIENTE_ID INT NOT NULL,
    STATUS VARCHAR(10) NOT NULL,

    PRIMARY KEY (ID),
    FOREIGN KEY (CLIENTE_ID) REFERENCES CLIENTE (ID)
)
GO

CREATE TABLE FORMA_PAGAMENTO 
(
    ID INT IDENTITY,
    NOME_PAGAMENTO VARCHAR(50) NOT NULL,
    DESCRICAO VARCHAR(15) NOT NULL,
    CUPOM_ID INT NULL,
    STATUS VARCHAR(10) NOT NULL,

    PRIMARY KEY (ID),
    FOREIGN KEY (CUPOM_ID) REFERENCES CUPOM (ID)
)
GO

CREATE TABLE PEDIDO
(
    ID INT IDENTITY,
    CLIENTE_ID INT NOT NULL,
    FUNCIONARIO_ID INT NOT NULL,
    SERVICO_ID INT NOT NULL,
    CUPOM_ID INT NULL,
    FORMA_PAGAMENTO_ID INT NULL,
    PRECO DECIMAL(8,2) NOT NULL,
    STATUS VARCHAR(10) NOT NULL,

    PRIMARY KEY (ID),
    FOREIGN KEY (CLIENTE_ID) REFERENCES CLIENTE (ID),
    FOREIGN KEY (FUNCIONARIO_ID) REFERENCES FUNCIONARIO (ID),
    FOREIGN KEY (SERVICO_ID) REFERENCES SERVICO (ID),
    FOREIGN KEY (CUPOM_ID) REFERENCES CUPOM (ID),
    FOREIGN KEY (FORMA_PAGAMENTO_ID) REFERENCES FORMA_PAGAMENTO (ID)

)
GO

CREATE TABLE PEDIDO_ITEM
(
    ID INT IDENTITY,
    PEDIDO_ID INT NOT NULL,
    PRODUTO_ID INT NOT NULL,
    QTD INT NOT NULL,
    DESCRICAO VARCHAR(100) NULL,
    STATUS VARCHAR(10) NOT NULL,

    PRIMARY KEY (ID),
    FOREIGN KEY (PEDIDO_ID) REFERENCES PEDIDO (ID),
    FOREIGN KEY (PRODUTO_ID) REFERENCES PRODUTO (ID)
)
GO
/*
INSERT INTO LOGIN (USUARIO, EMAIL, SENHA, STATUS) VALUES 
('usuario1', 'usuario1@example.com', 'senha123', 'ativo'),
('usuario2', 'usuario2@example.com', 'abc456', 'ativo'),
('usuario3', 'usuario3@example.com', 'qwerty', 'inativo');
GO

INSERT INTO CLIENTE (NOME, TELEFONE, EMAIL, DATA_NASC, CEP, LOGRADOURO, CIDADE, BAIRRO, NUM_RESID, COMPLEMENTO, STATUS, LOGIN_ID) VALUES 
('Carlos Oliveira', '999999999', 'carlos@example.com', '1990-01-01', '12345678', 'Rua X', 'Barueri', 'Centro', '100', 'Apto 101', 'ativo', 1),
('Laura Mendes', '888888888', 'laura@example.com', '1985-05-10', '87654321', 'Rua Y', 'Barueri', 'Jardim', '200', NULL, 'ativo', 2),
('Fernando Pereira', '777777777', 'fernando@example.com', '1992-09-15', '23456789', 'Rua Z', 'Barueri', 'Alphaville', '300', 'Sala 501', 'inativo', 3);

GO

INSERT INTO CATEGORIA_PRODUTO (NOME_CATEGORIA, STATUS) VALUES ('Doce', 'ativo');
INSERT INTO CATEGORIA_PRODUTO (NOME_CATEGORIA, STATUS) VALUES ('Salgado', 'ativo');
INSERT INTO CATEGORIA_PRODUTO (NOME_CATEGORIA, STATUS) VALUES ('Bebida', 'ativo');
GO

INSERT INTO FUNCIONARIO (NOME, TELEFONE, EMAIL, STATUS, LOGIN_ID) VALUES 
('João Silva', '999999999', 'joao@example.com', 'ativo', 1),
('Maria Souza', '888888888', 'maria@example.com', 'ativo', 2),
('Pedro Santos', '777777777', 'pedro@example.com', 'inativo', 3);

GO

INSERT INTO SERVICO (NOME, PRECO, STATUS) VALUES 
('Entrega Expressa', 9.99, 'ativo'),
('Entrega Regular', 5.99, 'ativo'),
('Retirada na Loja', 0.00, 'ativo');
GO

INSERT INTO PRODUTO (IMAGEM, NOME_PROD, DESCRICAO, TAMANHO, PRECO, STATUS, CATEGORIA_PRODUTO_ID) VALUES 
(NULL, 'Pizza Margherita', 'Pizza tradicional com molho de tomate, queijo mussarela e manjericão', 'Grande', 29.99, 'ativo', 1);

INSERT INTO PRODUTO (IMAGEM, NOME_PROD, DESCRICAO, TAMANHO, PRECO, STATUS, CATEGORIA_PRODUTO_ID) VALUES 
(NULL, 'Pizza de Mussarela', 'Pizza com molho, queijo e tomate', 'Pequeno', 24.99, 'ativo', 2);

INSERT INTO PRODUTO (IMAGEM, NOME_PROD, DESCRICAO, TAMANHO, PRECO, STATUS, CATEGORIA_PRODUTO_ID) VALUES 
(NULL, 'Pizza de Chocolate e Morango', 'Pizzas de chocolate com Morango', 'Médio', 32.99, 'ativo', 3);

INSERT INTO PRODUTO (IMAGEM, NOME_PROD, DESCRICAO, TAMANHO, PRECO, STATUS, CATEGORIA_PRODUTO_ID) VALUES 
(NULL, 'Refrigerante', 'Coca-cola 2L', 'Único', 7.99, 'ativo', 1);

INSERT INTO PRODUTO (IMAGEM, NOME_PROD, DESCRICAO, TAMANHO, PRECO, STATUS, CATEGORIA_PRODUTO_ID) VALUES 
(NULL, 'Pizza de frango com Catupiry', 'Pizza de frango com catupiry', 'Pequeno', 25.99, 'ativo', 2);

INSERT INTO PRODUTO (IMAGEM, NOME_PROD, DESCRICAO, TAMANHO, PRECO, STATUS, CATEGORIA_PRODUTO_ID) VALUES 
(NULL, 'Pizza de Brigadeiro', 'Pizza de brigadeiro com granulado', 'Grande', 31.99, 'ativo', 3);
GO

INSERT INTO CUPOM (NUMERO_CUPOM, DATA_GERADO, DATA_VALIDADE, DATA_USO, VALOR, CLIENTE_ID, STATUS) VALUES 
('CUPOM123', '2023-05-24 10:00:00', '2023-06-30 23:59:59', NULL, 10.00, 1, 'ativo');

INSERT INTO CUPOM (NUMERO_CUPOM, DATA_GERADO, DATA_VALIDADE, DATA_USO, VALOR, CLIENTE_ID, STATUS) VALUES 
('CUPOM456', '2023-05-24 11:30:00', '2023-07-31 23:59:59', NULL, 15.00, 2, 'ativo');
GO

INSERT INTO FORMA_PAGAMENTO (NOME_PAGAMENTO, DESCRICAO, CUPOM_ID, STATUS) VALUES 
('Cartão de Débito', 'Pagamento realizado com cartão de débito', NULL, 'ativo');

INSERT INTO FORMA_PAGAMENTO (NOME_PAGAMENTO, DESCRICAO, CUPOM_ID, STATUS) VALUES 
('Cartão de Crédito', 'Pagamento realizado com cartão de crédito', NULL, 'ativo');

INSERT INTO FORMA_PAGAMENTO (NOME_PAGAMENTO, DESCRICAO, CUPOM_ID, STATUS) VALUES 
('Dinheiro', 'Pagamento em dinheiro', NULL, 'ativo');

*/












