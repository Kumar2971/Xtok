Feature: Exchange

    Scenario: User navigates to Exchange
        Given I am a User loading Exchange
        When I navigate to the Exchange
        Then Exchange will load with out errors
        And I can select back button with with out errors
        And I can select exchange for coin button with with out errors
        And I can select withdraw button with with out errors
        And I can make API Calls

       