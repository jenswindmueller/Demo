import magnolia from '../fixtures/magnolia.json';


class Review {
    constructor() {
        cy.url().should('include', magnolia.urls.review);   
    }

    confirmBooking() {
        cy.get('[type="submit"][value="Confirm Booking"]').click();
        return this;
    }

    previousStep() {
        cy.get('[value="Previous step"]').click();
        return this;
    }

    Summary  = class {
        constructor() {
            cy.url().should('include', magnolia.urls.summary);
        }


}

get Summary() {
        return new Summary();
    }

    get Youth(){
        return _getTableElement(1, 2);
    }

    get SpecialMealRequirements(){
        return _getTableElement(2, 2);
    }

    get Adults(){
        return _getTableElement(3, 2);
    }

    get MealOptions(){
        return _getTableElement(1, 2);
    }

    get FirstName(){
        return _getTableElement(1, 2);
    }

    get Email(){
        return _getTableElement(2, 2);
    }

    get LastName(){
        return _getTableElement(tableHeadingText, 3, 2);
    }

    _getTableElement(row, column) {    
        let tableHeading = cy.get('table > caption').cpntains(tableHeadingText);
        tableHeading.invoke('text').then((text) => {
            console.log('Table Heading: ' + text);
        });

        return cy.get('tbody > tr').eq(row).find('td').eq(column);
    }
}

export default Review;
