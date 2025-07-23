Feature: NewPassword

    Scenario: User navigates to NewPassword
        Given I am a User loading NewPassword
        When I navigate to the NewPassword
        Then NewPassword will load with out errors
        And I can leave the screen with out errors
