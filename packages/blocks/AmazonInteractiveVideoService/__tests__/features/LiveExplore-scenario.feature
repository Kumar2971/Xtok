Feature: LiveExplore

    Scenario: User navigates to LiveExplore
        Given I am a User loading LiveExplore
        When I navigate to the LiveExplore
        Then get current user data api
        And get live stage challenge api fails
        And get live stage challenge api runs successfully
        And get live stage api failes to tun
        And get live stage api runs successfully