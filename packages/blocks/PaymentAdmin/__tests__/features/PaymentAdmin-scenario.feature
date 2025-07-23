Feature: PaymentAdmin

    Scenario: User navigates to PaymentAdmin
        Given I am a User loading PaymentAdmin
        When I navigate to the PaymentAdmin
        Then PaymentAdmin will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors