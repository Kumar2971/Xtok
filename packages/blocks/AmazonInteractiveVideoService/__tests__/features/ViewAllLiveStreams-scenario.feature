Feature: ViewAllLiveStreams

    Scenario: User navigates to ViewAllLiveStreams
        Given I am a User loading ViewAllLiveStreams
        When I navigate to the ViewAllLiveStreams
        Then get current user data api
        And get live stage api fails
        And get live stage api runs successfully
        And get live stage challenge api fails
        And get live stage challenge api runs successfully