import { testurl } from "../fixtures/magnolia.json";


class Login {


    RunMagnolia() {
        cy.visit(testurl, { failOnStatusCode: false });
    }

    AwaitLoginError() {
        cy.get('#validation-bubble').should('not.exist');
        return this;
    }

    LandingpageLoadedSuccessfully() {

        cy.get("div.navbar-spacer").should('be.visible');
        cy.get("div.carousel-caption").should('be.visible');
        cy.window().then((win) => {
            win.addEventListener('unhandledrejection', (event) => {
                throw event.reason;
            });
        });

        console.log('Login page loaded successfully');
        return this;
    }

    TypePassword(password) {
        cy.get('input[placeholder="Password"]').type(password);
    }

    TypeUsername(username) {
        cy.get('input[placeholder="Username"]').type(username);
    }

    ClickLogin() {
        cy.get('form button:contains("Login")').click();
    }

    LoginAs(username, password) {
        this.TypePassword(password);
        this.TypeUsername(username);
        this.ClickLogin();

        return this;
    }

}

export default Login;