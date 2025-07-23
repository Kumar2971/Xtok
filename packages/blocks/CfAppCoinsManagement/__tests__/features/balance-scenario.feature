Feature: Balance

    Scenario: User navigates to Balance
        Given I am a User loading Balance
        When I navigate to the Balance
        Then Balance will load with out errors
        And I can select back button with out errors
        And I can change index
        And I can enter text with out errors
        And Flatlist component will render
        And I can enter text with errors
        And I can select buy button with out errors
        And I can view the updated coins after In app purchase

 Scenario: User navigates to Balance with withdraw
        Given I am a User loading Balance
        When I navigate to the Balance
        Then Balance will load with out errors
        And I can change index
        And I can select back button with out errors
        And I can enter text with out errors
        And I can enter text with errors
        And I can select withdraw button with out errors
        And I can close modal

    Scenario: User navigates to Balance with history
        Given I am a User loading Balance
        When I navigate to the Balance
        Then Balance will load with out errors
        And Hitory list load with out errors
        And I can change index