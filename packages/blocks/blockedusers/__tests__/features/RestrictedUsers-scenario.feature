Feature: RestrictedUsers

    Scenario: User navigates to RestrictedUsers
        Given I am a User loading RestrictedUsers
        When I navigate to the RestrictedUsers
        Then RestrictedUsers will load with out errors
        And I can leave the screen with out errors
