/// <reference types="Cypress"/>
// describe("Login", function () {
//   it("Log In with correct creditionals", function () {
//     //Visit the URL
//     cy.visit("https://trello.com/login");

//     // Fill a email address
//     cy.get('input[id="user"]')
//       .type("mahie.developer@gmail.com")
//       .should("have.value", "mahie.developer@gmail.com");
//     cy.get("#login").contains("Log in with Atlassian").click();

//     cy.request({
//       method: 'POST',
//       url: "https://trello.com/authenticate_openid",
//       failOnStatusCode : false,
//       form: true,
//       body : {
//         user: "mahie.developer@gmail.com",
//       }
//     }).then((response) => {
//       // pulls out the location redirect
//       const loc = response.headers["Location"];
//       console.log("LOC" + loc);
//       const result = JSON.parse(JSON.stringify(response.body));
//       console.log("result" + result);
//       // this will parse out the token from the url (assuming its in there)
//       //const token = parseOutMyToken(loc);

//       //you can do something with the token that your web application expects
//       // the exaxt behavior as what your SSO does under the hood,
//       // assuming that it handles query string tokens like this
//       //cy.visit("https://id.atlassian.com/login?application=" + token);

//       // if you do not need to work with the token you can sometimes visit the
//       // location header directly
//       cy.request("https://id.atlassian.com/login?application=" + loc);
//     });

//     cy.get('input[id="password"]')
//       .type("mahie123")
//       .should("have.value", "mahie123");
//     cy.visit("https://trello.com/b/gEO1O9re/test-application-with-cypress");
//     /*     cy.url().should("include", "id.atlassian.com/login");
//     cy.get('input[id="password"]')
//       .type("mahie123")
//       .should("have.value", "mahie123");
//     cy.get("#login-submit").contains("Log in").click(); */
//   });
// });

context("Authentication", () => {
  it("Login using Atlassian", () => {
    cy.visit("https://trello.com/login");
    cy.get('input[id="user"]')
      .type("mahie.developer@gmail.com")
      .get('input[id="login"]')
      .contains("Log in with Atlassian")
      .click();
    cy.url().should(
      "include",
      "https://id.atlassian.com/login?application=trello&continue=https%3A%2F%2Ftrello.com%2Fauth%2Fatlassian%2Fcallback%3FreturnUrl%3D%252F%26display%3D&email=mahie.developer%40gmail.com&errorCode&login_hint=mahie.developer%40gmail.com&restrict=true"
      //"https://id.atlassian.com/login/callback?application=trello&continue=https%3A%2F%2Ftrello.com%2Fauth%2Fatlassian%2Fcallback%3FreturnUrl%3D%252F%26display%3D&email=mahie.developer%40gmail.com&errorCode=&login_hint=mahie.developer%40gmail.com&restrict=true&code=kSPFG1rtPm6jvAk3&state=eyJjc3JmVG9rZW4iOiJmM2ZjMzk4YjQyNTcwMWQ1MWQyZTJmNDRiNThjMjRiZGVmMDkzZmQ1In0%3D"
    );
    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).to.include("something about the error");
      // using mocha's async done callback to finish
      // this test so we prove that an uncaught exception
      // was thrown
      done();
      // return false to prevent the error from
      // failing this test
      return false;
    });
    cy.get('input[id="password"]').type("mahie123");
    cy.get("#login-submit").click();
    cy.screenshot();
    cy.get("#try-again-button").click();
    cy.reload();
  });
});
