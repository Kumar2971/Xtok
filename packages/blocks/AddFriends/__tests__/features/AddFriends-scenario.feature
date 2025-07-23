Feature: AddFriends

    Scenario: User navigates to AddFriends
        Given I am a User loading AddFriends
        When I navigate to the AddFriends
        Then AddFriends will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors