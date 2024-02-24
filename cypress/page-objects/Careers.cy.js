class Careers {
    constructor(urlPosition) {
        this.urlParts = urlPosition;
    }

    get url() {
        return cy.url();
    }

    get header() {
        return cy.get('.jumbotron h2').invoke('text');
    }

    isLoaded(){
        cy.url().should('contain', this.urlParts);
        //jumbotron and text-section should be visible
        cy
        .get('.jumbotron').should('be.visible')
        .get('.text-section').should('be.visible');
        return this; 
    }

}
export default Careers;