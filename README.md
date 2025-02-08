# 🤱🏻 Projeto Social - Comunidade para Mulheres
___

## 🏆 Nº do Squad: 12
## 👥 Integrantes:
1. Elzilane Barrto
2. Hirislayne Batista Ramos dos Santos
3. Isabela Castro

___
   
## Sobre o Projeto 
O projeto tem como objetivo desenvolver uma página web voltada para mulheres, 
proporcionando um espaço seguro para discussões, compartilhamento de experiências e suporte mútuo.

## Problema Identificado
Muitas mulheres encontram dificuldades em acessar um ambiente acolhedor para compartilhar desafios da gravidez, trocar 
experiências sobre a maternidade, encontrar dicas e buscar apoio. Além disso, a falta de espaços confiáveis para discutir 
temas como carreira, saúde e bem-estar dificulta a construção de redes de suporte.

## Solução Proposta:
Para atender a essa necessidade, criamos uma comunidade digital interativa, onde as usuárias podem:
- Criar e visualizar postagens sobre temas relevantes.
- Comentar e trocar experiências em cada post.
- Interagir por meio de curtidas, destacando os conteúdos mais relevantes.
- Filtrar publicações por mais curtidas e mais comentadas, facilitando o acesso às discussões mais populares.

Além disso, buscamos criar um espaço informativo com conteúdos sobre cuidados na gestação, dicas de maternidade e 
orientações práticas para o dia a dia com o bebê, ajudando as usuárias a se sentirem ouvidas, seguras e preparadas 
para os desafios dessa fase tão especial. ❤️
___

## Tecnologias Utilizadas
- Frontend: HTML, CSS e Bootstrap
- Banco de Dados: MySQL (modelado no BrModelo)

## Modelagem do Banco de Dados
A estrutura do banco de dados foi projetada para gerenciar a comunidade, permitindo postagens, comentários, curtidas, interações e categorização. A modelagem inclui as seguintes entidades:
- Usuário: Responsável por criar postagens e interagir na plataforma.
- Postagem: Representa um post criado por um usuário.
- Comentário: Permite que os usuários interajam com os posts.
- Curtida: Registro de interações positivas nos posts.
- Categoria: Permite classificar os posts por temas.

Relacionamentos:

1️⃣ Usuário → Postagem
- Um usuário pode criar várias postagens ou nenhuma → (0,N)
- Cada postagem pertence a um único usuário → (1,1)
  
2️⃣ Usuário → Comentário
- Um usuário pode fazer vários comentários ou nenhum → (0,N)
- Cada comentário pertence a um único usuário → (1,1)

3️⃣ Usuário → Curtida
- Um usuário pode curtir várias postagens ou nenhuma → (0,N)
- Cada curtida pertence a um único usuário → (1,1)

4️⃣ Postagem → Comentário
- Uma postagem pode ter vários comentários ou nenhum → (0,N)
- Cada comentário pertence a uma única postagem → (1,1)

5️⃣ Postagem → Curtida
- Uma postagem pode receber várias curtidas ou nenhuma → (0,N)
- Cada curtida pertence a uma única postagem (só existe uma unica vez, por postagem) → (1,1)

6️⃣ Categoria → Postagem (Opcional)
- Uma categoria pode conter várias postagens ou nenhuma → (0,N)
- Cada postagem pode pertencer a uma única categoria → (0,1) (opcional, pois pode não ter categoria)

Modelo Conceitual:
![image](https://github.com/user-attachments/assets/3d600eac-37ea-4f72-9a14-2175c1c9eb8b)

___

## Questionário

1 - Considerando o desafio escolhido, qual é o problema a ser resolvido e que será contemplado com o projeto final?  
*Criar um espaço digital seguro e acessível para que mulheres possam compartilhar experiências e obter apoio mútuo.*

2 - Qual o público-alvo? A solução poderá ser aplicada a todos, sem restrição de idade ou grau de escolaridade, por exemplo?  
*O público-alvo são mulheres de todas as idades, principalmente aquelas que buscam apoio em temas como maternidade, saúde, carreira e bem-estar.*

3 - O problema foi escolhido com base em quais dados oficiais? Como vocês identificaram que esse realmente é um problema para o público-alvo? Indique as referências usadas, justificando a sua escolha.  

4 - Como esse problema afeta o público-alvo? 
*A falta de um espaço seguro pode gerar isolamento social, insegurança emocional, dificuldades na busca por apoio e informação, e até mesmo doenças mentais, como a depressão pós-parto.*

5 - Qual o cronograma das atividades?  

6 - Como será feita a distribuição das atividades entre os integrantes do squad para essa primeira entrega?

7 - Qual a ferramenta de gerenciamento de projeto será usada para o monitoramento das atividades? Ex: Trello, Asana, Jira, Monday. 

____

## Próximos Passos

---
## Slide apresentação
Slide de apresentação do nosso projeto
[📂 Baixar Slide](./slide/Projeto_Renascer_Mulher.pdf)

