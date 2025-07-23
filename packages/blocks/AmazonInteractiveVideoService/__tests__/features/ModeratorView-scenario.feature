Feature: ModeratorView

    Scenario: User navigates to ModeratorView
        Given I am a User loading ModeratorView
        When I navigate to the ModeratorView
        Then getModerator api gets called
        And show data in flatlist
        And add moderator api gets called
        And component will unmount