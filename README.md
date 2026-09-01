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
 
## Próximas etapas
 
Esta primeira versão do tutorial documenta a ideação e o protótipo. Pretende-se também adicionar uma sessão de planejamento semanal, na qual o usuário poderá escolher uma receita para cada refeição do dia da semana, afim de melhor planejar sua rotina. 
 
As explicações do código desenvolvido, em formato de tutorial, e a conclusão com os aprendizados adquiridos serão acrescentadas conforme a implementação avançar.
