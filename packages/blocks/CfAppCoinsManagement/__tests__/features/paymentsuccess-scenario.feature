Feature: paymentsuccess

    Scenario: User navigates to PaymentSuccess
        Given I am a User loading PaymentSuccess
        When I navigate to the PaymentSuccess
        Then PaymentSuccess will load with out errors
        And I can select the success with with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to PaymentSuccess with fail
        Given I am a User loading PaymentSuccess
        When I navigate to the PaymentSuccess
        Then PaymentSuccess will load with out errors
        And I can select the success with with out errors
        And I can leave the screen with out errors
