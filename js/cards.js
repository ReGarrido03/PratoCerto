// Transforma 2.5 em "R$ 2,50"
export function formatarPreco(valor) {
    return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

// Arredonda para uma casa decimal e troca o ponto por vírgula (ex.: 1.25 vira "1,3")
export function formatarQuantidade(valor) {
    const arredondado = Math.round(valor * 10) / 10;
    return String(arredondado).replace('.', ',');
}

// Recebe uma receita e devolve o HTML do card dela
export function criarCard(receita) {
    const textoPorcoes = receita.porcoes === 1 ? 'porção' : 'porções';

    return `
        <li>
            <article class="receita">
                <figure>
                    <img src="${receita.imagem}" alt="${receita.alt}">
                </figure>

                <section class="descricao">
                    <h3>${receita.nome}</h3>
                    <p>${receita.descricao}</p>
                    <ul class="selos">
                        <li><time datetime="PT${receita.tempo}M">${receita.tempo} min</time></li>
                        <li>${receita.porcoes} ${textoPorcoes}</li>
                        <li>${receita.selo}</li>
                    </ul>
                </section>

                <footer class="valor">
                    <p><strong>${formatarPreco(receita.preco)}</strong> <small>por porção</small></p>
                    <button type="button" class="abrir-receita" data-receita="${receita.id}">Ver receita</button>
                </footer>
            </article>
        </li>
    `;
}

// Recebe um ingrediente e devolve o HTML da linha dele, usado no pop-up e na lista de compras
export function criarLinhaIngrediente(nome, quantidade, unidade) {
    return `
        <li>
            <span>${nome}</span>
            <data value="${quantidade}">${formatarQuantidade(quantidade)} ${unidade}</data>
        </li>
    `;
}
