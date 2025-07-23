Feature: Selectaudience

    Scenario: User navigates to Selectaudience
        Given I am a User loading Selectaudience
        When I navigate to the Selectaudience
        Then Selectaudience will load with out errors
        And I can select back button with out errors
        And I can select audience with out errors