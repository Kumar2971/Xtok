Feature: CfLiveChallengeSolo

    Scenario: User navigates to CfLiveChallengeSolo
        Given I am a User loading CfLiveChallengeSolo
        When I navigate to the CfLiveChallengeSolo
        Then CfLiveChallengeSolo will load with out errors
        And I can select add button
        And I can select end button
        And I can add comments with out errors
        And I can select profile button
        And I can search user with out errors
        And I can leave the screen with out errors