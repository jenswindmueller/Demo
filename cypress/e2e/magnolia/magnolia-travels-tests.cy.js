import Login from '../../page-objects/Login.cy.js';
import Navigation from '../../page-objects/Navigation.cy.js';
import SearchResults from '../../page-objects/SearchResults.cy.js';
import Tours from '../../page-objects/Tours.cy.js';
import TourBooking from '../../page-objects/TourBooking.cy.js';
import magnolia from '../../fixtures/magnolia.json';
import {personalDetails} from '../../fixtures/testdata.json';



const login = new Login();
const nav = new Navigation();   
const search = new SearchResults(); 
const tours = new Tours(); 
const tourBooking = new TourBooking();

context('Magnolia Travels Test - Demo Version For Applications', () => {

    beforeEach(() => {
        login.RunMagnolia();     
        login.LoginAs(magnolia.username, magnolia.password);
        login.AwaitLoginError();
      });

    
    describe('Landing Page', () => {
        it('Landing page loaded successfully', () => {
            login.LandingpageLoadedSuccessfully();
            cy.url().should('equal', magnolia.testurl);
        });
    });

    describe('Menu', () => {
        it('Verify that the navigation menu works', () => {
            nav.NavigateTo('Tours > Active').UrlContains('active');
            nav.NavigateTo('Tours > Beach').UrlContains('beach');
            nav.NavigateTo('Tours > Cultural');
            nav.NavigateTo('Destinations > Polar');
            nav.NavigateTo('Stories');
            nav.NavigateTo('About');
            nav.NavigateTo('Contact');
            nav.NavigateTo('Members');
        });   

        it('Verify that the language menu works', () => {
            const language_before = nav.getActiveLanguage().should('equal', 'English');
            //language_before.should('equal', 'English');
            nav.setLanguageTo('German');
            const language_after = nav.getActiveLanguage().should('equal', 'German');
            language_after.should('equal', 'German');      
        });
    });

    describe('SearchResults', () => {
        it('Verify that the search for "Europe" yields proper results', () => {
               
            let EuropeSearch = nav.Search('Europe');
            EuropeSearch.getResultTextByHeading('Careers').should('contains', 'Travels also has offices in the US, Dubai, Hong Kong and across');
            EuropeSearch.getResultTextByHeading('Contact').should('contains', 'bottom below medium Europe, Middle East & Africa');
            EuropeSearch.getResultTextByHeading('An island hideaway in Europe').should('contains', 'Europe Athens, Greece');
            
        });  

        it('Verify that search results are clickable', () => {
            let EuropeSearch = nav.Search('Europe');
            EuropeSearch.clickOnResultHeading('Careers').isLoaded();

        });  
        
    });
        describe('Tour Options', () => {
            it('Verify Tour Options', () => {  
                nav.NavigateTo('Tours > Active');
                const tourProperties = tours.ViewTour('Hut to Hut in the Swiss Alps');
                // console.log('Tour:' + tourProperties);
            });
        });
            
        
    describe('Tour Booking', () => {
        it.only('Verify Tour Is Bookable', () => {  
            nav.NavigateTo('Tours > Active');
            const Booking = tours.ViewTour('Go Fly a Kite').BookTour()
                .setAdults(2)
                .setYouth(1)
                .addAirportPickup()
                .addCarbonOffset()
                .setSpecialMealRequirements(true)
                .nextStep()
                    .setMealOption('Halal')
                    .setAdditionalMealNotes('Make it tasty')
                    .nextStep()
                        .setTitle(personalDetails.title)
                        .setFirstName(personalDetails.firstName)
                        .setLastName(personalDetails.lastName)
                        .setEmail(personalDetails.email)
                        .setPhone(personalDetails.phone)
                        .setCity(personalDetails.city)
                        .setCountry(personalDetails.country)
                        .setPostalOrZip(personalDetails.postalOrZip)
                        .setProvince(personalDetails.province)
                        .nextStep()
                            .Youth.should('equal', '2')
                            .Adults.should('equal', '1')
                            .SpecialMealRequirements.should('equal', 'Yes')
                            .MealOptions.should('equal', 'Halal');
        });
    });

});
