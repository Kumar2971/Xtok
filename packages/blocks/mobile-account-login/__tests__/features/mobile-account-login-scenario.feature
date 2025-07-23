Feature: Mobile Phone Account Log In

    Scenario: User navigates to Mobile Log In
        Given I am a User attempting to Log In with a Mobile Phone
        When I navigate to the Log In Screen
        And I can enter a phone number with errors
        And I can enter a phone number with out errors
        And I can enter a password with out errors
        And I can toggle the Password Show/Hide with out errors
        And I can toggle the Remember Me with out errors
        And I can select the Log In button with out errors
        And I can select the Forgot Password button with out errors
        And I can select the signup button with out errors
        And I can leave the screen with out errors


  Scenario: User navigates to Email Log In
        Given I am a User attempting to Log In with an Email
        When I navigate to the Log In Screen
        And I can enter an Email id with errors
        And I can enter an Email id with out errors
        And I can enter a password with out errors
        And I can toggle the Remember Me with out errors
        And I can select the Log In button with out errors
        And I can leave the screen with out errors