Feature: WithdrawSuccess

    Scenario: User navigates to ExchangeForCoins
        Given I am a User loading ExchangeForCoins
        When I navigate to the ExchangeForCoins
        Then ExchangeForCoins will load with out errors
        And I can select the go to feed button with with out errors
        And I can leave the screen with out errors