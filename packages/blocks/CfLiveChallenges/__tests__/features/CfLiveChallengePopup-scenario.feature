Feature: CfLiveChallengesPopUp

    Scenario: User navigates to CfLiveChallengesPopUp
        Given I am a User loading CfLiveChallengesPopUp
        When I navigate to the CfLiveChallengesPopUp
        Then CfLiveChallengesPopUp will load with out errors
        And I can start 1 versus 1 challenge
        And I can start 2 versus 2 challenge
        And I can start 3 versus 3 challenge
        And I can leave the screen with out errors