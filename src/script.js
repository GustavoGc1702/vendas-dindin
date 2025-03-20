// Função para gerar um ID único para cada venda
function gerarID() {
    return 'v' + new Date().getTime();
}

// Função para salvar as vendas no localStorage
function salvarVendas(vendas) {
    localStorage.setItem('vendas', JSON.stringify(vendas));
}

// Função para carregar as vendas do localStorage
function carregarVendas() {
    const vendas = localStorage.getItem('vendas');
    return vendas ? JSON.parse(vendas) : [];
}

// Função para atualizar a tabela de vendas
function atualizarTabela(vendas) {
    const tabelaVendas = document.getElementById('tabelaVendas').getElementsByTagName('tbody')[0];
    tabelaVendas.innerHTML = ''; // Limpar a tabela antes de atualizar

    vendas.forEach(venda => {
        const row = tabelaVendas.insertRow();
        row.innerHTML = `
            <td>${venda.id}</td>
            <td>${venda.nome_cliente}</td>
            <td>${venda.sabor_dindin}</td>
            <td>${venda.quantidade}</td>
            <td> R$ ${parseFloat(venda.total).toFixed(2)}</td>
            <td>${venda.data_hora}</td>
        `;
    });
}

// Função para exibir mensagens de feedback
function exibirMensagem(mensagem, tipo) {
    const feedback = document.getElementById('feedback');
    feedback.innerHTML = mensagem;
    feedback.style.color = tipo === 'success' ? 'green' : 'red';
}

// Evento de envio do formulário
document.getElementById('formCadastro').addEventListener('submit', function(event) {
    event.preventDefault();

    const nomeCliente = document.getElementById('nome_cliente').value;
    const saborDindin = document.getElementById('sabor').value;
    const quantidade = document.getElementById('quantidade').value;
    const dataHora = new Date().toLocaleString();
    const total = quantidade * 5 ;
    // Validação de campos
    if (!nomeCliente || !saborDindin || !quantidade) {
        exibirMensagem('Todos os campos são obrigatórios!', 'error');
        return;
    }

    // Criar o objeto de venda
    const novaVenda = {
        id: gerarID(),
        nome_cliente: nomeCliente,
        sabor_dindin: saborDindin,
        quantidade: parseInt(quantidade),
        data_hora: dataHora,
        total: parseInt(total)
    };

    // Carregar vendas existentes e adicionar a nova venda
    const vendas = carregarVendas();
    vendas.push(novaVenda);

    // Salvar as vendas no localStorage
    salvarVendas(vendas);

    // Atualizar a tabela de vendas
    atualizarTabela(vendas);

    // Limpar campos do formulário
    document.getElementById('nome_cliente').value = '';
    document.getElementById('sabor').value = '';
    document.getElementById('quantidade').value = '';

    // Exibir mensagem de sucesso
    exibirMensagem('Venda cadastrada com sucesso!', 'success');
});

// Carregar as vendas ao carregar a página
window.onload = function() {
    const vendas = carregarVendas();
    atualizarTabela(vendas);
};
