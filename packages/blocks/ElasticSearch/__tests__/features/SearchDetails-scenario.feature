Feature: SearchDetails

    Scenario: User navigates to SearchDetails
        Given I am a User loading SearchDetails
        When I navigate to the SearchDetails
        Then SearchDetails will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors