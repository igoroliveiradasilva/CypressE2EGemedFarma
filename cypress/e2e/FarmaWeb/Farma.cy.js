/// <reference types="Cypress"/>

describe('Teste E2E Gemed Farma Web', () => {

    // Ajustar nome do paciente de acordo com a revisão
    const nomePaciente = 'Teste tamoxifeno 2'

    // Selecionar o elemento dentro de uma lista
    function selecionarElemento(pacienteNome, index = 0) {
        cy.get('a.linkProntuario')
            .filter((i, el) => el.innerText.trim() === pacienteNome)
            .eq(index)
            .parents('tr')
            .dblclick()
    }

    // Data formatada para utilizar no campo "Data Tratamento"
    const hoje = new Date()
    const amanha = new Date(hoje)
    amanha.setDate(hoje.getDate() + 1)
    const dia = String(amanha.getDate()).padStart(2, '0')
    const mes = String(amanha.getMonth() + 1).padStart(2, '0')
    const ano = amanha.getFullYear()
    const dataFormatada = `${dia}/${mes}/${ano}`

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

    it('Etapa dos Pedidos', () => {
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

        //Entrando na tela de pedidos
        cy.contains('mat-icon', 'reorder', { timeout: 20000 }).click({ force: true })
        cy.contains('span', 'Pedidos', { timeout: 20000 }).should('be.visible').click()

        // Criando os pedidos
        cy.contains('button', 'add', { timeout: 20000 }).click()
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

    it('Etapa de Digitação', () => {
        // Login no Gemed (necessário)
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

        // Digitação Faslodex
        // Seleção de protocolo
        cy.log('=== Pedido 1 ===')
        selecionarElemento(nomePaciente, 0)
        cy.contains('button', 'Digitação').click()
        cy.get('input[data-placeholder="Seleção de Protocolo..."]').type("FASLODEX")
        cy.contains('span', ' FASLODEX - FULVESTRANTO 500MG INTRAMUSCULAR NO D1, D15 E D29. SUBSEQUENTES A CADA 28 DIAS. APLICAR 1 SERINGA DE 250MG EM CADA NÁDEGA ').click()
        cy.contains('span', ' FASLODEX ').click()
        cy.contains('button', ' Próximo', { timeout: 5000 }).should('be.visible').click()
        // Configuração de principio ativo
        cy.contains('span', nomePaciente).click()
        cy.wait(2000)
        cy.get('input.mat-input-element').eq(3).type('70000')
        cy.get('input.mat-input-element').eq(4).type('175')
        cy.get('input[data-placeholder="Médico"]', { timeout: 10000 }).click()
        cy.get('span.mat-option-text', { timeout: 10000 }).first().click()
        cy.get('button').filter(':visible').contains(' Próximo').click()
        // Programação
        cy.wait(3000)
        cy.get('.mat-select-arrow').eq(2).click({ force: true })
        cy.get('.cdk-overlay-pane', { timeout: 10000 }).should('be.visible')
        cy.get('.cdk-overlay-pane span.mat-option-text').contains('Ciclo').should('be.visible').click({ force: true })
        cy.get('input[data-placeholder="Intervalo"]').type('{selectall}1')
        cy.get('input[data-placeholder="Dias"]').type('1')
        cy.contains('button', ' Gerar Programação').click()
        cy.get('button').filter(':visible').contains(' Próximo').click()
        // Confrrmação
        cy.contains('button', ' Gravar').click()

        // Digitação Tamoxifeno 1
        // Seleção de protocolo
        cy.log('=== Pedido 2 ===')
        selecionarElemento(nomePaciente, 0)
        cy.contains('button', 'Digitação').click()
        cy.get('input[data-placeholder="Seleção de Protocolo..."]').type("TAMOXIFENO")
        cy.contains('span', ' TAMOXIFENO - TAMOXIFENO 20MG - CAIXA COM 30 COMPRIMIDOS - TOMAR 01 COMPRIMIDO/DIA ').click()
        cy.contains('span', ' TAMOXIFENO ').click()
        cy.contains('button', ' Próximo', { timeout: 5000 }).should('be.visible').click()
        // Configuração de principio ativo
        cy.get('input[data-placeholder="Médico"]', { timeout: 10000 }).click()
        cy.get('span.mat-option-text', { timeout: 10000 }).first().click()
        cy.get('span.mat-button-wrapper', { timeout: 5000 }).eq(6).click()
        cy.get('input[data-placeholder="Quantidade"]').type('{selectall}60')
        cy.contains('button', 'Confirmar').should('be.visible').click()
        cy.get('button').filter(':visible').contains(' Próximo').click()
        // Programação
        cy.wait(3000)
        cy.contains('button', ' Gerar Programação').click()
        cy.get('button').filter(':visible').contains(' Próximo').click()
        // Confrrmação
        cy.contains('button', ' Gravar').click()

        // Digitação Tamoxifeno 2
        // Seleção de protocolo
        cy.log('=== Pedido 2 ===')
        selecionarElemento(nomePaciente, 0)
        cy.contains('button', 'Digitação').click()
        cy.get('input[data-placeholder="Seleção de Protocolo..."]').type("TAMOXIFENO")
        cy.contains('span', ' TAMOXIFENO - TAMOXIFENO 20MG - CAIXA COM 30 COMPRIMIDOS - TOMAR 01 COMPRIMIDO/DIA ').click()
        cy.contains('span', ' TAMOXIFENO ').click()
        cy.contains('button', ' Próximo', { timeout: 5000 }).should('be.visible').click()
        // Configuração de principio ativo
        cy.get('input[data-placeholder="Médico"]', { timeout: 10000 }).click()
        cy.get('span.mat-option-text', { timeout: 10000 }).first().click()
        cy.contains('span', 'edit', { timeout: 5000 }).click()
        cy.get('input[data-placeholder="Quantidade"]').type('{selectall}60')
        cy.contains('button', 'Confirmar').should('be.visible').click()
        cy.get('button').filter(':visible').contains(' Próximo').click()
        // Programação
        cy.wait(3000)
        cy.contains('button', ' Gerar Programação').click()
        cy.get('button').filter(':visible').contains(' Próximo').click()
        // Confrrmação
        cy.contains('button', ' Gravar').click()

        // Digitação Tamoxifeno 3
        // Seleção de protocolo
        cy.log('=== Pedido 2 ===')
        selecionarElemento(nomePaciente, 0)
        cy.contains('button', 'Digitação').click()
        cy.get('input[data-placeholder="Seleção de Protocolo..."]').type("TAMOXIFENO")
        cy.contains('span', ' TAMOXIFENO - TAMOXIFENO 20MG - CAIXA COM 30 COMPRIMIDOS - TOMAR 01 COMPRIMIDO/DIA ').click()
        cy.contains('span', ' TAMOXIFENO ').click()
        cy.contains('button', ' Próximo', { timeout: 5000 }).should('be.visible').click()
        // Configuração de principio ativo
        cy.get('input[data-placeholder="Médico"]', { timeout: 10000 }).click()
        cy.get('span.mat-option-text', { timeout: 10000 }).first().click()
        cy.contains('span', 'edit', { timeout: 5000 }).click()
        cy.get('input[data-placeholder="Quantidade"]').type('{selectall}60')
        cy.contains('button', 'Confirmar').should('be.visible').click()
        cy.get('button').filter(':visible').contains(' Próximo').click()
        // Programação
        cy.wait(3000)
        cy.contains('button', ' Gerar Programação').click()
        cy.get('button').filter(':visible').contains(' Próximo').click()
        // Confrrmação
        cy.contains('button', ' Gravar').click()
    });
})
