Feature: MutedUsers

    Scenario: User navigates to MutedUsers
        Given I am a User loading MutedUsers
        When I navigate to the MutedUsers
        Then MutedUsers will load with out errors
        And I can leave the screen with out errors
