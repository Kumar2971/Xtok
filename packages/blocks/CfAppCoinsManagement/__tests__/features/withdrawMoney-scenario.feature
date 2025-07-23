Feature: WithdrawMoney

    Scenario: User navigates to WithdrawMoney with email
        Given I am a User loading WithdrawMoney
        When I navigate to the WithdrawMoney
        Then WithdrawMoney will load with out errors
        And I can select back button with out errors
        And I can select Email button with out errors
        And I can enter email with errors
        And I can enter email with out errors
        And I can select withdraw button without error

     Scenario: User navigates to WithdrawMoney with mobile
        Given I am a User loading WithdrawMoney
        When I navigate to the WithdrawMoney
        Then WithdrawMoney will load with out errors
        And I can select mobile button with out errors
        And I can enter mobile number with errors
        And I can enter mobile number with out errors
        And I can select withdraw button without error
        