Feature: NotInterestedActivity

    Scenario: User navigates to NotInterestedActivity
        Given I am a User loading NotInterestedActivity
        When I navigate to the NotInterestedActivity
        Then NotInterestedActivity will load with out errors
        And should render FlatList correctly when notInterestedPosts has items
        And I can select the button with with out errors
        And I can leave the screen with out errors

        Scenario: User navigates to NotInterested 
        Given I am a User loading NotInterestedActivity
        When I navigate to the NotInterestedActivity
        Then NotInterestedActivity will load with out errors
        And I can leave the screen with out errors