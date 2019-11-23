-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: Atletica
-- ------------------------------------------------------
-- Server version	5.7.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Bandeira`
--

DROP TABLE IF EXISTS `Bandeira`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Bandeira` (
  `cod_item` int(10) unsigned NOT NULL,
  `cod_bandeira` int(10) unsigned NOT NULL,
  `tamanho` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`cod_item`),
  UNIQUE KEY `PKbandeira` (`cod_bandeira`),
  CONSTRAINT `Bandeira_ibfk_1` FOREIGN KEY (`cod_item`) REFERENCES `Itens` (`cod_item`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bandeira`
--

LOCK TABLES `Bandeira` WRITE;
/*!40000 ALTER TABLE `Bandeira` DISABLE KEYS */;
/*!40000 ALTER TABLE `Bandeira` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Bola`
--

DROP TABLE IF EXISTS `Bola`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Bola` (
  `cod_item` int(10) unsigned NOT NULL,
  `cod_bola` int(10) unsigned NOT NULL,
  `marca` varchar(20) DEFAULT NULL,
  `cod_esporte` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`cod_item`),
  UNIQUE KEY `PKbola` (`cod_bola`),
  KEY `FK_Bola_codEsporte` (`cod_esporte`),
  CONSTRAINT `Bola_ibfk_1` FOREIGN KEY (`cod_item`) REFERENCES `Itens` (`cod_item`),
  CONSTRAINT `FK_Bola_codEsporte` FOREIGN KEY (`cod_esporte`) REFERENCES `Esportes` (`cod_esporte`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bola`
--

LOCK TABLES `Bola` WRITE;
/*!40000 ALTER TABLE `Bola` DISABLE KEYS */;
INSERT INTO `Bola` VALUES (1,1,'Penalty',2),(2,2,'Mikasa',4),(3,3,'Nike',1);
/*!40000 ALTER TABLE `Bola` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Camisa`
--

DROP TABLE IF EXISTS `Camisa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Camisa` (
  `cod_item` int(10) unsigned NOT NULL,
  `cod_camisa` int(10) unsigned NOT NULL,
  `tipo` enum('regata','manga curta','manga longa') DEFAULT NULL,
  `tamanho` enum('PP','P','M','G','GG','EG','XG') DEFAULT NULL,
  `numero` int(10) unsigned DEFAULT NULL,
  `cod_esporte` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`cod_item`),
  UNIQUE KEY `PKcamisa` (`cod_camisa`),
  KEY `FK_Camisa_codEsporte` (`cod_esporte`),
  CONSTRAINT `Camisa_ibfk_1` FOREIGN KEY (`cod_item`) REFERENCES `Itens` (`cod_item`),
  CONSTRAINT `FK_Camisa_codEsporte` FOREIGN KEY (`cod_esporte`) REFERENCES `Esportes` (`cod_esporte`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Camisa`
--

LOCK TABLES `Camisa` WRITE;
/*!40000 ALTER TABLE `Camisa` DISABLE KEYS */;
/*!40000 ALTER TABLE `Camisa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Esportes`
--

DROP TABLE IF EXISTS `Esportes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Esportes` (
  `cod_esporte` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `descricao` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`cod_esporte`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Esportes`
--

LOCK TABLES `Esportes` WRITE;
/*!40000 ALTER TABLE `Esportes` DISABLE KEYS */;
INSERT INTO `Esportes` VALUES (1,'Basquete'),(2,'Futsal'),(3,'Futebol de Campo'),(4,'Vôlei');
/*!40000 ALTER TABLE `Esportes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Itens`
--

DROP TABLE IF EXISTS `Itens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Itens` (
  `cod_item` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `valor` int(10) unsigned DEFAULT NULL,
  `tipo` enum('bola','camisa','bandeira','outros') DEFAULT NULL,
  PRIMARY KEY (`cod_item`),
  UNIQUE KEY `cod_item` (`cod_item`),
  UNIQUE KEY `PKitem` (`cod_item`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Itens`
--

LOCK TABLES `Itens` WRITE;
/*!40000 ALTER TABLE `Itens` DISABLE KEYS */;
INSERT INTO `Itens` VALUES (1,50,'bola'),(2,70,'bola'),(3,50,'bola');
/*!40000 ALTER TABLE `Itens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Membro_Gestor`
--

DROP TABLE IF EXISTS `Membro_Gestor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Membro_Gestor` (
  `cod_membro` int(10) unsigned NOT NULL,
  `login` varchar(20) DEFAULT NULL,
  `senha` varchar(21844) DEFAULT NULL,
  PRIMARY KEY (`cod_membro`),
  CONSTRAINT `Membros_Gestor_FK` FOREIGN KEY (`cod_membro`) REFERENCES `Membros` (`cod_membro`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Membro_Gestor`
--

LOCK TABLES `Membro_Gestor` WRITE;
/*!40000 ALTER TABLE `Membro_Gestor` DISABLE KEYS */;
/*!40000 ALTER TABLE `Membro_Gestor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Membros`
--

DROP TABLE IF EXISTS `Membros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Membros` (
  `cod_membro` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `matricula` int(10) unsigned NOT NULL,
  `cpf` int(10) unsigned NOT NULL,
  `rg` int(10) unsigned NOT NULL,
  `nome` varchar(45) DEFAULT NULL,
  `curso` varchar(40) DEFAULT NULL,
  `cargo` varchar(25) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `endereco` varchar(60) DEFAULT NULL,
  `status_matricula` enum('matriculado','egresso','trancado') DEFAULT NULL,
  PRIMARY KEY (`cod_membro`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Membros`
--

LOCK TABLES `Membros` WRITE;
/*!40000 ALTER TABLE `Membros` DISABLE KEYS */;
INSERT INTO `Membros` VALUES (1,12312312,2131323,123123123,'ASD Belmonte','Ciencia da Computação','ATLETA','222222','Rua Joao','matriculado'),(2,768786,33333333,768678567,'dsfsdf','Ciencia da Computação','ATLETA','981342747','Rua Joao','egresso');
/*!40000 ALTER TABLE `Membros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Outros`
--

DROP TABLE IF EXISTS `Outros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Outros` (
  `cod_item` int(10) unsigned NOT NULL,
  `cod_outros` int(10) unsigned NOT NULL,
  PRIMARY KEY (`cod_item`),
  UNIQUE KEY `PKoutros` (`cod_outros`),
  CONSTRAINT `Outros_ibfk_1` FOREIGN KEY (`cod_item`) REFERENCES `Itens` (`cod_item`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Outros`
--

LOCK TABLES `Outros` WRITE;
/*!40000 ALTER TABLE `Outros` DISABLE KEYS */;
/*!40000 ALTER TABLE `Outros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Times`
--

DROP TABLE IF EXISTS `Times`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Times` (
  `cod_time` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `descricao` varchar(45) DEFAULT NULL,
  `cod_esporte` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`cod_time`),
  KEY `FK_Times_codEsporte` (`cod_esporte`),
  CONSTRAINT `FK_Times_codEsporte` FOREIGN KEY (`cod_esporte`) REFERENCES `Esportes` (`cod_esporte`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Times`
--

LOCK TABLES `Times` WRITE;
/*!40000 ALTER TABLE `Times` DISABLE KEYS */;
/*!40000 ALTER TABLE `Times` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Times_Membros_Possui`
--

DROP TABLE IF EXISTS `Times_Membros_Possui`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Times_Membros_Possui` (
  `cod_time` int(10) unsigned NOT NULL,
  `cod_membro` int(10) unsigned NOT NULL,
  PRIMARY KEY (`cod_time`,`cod_membro`),
  KEY `FK_Times_Membros_Possui3` (`cod_membro`),
  CONSTRAINT `FK_Times_Membros_Possui2` FOREIGN KEY (`cod_time`) REFERENCES `Times` (`cod_time`),
  CONSTRAINT `FK_Times_Membros_Possui3` FOREIGN KEY (`cod_membro`) REFERENCES `Membros` (`cod_membro`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Times_Membros_Possui`
--

LOCK TABLES `Times_Membros_Possui` WRITE;
/*!40000 ALTER TABLE `Times_Membros_Possui` DISABLE KEYS */;
/*!40000 ALTER TABLE `Times_Membros_Possui` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Torneios`
--

DROP TABLE IF EXISTS `Torneios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Torneios` (
  `cod_torneio` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `descricao` varchar(500) DEFAULT NULL,
  `locao_torneio` varchar(45) DEFAULT NULL,
  `data_inicio` date DEFAULT NULL,
  `data_fim` date DEFAULT NULL,
  `taxa_inscricao` int(10) unsigned DEFAULT NULL,
  `status_taxa` enum('pago','nao pago') DEFAULT NULL,
  `cod_esporte` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`cod_torneio`),
  KEY `FK_Torneios_codEsporte` (`cod_esporte`),
  CONSTRAINT `FK_Torneios_codEsporte` FOREIGN KEY (`cod_esporte`) REFERENCES `Esportes` (`cod_esporte`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Torneios`
--

LOCK TABLES `Torneios` WRITE;
/*!40000 ALTER TABLE `Torneios` DISABLE KEYS */;
/*!40000 ALTER TABLE `Torneios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Torneios_Times_Participa`
--

DROP TABLE IF EXISTS `Torneios_Times_Participa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Torneios_Times_Participa` (
  `cod_torneio` int(10) unsigned NOT NULL,
  `cod_time` int(10) unsigned NOT NULL,
  PRIMARY KEY (`cod_torneio`,`cod_time`),
  KEY `FK_Torneios_Times_Participa3` (`cod_time`),
  CONSTRAINT `FK_Torneios_Times_Participa2` FOREIGN KEY (`cod_torneio`) REFERENCES `Torneios` (`cod_torneio`),
  CONSTRAINT `FK_Torneios_Times_Participa3` FOREIGN KEY (`cod_time`) REFERENCES `Times` (`cod_time`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Torneios_Times_Participa`
--

LOCK TABLES `Torneios_Times_Participa` WRITE;
/*!40000 ALTER TABLE `Torneios_Times_Participa` DISABLE KEYS */;
/*!40000 ALTER TABLE `Torneios_Times_Participa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Treinos`
--

DROP TABLE IF EXISTS `Treinos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Treinos` (
  `cod_treino` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `data_treino` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `local_treino` varchar(45) DEFAULT NULL,
  `cod_esporte` int(10) unsigned NOT NULL,
  PRIMARY KEY (`cod_treino`),
  KEY `FK_Treinos_codEsporte` (`cod_esporte`),
  CONSTRAINT `FK_Treinos_codEsporte` FOREIGN KEY (`cod_esporte`) REFERENCES `Esportes` (`cod_esporte`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Treinos`
--

LOCK TABLES `Treinos` WRITE;
/*!40000 ALTER TABLE `Treinos` DISABLE KEYS */;
/*!40000 ALTER TABLE `Treinos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Treinos_Membros_Participa`
--

DROP TABLE IF EXISTS `Treinos_Membros_Participa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Treinos_Membros_Participa` (
  `cod_treino` int(10) unsigned NOT NULL,
  `cod_membro` int(10) unsigned NOT NULL,
  PRIMARY KEY (`cod_treino`,`cod_membro`),
  KEY `FK_Treinos_Membros_Participa3` (`cod_membro`),
  CONSTRAINT `FK_Treinos_Membros_Participa2` FOREIGN KEY (`cod_treino`) REFERENCES `Treinos` (`cod_treino`),
  CONSTRAINT `FK_Treinos_Membros_Participa3` FOREIGN KEY (`cod_membro`) REFERENCES `Membros` (`cod_membro`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Treinos_Membros_Participa`
--

LOCK TABLES `Treinos_Membros_Participa` WRITE;
/*!40000 ALTER TABLE `Treinos_Membros_Participa` DISABLE KEYS */;
/*!40000 ALTER TABLE `Treinos_Membros_Participa` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-23 13:31:30
