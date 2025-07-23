Feature: LoginSuccess

    Scenario: User navigates to LoginSuccess
        Given I am a User loading LoginSuccess
        When I navigate to the LoginSuccess
        Then LoginSuccess will load with out errors
        Then I can click on go to feed 
        And I can leave the screen with out errors