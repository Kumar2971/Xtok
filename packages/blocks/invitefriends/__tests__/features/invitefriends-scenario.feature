Feature: invitefriends

    Scenario: User navigates to invitefriends
        Given I am a User loading invitefriends
        When I navigate to the invitefriends
        Then invitefriends will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors