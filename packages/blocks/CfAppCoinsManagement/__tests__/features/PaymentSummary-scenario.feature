Feature: PaymentSummary

    Scenario: User clicks continue button
        Given the PaymentSummary component is rendered
        When I navigate to the PaymentSummary screen
        Then PaymentSummary will load with out errors
        Then I can select the button with with out errors
        Then they should be navigated to StripeIntegration with correct props
       