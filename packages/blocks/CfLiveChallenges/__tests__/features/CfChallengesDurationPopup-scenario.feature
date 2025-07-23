Feature: CfChallengesDurationPopup

    Scenario: User navigates to CfChallengesDurationPopup
        Given I am a User loading CfChallengesDurationPopup
        When I navigate to the CfChallengesDurationPopup
        Then CfChallengesDurationPopup will load with out errors
        And I can start 5 min challenge
        And I can start 10 min challenge
        And I can start 15 min challenge
        And I can leave the screen with out errors