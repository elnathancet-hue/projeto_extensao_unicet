-- Removed hardcoded CREATE DATABASE and USE statements so DB_NAME works
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: projetos_extensao
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `avaliacao_institucional`
--

DROP TABLE IF EXISTS `avaliacao_institucional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avaliacao_institucional` (
  `id_avaliacao` int NOT NULL AUTO_INCREMENT,
  `id_projeto` int NOT NULL,
  `criterios_avaliacao` text,
  `metodologia_avaliacao` text,
  `forma_apresentacao_relatorio` text,
  PRIMARY KEY (`id_avaliacao`),
  KEY `id_projeto` (`id_projeto`),
  CONSTRAINT `avaliacao_institucional_ibfk_1` FOREIGN KEY (`id_projeto`) REFERENCES `projeto_extensao` (`id_projeto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacao_institucional`
--

LOCK TABLES `avaliacao_institucional` WRITE;
/*!40000 ALTER TABLE `avaliacao_institucional` DISABLE KEYS */;
/*!40000 ALTER TABLE `avaliacao_institucional` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avaliacao_participante`
--

DROP TABLE IF EXISTS `avaliacao_participante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avaliacao_participante` (
  `id_avaliacao_participante` int NOT NULL AUTO_INCREMENT,
  `id_projeto` int NOT NULL,
  `data_resposta` date DEFAULT NULL,
  `id_faixa` int DEFAULT NULL,
  `id_escolaridade` int DEFAULT NULL,
  `reside_na_comunidade` tinyint(1) DEFAULT NULL,
  `avaliacao_conteudo` varchar(20) DEFAULT NULL,
  `atendeu_expectativas` varchar(20) DEFAULT NULL,
  `facilitadores_acessiveis` varchar(20) DEFAULT NULL,
  `escuta_comunidade` varchar(20) DEFAULT NULL,
  `estrutura_adequada` varchar(20) DEFAULT NULL,
  `sente_mais_capacitado` varchar(20) DEFAULT NULL,
  `contribuicao_pessoal` varchar(20) DEFAULT NULL,
  `descricao_contribuicao` text,
  `pretende_aplicar` varchar(20) DEFAULT NULL,
  `motivo_nao_aplicar` text,
  `recomendaria` varchar(20) DEFAULT NULL,
  `comentario_positivo` text,
  `sugestao_melhoria` text,
  `sugestoes_futuras` text,
  `consentimento` tinyint(1) DEFAULT NULL,
  `assentimento` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_avaliacao_participante`),
  KEY `id_projeto` (`id_projeto`),
  KEY `id_faixa` (`id_faixa`),
  KEY `id_escolaridade` (`id_escolaridade`),
  CONSTRAINT `avaliacao_participante_ibfk_1` FOREIGN KEY (`id_projeto`) REFERENCES `projeto_extensao` (`id_projeto`),
  CONSTRAINT `avaliacao_participante_ibfk_2` FOREIGN KEY (`id_faixa`) REFERENCES `faixa_etaria` (`id_faixa`),
  CONSTRAINT `avaliacao_participante_ibfk_3` FOREIGN KEY (`id_escolaridade`) REFERENCES `escolaridade` (`id_escolaridade`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacao_participante`
--

LOCK TABLES `avaliacao_participante` WRITE;
/*!40000 ALTER TABLE `avaliacao_participante` DISABLE KEYS */;
/*!40000 ALTER TABLE `avaliacao_participante` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `cronograma_atividades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cronograma_atividades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero` int DEFAULT NULL,
  `etapa` text NOT NULL,
  `data` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `local` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cronograma_atividades`
--

--
-- Table structure for table `questionario_impacto`
--

DROP TABLE IF EXISTS `questionario_impacto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questionario_impacto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome_acao` varchar(255) DEFAULT NULL,
  `instituicao` varchar(255) DEFAULT NULL,
  `data_realizacao` date DEFAULT NULL,
  `tipo_acao` varchar(100) DEFAULT NULL,
  `local_realizacao` varchar(255) DEFAULT NULL,
  `faixa_etaria` varchar(50) DEFAULT NULL,
  `escolaridade` varchar(100) DEFAULT NULL,
  `reside_local` varchar(10) DEFAULT NULL,
  `aval_conteudo` text,
  `expectativas` text,
  `impacto_desc` text,
  `aplicacao_conhecimento` text,
  `gostou` varchar(10) DEFAULT NULL,
  `melhorias` text,
  `consentimento` tinyint(1) DEFAULT '0',
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questionario_impacto`
--

LOCK TABLES `cronograma_atividades` WRITE;
/*!40000 ALTER TABLE `cronograma_atividades` DISABLE KEYS */;
/*!40000 ALTER TABLE `cronograma_atividades` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `curso`
--

DROP TABLE IF EXISTS `curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curso` (
  `id_curso` int NOT NULL AUTO_INCREMENT,
  `nome_curso` varchar(255) DEFAULT NULL,
  `coordenador_id` int DEFAULT NULL,
  PRIMARY KEY (`id_curso`),
  KEY `fk_curso_coordenador` (`coordenador_id`),
  CONSTRAINT `fk_curso_coordenador` FOREIGN KEY (`coordenador_id`) REFERENCES `pessoa` (`id_pessoa`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso`
--

LOCK TABLES `curso` WRITE;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
INSERT INTO `curso` VALUES (1,'BIOMEDICINA',1),(2,'DESIGN GRÁFICO',13),(3,'ENGENHARIA DE COMPUTAÇÃO COM INTELIGÊNCIA ARTIFICIAL',23),(4,'FARMÁCIA',12),(5,'SISTEMAS PARA INTERNET',13);
/*!40000 ALTER TABLE `curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curso_pessoa`
--

DROP TABLE IF EXISTS `curso_pessoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curso_pessoa` (
  `id_curso` int NOT NULL,
  `id_pessoa` int NOT NULL,
  PRIMARY KEY (`id_curso`,`id_pessoa`),
  KEY `id_pessoa` (`id_pessoa`),
  CONSTRAINT `curso_pessoa_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id_curso`),
  CONSTRAINT `curso_pessoa_ibfk_2` FOREIGN KEY (`id_pessoa`) REFERENCES `pessoa` (`id_pessoa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso_pessoa`
--

LOCK TABLES `curso_pessoa` WRITE;
/*!40000 ALTER TABLE `curso_pessoa` DISABLE KEYS */;
INSERT INTO `curso_pessoa` VALUES (1,2),(4,2),(1,3),(4,3),(1,4),(1,5),(4,5),(1,6),(4,6),(1,7),(4,7),(1,8),(4,8),(1,9),(4,9),(1,10),(3,10),(4,10),(1,11),(1,12),(2,12),(2,13),(5,13),(2,14),(4,14),(2,15),(2,16),(5,16),(2,17),(3,17),(5,17),(2,18),(5,18),(2,19),(5,19),(2,20),(4,20),(2,21),(5,21),(2,22),(5,22),(3,23),(3,24),(3,25),(3,26),(3,27),(3,28),(3,29),(3,30),(3,31),(4,32),(4,33),(4,34),(4,35),(4,36);
/*!40000 ALTER TABLE `curso_pessoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `escolaridade`
--

DROP TABLE IF EXISTS `escolaridade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `escolaridade` (
  `id_escolaridade` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_escolaridade`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `escolaridade`
--

LOCK TABLES `escolaridade` WRITE;
/*!40000 ALTER TABLE `escolaridade` DISABLE KEYS */;
INSERT INTO `escolaridade` VALUES (1,'Não alfabetizado'),(2,'Ensino Fundamental'),(3,'Ensino Médio'),(4,'Superior'),(5,'Pós-graduação');
/*!40000 ALTER TABLE `escolaridade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faixa_etaria`
--

DROP TABLE IF EXISTS `faixa_etaria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faixa_etaria` (
  `id_faixa` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_faixa`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faixa_etaria`
--

LOCK TABLES `faixa_etaria` WRITE;
/*!40000 ALTER TABLE `faixa_etaria` DISABLE KEYS */;
INSERT INTO `faixa_etaria` VALUES (1,'Menos de 18'),(2,'18 a 24'),(3,'25 a 34'),(4,'35 a 44'),(5,'45 a 59'),(6,'60 ou mais');
/*!40000 ALTER TABLE `faixa_etaria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instituicao`
--

DROP TABLE IF EXISTS `instituicao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instituicao` (
  `id_instituicao` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `sigla` varchar(20) DEFAULT NULL,
  `id_tipo_instituicao` int DEFAULT NULL,
  PRIMARY KEY (`id_instituicao`),
  KEY `id_tipo_instituicao` (`id_tipo_instituicao`),
  CONSTRAINT `instituicao_ibfk_1` FOREIGN KEY (`id_tipo_instituicao`) REFERENCES `tipo_instituicao` (`id_tipo_instituicao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instituicao`
--

LOCK TABLES `instituicao` WRITE;
/*!40000 ALTER TABLE `instituicao` DISABLE KEYS */;
/*!40000 ALTER TABLE `instituicao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `linha_programatica`
--

DROP TABLE IF EXISTS `linha_programatica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `linha_programatica` (
  `id_linha` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id_linha`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linha_programatica`
--

LOCK TABLES `linha_programatica` WRITE;
/*!40000 ALTER TABLE `linha_programatica` DISABLE KEYS */;
INSERT INTO `linha_programatica` VALUES (1,'Comunicação'),(2,'Cultura'),(3,'Direitos Humanos e Justiça'),(4,'Educação'),(5,'Meio Ambiente'),(6,'Saúde'),(7,'Tecnologia e Produção'),(8,'Trabalho');
/*!40000 ALTER TABLE `linha_programatica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `local_execucao`
--

DROP TABLE IF EXISTS `local_execucao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `local_execucao` (
  `id_local` int NOT NULL AUTO_INCREMENT,
  `endereco` text,
  `cep` varchar(10) DEFAULT NULL,
  `bairro` varchar(100) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_local`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `local_execucao`
--

LOCK TABLES `local_execucao` WRITE;
/*!40000 ALTER TABLE `local_execucao` DISABLE KEYS */;
/*!40000 ALTER TABLE `local_execucao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `papel_projeto`
--

DROP TABLE IF EXISTS `papel_projeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `papel_projeto` (
  `id_papel` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_papel`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `papel_projeto`
--

LOCK TABLES `papel_projeto` WRITE;
/*!40000 ALTER TABLE `papel_projeto` DISABLE KEYS */;
INSERT INTO `papel_projeto` VALUES (1,'Professor'),(2,'Técnico');
/*!40000 ALTER TABLE `papel_projeto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pessoa`
--

DROP TABLE IF EXISTS `pessoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pessoa` (
  `id_pessoa` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `cpf` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `id_tipo_pessoa` int DEFAULT NULL,
  PRIMARY KEY (`id_pessoa`),
  KEY `id_tipo_pessoa` (`id_tipo_pessoa`),
  CONSTRAINT `pessoa_ibfk_1` FOREIGN KEY (`id_tipo_pessoa`) REFERENCES `tipo_pessoa` (`id_tipo_pessoa`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pessoa`
--

LOCK TABLES `pessoa` WRITE;
/*!40000 ALTER TABLE `pessoa` DISABLE KEYS */;
INSERT INTO `pessoa` VALUES (1,'Profa. Marina Uchôa',NULL,NULL,NULL,1),(2,'Profa. Akemi Suzuki Cruzio',NULL,NULL,NULL,2),(3,'Profa. Danielle Zildeana Sousa Furtado',NULL,NULL,NULL,2),(4,'Profa. Deillany Martins Mendes',NULL,NULL,NULL,2),(5,'Profa. Francisca Mairana Silva de Sousa',NULL,NULL,NULL,2),(6,'Profa. Katia Cilene de Oliveira Pereira',NULL,NULL,NULL,2),(7,'Profa. Kelly Beatriz Vieira de Oliveira',NULL,NULL,NULL,2),(8,'Profa. Keylla da Conceição Machado',NULL,NULL,NULL,2),(9,'Profa. Maria das Graças Prianti',NULL,NULL,NULL,2),(10,'Prof. Nelson Agapito Brandão Rios',NULL,NULL,NULL,2),(11,'Prof. Renato da Costa e Silva Rebelo Sampaio',NULL,NULL,NULL,2),(12,'Profa. Thiara Lorenna Bezerra da Silva Oliveira',NULL,NULL,NULL,1),(13,'Prof. Mário Rodrigues Gomes Meireles Filho',NULL,NULL,NULL,1),(14,'Profa. Ana Karolinne da Silva Brito',NULL,NULL,NULL,2),(15,'Prof. Bernardo Aurélio de Andrade Oliveira',NULL,NULL,NULL,2),(16,'Prof. Carlos Alberto Sousa Silveira',NULL,NULL,NULL,2),(17,'Prof. Ismael Mendes da Silva',NULL,NULL,NULL,2),(18,'Profa. Jane Karla de Oliveira Santos',NULL,NULL,NULL,2),(19,'Profa. Joelma Danniely Cavalcanti Meireles',NULL,NULL,NULL,2),(20,'Prof. Luiz Carlos Carvalho de Oliveira',NULL,NULL,NULL,2),(21,'Prof. Misael Costa Júnior',NULL,NULL,NULL,2),(22,'Prof. Vinicius Silva Gonçalvez',NULL,NULL,NULL,2),(23,'Prof. Francisco Honeidy Carvalho Azevedo',NULL,NULL,NULL,1),(24,'Prof. Artur Felipe Veloso',NULL,NULL,NULL,2),(25,'Prof. Francisco Nilson Rodrigues dos Santos',NULL,NULL,NULL,2),(26,'Prof. Lucas Neris',NULL,NULL,NULL,2),(27,'Profa. Mara Ramel de Sousa Silva',NULL,NULL,NULL,2),(28,'Profa. Maria Hellem',NULL,NULL,NULL,2),(29,'Prof. Rômullo Randell',NULL,NULL,NULL,2),(30,'Profa. Sanmanth do Nascimento Araújo',NULL,NULL,NULL,2),(31,'Prof. Tarcísio Franco',NULL,NULL,NULL,2),(32,'Profa. Ana Cristina Sousa Gramoza Vilarinho Santana',NULL,NULL,NULL,2),(33,'Profa. Anna Érika Pinheiro da Silva',NULL,NULL,NULL,2),(34,'Prof. Pedro Simão da Silva Azevedo',NULL,NULL,NULL,2),(35,'Profa. Thalyta Pereira Oliveira',NULL,NULL,NULL,2),(36,'Prof. Victor Augusto Araújo Barbosa',NULL,NULL,NULL,2);
/*!40000 ALTER TABLE `pessoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projeto_curso`
--

DROP TABLE IF EXISTS `projeto_curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projeto_curso` (
  `id_projeto` int NOT NULL,
  `id_curso` int NOT NULL,
  PRIMARY KEY (`id_projeto`,`id_curso`),
  KEY `id_curso` (`id_curso`),
  CONSTRAINT `projeto_curso_ibfk_1` FOREIGN KEY (`id_projeto`) REFERENCES `projeto_extensao` (`id_projeto`),
  CONSTRAINT `projeto_curso_ibfk_2` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id_curso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projeto_curso`
--

LOCK TABLES `projeto_curso` WRITE;
/*!40000 ALTER TABLE `projeto_curso` DISABLE KEYS */;
/*!40000 ALTER TABLE `projeto_curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projeto_custo`
--

DROP TABLE IF EXISTS `projeto_custo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projeto_custo` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `id_projeto` int DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `quantitativo` decimal(10,2) DEFAULT NULL,
  `valor_unitario` decimal(10,2) DEFAULT NULL,
  `justificativa` text,
  `realizado` int DEFAULT NULL,
  `tipo` int DEFAULT NULL,
  `fonte_recurso` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `id_projeto` (`id_projeto`),
  CONSTRAINT `projeto_custo_ibfk_1` FOREIGN KEY (`id_projeto`) REFERENCES `projeto_extensao` (`id_projeto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projeto_custo`
--

LOCK TABLES `projeto_custo` WRITE;
/*!40000 ALTER TABLE `projeto_custo` DISABLE KEYS */;
/*!40000 ALTER TABLE `projeto_custo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projeto_extensao`
--

DROP TABLE IF EXISTS `projeto_extensao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projeto_extensao` (
  `id_projeto` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `id_tipo_plano` int DEFAULT NULL,
  `coordenador_id` int DEFAULT NULL,
  `periodo_inicio` date DEFAULT NULL,
  `periodo_fim` date DEFAULT NULL,
  `carga_horaria_total` int DEFAULT NULL,
  `id_publico_alvo` int DEFAULT NULL,
  `objetivo` text,
  `metodologia` text,
  PRIMARY KEY (`id_projeto`),
  KEY `coordenador_id` (`coordenador_id`),
  KEY `id_tipo_plano` (`id_tipo_plano`),
  KEY `id_publico_alvo` (`id_publico_alvo`),
  CONSTRAINT `projeto_extensao_ibfk_1` FOREIGN KEY (`coordenador_id`) REFERENCES `pessoa` (`id_pessoa`),
  CONSTRAINT `projeto_extensao_ibfk_2` FOREIGN KEY (`id_tipo_plano`) REFERENCES `tipo_plano` (`id_tipo_plano`),
  CONSTRAINT `projeto_extensao_ibfk_3` FOREIGN KEY (`id_publico_alvo`) REFERENCES `publico_alvo` (`id_publico_alvo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projeto_extensao`
--

LOCK TABLES `projeto_extensao` WRITE;
/*!40000 ALTER TABLE `projeto_extensao` DISABLE KEYS */;
/*!40000 ALTER TABLE `projeto_extensao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projeto_instituicao`
--

DROP TABLE IF EXISTS `projeto_instituicao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projeto_instituicao` (
  `id_projeto` int NOT NULL,
  `id_instituicao` int NOT NULL,
  PRIMARY KEY (`id_projeto`,`id_instituicao`),
  KEY `id_instituicao` (`id_instituicao`),
  CONSTRAINT `projeto_instituicao_ibfk_1` FOREIGN KEY (`id_projeto`) REFERENCES `projeto_extensao` (`id_projeto`),
  CONSTRAINT `projeto_instituicao_ibfk_2` FOREIGN KEY (`id_instituicao`) REFERENCES `instituicao` (`id_instituicao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projeto_instituicao`
--

LOCK TABLES `projeto_instituicao` WRITE;
/*!40000 ALTER TABLE `projeto_instituicao` DISABLE KEYS */;
/*!40000 ALTER TABLE `projeto_instituicao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projeto_linhaprogramatica`
--

DROP TABLE IF EXISTS `projeto_linhaprogramatica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projeto_linhaprogramatica` (
  `id_projeto` int NOT NULL,
  `id_linha` int NOT NULL,
  PRIMARY KEY (`id_projeto`,`id_linha`),
  KEY `id_linha` (`id_linha`),
  CONSTRAINT `projeto_linhaprogramatica_ibfk_1` FOREIGN KEY (`id_projeto`) REFERENCES `projeto_extensao` (`id_projeto`),
  CONSTRAINT `projeto_linhaprogramatica_ibfk_2` FOREIGN KEY (`id_linha`) REFERENCES `linha_programatica` (`id_linha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projeto_linhaprogramatica`
--

LOCK TABLES `projeto_linhaprogramatica` WRITE;
/*!40000 ALTER TABLE `projeto_linhaprogramatica` DISABLE KEYS */;
/*!40000 ALTER TABLE `projeto_linhaprogramatica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projeto_local`
--

DROP TABLE IF EXISTS `projeto_local`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projeto_local` (
  `id_projeto` int NOT NULL,
  `id_local` int NOT NULL,
  PRIMARY KEY (`id_projeto`,`id_local`),
  KEY `id_local` (`id_local`),
  CONSTRAINT `projeto_local_ibfk_1` FOREIGN KEY (`id_projeto`) REFERENCES `projeto_extensao` (`id_projeto`),
  CONSTRAINT `projeto_local_ibfk_2` FOREIGN KEY (`id_local`) REFERENCES `local_execucao` (`id_local`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projeto_local`
--

LOCK TABLES `projeto_local` WRITE;
/*!40000 ALTER TABLE `projeto_local` DISABLE KEYS */;
/*!40000 ALTER TABLE `projeto_local` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projeto_pessoa`
--

DROP TABLE IF EXISTS `projeto_pessoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projeto_pessoa` (
  `id_projeto` int NOT NULL,
  `id_pessoa` int NOT NULL,
  `id_papel` int DEFAULT NULL,
  PRIMARY KEY (`id_projeto`,`id_pessoa`),
  KEY `id_pessoa` (`id_pessoa`),
  KEY `id_papel` (`id_papel`),
  CONSTRAINT `projeto_pessoa_ibfk_1` FOREIGN KEY (`id_projeto`) REFERENCES `projeto_extensao` (`id_projeto`),
  CONSTRAINT `projeto_pessoa_ibfk_2` FOREIGN KEY (`id_pessoa`) REFERENCES `pessoa` (`id_pessoa`),
  CONSTRAINT `projeto_pessoa_ibfk_3` FOREIGN KEY (`id_papel`) REFERENCES `papel_projeto` (`id_papel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projeto_pessoa`
--

LOCK TABLES `projeto_pessoa` WRITE;
/*!40000 ALTER TABLE `projeto_pessoa` DISABLE KEYS */;
/*!40000 ALTER TABLE `projeto_pessoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projeto_tipoacao`
--

DROP TABLE IF EXISTS `projeto_tipoacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projeto_tipoacao` (
  `id_projeto` int NOT NULL,
  `id_acao` int NOT NULL,
  PRIMARY KEY (`id_projeto`,`id_acao`),
  KEY `id_acao` (`id_acao`),
  CONSTRAINT `projeto_tipoacao_ibfk_1` FOREIGN KEY (`id_projeto`) REFERENCES `projeto_extensao` (`id_projeto`),
  CONSTRAINT `projeto_tipoacao_ibfk_2` FOREIGN KEY (`id_acao`) REFERENCES `tipo_acao` (`id_acao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projeto_tipoacao`
--

LOCK TABLES `projeto_tipoacao` WRITE;
/*!40000 ALTER TABLE `projeto_tipoacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `projeto_tipoacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publico_alvo`
--

DROP TABLE IF EXISTS `publico_alvo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publico_alvo` (
  `id_publico_alvo` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_publico_alvo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publico_alvo`
--

LOCK TABLES `publico_alvo` WRITE;
/*!40000 ALTER TABLE `publico_alvo` DISABLE KEYS */;
INSERT INTO `publico_alvo` VALUES (1,'Interno'),(2,'Externo'),(3,'Ambos');
/*!40000 ALTER TABLE `publico_alvo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_acao`
--

DROP TABLE IF EXISTS `tipo_acao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_acao` (
  `id_acao` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id_acao`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_acao`
--

LOCK TABLES `tipo_acao` WRITE;
/*!40000 ALTER TABLE `tipo_acao` DISABLE KEYS */;
INSERT INTO `tipo_acao` VALUES (1,'Programa'),(2,'Projeto'),(3,'Curso'),(4,'Evento'),(5,'Prestação de Serviço'),(6,'Produção e Publicação'),(7,'Incubadora'),(8,'Empresa Júnior'),(9,'Observatório'),(10,'Clínica Escola / Escritório Modelo'),(11,'Laboratório de Práticas Extensionistas');
/*!40000 ALTER TABLE `tipo_acao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_instituicao`
--

DROP TABLE IF EXISTS `tipo_instituicao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_instituicao` (
  `id_tipo_instituicao` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_instituicao`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_instituicao`
--

LOCK TABLES `tipo_instituicao` WRITE;
/*!40000 ALTER TABLE `tipo_instituicao` DISABLE KEYS */;
INSERT INTO `tipo_instituicao` VALUES (1,'Pública'),(2,'Privada');
/*!40000 ALTER TABLE `tipo_instituicao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_pessoa`
--

DROP TABLE IF EXISTS `tipo_pessoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_pessoa` (
  `id_tipo_pessoa` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_pessoa`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_pessoa`
--

LOCK TABLES `tipo_pessoa` WRITE;
/*!40000 ALTER TABLE `tipo_pessoa` DISABLE KEYS */;
INSERT INTO `tipo_pessoa` VALUES (1,'Coordenador'),(2,'Professor'),(3,'Técnico');
/*!40000 ALTER TABLE `tipo_pessoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_plano`
--

DROP TABLE IF EXISTS `tipo_plano`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_plano` (
  `id_tipo_plano` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_plano`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_plano`
--

LOCK TABLES `tipo_plano` WRITE;
/*!40000 ALTER TABLE `tipo_plano` DISABLE KEYS */;
INSERT INTO `tipo_plano` VALUES (1,'Curricular'),(2,'Extracurricular');
/*!40000 ALTER TABLE `tipo_plano` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `usuario` (`usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'admin','admin123','admin','2026-03-20 12:13:49');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-22 17:36:33
