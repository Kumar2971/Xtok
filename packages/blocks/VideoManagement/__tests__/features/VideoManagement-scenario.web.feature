Feature: VideoManagement

    Scenario: User navigates to VideoManagement
        Given I am a User loading VideoManagement
        When I navigate to the VideoManagement
        Then VideoManagement will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors