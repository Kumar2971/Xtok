Feature: ChangePassword

    Scenario: User navigates to ChangePassword
        Given I am a User loading ChangePassword
        When I navigate to the ChangePassword
        Then ChangePassword will load with out errors
        And I can enter old password with out errors
        And I can enter new password with out errors
        And I can enter confirm password with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors