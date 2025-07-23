

        Feature: FollowRequest

    Scenario: User navigates to FollowRequest
        Given I am a User loading FollowRequest
        When I navigate to the FollowRequest
        Then FollowRequest will load with out errors
        And I can leave the screen with out errors
