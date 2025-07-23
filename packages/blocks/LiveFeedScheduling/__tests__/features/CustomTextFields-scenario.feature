Feature: CustomTextFields

    Scenario: User navigates to CustomTextFields
        Given I am a User loading CustomTextFields
        When I navigate to the CustomTextFields
        Then CustomTextFields will load with out errors
        And I can enter text with out errors
        And I can select the like button with out errors
        And I can leave the screen with out errors