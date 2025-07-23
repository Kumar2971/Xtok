Feature: PrivacyPolicy

    Scenario: User navigates to PrivacyPolicy
        Given I am a User loading PrivacyPolicy
        When I navigate to the PrivacyPolicy
        Then PrivacyPolicy will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors