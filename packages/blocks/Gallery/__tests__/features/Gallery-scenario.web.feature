Feature: Gallery

    Scenario: User navigates to Gallery
        Given I am a User loading Gallery
        When I navigate to the Gallery
        Then Gallery will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors