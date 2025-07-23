Feature: ModeratorView

    Scenario: User navigates to MuteViews
        Given I am a User loading MuteViews
        When I navigate to the MuteViews
        Then get all accounts list
        And get Muted Account list api gets called
        And component with comment muted
        And component will unmount