Feature: CfLiveChallenges

    Scenario: User navigates to CfLiveChallenges
        Given I am a User loading CfLiveChallenges
        When I navigate to the CfLiveChallenges
        Then CfLiveChallenges will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors