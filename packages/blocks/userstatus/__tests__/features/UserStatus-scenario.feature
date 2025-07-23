Feature: UserStatus

    Scenario: User navigates to UserStatus
        Given I am a User loading UserStatus
        When I navigate to the UserStatus
        Then UserStatus will load with out errors
        And I can leave the screen with out errors