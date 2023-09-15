class TourBooking extends Tours{

    set SpecialMealRequirements(choice=false) {

    }
    set Adults(amount) {
    }

    set Youth(youth) {
    }

    #Upgrades = class { 
            addAirportPickup() {

            }

            addCarbonOffset() {
                
            }

            addSupportLocalCommunity() {
                
            }
    }

    #MealOptions = class {
        set MealOption(meal_label) {
            //click the radiobutton that contains the meal_label

        }

        set AdditionalMealNotes(notes) {
            //type the notes into the notes input field
        }
        
    }

    confirmBooking() {
        cy.get('body').invoke('text').then((text) => {
            if (text.includes('error')) {
              throw new Error('Booking confirmation failed');
            }
          });

        return cy.get('body').invoke('text');
    }

    previousStep() {
        //click the previous step button
    }

    nextStep() {
        //click the next step button
    }

    #personalDetails = class {
        set Title(title="") {
            //select the title from the dropdown
        }

        set FirstName(firstname) {
            //type the firstname into the firstname input field
        }

        set LastName(lastname) {
            //type the lastname into the lastname input field
        }

        set Email(email) {
            //type the email into the email input field
        }

        set Phone(phone) {
            //type the phone into the phone input field
        }

        set Country(country) {
            //type the address into the address input field
        }

        set City(city) {
            //type the city into the city input field
        }

        set Province(province) {
            //type the state into the state input field
        }

        set Zip(zip) {
            //type the zip into the zip input field
        }

        set Country(country) {
            //select the country from the dropdown
        }

        set SpecialRequirements(requirements) {
            //type the requirements into the requirements input field
        }

        set AdditionalNotes(notes) {
            //type the notes into the notes input field
        }
    }
}

export default TourBooking;