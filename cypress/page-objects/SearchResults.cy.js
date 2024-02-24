import Careers from './Careers.cy.js';

class SearchResults {

    constructor() {
        
    }
    getResultTextByHeading(heading) {
        
        return cy.xpath('//h4[@class="list-group-item-heading" and text()="' + heading + '"]//following-sibling::div[@class="excerpt"]//span[@class="excerpt-fragment"]').invoke('text'); 
        
    }

    getResultsAsText() {
        return cy.get('.list-group').invoke('text');
    }

    clickOnResultHeading(heading) {
        cy.xpath('//a[@class="list-group-item"]//h4[text()="' + heading + '"]').click({ force: true });
        return new Careers('about/careers');
    }


}

export default SearchResults;