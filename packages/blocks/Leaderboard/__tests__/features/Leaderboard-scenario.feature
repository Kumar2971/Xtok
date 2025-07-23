Feature: Leaderboard

    Scenario: User views the Leaderboard
        Given I am a User
        When I access the Leaderboard
        Then the Leaderboard loads successfully
        And the leaderboard api has "Invalid time range parameter" result
        And the leaderboard api has "please donate something first" result
        And the live stream acceptor API request is made
        And the live stream donator API request is made
        And test action sheet for donations
        And click the back button
        Then I can exit the screen without encountering any errors
