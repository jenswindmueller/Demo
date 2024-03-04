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

    getSummary() {
        return new this.Summary();
    }

    Summary = class {
      

        get Youth(){
            // return this.TableElement("Book your tour",0, 1);
            return this.SummaryProperty("Book your tour", "Youth");
        }

        get SpecialMealRequirements(){
            return this.TableElement("Book your tour",1, 1);
        }

        get Adults(){
            return this.TableElement("Book your tour",2, 1);
        }
        
        get Upgrades(){
            return this.TableElement("Book your tour",3, 1);
        }

        get MealOptions(){
            return  this.TableElement("Meal",0, 2);
        }

        get AdditionalMealNotes(){
            return this.TableElement("Meal",0, 2);
        }

        get FirstName(){
            return this.TableElement("Personal Details",0, 2);
        }

        get Email(){
            return this.TableElement("Personal Details",0, 2);
        }

        get LastName(){
            return this.TableElement("Personal Details", 0, 2);
        }

        Summary(caption, summaryProperty) {
            // Find the table with the given caption
            cy.get('table').contains('caption', caption)
                .then((table) => {
                    // Within the found table, find the tr that contains the summaryProperty
                    cy.wrap(table).find('tbody > tr').contains('td', summaryProperty)
                        .then((tr) => {
                            // Log the entire row's text content
                            cy.log(tr.text());
                        });
                });
        }

        SummaryProperty(tableHeadingText, propertyName){
            let tableHeading = cy.get('table > caption').contains(tableHeadingText);
            return tableHeading.then(() => {
                cy.get('tbody > tr').contains(propertyName).next().invoke('text');
            });
        }

        TableElement(tableHeadingText, row, column) {    
            let tableHeading = cy.get('table > caption').contains(tableHeadingText);
            return tableHeading.invoke('text').then((text) => {
                cy.get('tbody > tr').eq(row).find('td').eq(column).invoke('text');
            });
        }
    }
}

export default Review;
