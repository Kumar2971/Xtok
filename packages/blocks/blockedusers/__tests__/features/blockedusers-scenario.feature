Feature: Blockedusers

    Scenario: User navigates to Blockedusers
        Given I am a User loading Blockedusers
        When I navigate to the Blockedusers
        Then Blockedusers will load with out errors
        Then I can check the success response BlockeduserApiCallId is receiving without error
        Then I can check the success response getRestrictedUsersApiCallId is receiving without error
        Then I can check the success response getMutedUsersApiCallId is receiving without error
        And I can leave the screen with out errors
