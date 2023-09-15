
import Login from '../page-objects/Login.cy.js';
import Navigation from '../page-objects/Navigation.cy.js';
import magnolia from '../fixtures/magnolia.json';
import SearchResults from '../page-objects/SearchResults.cy.js';
import Tours from '../page-objects/Tours.cy.js';
import Careers from '../page-objects/Careers.cy.js';



const login = new Login();
const nav = new Navigation();   
const search = new SearchResults(); 
const tours = new Tours(); 

describe('Magnolia Travels Test - Demo Version For Applications', () => {

    beforeEach(() => {
        login.RunMagnolia();     
        login.LoginAs(magnolia.username, magnolia.password);
      });
    
    it('Verify Login was successfull', () => {
        login.AwaitLoginError();
    });

    it('Landingpage loaded successfully', () => {
        login.LandingpageLoadedSuccessfully();
        cy.url().should('equal', magnolia.testurl);
    });

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
        const language_before = nav.getActiveLanguage();
        language_before.should('equal', 'English');
        nav.setLanguageTo('German');
        const language_after = nav.getActiveLanguage();
        language_after.should('equal', 'German');      
    });

    it('Verify that the search for "Europe" yields proper results', () => {
           
        let EuropeSearch = nav.Search('Europe');
        EuropeSearch.getResultTextByHeading('Careers').should('contains', 'Travels also has offices in the US, Dubai, Hong Kong and across');
        EuropeSearch.getResultTextByHeading('Contact').should('contains', 'bottom below medium Europe, Middle East & Africa');
        EuropeSearch.getResultTextByHeading('An island hideaway in Europe').should('contains', 'Europe Athens, Greece');
        
    });  

    it('Verify that search results are clickable', () => {
        let EuropeSearch = nav.Search('Europe');
        EuropeSearch.clickOnResultByHeading('Careers');
        new Careers('about/careers').isLoaded();
    });  
        //funktioniert noch nicht. touroptionen können noch nicht verifiziert werden. 
    it('Verify Tour Options', () => {  
        nav.NavigateTo('Tours > Active');
       const tourProperties = tours.ViewTour('Hut to Hut in the Swiss Alps')
        // console.log('Tour:' + tourProperties);

    });

    it.only('Verify Tour Is Bookable', () => {  
        nav.NavigateTo('Tours > Active');
        tours.ViewTour('Hut to Hut in the Swiss Alps').BookTour()
        .Adults(2)
        .Youth(1)
        .SpecialMealRequirements(true)
        .upgrades.addAirportPickup();
    });

});
