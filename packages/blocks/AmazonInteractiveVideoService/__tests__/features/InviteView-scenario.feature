Feature: InviteView

    Scenario: User navigates to InviteView
        Given I am a User loading InviteView
        When I navigate to the InviteView
        Then get guest or cohost accounts lists api fails
        And get guest or cohost accounts lists api runs successfully
        And user can invite guest
    Scenario: User navigates to Chohost InviteView
        Given I am a User loading InviteView
        When I navigate to the InviteView
        Then get cohost list on initial time