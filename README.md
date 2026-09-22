# Prato Certo
 
Site que reúne receitas nutritivas e de baixo custo, organizadas a partir dos ingredientes que a pessoa já tem em casa. Desenvolvido com HTML5, CSS3 e JavaScript.
 
**Integrantes**
 
Otto Martins Mota— RA 10418170
Renan Garrido — RA 10417093
Yuri Milliet da Silva  — RA 10417884
 
---
 
## Sobre o projeto
 
O Prato Certo é um site aberto, sem cadastro ou login, em que o usuário marca os ingredientes disponíveis na própria despensa e recebe as receitas que consegue preparar com aquilo, cada uma acompanhada do custo aproximado por porção. Ao abrir uma receita, ele pode visualizar o valor acumulado até o momento.
 
A proposta inverte a lógica dos sites de culinária tradicionais. Em vez de organizar o conteúdo por tipo de prato, o que obriga a pessoa a sair para comprar o que falta, o Prato Certo parte do que já existe na cozinha e mostra o caminho a partir dali.
 
## Por que escolhemos este projeto
 
A escolha do tema nasceu da busca por uma demanda concreta e próxima da nossa comunidade, e não de um exercício técnico. Ao discutir problemas do dia a dia que poderiam ser enfrentados com uma aplicação simples, percebemos que a alimentação aparecia com frequência, mas por um motivo diferente do esperado: a dificuldade não estava em saber o que é saudável, e sim em transformar o que já existe em casa numa refeição completa sem estourar o orçamento.
 
Duas constatações orientaram o restante do trabalho. A primeira é que boa parte do desperdício doméstico acontece porque as pessoas não sabem o que preparar com os ingredientes que sobraram, e acabam descartando alimentos ainda bons. A segunda é que as receitas disponíveis na internet quase nunca informam quanto custa o prato, e frequentemente pressupõem ingredientes caros ou de difícil acesso, o que afasta justamente quem mais precisaria delas.
 
O nome do projeto foi escolhido pelo duplo sentido que carrega. O prato certo é aquele adequado do ponto de vista nutricional, mas também é a escolha certa do ponto de vista do orçamento familiar, e é essa combinação que o site tenta oferecer.
 
## Caráter extensionista e relação com as ODS
 
O projeto atende a uma demanda real de famílias que precisam se alimentar bem com recursos limitados. Todo o conteúdo é de acesso livre, sem qualquer barreira de cadastro, de modo que basta um navegador para usar a ferramenta. A abertura para a comunidade também se dá pelo código publicado no GitHub, que pode ser adaptado por outras pessoas à realidade da própria região, e por um formulário no próprio site pelo qual qualquer usuário envia uma receita para o acervo, tornando o conteúdo construído coletivamente.
 
A proposta se conecta principalmente ao Objetivo de Desenvolvimento Sustentável 2, que trata de garantir o acesso a alimentos seguros, nutritivos e suficientes ao longo de todo o ano, já que o site facilita o planejamento de refeições adequadas com orçamento reduzido. De forma complementar, dialoga com o Objetivo 12, porque o filtro pelos ingredientes disponíveis incentiva o aproveitamento integral do que já está em casa e reduz o desperdício doméstico, e com o Objetivo 3, uma vez que a atenção ao valor nutricional das receitas contribui para a saúde e o bem-estar das famílias atendidas.
 
## Protótipo
 
Antes de escrever qualquer linha de código, desenhamos o protótipo em formato de wireframe de baixa fidelidade, sem cores ou imagens definitivas, para que a discussão se concentrasse na estrutura da informação e no fluxo de uso. O site foi organizado em três páginas: a listagem de receitas, que é a tela principal, a página de apresentação do projeto e a página de envio de receitas pela comunidade.
 
<img width="862" height="795" alt="Captura de tela 2026-08-25 204311" src="https://github.com/user-attachments/assets/65a96686-4beb-40e0-a4ed-1dfb0231d9d6" />
A tela principal foi dividida em duas colunas. À esquerda ficam os filtros, com a seleção de ingredientes, o custo máximo por porção, o tempo de preparo e o tipo de refeição, e à direita a listagem de receitas em linhas horizontais, cada uma com miniatura, descrição breve, selos informativos e o custo por porção em destaque. Essa disposição foi escolhida para deixar o filtro sempre visível enquanto o usuário percorre os resultados, já que ele é o elemento central da proposta.
 
<img width="860" height="726" alt="Captura de tela 2026-08-25 204349" src="https://github.com/user-attachments/assets/ae5b90ee-b052-4479-9150-bf4261063bb0" />
A receita não ocupa uma página própria. Ao clicar em ver receita, um painel se abre sobre a listagem trazendo o modo de preparo, a lista de ingredientes e as informações de custo, e desaparece assim que o usuário o fecha. A escolha manteve o usuário no contexto da busca, evitando que ele perdesse os filtros já selecionados ao consultar um preparo. A mesma página reúne ainda a explicação de como o site funciona, em três passos, e a apresentação do projeto ao lado dos Objetivos de Desenvolvimento Sustentável atendidos.
 
<img width="860" height="357" alt="Captura de tela 2026-08-25 204410" src="https://github.com/user-attachments/assets/b9ad18a4-1713-4913-800a-3bc98c30352f" />
A última tela traz o formulário pelo qual qualquer pessoa envia uma receita para o acervo, com os dados do autor, as informações do preparo e a autorização de publicação. É por ela que o caráter colaborativo do projeto se concretiza na prática.

## Como executar o projeto

O site é estático e não depende de instalação nem de banco de dados, mas precisa ser aberto por um servidor local, e não com um duplo clique no `index.html`. O motivo é que o JavaScript foi escrito em módulos e carrega o acervo de receitas a partir de um arquivo JSON, e os navegadores bloqueiam esse tipo de leitura quando o endereço começa com `file://`. Na prática, basta abrir a pasta no Visual Studio Code, instalar a extensão Live Server e escolher a opção de abrir com ela, ou então acessar a versão publicada pelo GitHub Pages.

## Estrutura dos arquivos

A organização do projeto separa cada tipo de conteúdo em uma pasta própria, para que o acervo de receitas possa crescer sem que ninguém precise tocar no código. Na raiz ficam as três páginas, `index.html`, `sobre.html` e `enviar.html`. A pasta `css` guarda a folha de estilo única, compartilhada pelas três páginas. A pasta `imagens` reúne o logotipo e as fotos das receitas. A pasta `dados` contém o `receitas.json`, que é o acervo. A pasta `js` reúne o `script.js`, responsável pelo comportamento do site, e o `cards.js`, que monta os trechos de HTML repetidos.

## Tutorial do código

### O acervo em JSON

A primeira decisão técnica foi tirar as receitas de dentro do HTML e reuni-las em um arquivo de dados. As vinte receitas do acervo vivem no `dados/receitas.json`, e cada uma é um objeto com identificador, nome, imagem, descrição, tempo de preparo, rendimento, custo por porção, tipo de refeição, ingredientes principais para o filtro, modo de preparo e lista de ingredientes com quantidade e unidade. Um trecho reduzido dá a ideia do formato:

```json
{
  "id": 4, "nome": "Sopa de legumes", "tempo": 35, "porcoes": 5, "preco": 2.8,
  "refeicao": "almoco", "filtro": ["batata", "cenoura", "cebola"],
  "preparo": ["Pique os legumes em cubos.", "Refogue a cebola e o alho no óleo."],
  "ingredientes": [{ "nome": "batata", "qtd": 2, "unidade": "un." }]
}
```

O ganho dessa separação aparece na manutenção. Adicionar uma receita nova passou a significar acrescentar um objeto ao arquivo, sem risco de quebrar a página, e o mesmo acervo alimenta a listagem, o painel de preparo, a calculadora de porções e a lista de compras. Os campos `filtro` e `refeicao` usam exatamente os mesmos valores das caixas de seleção do HTML, o que permitiu comparar os dois lados sem nenhuma conversão.

### Módulos, import e export

O JavaScript foi dividido em dois arquivos que conversam entre si por meio de módulos. O `cards.js` não sabe nada sobre o site: ele apenas recebe dados e devolve HTML, exportando as funções que formatam preços e quantidades, a que monta o card de uma receita e a que monta a linha de um ingrediente. O `script.js` importa essas funções e cuida do comportamento da página.

```js
import receitas from '../dados/receitas.json' with { type: 'json' };
import { criarCard, criarLinhaIngrediente, formatarPreco, formatarQuantidade } from './cards.js';
```

Para que o navegador aceite essa sintaxe, a tag de script das três páginas recebeu o atributo `type="module"`. Como o mesmo arquivo é carregado em todas elas, e só a página inicial tem a listagem, o código verifica se o elemento da lista existe antes de rodar, evitando erros nas outras duas páginas.

### A listagem e o botão ver mais

A listagem é gerada por uma única função, que é chamada sempre que algo muda na tela. Ela percorre o acervo, separa as receitas que passam nos filtros, coloca o resultado na ordem escolhida e escreve os cards na página. Para não despejar as vinte receitas de uma vez, uma variável guarda quantas estão visíveis, o laço para nesse número e um botão no fim da lista mostra quantas ainda faltam. Cada clique revela mais quatro, e o botão desaparece quando a última aparece. Sempre que o usuário mexe nos filtros ou troca a ordenação, a contagem volta ao início, para que uma busca nova não herde os cards abertos da anterior.

### Os filtros e a ordenação

Os filtros da coluna esquerda são lidos diretamente do formulário, e não guardados em paralelo, o que evita que o código e a tela fiquem dessincronizados. Uma função recolhe os valores das caixas marcadas de cada grupo, e outra confere a receita em cada critério: o preço precisa caber no custo máximo, a receita precisa usar pelo menos um dos ingredientes marcados e precisa estar entre as faixas de tempo e os tipos de refeição escolhidos. Um grupo sem nada marcado simplesmente não filtra, de modo que o site começa mostrando tudo.

A ordenação segue a mesma ideia. Os três botões do topo guardam a ordem em um atributo do próprio HTML, e o botão clicado recebe `aria-pressed="true"` enquanto os outros voltam para `false`, o que deixa o estado visível tanto no visual quanto para leitores de tela. A lista é então reordenada pelo menor preço, pelo menor tempo ou pelo identificador mais alto, que corresponde à receita adicionada por último.

### O painel da receita e a calculadora de porções

O painel que se abre sobre a listagem usa o elemento `dialog` do HTML, que já traz o fundo escurecido e o fechamento pela tecla Esc sem nenhum código extra. Como os cards são criados depois que a página carrega, o clique não é escutado em cada botão, e sim na página inteira, verificando se o alvo foi um botão de ver receita. Essa técnica evita ter que registrar e remover eventos toda vez que a lista é redesenhada.

Ao abrir, o painel busca a receita pelo identificador guardado no botão e preenche título, foto, modo de preparo e custo. A calculadora de porções trabalha com uma proporção simples: divide a quantidade escolhida pelo rendimento original da receita e multiplica os ingredientes e o custo por esse fator. Os botões de menos e mais ficam desabilitados nos limites de uma e vinte porções, o que dispensa validar a entrada em outro lugar.

### A lista de compras

A lista de compras foi a funcionalidade que mais aproveitou as anteriores. Dentro do painel, um botão envia os ingredientes da receita, já na quantidade definida na calculadora, para uma lista acumulada, e um segundo painel mostra o resultado com o custo estimado total, além de permitir copiar tudo em texto ou esvaziar a lista.

O cuidado principal foi somar o que é igual. Como o acervo escreve ora no singular, ora no plural, o código monta uma chave de comparação que tira o "s" final de cada palavra e junta o nome com a unidade, de forma que duas batatas de uma receita e cinco de outra virem uma linha só, enquanto o óleo medido em colheres continua separado do óleo medido em xícaras, que é o comportamento correto para quem vai ao mercado.

## Próximas etapas

O campo de busca do cabeçalho ainda não está ligado ao JavaScript e é a continuação mais natural do trabalho, já que reaproveita a mesma função que monta a listagem. O formulário de envio de receitas também pode ganhar validação própria, com mensagens escritas por nós em vez das mensagens padrão do navegador.

Pretende-se ainda adicionar uma sessão de planejamento semanal, na qual o usuário poderá escolher uma receita para cada refeição do dia da semana, a fim de melhor planejar sua rotina. Como a lista de compras já soma ingredientes de várias receitas, ela seria o ponto de partida dessa tela. Por fim, guardar os favoritos e a própria lista no armazenamento do navegador faria o site lembrar das escolhas do usuário entre uma visita e outra.

## Conclusão e aprendizados

O aprendizado mais importante do projeto não foi uma técnica específica, e sim a percepção de que separar dados de comportamento muda a forma como o código cresce. Enquanto as receitas estavam escritas no HTML, cada nova receita significava copiar e colar dezenas de linhas, e qualquer mudança no visual precisava ser repetida em todos os cards. Depois que o acervo virou um arquivo JSON e o HTML passou a ser montado por uma função, adicionar conteúdo e mudar o visual deixaram de ser o mesmo problema.

A divisão em módulos reforçou essa lição em outra escala. Concentrar no `cards.js` tudo o que produz HTML e deixar no `script.js` o que reage ao usuário tornou mais fácil encontrar cada coisa, e a mesma função de montar a linha de um ingrediente acabou servindo tanto ao painel da receita quanto à lista de compras, algo que não estava previsto quando ela foi escrita.

Também aprendemos a aproveitar o que o HTML já oferece antes de escrever código. O elemento `dialog` resolveu o painel sobreposto, os atributos de dados guardaram o identificador de cada receita, e os próprios campos do formulário serviram como fonte do estado dos filtros. Em contrapartida, o uso de módulos trouxe a limitação de exigir um servidor local, um detalhe que só descobrimos ao testar o site com um duplo clique e que vale registrar para quem for continuar o projeto.

Por fim, ficou claro que decisões pequenas de interface pesam bastante na experiência. Mostrar as vinte receitas de uma vez tornava a página cansativa, e a paginação em quatro resultados resolveu isso com poucas linhas. O mesmo vale para a mensagem exibida quando nenhum filtro retorna resultados, que evita a sensação de que o site quebrou.
