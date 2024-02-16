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

       
    Summary = class {
        constructor() {
            cy.url().should('include', testdata.UrlReview);
        }
        
    }
}

export default Review;
