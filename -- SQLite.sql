-- SQLite
-- CREATE TABLE produtos (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     nome TEXT NOT NULL,
--     preco REAL NOT NULL,
--     categoria_id TEXT,
--     FOREIGN KEY(categoria_id) REFERENCES categorias (id)
-- ); 

-- CREATE TABLE categorias (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     nome TEXT NOT NULL
-- ); 

-- INSERT INTO produtos VALUES (1, 'Televisão', 1000, 1,20);
-- INSERT INTO produtos VALUES (2, 'Sofá', 2000, 2, 30);
-- INSERT INTO produtos VALUES (3, 'Tênis', 500, 3, 15);

-- DELETE FROM categorias;

-- INSERT INTO categorias (nome) VALUES ('Eletrônicos');
-- INSERT INTO categorias (nome) VALUES ('Casa');
-- INSERT INTO categorias (nome) VALUES ('Moda');

-- ALTER TABLE produtos ADD COLUMN quantidade INTEGER;

-- INSERT INTO produtos (nome, preco, quantidade) VALUES ('Geladeira', 1000, 11);
-- INSERT INTO produtos (nome, preco, quantidade) VALUES ('Computador', 3000, 45);
-- INSERT INTO produtos (nome, preco, quantidade) VALUES ('Mochila', 200, 67);

-- INSERT INTO categorias (nome) VALUES ('Esportes');
-- INSERT INTO categorias (nome) VALUES ('Beleza');
-- INSERT INTO categorias (nome) VALUES ('Cosméticos');

-- INNER JOIN mantém registros que tem conrrespondência em ambas as tabelas


-- --Atividade 2
-- SELECT produtos.nome, produtos.quantidade, categorias.nome FROM produtos 
-- INNER JOIN categorias ON categorias.id = produtos.id;


-- atividade 3

-- SELECT * FROM produtos
-- WHERE categoria_id IS NULL;

--LEFT JOIN mantém todas as categorias, mesmo que não tenham produto.

SELECT * FROM categorias
LEFT JOIN produtos ON produtos.categoria_id = categorias.id
WHERE produtos.id IS NULL;
