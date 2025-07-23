Feature: AmazonInteractiveVideoService

    Scenario: User navigates to AmazonInteractiveVideoService
        Given I am a User loading AmazonInteractiveVideoService
        When I navigate to the AmazonInteractiveVideoService
        Then fetching current logged in user data fails
        And successfully fetching current logged in user data
        And User broadcasts and starts live stream fails to start
        And create stage room in live stream fails to start
        And User broadcasts and successfully starts live stream
        And successfully created stage room live stream
        And createing stage room token and stage token fails
        And successfully created stage room token and stage token
        And User opens invitaion model and search
        And search api fails to search user
        And search api returns user accounts
        And on pressing end button
        And stop stream api fails
        And stop stream api runs successfully
        And delete channel room and stage fails
        And delete channel room and stage runs successfully
        And joined as a viewer
        And I can leave the screen with out errors