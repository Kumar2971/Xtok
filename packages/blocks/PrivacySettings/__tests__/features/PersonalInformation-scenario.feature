Feature: PersonalInformation

    Scenario: User navigates to PersonalInformation
        Given I am a User loading PersonalInformation
        When I navigate to the PersonalInformation
        Then PersonalInformation will load with out errors
        And I can enter text with out errors
        And I can receive notification with out errors
        And I can leave the screen with out errors