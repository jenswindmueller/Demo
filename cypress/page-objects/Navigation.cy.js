import SearchResults from "./SearchResults.cy";

class Navigation {
    Search(search_term) {
        cy.get('#nav-search').type(search_term + '{enter}');
        return new SearchResults();
    }

    getCurrentUser() {
        return cy.get('#user-links > a[href*="profile"]').invoke('text');
    }

    getCurrentLoginState() {
        return cy.get('#user-links > a[href*="login"]').invoke('text');
    }

    getActiveLanguage() {
        return cy.get('#language-link > ul li.active')
            .invoke('text');
    }
    

    setLanguageTo(language) {
        console.log(this.getActiveLanguage());
        if (this.getActiveLanguage() !== language) {
            cy.get('#language-link > ul li').contains(language).click();
        }
        return this;
    }

    NavigateTo(path_to_page) {
        const paths = path_to_page.split('>');
        let previous_url;

        for (const menu_item of paths) {
            cy.get('.nav.navbar-nav')
                .find('li a:contains(' + menu_item.trim() + ')')
                .eq(0)
                .click();
            
            // Only look for nav dropdown if the URL did not change.
            cy.url().then((url) => {
                if (previous_url === url) {
                    cy.get('.nav.navbar-nav > li').should('have.class', 'open');
                }
                previous_url = url;
            });
        }

        return this;
    }

    UrlContains(urlPart) {
        cy.url().should('contain', urlPart);
        return this;
    }
}

export default Navigation;