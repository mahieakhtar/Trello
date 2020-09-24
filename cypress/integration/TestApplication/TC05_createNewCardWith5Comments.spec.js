describe("Login", function () {
  it("Log In with correct creditionals", function () {
    cy.visit("https://trello.com/login");

    //Find protocol
    cy.location("protocol").should("eq", "https:");
    // Fill a email address
    cy.get('input[id="user"]')
      .type("mahie.developer@gmail.com")
      .should("have.value", "mahie.developer@gmail.com");
    //Click on Log in with Atlassian
    cy.get("#login").contains("Log in with Atlassian").click();
    //Find cross site URL
    cy.url().should("include", "https://id.atlassian.com/login");

    // Fill a password
    cy.get("#password").type("mahie123");
    //Click on Log in
    cy.get("#login-submit").contains("Log in").should("be.visible").click();
    //Find a create-first-board page
    cy.contains("Create a first board page", { timeout: 10000 }).should(
      "be.visible"
    );
  });

  it("create a new board", function () {
    //Click first radio button
    cy.contains("Board name").click();
    cy.get('input[placeholder="e.g. Vacation Planning"]').type(
      "Test Application  with Cypress"
    );
    //Click second radio button
    cy.contains("List 1 name").click();
    //Click third radio button
    cy.contains("List 2 name").click();
    //Click fourth radio button
    cy.contains("List 3 name").click();
    //Click fifth radio button
    cy.contains("List 4 name").click();
    //Click on Now you're a pro! Keep building your board
    cy.get(".first-board-continue-footer is-active submit-footer")
      .contains("Now you're a pro! Keep building your board")
      .should("be.visible")
      .click();
    //Find recent created Board
    cy.contains("See the created board ", { timeout: 10000 }).should(
      "be.visible"
    );

    //Open created Board
    it("Open Boards", function () {
      cy.contains("Boards").click();
      cy.contains("Test Trello with Cypress").click();
      //Add a new card
      cy.get("Add a card").click();
      cy.get('input[placeholder="Enter a title for this card"]').type(
        "CypressTesting"
      );
      cy.contains("CypressTesting").click();
      //Add first comment
      cy.get('input[placeholder="Write a comment…"]').type("Comment1");
      cy.get('input[type="submit"]').contains("Save").click();
      //Add second comment
      cy.get('input[placeholder="Write a comment…"]').type("Comment2");
      cy.get('input[type="submit"]').contains("Save").click();
      //Add Third comment
      cy.get('input[placeholder="Write a comment…"]').type("Comment3");
      cy.get('input[type="submit"]').contains("Save").click();
      //Add fourth comment
      cy.get('input[placeholder="Write a comment…"]').type("Comment4");
      cy.get('input[type="submit"]').contains("Save").click();
      //Add fifth comment
      cy.get('input[placeholder="Write a comment…"]').type("Comment5");
      cy.get('input[type="submit"]').contains("Save").click();
    });
  });
});
