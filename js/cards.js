// Recebe uma receita e devolve o HTML do card dela
export function criarCard(receita) {
    const preco = receita.preco.toFixed(2).replace('.', ',');
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
                    <p><strong>R$ ${preco}</strong> <small>por porção</small></p>
                    <button type="button" class="abrir-receita" data-receita="${receita.id}">Ver receita</button>
                </footer>
            </article>
        </li>
    `;
}
