// Importa as receitas do JSON e a função que monta os cards
import receitas from '../dados/receitas.json' with { type: 'json' };
import { criarCard } from './cards.js';

const lista = document.getElementById('lista-receitas');
const contador = document.getElementById('contador-resultados');
const formulario = document.getElementById('form-filtros');
const valorCusto = document.getElementById('valor-custo');
const botoesOrdem = document.querySelectorAll('#ordenacao button');

// Elementos do pop-up da receita
const painel = document.getElementById('painel-receita');
const campoPorcoes = document.getElementById('porcoes');
const botaoMenos = document.getElementById('diminuir');
const botaoMais = document.getElementById('aumentar');

// Receita aberta no pop-up no momento
let receitaAberta = null;

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

    mostrarReceitas();
}

// ==================== POP-UP DA RECEITA ====================

// Transforma 2.5 em "R$ 2,50"
function formatarPreco(valor) {
    return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

// Arredonda para uma casa decimal e troca o ponto por vírgula (ex.: 1.25 vira "1,3")
function formatarQuantidade(valor) {
    const arredondado = Math.round(valor * 10) / 10;
    return String(arredondado).replace('.', ',');
}

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
        const quantidade = ingrediente.qtd * fator;
        listaIngredientes.innerHTML += `
            <li>
                <span>${ingrediente.nome}</span>
                <data value="${quantidade}">${formatarQuantidade(quantidade)} ${ingrediente.unidade}</data>
            </li>`;
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
    preencherPainel(receita);

    if (!painel.open) painel.showModal();
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

    for (const receita of encontradas) {
        lista.innerHTML += criarCard(receita);
    }

    if (encontradas.length === 0) {
        lista.innerHTML = '<li>Nenhuma receita encontrada com esses filtros. Tente outros filtros ou aumente o custo máximo.</li>';
    }

    contador.textContent = encontradas.length;
}

// Só existe lista de receitas na página inicial
if (lista) {
    mostrarReceitas();

    // Qualquer mudança no formulário (caixas ou controle de custo) refaz a lista
    formulario.addEventListener('input', mostrarReceitas);

    // O botão "Limpar filtros" desmarca tudo; esperamos o navegador terminar antes de refazer a lista
    formulario.addEventListener('reset', () => {
        setTimeout(mostrarReceitas);
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
}
