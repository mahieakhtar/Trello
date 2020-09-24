describe("Login", function () {
  it("Log In with incorrect creditionals", function () {
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
    cy.get("#password").type("mahie123432");
    //Click on Log in
    cy.get("#login-submit").contains("Log in").should("be.visible").click();
    //Find a create-first-board page
    cy.contains("Create a first board page", { timeout: 10000 }).should(
      "be.visible"
    );
  });
});
