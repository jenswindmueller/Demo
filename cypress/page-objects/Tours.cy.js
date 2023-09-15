import TourBooking from "./TourBooking.cy";

class Tours {

    ViewTour(tourname){
        cy.get('.tour-card-content h3')
        .contains(tourname)
        .scrollIntoView()
        .click();

        return this
    }

    getProductProperties() {
        const properties = {};

        cy.get('.product-property').each(($property) => {
        const label = $property.find('.property-label').text().trim();
        const value = $property.find('.property-value').text().trim();
        console.log("Label:" + label, "Value:" + value);
        properties[label] = value;
        });
    
        return properties;
    }

    BookTour(){
        cy.get('input[type="submit"][value="Book Tour"]')
        .click();

        return new TourBooking();
    }

}


export default Tours;   