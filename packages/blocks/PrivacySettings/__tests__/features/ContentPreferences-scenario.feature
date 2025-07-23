Feature: ContentPreferences

    Scenario: User navigates to ContentPreferences
        Given I am a User loading ContentPreferences
        When I navigate to the ContentPreferences
        Then ContentPreferences will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors