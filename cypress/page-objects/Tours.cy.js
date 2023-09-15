class Tours {

    ViewTour(tourname){
        cy.get('.tour-card-content h3')
        .contains(tourname)
        .scrollIntoView()
        .click();

        return cy.wrap(this.getProductProperties());
    }

    getProductProperties() {
        const properties = {};

        cy.get('.product-property').each(($property) => {
        const label = $property.find('.property-label').text().trim();
        const value = $property.find('.property-value').text().trim();
        console.log("Label: " + label, "Value: " + value);
        properties[label] = value;
        });

        return properties;
    }

}


export default Tours;   