# 🤱🏻 Renascer Mulher | Projeto Social - Comunidade para Mulheres
___

- **Nº do Squad: 12**

- **Integrantes:**

1. Elzilane Cardoso Barreto
2. Hirislayne Batista Ramos dos Santos
3. Isabella Castro Silva de Aguiar

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

**Relacionamentos:**

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
- Cada postagem pode pertencer a uma única categoria → (1,1)

**Modelo Conceitual:**
![image](https://github.com/user-attachments/assets/75a6a188-8c02-4c89-adf2-dc16df4ba2e0)

**Modelo Lógico:**
![image](https://github.com/user-attachments/assets/d9900ced-ab45-4864-b196-7b78b792b9d1)

___

## Questionário

**1 - Considerando o desafio escolhido, qual é o problema a ser resolvido e que será contemplado com o projeto final?**  

*A falta de informação e apoio para mulheres que enfrentam os desafios da maternidade,
especialmente durante a gravidez e o puerpério. Muitas mães não têm acesso fácil a
recursos confiáveis e comunidades de suporte que possam ajudá-las a lidar com as
mudanças físicas, emocionais e práticas que acompanham a maternidade. Sendo assim, 
buscou-se criar um espaço digital seguro e acessível para que mulheres possam compartilhar 
experiências e obter apoio mútuo.*

**2 - Qual o público-alvo? A solução poderá ser aplicada a todos, sem restrição de idade ou grau de escolaridade, por exemplo?**  

*O público-alvo são mulheres grávidas e mães de recém-nascidos, independentemente da
idade ou grau de escolaridade, principalmente aquelas que buscam informações e apoio durante a maternidade. 
Além disso, pais e outros cuidadores também podem se beneficiar do conteúdo, tornando-o inclusivo e acessível 
para todos que desempenham um papel ativo na criação de um bebê.*

**3 - O problema foi escolhido com base em quais dados oficiais? Como vocês identificaram que esse realmente é um problema para o público-alvo? Indique as referências usadas, justificando a sua escolha.**

*O problema foi identificado com base em dados de instituições de saúde e pesquisas
acadêmicas que mostram a importância do apoio durante a gravidez. Por exemplo,
estudos indicam que o acesso a informações e suporte emocional pode reduzir o estresse
e melhorar a saúde mental das mães. Referências usadas podem incluir organizações
como a Organização Mundial da Saúde (OMS) e estudos publicados em revistas
científicas sobre saúde materna.*

*(Apoio familiar) https://auhebaby.com.br/relacionamentos-na-gravidez/importanciaapoio-familiar-gravidez/*

*(As dificuldades da maternidade e o apoio familiar sob o olhar da mãe adolescente)
https://pesquisa.bvsalud.org/portal/resource/pt/lil-735636*


**4 - Como esse problema afeta o público-alvo?**

*A falta de informação e apoio pode levar ao aumento do estresse, ansiedade e depressão 
entre as mães, impactando negativamente sua saúde e bem-estar. Além disso, a falta de 
conhecimento sobre cuidados com a saúde e o bebê pode resultar em dificuldades para 
lidar com as necessidades do recém-nascido, afetando a qualidade de vida da família 
como um todo.*

**5 - Qual o cronograma das atividades?**  

O cronograma detalhado das atividades está disponível no ClickUp (https://app.clickup.com/9011779885/v/li/901107677565) 
ou no documento PDF disponibilizado no repositório.

**6 - Como será feita a distribuição das atividades entre os integrantes do squad para essa primeira entrega?**

*- Desenvolvimento do layout e design visual, garantindo uma interface intuitiva e agradável.*

*- Implementação da estrutura do site, assegurando sua funcionalidade e responsividade.*

*- Coordenação das atividades e acompanhamento do progresso, garantindo a organização e cumprimento dos prazos.*

*No entanto, ao longo do projeto, cada integrante contribuiu de forma colaborativa, 
participando de diferentes etapas do desenvolvimento à medida que avançávamos.*

**7 - Qual a ferramenta de gerenciamento de projeto será usada para o monitoramento das atividades?** 

*ClickUp: essa plataforma facilitou o acompanhamento das tarefas, prazos e colaboração 
entre os integrantes da squad.*
____

#### Link de Acesso ao Site: *https://renascer-mulher.vercel.app/*

