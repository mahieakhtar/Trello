/// <reference types="Cypress"/>
describe("Login", function () {
  it("Log In with correct creditionals", function () {
    //Visit the URL
    cy.visit("https://trello.com/login");

    // Fill a email address
    cy.get('input[id="user"]')
      .type("mahie.developer@gmail.com")
      .should("have.value", "mahie.developer@gmail.com");
    cy.get("#login").contains("Log in with Atlassian").click();

    cy.request("POST", "https://trello.com/authenticate_openid", {
      user: "mahie.developer@gmail.com",
    }).then((response) => {
      // pulls out the location redirect
      const loc = response.headers["Location"];
      console.log("LOC" + loc);
      const result = JSON.parse(JSON.stringify(response.body));
      console.log("result" + result);
      // this will parse out the token from the url (assuming its in there)
      //const token = parseOutMyToken(loc);

      //you can do something with the token that your web application expects
      // the exaxt behavior as what your SSO does under the hood,
      // assuming that it handles query string tokens like this
      //cy.visit("https://id.atlassian.com/login?application=" + token);

      // if you do not need to work with the token you can sometimes visit the
      // location header directly
      cy.request("https://id.atlassian.com/login?application=" + loc);
    });

    cy.get('input[id="password"]')
      .type("mahie123")
      .should("have.value", "mahie123");
    cy.visit("https://trello.com/b/gEO1O9re/test-application-with-cypress");
    /*     cy.url().should("include", "id.atlassian.com/login");
    cy.get('input[id="password"]')
      .type("mahie123")
      .should("have.value", "mahie123");
    cy.get("#login-submit").contains("Log in").click(); */
  });
});
