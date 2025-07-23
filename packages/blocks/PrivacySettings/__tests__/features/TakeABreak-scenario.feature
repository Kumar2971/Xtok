Feature: TakeABreak

    Scenario: User navigates to TakeABreak
        Given I am a User loading TakeABreak
        When I navigate to the TakeABreak
        Then TakeABreak will load with out errors 
        And should render the toggle reminder button correctly
        And I can leave the screen with out errors

        Scenario: User navigates to TakeABreak for IOS
        Given I am a User loading TakeABreak
        When I navigate to the TakeABreak
        Then TakeABreak will load with out errors 
        And should render the toggle reminder button correctly
        And I can leave the screen with out errors