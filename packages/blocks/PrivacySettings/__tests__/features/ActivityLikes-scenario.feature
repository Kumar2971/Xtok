Feature: ActivityLikes

    Scenario: User navigates to ActivityLikes
        Given I am a User loading ActivityLikes
        When I navigate to the ActivityLikes
        Then ActivityLikes will load with out errors
        And I can select the button with with out errors
        And should render FlatList correctly when likeActivityPosts has items
        And I can leave the screen with out errors

        Scenario: User navigates to Activity
        Given I am a User loading ActivityLikes
        When I navigate to the ActivityLikes
        Then ActivityLikes will load with out errors
        And I can leave the screen with out errors