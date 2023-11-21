-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bd_social
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bd_social
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bd_social` DEFAULT CHARACTER SET utf8 ;
USE `bd_social` ;

-- -----------------------------------------------------
-- Table `bd_social`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_social`.`usuario` (
  `carnet` INT NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `apellido` VARCHAR(100) NOT NULL,
  `contrasena` VARCHAR(255) NOT NULL,
  `correo` VARCHAR(200) NOT NULL,
  UNIQUE INDEX `carnet_UNIQUE` (`carnet` ASC) INVISIBLE,
  PRIMARY KEY (`carnet`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_social`.`curso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_social`.`curso` (
  `idcurso` BINARY(16) NOT NULL,
  `nombre` VARCHAR(125) NOT NULL,
  `creditos` INT NOT NULL,
  PRIMARY KEY (`idcurso`),
  UNIQUE INDEX `idcurso_UNIQUE` (`idcurso` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_social`.`catedratico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_social`.`catedratico` (
  `idcatedratico` BINARY(16) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `apellido` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idcatedratico`),
  UNIQUE INDEX `idcatedratico_UNIQUE` (`idcatedratico` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_social`.`tipopublicacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_social`.`tipopublicacion` (
  `idtipopublicacion` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idtipopublicacion`),
  UNIQUE INDEX `idtipopublicacion_UNIQUE` (`idtipopublicacion` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_social`.`publicacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_social`.`publicacion` (
  `idpublicacion` BINARY(16) NOT NULL,
  `mensaje` LONGTEXT NOT NULL,
  `fecha` DATETIME NOT NULL,
  `titulo` VARCHAR(100) NOT NULL,
  `acercade` BINARY(16) NOT NULL,
  `usuario_carnet` INT NOT NULL,
  `tipopublicacion_idtipopublicacion` INT NOT NULL,
  UNIQUE INDEX `idpublicacion_UNIQUE` (`idpublicacion` ASC) VISIBLE,
  PRIMARY KEY (`idpublicacion`, `usuario_carnet`, `tipopublicacion_idtipopublicacion`),
  INDEX `fk_publicacion_usuario1_idx` (`usuario_carnet` ASC) VISIBLE,
  INDEX `fk_publicacion_tipopublicacion1_idx` (`tipopublicacion_idtipopublicacion` ASC) VISIBLE,
  CONSTRAINT `fk_publicacion_usuario1`
    FOREIGN KEY (`usuario_carnet`)
    REFERENCES `bd_social`.`usuario` (`carnet`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_publicacion_tipopublicacion1`
    FOREIGN KEY (`tipopublicacion_idtipopublicacion`)
    REFERENCES `bd_social`.`tipopublicacion` (`idtipopublicacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_social`.`comentario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_social`.`comentario` (
  `idcomentario` BINARY(16) NOT NULL,
  `contenido` LONGTEXT NOT NULL,
  `fecha` DATETIME NOT NULL,
  `usuario_carnet` INT NOT NULL,
  `publicacion_idpublicacion` BINARY(16) NOT NULL,
  `publicacion_usuario_carnet` INT NOT NULL,
  PRIMARY KEY (`idcomentario`, `usuario_carnet`, `publicacion_idpublicacion`, `publicacion_usuario_carnet`),
  UNIQUE INDEX `idcomentario_UNIQUE` (`idcomentario` ASC) VISIBLE,
  INDEX `fk_comentario_usuario1_idx` (`usuario_carnet` ASC) VISIBLE,
  INDEX `fk_comentario_publicacion1_idx` (`publicacion_idpublicacion` ASC, `publicacion_usuario_carnet` ASC) VISIBLE,
  CONSTRAINT `fk_comentario_usuario1`
    FOREIGN KEY (`usuario_carnet`)
    REFERENCES `bd_social`.`usuario` (`carnet`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comentario_publicacion1`
    FOREIGN KEY (`publicacion_idpublicacion` , `publicacion_usuario_carnet`)
    REFERENCES `bd_social`.`publicacion` (`idpublicacion` , `usuario_carnet`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_social`.`curso_has_catedratico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_social`.`curso_has_catedratico` (
  `curso_idcurso` BINARY(16) NOT NULL,
  `catedratico_idcatedratico` BINARY(16) NOT NULL,
  PRIMARY KEY (`curso_idcurso`, `catedratico_idcatedratico`),
  INDEX `fk_curso_has_catedratico_catedratico1_idx` (`catedratico_idcatedratico` ASC) VISIBLE,
  INDEX `fk_curso_has_catedratico_curso1_idx` (`curso_idcurso` ASC) VISIBLE,
  CONSTRAINT `fk_curso_has_catedratico_curso1`
    FOREIGN KEY (`curso_idcurso`)
    REFERENCES `bd_social`.`curso` (`idcurso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_curso_has_catedratico_catedratico1`
    FOREIGN KEY (`catedratico_idcatedratico`)
    REFERENCES `bd_social`.`catedratico` (`idcatedratico`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_social`.`usuario_has_curso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_social`.`usuario_has_curso` (
  `usuario_carnet` INT NOT NULL,
  `curso_idcurso` BINARY(16) NOT NULL,
  PRIMARY KEY (`usuario_carnet`, `curso_idcurso`),
  INDEX `fk_usuario_has_curso_curso1_idx` (`curso_idcurso` ASC) VISIBLE,
  INDEX `fk_usuario_has_curso_usuario1_idx` (`usuario_carnet` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_has_curso_usuario1`
    FOREIGN KEY (`usuario_carnet`)
    REFERENCES `bd_social`.`usuario` (`carnet`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_curso_curso1`
    FOREIGN KEY (`curso_idcurso`)
    REFERENCES `bd_social`.`curso` (`idcurso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
