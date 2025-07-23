Feature: LiveStreaming

    Scenario: User navigates to LiveStreaming
        Given I am a User loading LiveStreaming
        When I navigate to the LiveStreaming
        Then fetching current logged in user data fails
