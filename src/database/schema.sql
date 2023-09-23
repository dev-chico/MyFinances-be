CREATE DATABASE myfinances;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp;";

CREATE TABLE IF NOT EXISTS users (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  document VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL
);


CREATE TABLE IF NOT EXISTS investments (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  investmentType VARCHAR(20) NOT NULL,
  rescue_time INTEGER NOT NULL,
  yield NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS accounts (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  numero VARCHAR(10) UNIQUE NOT NULL,
  saldo NUMERIC NOT NULL,
  fk_userId UUID,
  fk_investmentId UUID,
  FOREIGN KEY (fk_userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (fk_investmentId) REFERENCES investments(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS movements (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  movementType VARCHAR(100),
  movementDate DATE,
  movementValue NUMERIC,
  fk_accountId UUID,
  FOREIGN KEY (fk_accountId) REFERENCES accounts (id) ON DELETE CASCADE
);

INSERT INTO investments (investmentType, rescue_time, yield)
VALUES
('Tesouro Pré-Fixado', 60, 102),
('Tesouro Selic', 120, 105),
('Tesouro IPCA+', 180, 108),
('CDB & LC', 210, 111),
('LCI & LCA', 240, 115);
