Feature: ExchangeForCoins

    Scenario: User navigates to ExchangeForCoins
        Given I am a User loading ExchangeForCoins
        When I navigate to the ExchangeForCoins
        Then ExchangeForCoins will load with out errors
        And I can enter text with out errors
        And I can select the button3 with with out errors
        And I can select the button4 with with out errors
        And Flatlist component will render
        And I can enter text with errors
        And I can make API Calls

    Scenario: User exchange coin with insufficient balance
        Given I am a User loading ExchangeForCoins
        When I navigate to the ExchangeForCoins
        Then ExchangeForCoins will load with out errors
        And I can enter text with out errors
        And I can select exchange coin button with out error
    
        
   