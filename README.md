Este projeto foi criado para resolver o desafio de Backend Plano da Zé Delivery. 


Repositório do desafio: https://github.com/ab-inbev-ze-company/ze-code-challenges/blob/master/backend_pt.md

Este é o contaúdo do desafio:

# Desafio de Backend
> *This file is also available in english [here](backend.md).*

No Zé, encontramos o melhor parceiro para entregar as bebidas aos nossos consumidores, oferecendo o melhor e mais rápido serviço de entrega de bebidas.
Para isso nossos computadores lidam o tempo todo com objetos [GIS](https://en.wikipedia.org/wiki/Geographic_information_system).

Quando programamos, nós tentamos seguir uma gama de melhores práticas e padrões de projeto (que você pode ler sobre em livros como Código Limpo, Arquitetura Limpa, O Programador Pragmático, Domain-Driven Design, Microservice Patterns, etc...).
Já que escrever **um bom código é inegociável** no nosso dia a dia, nós esperamos que as pessoas que queiram entrar no nosso time pensem da mesma maneira. Este teste foi criado para encontrar esses programadores.

## 1. O que queremos que você faça

Nós esperamos que você desenvolva um serviço que disponibilize uma API REST ou GraphQL que implemente essas funcionalidades e requisitos técnicos:

### 1.1. Criar um parceiro:
Salvar no banco de dados **todas** as seguintes informações representadas por este JSON junto com as regras subsequentes:
```json
{
  "id": 1, 
  "tradingName": "Adega da Cerveja - Pinheiros",
  "ownerName": "Zé da Silva",
  "document": "1432132123891/0001",
  "coverageArea": { 
    "type": "MultiPolygon", 
    "coordinates": [
      [[[30, 20], [45, 40], [10, 40], [30, 20]]], 
      [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
    ]
  },
  "address": { 
    "type": "Point",
    "coordinates": [-46.57421, -21.785741]
  }
}
```

1. O campo `address` (endereço em inglês) segue o formato `GeoJSON Point` (https://en.wikipedia.org/wiki/GeoJSON);
2. o campo `coverageArea` (área de cobertura em inglês) segue o formato `GeoJSON MultiPolygon` (https://en.wikipedia.org/wiki/GeoJSON);
3. O campo `document` deve ser único entre os parceiros;
4. O campo `id` deve ser único entre os parceiros, mas não necessariamente um número inteiro;

Você pode usar esse arquivo [JSON](files/pdvs.json) com centenas de informações de parceiros que geramos para você testar o seu serviço — **não** esperamos que estes parceiros estejam pré carregados em sua base de dados.

### 1.2. Carregar parceiro pelo `id`:
Retornar um parceiro específico baseado no seu campo `id` com todos os campos apresentados acima.

### 1.3. Buscar parceiro:
Dada uma localização pelo usuário da API (coordenadas `long` e `lat`), procure o parceiro que esteja **mais próximo** e **que cuja área de cobertura inclua** a localização.

### 1.4. Requerimentos Técnicos:
* Você tem liberdade para escolher a linguagem de programação e o mecanismo de base de dados da sua preferência;
* O seu projeto deve ser **multi-plataforma**;
* Você deve escrever um arquivo de documentação (`README.md`) explicando como executar o seu serviço **localmente** e como colocá-lo em produção (*foque na simplicidade e não se esqueça que iremos testar seu serviço por nossa própria conta, sem qualquer assistência sua*).

# Fim do desafio

# Detalhes da minha implementação

Foi criado um serviço backend que disponibiliza uma API REST para gerenciar parceiros utilizando o Spring Boot para agilizar o desenvolvimento e o MongoDB como banco de dados, pois ele suporta facilmente tipos de dados GeoJSON.


## <img align="center" alt="Alan-CSS" height="30" width="40" src="https://github.com/tandpfun/skill-icons/blob/main/icons/Spring-Dark.svg"> Backend

## Requisitos
- Java 11 ou superior
- MongoDB
- MongoDB Compass
- Spring Boot
- Dependência Spring Data MongoDB
- Dependência Spring Web

## Criando o banco de dados no MongoDB Compass

Abra o MongoDB Compass:

- Inicie o MongoDB Compass e conecte-se ao seu servidor MongoDB.
Criar uma Nova Database:

- No painel de navegação à esquerda, clique em "Create Database".

- Na janela que aparece, forneça um nome para a sua database: partners_db.
- Especifique um nome para a coleção inicial: partners.
Clique em "Create Database".

No MongoDB Compass, você pode executar consultas diretamente na interface para listar os documentos da sua coleção. Aqui estão os passos para executar uma query que lista todos os partners na coleção partners:

Passos para Executar uma Query no MongoDB Compass
Abra o MongoDB Compass e conecte-se ao seu servidor MongoDB.

- Navegue até a database onde a sua coleção partners está localizada:

- No painel à esquerda, expanda o nome do seu servidor para ver as databases.
- Clique na database apropriada (por exemplo, partners_db).
- Selecione a coleção partners:
- Na database selecionada, clique na coleção partners.
- Abrir a aba de consultas (Queries):
- Na barra superior, clique na aba "Documents" para visualizar os documentos da coleção.
- Executar a Query:
- Na aba "Documents", você verá um campo de texto chamado "Filter". Este campo é onde você pode inserir a sua query.
- Para listar todos os documentos, basta inserir um objeto vazio {} no campo de "Filter" e clicar no botão "Find".

![Mongo](https://github.com/DaviFarias7/GeoJson-Partner-Location/assets/86566715/de7299a4-65b2-4275-ba39-15a51e6b2156)

## Executando o Serviço Localmente

1. Clone o repositório
2. Navegue até o diretório do projeto
3. Execute `./mvnw spring-boot:run`

## Endpoints

- `POST /partners` - Cria um novo parceiro
- `GET /partners/{id}` - Retorna um parceiro pelo ID
- `GET /partners/search?lon={lon}&lat={lat}` - Busca o parceiro mais próximo que cobre a área especificada
- `GET /partners/search` - Retorna uma lista com todos os parceiros

OBS: Endpoints acessíveis via Swagger(Suba a aplicação e acesse este link): http://localhost:8080/swagger-ui/index.html

![Swagger](https://github.com/DaviFarias7/GeoJson-Partner-Location/assets/86566715/2ec366b7-5bd4-4a72-8ef8-f360113587bb)

## Configuração de Produção

Para colocar em produção, você pode usar qualquer plataforma de sua escolha. Certifique-se de configurar corretamente as variáveis de ambiente para o MongoDB.

# <img align="center" alt="Alan-CSS" height="30" width="40" src="https://github.com/devicons/devicon/blob/master/icons/react/react-original.svg"> Frontend

Criei o Frontend com React utilizando a biblioteca React Leaflet para renderizar a localização dos parceiros no mapa.

## Requisitos
- NodeJs 10 ou superior
- React 18.3.1
- React Leaflet: 4.2.1 ou superior
- React Select: 5.8.0 ou superior

## Executando o Serviço Localmente

1. Clone o repositório
2. Navegue até o diretório do projeto
3. Execute `npm install`
4. Execute `npm start`

![front](https://github.com/DaviFarias7/GeoJson-Partner-Location/assets/86566715/f6e7ce9c-89d2-4266-999e-211372c68499)


