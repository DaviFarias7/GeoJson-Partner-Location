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
Abaixo, você pode ver como estes parceiros são representados em um mapa:
![parceiros em um mapa](files/images/pdvs.png)

### 1.2. Carregar parceiro pelo `id`:
Retornar um parceiro específico baseado no seu campo `id` com todos os campos apresentados acima.

### 1.3. Buscar parceiro:
Dada uma localização pelo usuário da API (coordenadas `long` e `lat`), procure o parceiro que esteja **mais próximo** e **que cuja área de cobertura inclua** a localização.

### 1.4. Requerimentos Técnicos:
* Você tem liberdade para escolher a linguagem de programação e o mecanismo de base de dados da sua preferência;
* O seu projeto deve ser **multi-plataforma**;
* Você deve escrever um arquivo de documentação (`README.md`) explicando como executar o seu serviço **localmente** e como colocá-lo em produção (*foque na simplicidade e não se esqueça que iremos testar seu serviço por nossa própria conta, sem qualquer assistência sua*).

## Método de Avaliação

Vamos avaliar seu teste baseado em uma série de [atributos de qualidade](https://en.wikipedia.org/wiki/List_of_system_quality_attributes).
Consideramos corretude um atributo essencial, desclassificando seu teste caso o mesmo não esteja 100% de acordo.
Os outros, como não podem ser avaliados de maneira objetiva, não podem desclassifica-lo sozinhos.
Esses são os atributos de qualidade que esperamos que você atenda:
- **Corretude:** O seu código deve seguir **todos** os requerimentos apresentados no item [1.](#1-o-que-queremos-que-você-faça);
- **Performance:** Quanto mais parceiros na base de dados e mais rápido você conseguir buscar, melhor;
- **Testabilidade:** Quão testado e quão fácil é adicionar novos testes ao seu código;
- **Manutenibilidade:** Quão fácil é adicionar novas funcionalidades no seu código;
- **Separação de conceitos:** (https://en.wikipedia.org/wiki/Separation_of_concerns)

## Como Entregar

- Coloque seu código em um **repositório privado no Github** e adicione o @ze-engineering-code-challenge como um de seus colaboradores.


  Essa conta no Github (@ze-engineering-code-challenge) é utilizada exclusivamente pelos engenheiros do Zé para baixar o seu código e revisá-lo.
- **Após finalizar o desafio, por favor submeta as informações por meio deste formulário:**
  https://docs.google.com/forms/d/e/1FAIpQLSePVCWxsHZHoRqJY9-XFJHuL7iOjO00sfhZksLBmDbR0KuoLg/viewform

# Fim do desafio

# Detalhes da minha implementação

Foi criado um serviço backend que disponibiliza uma API REST para gerenciar parceiros utilizando o Spring Boot para agilizar o desenvolvimento e o MongoDB como banco de dados, pois ele suporta facilmente tipos de dados GeoJSON.


## Backend

## Requisitos
- Java 11 ou superior
- MongoDB
- Spring Boot
- Dependência Spring Data MongoDB
- Dependência Spring Web

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

## Configuração de Produção

Para colocar em produção, você pode usar qualquer plataforma de sua escolha. Certifique-se de configurar corretamente as variáveis de ambiente para o MongoDB.

# Frontend

## Requisitos
- NodeJs 10 ou superior
- React 18.3.1
- react-leaflet": 4.2.1 ou superior
- eact-select": 5.8.0 ou superior

## Executando o Serviço Localmente

1. Clone o repositório
2. Navegue até o diretório do projeto
3. Execute `npm install`
4. Execute `npm start`


