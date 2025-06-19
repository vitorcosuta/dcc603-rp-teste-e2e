describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Edita uma tarefa', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]')
      .type('Jogar videogame{enter}');

    cy.get('[data-cy=todos-list] li')
      .should('be.visible')
      .first()
      .as('editedTodoItem');

    cy.get('@editedTodoItem')
      .dblclick();

    cy.get('@editedTodoItem')
        .find('.edit')
        .should('be.visible')
        .clear()
        .type('Estudar para a prova{enter}');

    cy.get('[data-cy=todos-list]')
      .children('li')
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] li')
      .first()
      .should('have.text', 'Estudar para a prova');
  });

  it('Completar e descompletar tarefas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Estudar para a prova{enter}')
      .type('Lavar a louça{enter}')
      .type('Lavar o cabelo{enter}');

    cy.get('[data-cy=toggle-todo-checkbox]')
      .each(($checkbox) => {
        cy.wrap($checkbox).click({ force: true });
      });

    cy.get('[data-cy=todos-list] li')
      .each(($li) => {
        cy.wrap($li).should('have.class', 'completed');
      });

    cy.get('[data-cy=toggle-todo-checkbox]')
      .each(($checkbox) => {
        cy.wrap($checkbox).click({ force: true });
      });

    cy.get('[data-cy=todos-list] li')
      .each(($li) => {
        cy.wrap($li).should('not.have.class', 'completed');
      });
  });

  it('Apagar tarefas completas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Estudar para a prova{enter}')
      .type('Lavar a louça{enter}')
      .type('Lavar o cabelo{enter}');

    cy.get('[data-cy=todos-list] > li')
      .eq(0)
      .find('[data-cy=toggle-todo-checkbox]')
      .click();

    cy.get('[data-cy=todos-list] > li')
      .eq(2)
      .find('[data-cy=toggle-todo-checkbox]')
      .click();

    cy.get('button.clear-completed')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Lavar a louça');
  });
});