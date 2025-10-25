/// <reference types="Cypress"/>

describe('Teste E2E Gemed Farma Web', () => {

    // Data formatada para utilizar no campo "Data Tratamento"
    const hoje = new Date()
    const amanha = new Date(hoje)
    amanha.setDate(hoje.getDate() + 1)
    const dia = String(amanha.getDate()).padStart(2, '0')
    const mes = String(amanha.getMonth() + 1).padStart(2, '0')
    const ano = amanha.getFullYear()
    const dataFormatada = `${dia}/${mes}/${ano}`

    // Ajustar nome do paciente de acordo com a revisão
    const nomePaciente = 'Teste 10'

    it('Realiza o login no Farma', () => {
        cy.visit("https://hml.gemed.app.br/farma-beta/users/log-in", { timeout: 120000, failOnStatusCode: false })
        cy.get('[data-test="gemed-input-usuario"]', { timeout: 40000 }).should('be.visible').type('Admin')
        cy.get('[data-test="gemed-input-senha"]').type('AzureIP')
        cy.get('[data-test="gemed-input-clinica"]').type('AvFarma')
        cy.contains('button', 'Entrar').click()
        cy.contains('Seleciona uma clínica', { timeout: 40000 }).should('be.visible')
        cy.get('.mat-radio-button', { timeout: 40000 }).first().click()
        cy.contains('button', 'Confirmar', { timeout: 20000 }).click()
        cy.wait(8000)
    })

    it.only('Etapa dos Pedidos', () => {
        // Login novamnete no Gemed (necessário)
        cy.visit("https://hml.gemed.app.br/farma-beta/users/log-in", { timeout: 120000, failOnStatusCode: false })
        cy.get('[data-test="gemed-input-usuario"]', { timeout: 40000 }).should('be.visible').type('Admin')
        cy.get('[data-test="gemed-input-senha"]').type('AzureIP')
        cy.get('[data-test="gemed-input-clinica"]').type('AvFarma')
        cy.contains('button', 'Entrar').click()
        cy.contains('Seleciona uma clínica', { timeout: 40000 }).should('be.visible')
        cy.get('.mat-radio-button', { timeout: 40000 }).first().click()
        cy.contains('button', 'Confirmar', { timeout: 20000 }).click()
        cy.wait(12000)
        cy.contains('mat-icon', 'reorder', { timeout: 20000 }).click({ force: true })
        cy.contains('span', 'Pedidos', { timeout: 20000 }).should('be.visible').click()

        // Criando os pedidos
        cy.contains('button', 'add', { timeout: 15000 }).click()
        cy.get('input[data-placeholder="Cliente"]').should('be.visible').click()
        cy.contains('span', ' Convenio 2902 ').click()

        // Criando paciente
        cy.contains('button', 'person_add').click()
        cy.get('input[data-placeholder="Digite o nome do paciente..."]').type(nomePaciente)
        cy.get('input[data-placeholder="Data de Nascimento"]').eq(1).type('01/01/2000', { force: true }).blur()
        cy.contains('span', 'Masculino').click()
        cy.contains('button', ' Ok ').click()
        cy.contains(' Paciente gravado com sucesso ', { timeout: 30000 }).should('be.visible')

        // Finalizando pedido
        cy.get('input.dx-texteditor-input').eq(2).type(dataFormatada)
        cy.get('input.dx-texteditor-input').eq(3).type('10:00')
        cy.get('[id=textArea]').type('Teste')
        cy.contains('button', 'Gravar ').click()
        cy.wait(3000)

        // Criando o restante dos pedidos com paciente já criado (5 pedidos)
        cy.contains('button', 'add').click()
        cy.get('input[data-placeholder="Cliente"]').should('be.visible').click()
        cy.contains('span', ' Convenio 2902 ').click()
        cy.get('input[data-placeholder="Paciente"]').type(nomePaciente)
        cy.contains('span', nomePaciente).should('be.visible').click()
        cy.get('input[data-placeholder="Data de Nascimento"]').type('01/01/2000', { force: true }).blur()
        cy.get('input.dx-texteditor-input').eq(2).type(dataFormatada)
        cy.get('input.dx-texteditor-input').eq(3).type('10:00')
        cy.get('[id=textArea]').type('Teste')
        cy.contains('button', 'Gravar ').click()
        cy.wait(3000)

        cy.contains('button', 'add').click()
        cy.get('input[data-placeholder="Cliente"]').should('be.visible').click()
        cy.contains('span', ' Convenio 2902 ').click()
        cy.get('input[data-placeholder="Paciente"]').type(nomePaciente)
        cy.contains('span', nomePaciente).should('be.visible').click()
        cy.get('input[data-placeholder="Data de Nascimento"]').type('01/01/2000', { force: true }).blur()
        cy.get('input.dx-texteditor-input').eq(2).type(dataFormatada)
        cy.get('input.dx-texteditor-input').eq(3).type('10:00')
        cy.get('[id=textArea]').type('Teste')
        cy.contains('button', 'Gravar ').click()
        cy.wait(3000)

        cy.contains('button', 'add').click()
        cy.get('input[data-placeholder="Cliente"]').should('be.visible').click()
        cy.contains('span', ' Convenio 2902 ').click()
        cy.get('input[data-placeholder="Paciente"]').type(nomePaciente)
        cy.contains('span', nomePaciente).should('be.visible').click()
        cy.get('input[data-placeholder="Data de Nascimento"]').type('01/01/2000', { force: true }).blur()
        cy.get('input.dx-texteditor-input').eq(2).type(dataFormatada)
        cy.get('input.dx-texteditor-input').eq(3).type('10:00')
        cy.get('[id=textArea]').type('Teste')
        cy.contains('button', 'Gravar ').click()
        cy.wait(3000)

        cy.contains('button', 'add').click()
        cy.get('input[data-placeholder="Cliente"]').should('be.visible').click()
        cy.contains('span', ' Convenio 2902 ').click()
        cy.get('input[data-placeholder="Paciente"]').type(nomePaciente)
        cy.contains('span', nomePaciente).should('be.visible').click()
        cy.get('input[data-placeholder="Data de Nascimento"]').type('01/01/2000', { force: true }).blur()
        cy.get('input.dx-texteditor-input').eq(2).type(dataFormatada)
        cy.get('input.dx-texteditor-input').eq(3).type('10:00')
        cy.get('[id=textArea]').type('Teste')
        cy.contains('button', 'Gravar ').click()
        cy.wait(3000)

        cy.contains('button', 'add').click()
        cy.get('input[data-placeholder="Cliente"]').should('be.visible').click()
        cy.contains('span', ' Convenio 2902 ').click()
        cy.get('input[data-placeholder="Paciente"]').type(nomePaciente)
        cy.contains('span', nomePaciente).should('be.visible').click()
        cy.get('input[data-placeholder="Data de Nascimento"]').type('01/01/2000', { force: true }).blur()
        cy.get('input.dx-texteditor-input').eq(2).type(dataFormatada)
        cy.get('input.dx-texteditor-input').eq(3).type('10:00')
        cy.get('[id=textArea]').type('Teste')
        cy.contains('button', 'Gravar ').click()
        cy.wait(3000)
    })
})
