// Importa as receitas do JSON e a função que monta os cards
import receitas from '../dados/receitas.json' with { type: 'json' };
import { criarCard, criarLinhaIngrediente, formatarPreco, formatarQuantidade } from './cards.js';

const lista = document.getElementById('lista-receitas');
const contador = document.getElementById('contador-resultados');
const formulario = document.getElementById('form-filtros');
const valorCusto = document.getElementById('valor-custo');
const botoesOrdem = document.querySelectorAll('#ordenacao button');
const botaoVerMais = document.getElementById('ver-mais');

// Quantas receitas aparecem de cada vez e quantas estão visíveis agora
const POR_VEZ = 4;
let visiveis = POR_VEZ;

// Elementos do pop-up da receita
const painel = document.getElementById('painel-receita');
const campoPorcoes = document.getElementById('porcoes');
const botaoMenos = document.getElementById('diminuir');
const botaoMais = document.getElementById('aumentar');

// Elementos da lista de compras
const painelCompras = document.getElementById('painel-compras');
const listaCompras = document.getElementById('lista-compras');
const contadorCompras = document.getElementById('contador-compras');
const resumoCompras = document.getElementById('resumo-compras');
const custoCompras = document.getElementById('custo-compras');
const avisoCompras = document.getElementById('aviso-compras');
const retornoCompras = document.getElementById('retorno-compras');

// Receita aberta no pop-up no momento
let receitaAberta = null;

// Ingredientes já somados na lista: { nome, unidade, qtd }
const itensCompras = [];

// Receitas que entraram na lista: { nome, porcoes, custo }
const receitasCompras = [];

// Ordem escolhida nos botões de cima. Começa em "menor preço", que já vem marcado no HTML.
let ordemAtual = 'preco';

// ==================== FILTROS ====================

// Devolve uma lista com os valores das caixas marcadas de um grupo (ex.: "ingrediente")
function valoresMarcados(nome) {
    const valores = [];
    const marcadas = document.querySelectorAll(`input[name="${nome}"]:checked`);

    for (const caixa of marcadas) {
        valores.push(caixa.value);
    }

    return valores;
}

// Lê tudo o que o usuário escolheu no formulário de filtros
function lerFiltros() {
    return {
        ingredientes: valoresMarcados('ingrediente'),
        tempos: valoresMarcados('tempo'),
        refeicoes: valoresMarcados('refeicao'),
        custoMaximo: Number(document.getElementById('custo-maximo').value)
    };
}

// Converte os minutos no mesmo valor usado nas caixas de tempo do HTML (20, 40 ou 41)
function faixaDeTempo(minutos) {
    if (minutos <= 20) return '20';
    if (minutos <= 40) return '40';
    return '41';
}

// A receita aparece se usar pelo menos um dos ingredientes marcados
function usaAlgumIngrediente(receita, marcados) {
    for (const ingrediente of receita.filtro) {
        if (marcados.includes(ingrediente)) return true;
    }
    return false;
}

// Confere a receita em cada filtro. Grupo sem nada marcado não filtra nada.
function passaNosFiltros(receita, filtros) {
    if (receita.preco > filtros.custoMaximo) return false;
    if (filtros.ingredientes.length > 0 && !usaAlgumIngrediente(receita, filtros.ingredientes)) return false;
    if (filtros.tempos.length > 0 && !filtros.tempos.includes(faixaDeTempo(receita.tempo))) return false;
    if (filtros.refeicoes.length > 0 && !filtros.refeicoes.includes(receita.refeicao)) return false;
    return true;
}

// ==================== ORDENAÇÃO ====================

// Coloca as receitas na ordem do botão escolhido
function ordenarReceitas(lista) {
    if (ordemAtual === 'preco') {
        lista.sort((a, b) => a.preco - b.preco);           // mais barata primeiro
    } else if (ordemAtual === 'tempo') {
        lista.sort((a, b) => a.tempo - b.tempo);           // mais rápida primeiro
    } else if (ordemAtual === 'recentes') {
        lista.sort((a, b) => b.id - a.id);                 // id maior = adicionada por último
    }
}

// Marca o botão clicado, desmarca os outros e refaz a lista
function escolherOrdem(botao) {
    ordemAtual = botao.dataset.ordem;

    for (const outro of botoesOrdem) {
        outro.setAttribute('aria-pressed', 'false');
    }
    botao.setAttribute('aria-pressed', 'true');

    reiniciarListagem();
}

// ==================== POP-UP DA RECEITA ====================

// Procura no JSON a receita com o id informado
function buscarReceita(id) {
    for (const receita of receitas) {
        if (receita.id === id) return receita;
    }
    return null;
}

// Coloca no pop-up os dados da receita escolhida
function preencherPainel(receita) {
    const imagem = painel.querySelector('#preparo img');
    imagem.src = receita.imagem;
    imagem.alt = receita.alt;

    document.getElementById('titulo-receita').textContent = receita.nome;
    const palavraPorcoes = receita.porcoes === 1 ? 'porção' : 'porções';
    painel.querySelector('#preparo figcaption').textContent = `Rendimento base de ${receita.porcoes} ${palavraPorcoes}.`;
    document.getElementById('custo-porcao').textContent = formatarPreco(receita.preco);

    const passos = painel.querySelector('#preparo ol');
    passos.innerHTML = '';
    for (const passo of receita.preparo) {
        passos.innerHTML += `<li>${passo}</li>`;
    }

    atualizarPorcoes(receita.porcoes);
}

// Recalcula custo total e ingredientes para a quantidade de porções escolhida
function atualizarPorcoes(porcoes) {
    const fator = porcoes / receitaAberta.porcoes;

    campoPorcoes.textContent = porcoes;
    document.getElementById('custo-total').textContent = formatarPreco(receitaAberta.preco * porcoes);

    const listaIngredientes = document.getElementById('lista-ingredientes');
    listaIngredientes.innerHTML = '';
    for (const ingrediente of receitaAberta.ingredientes) {
        listaIngredientes.innerHTML += criarLinhaIngrediente(ingrediente.nome, ingrediente.qtd * fator, ingrediente.unidade);
    }

    // Limita entre 1 e 20 porções
    botaoMenos.disabled = porcoes <= 1;
    botaoMais.disabled = porcoes >= 20;
}

// Busca a receita do botão clicado, preenche e abre o pop-up
function abrirReceita(botao) {
    const receita = buscarReceita(Number(botao.dataset.receita));
    if (!receita) return;

    receitaAberta = receita;
    retornoCompras.textContent = '';
    preencherPainel(receita);

    if (!painel.open) painel.showModal();
}

// ==================== LISTA DE COMPRAS ====================

// Tira o plural e junta com a unidade, para que "2 batatas" e "1 batata" contem como o mesmo item
function chaveDoIngrediente(nome, unidade) {
    const palavras = nome.toLowerCase().split(' ');
    const singular = [];

    for (const palavra of palavras) {
        singular.push(palavra.endsWith('s') ? palavra.slice(0, -1) : palavra);
    }

    return singular.join(' ') + ' em ' + unidade;
}

// Soma o ingrediente à lista, juntando com um item igual se ele já estiver lá
function somarIngrediente(nome, unidade, quantidade) {
    const chave = chaveDoIngrediente(nome, unidade);

    for (const item of itensCompras) {
        if (item.chave === chave) {
            item.qtd += quantidade;
            return;
        }
    }

    itensCompras.push({ chave: chave, nome: nome, unidade: unidade, qtd: quantidade });
}

// Adiciona a receita aberta na quantidade de porções escolhida na calculadora
function adicionarNaLista() {
    const porcoes = Number(campoPorcoes.textContent);
    const fator = porcoes / receitaAberta.porcoes;

    for (const ingrediente of receitaAberta.ingredientes) {
        somarIngrediente(ingrediente.nome, ingrediente.unidade, ingrediente.qtd * fator);
    }

    receitasCompras.push({
        nome: receitaAberta.nome,
        porcoes: porcoes,
        custo: receitaAberta.preco * porcoes
    });

    mostrarListaCompras();
    retornoCompras.textContent = `${receitaAberta.nome} foi adicionada à lista.`;
}

// Soma o custo de todas as receitas da lista
function custoDaLista() {
    let total = 0;
    for (const receita of receitasCompras) {
        total += receita.custo;
    }
    return total;
}

// Desenha a lista de compras e atualiza o contador e o custo total
function mostrarListaCompras() {
    contadorCompras.textContent = itensCompras.length;
    custoCompras.textContent = formatarPreco(custoDaLista());

    const nomes = [];
    for (const receita of receitasCompras) {
        nomes.push(`${receita.nome} (${receita.porcoes})`);
    }
    resumoCompras.textContent = nomes.length === 0 ? '' : 'Receitas: ' + nomes.join(', ');

    listaCompras.innerHTML = '';
    for (const item of itensCompras) {
        listaCompras.innerHTML += criarLinhaIngrediente(item.nome, item.qtd, item.unidade);
    }

    if (itensCompras.length === 0) {
        listaCompras.innerHTML = '<li>Sua lista está vazia. Abra uma receita e use o botão "Adicionar à lista de compras".</li>';
    }
}

// Monta o texto da lista para o usuário colar onde quiser
function textoDaLista() {
    let texto = 'Lista de compras — Prato Certo\n\n';

    for (const item of itensCompras) {
        texto += `- ${item.nome}: ${formatarQuantidade(item.qtd)} ${item.unidade}\n`;
    }

    texto += `\nCusto estimado: ${formatarPreco(custoDaLista())}`;
    return texto;
}

// Copia a lista para a área de transferência
function copiarLista() {
    if (itensCompras.length === 0) {
        avisoCompras.textContent = 'A lista está vazia.';
        return;
    }

    navigator.clipboard.writeText(textoDaLista())
        .then(() => { avisoCompras.textContent = 'Lista copiada!'; })
        .catch(() => { avisoCompras.textContent = 'Não foi possível copiar. Selecione o texto e copie manualmente.'; });
}

// Esvazia a lista
function limparLista() {
    itensCompras.length = 0;
    receitasCompras.length = 0;
    mostrarListaCompras();
    avisoCompras.textContent = 'Lista limpa.';
}

// ==================== LISTAGEM ====================

// Filtra as receitas e coloca na tela só as que passaram
function mostrarReceitas() {
    const filtros = lerFiltros();
    const encontradas = [];

    for (const receita of receitas) {
        if (passaNosFiltros(receita, filtros)) {
            encontradas.push(receita);
        }
    }

    ordenarReceitas(encontradas);

    // Atualiza o texto ao lado do controle de custo (ex.: "R$ 5,50")
    valorCusto.textContent = 'R$ ' + filtros.custoMaximo.toFixed(2).replace('.', ',');

    lista.innerHTML = '';

    // Mostra só as primeiras receitas; o resto espera o botão "Ver mais"
    for (let i = 0; i < encontradas.length && i < visiveis; i++) {
        lista.innerHTML += criarCard(encontradas[i]);
    }

    if (encontradas.length === 0) {
        lista.innerHTML = '<li>Nenhuma receita encontrada com esses filtros. Tente outros filtros ou aumente o custo máximo.</li>';
    }

    // O botão só aparece quando ainda há receitas escondidas
    const escondidas = encontradas.length - visiveis;

    if (escondidas > 0) {
        botaoVerMais.hidden = false;
        botaoVerMais.textContent = `Ver mais receitas (${escondidas} restantes)`;
    } else {
        botaoVerMais.hidden = true;
    }

    contador.textContent = encontradas.length;
}

// Mudou o filtro ou a ordem: a lista volta a mostrar só as primeiras receitas
function reiniciarListagem() {
    visiveis = POR_VEZ;
    mostrarReceitas();
}

// Só existe lista de receitas na página inicial
if (lista) {
    mostrarReceitas();

    // Qualquer mudança no formulário (caixas ou controle de custo) refaz a lista
    formulario.addEventListener('input', reiniciarListagem);

    // O botão "Limpar filtros" desmarca tudo; esperamos o navegador terminar antes de refazer a lista
    formulario.addEventListener('reset', () => {
        setTimeout(reiniciarListagem);
    });

    // Mostra mais quatro receitas a cada clique
    botaoVerMais.addEventListener('click', () => {
        visiveis += POR_VEZ;
        mostrarReceitas();
    });

    // Botões "Ver receita": os dos cards são criados depois, então o clique é verificado na página inteira
    document.addEventListener('click', (evento) => {
        const botao = evento.target.closest('.abrir-receita');
        if (botao) abrirReceita(botao);
    });

    document.getElementById('fechar-receita').addEventListener('click', () => {
        painel.close();
    });

    // Botões − e + do pop-up
    botaoMenos.addEventListener('click', () => {
        atualizarPorcoes(Number(campoPorcoes.textContent) - 1);
    });

    botaoMais.addEventListener('click', () => {
        atualizarPorcoes(Number(campoPorcoes.textContent) + 1);
    });

    // Cada botão de ordenação escolhe a sua ordem ao ser clicado
    for (const botao of botoesOrdem) {
        botao.addEventListener('click', () => escolherOrdem(botao));
    }

    // Botões da lista de compras
    document.getElementById('adicionar-compras').addEventListener('click', adicionarNaLista);
    document.getElementById('copiar-compras').addEventListener('click', copiarLista);
    document.getElementById('limpar-compras').addEventListener('click', limparLista);

    document.getElementById('abrir-compras').addEventListener('click', () => {
        avisoCompras.textContent = '';
        painelCompras.showModal();
    });

    document.getElementById('fechar-compras').addEventListener('click', () => {
        painelCompras.close();
    });

    mostrarListaCompras();
}
