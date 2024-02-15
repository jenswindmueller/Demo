class SearchResults {

    constructor() {
        
    }
    getResultTextByHeading(heading) {
        
        return cy.xpath('//h4[@class="list-group-item-heading" and text()="' + heading + '"]//following-sibling::div[@class="excerpt"]//span[@class="excerpt-fragment"]').invoke('text'); 
        
    }

    getResultsAsText() {
        return cy.get('.list-group').invoke('text');
    }

    clickOnResultByHeading2(heading) {
        cy.get('h4')

        .contains(heading)
        // for some strange reason cypress scrolls down when using contains()
        // which may cause an element to be moved behind another preventing it from being clicked 
        // by traveling back to the parent twice whis problem is circumvented
        .parent()
        .parent()
        .click(); 
        return this;
    }

    clickOnResultByHeading(heading) {
        cy.xpath('//a[@class="list-group-item"]//h4[text()="' + heading + '"]').click({ force: true });
        return this;
    }


}

export default SearchResults;