-- Migration: Adicionar campo status ao projeto_extensao + melhorar tabela usuario
-- Executar via Node.js ou MySQL client

-- 1. Adicionar campo status ao projeto_extensao
ALTER TABLE projeto_extensao
  ADD COLUMN status ENUM('rascunho','em_avaliacao','aprovado','rejeitado','em_execucao','concluido')
  NOT NULL DEFAULT 'rascunho' AFTER metodologia;

-- 2. Adicionar timestamps ao projeto_extensao
ALTER TABLE projeto_extensao
  ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER status,
  ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at;

-- 3. Adicionar campo id_pessoa ao usuario (vincular usuario a pessoa)
ALTER TABLE usuario
  ADD COLUMN id_pessoa INT NULL AFTER tipo,
  ADD CONSTRAINT fk_usuario_pessoa FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa) ON DELETE SET NULL;

-- 4. Atualizar projetos existentes para status 'rascunho'
UPDATE projeto_extensao SET status = 'rascunho' WHERE status IS NULL OR status = '';
