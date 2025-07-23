Feature: LiveStreaming

    Scenario: User navigates to LiveStreaming
        Given I am a User loading LiveStreaming
        When I navigate to the LiveStreaming
        Then fetching current logged in user data fails
        And successfully fetching current logged in user data
        And create stage room in live stream fails to start
        And successfully created stage room live stream
        And createing stage room token and stage token fails
        And successfully created stage room token and stage token
        And I can invite guest
        And I can start the live challenge with one vs one
        And I can start the live challenge with two vs two
        And I can follow a user by taping grid
        And I can follow a viewer by taping grid
        And I can see maximum invitation limit reached alert
        And User can able to gift to participant
        And I can see the following status as a viewer
        And mute user api calls
        And api calls with stage
        And unfollow user api
        And stop stream api fails
        And stop stream api runs successfully
        And As a host I can view summary screen after ended the stream
        And I can render add moderator button
        And I can close the summary screen

    Scenario: User navigates to LiveStreaming with params
        Given I am a User loading LiveStreaming
        When I navigate to the LiveStreaming
        Then fetching current logged in user data fails
        And successfully fetching current logged in user data
        And create stage room in live stream fails to start
        And successfully created stage room live stream
        And createing stage room token and stage token fails
        And successfully created stage room token and stage token
        And I can invite guest
        And I can start the live challenge with one vs one
        And I can start the live challenge with two vs two
        And I can follow a user by taping grid
        And I can follow a viewer by taping grid
        And I can see maximum invitation limit reached alert
        And I can see the following status as a viewer
        And mute user api calls
        And api calls with stage
        And unfollow user api
        And stop stream api fails
        And stop stream api runs successfully
        And As a host I can view summary screen after ended the stream
        And I can close the summary screen