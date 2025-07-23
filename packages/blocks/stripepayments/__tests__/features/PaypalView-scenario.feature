Feature: PaypalView

    Scenario: User navigates to PaypalView
        Given I am a User loading PaypalView
        When I navigate to the PaypalView
        Then PaypalView will load with out errors
        And I can load webview with errors
        And I can load webview