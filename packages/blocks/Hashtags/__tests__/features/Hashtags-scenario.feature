Feature: Hashtags

    Scenario: User navigates to Hashtags
        Given I am a User loading Hashtags
        When I navigate to the Hashtags
        Then Hashtags will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors