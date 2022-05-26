# Habilidades

![Exemplo app front](assets/front-example.png)

O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️
<br>
Obs: O frontEnd foi desenvolvido e disponibilizado pela Trybe, o projeto visava a implementação do backend;

O projeto visava, construir **um back-end dockerizado utilizando modelagem de dados através do equelize**. 

 - Realizar a dockerização dos apps, network, volume e compose;
 - Modelar dados com **MySQL** através do **Sequelize**;
 - Criar e associar tabelas usando `models` do `sequelize`;
 - Construir uma **API REST** com endpoints para consumir os models criados;
 - Fazer um `CRUD` utilizando `ORM`;

####  Chave JWT e criptografia de senhas:

  ⚠️ A biblioteca utilizada para criptografar a senha no banco de dados é a `bcryptjs` [bcryptjs npm](https://www.npmjs.com/package/bcryptjs). 

#### Testes de cobertura
 utilizando `mocha`, `chai` e `sinon`, na pasta `app/backend/src/tests/`;

### Dicas
- Você pode **subir ou descer uma aplicação do compose**, utilizando os scripts `compose:refresh`, `compose:down`;
- Você pode **instalar suas aplicações (front e back)** rodando o comando `npm run install:apps`;


