Feature: Wallet

    Scenario: User navigates to Wallet
        Given I am a User loading Wallet
        When I navigate to the Wallet
        Then Wallet will load with out errors
        And navigate to Balance screen when Balance item is pressed 
        And navigate to Exchange screen when Exchange item is pressed 
        And I can leave the screen with out errors