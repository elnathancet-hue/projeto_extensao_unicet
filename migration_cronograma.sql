-- Migration: Adicionar id_projeto ao cronograma_atividades
-- Executar no MySQL local (XAMPP) e no Railway

ALTER TABLE cronograma_atividades
ADD COLUMN id_projeto INT DEFAULT NULL AFTER id;

ALTER TABLE cronograma_atividades
ADD CONSTRAINT fk_cronograma_projeto
FOREIGN KEY (id_projeto) REFERENCES projeto_extensao(id_projeto)
ON DELETE CASCADE;
