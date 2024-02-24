import Tours from './Tours.cy';
import  Review from './Review.cy'
import magnolia from '../fixtures/magnolia.json';





class TourBooking  {
    constructor() {
        // cy.url().should('include', magnolia.urls.tourBooking);
    }

    setSpecialMealRequirements(choice=false) {
        if (choice) {
            cy.get('#meal').select('Yes');
        } else {
            cy.get('#meal').select('No');
        }

        return this;
    }
    
    _setAmount(selector, amount) {
        if (!Number.isInteger(amount)) {
            throw new Error('Amount must be an integer');
        }
        cy.get(selector).clear().type(amount.toString());
        return this;
    }


    setAdults(amount) {
        this._setAmount('#adults', amount);
        return this;
    }

    setYouth(amount) {
        this._setAmount('#youth', amount);
        return this;
    }

             
    addAirportPickup() {
        cy.get('[value="pickup"]').click();
        return this;
    }

    addCarbonOffset() {
        cy.get('[value="co2"]').click();
        return this;
    }

    addSupportLocalCommunity() {
        cy.get('[value="support"]').click();
        return this;
    }

    Meals = class  {
        constructor() {
            cy.url().should('include', magnolia.urls.meals);
        }

        setMealOption(meal_label) {
            cy.contains('.form-item label', meal_label).click();
            return this;
        } 
        setAdditionalMealNotes(notes) {
            cy.get('#additionalMealNotes').type(notes)
            return this;
        }
        nextStep() {
            cy.get('[value="Next step"]').click();
            
            return new (new TourBooking().PersonalDetails)();
        }

    };

    PersonalDetails = class  {
        constructor() {
            cy.url().should('include', magnolia.urls.personalDetails);

            
        }
        setTitle(title="") {
            cy.get('#title').type(title);
            return this;
        }

        setFirstName(firstname) {
            cy.get('#firstName').type(firstname);
            return this;
        }

        setLastName(lastname) {
            cy.get('#lastName').type(lastname);
            return this;
        }

        setEmail(email) {
            cy.get('#email').type(email);
            return this;
        }

        setPhone(phone) {
            cy.get('#phone').type(phone);
            return this;
        }

        setCountry(country) {
            cy.get('#country').type(country);
            return this;
        }

        setCity(city) {
            cy.get('#city').type(city);
            return this;
        }

        setProvince(province) {
            cy.get('#province').type(province);
            return this;
        }

        setPostalOrZip(postalOrZip) {
            cy.get('#postalOrZip').type(postalOrZip);
            return this;
        }

        nextStep() {
            cy.get('[value="Next step"]').click();
            
            return new Review();
        }
    };

 
    previousStep() {
        cy.get('[value="Previous step"]').click();
        return this;
    }

    nextStep() {
        cy.get('[value="Next step"]').click();
        return new this.Meals();
    }


}

export default TourBooking;