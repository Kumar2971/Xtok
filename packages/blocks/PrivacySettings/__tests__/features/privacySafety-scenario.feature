Feature: privacySafety

    Scenario: User navigates to privacySafety
        Given I am a User loading privacySafety
        When I navigate to the privacySafety
        Then privacySafety will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors