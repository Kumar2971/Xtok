Feature: Followers

    Scenario: User navigates to Followers
        Given I am a User loading Followers
        When I navigate to the Followers
        Then Followers will load without errors
        Then Followings will load without errors
        Then I can see more data by scrolling followings list
        Then Get Search explore data
        Then Get my followers
        Then Get my followings
        Then Fetch explore api gets called
        Then Request api user called
        And I can display list header
    Scenario: Followings type on Followers
        Given I am a User with Followings state
        When I navigate to the Followers
        Then I can click ownerbutton unfollow
    Scenario: Followers type on Followers
        Given I am a User with Followers state
        When I navigate to the Followers
        And I can display followers flatlist
        Then I can see more data by scrolling followers list
        Then I can enter text without errors
        Then I can leave the screen without errors
