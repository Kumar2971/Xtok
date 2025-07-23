Feature: SavedActivity

    Scenario: User navigates to SavedActivity
        Given I am a User loading SavedActivity
        When I navigate to the SavedActivity
        Then SavedActivity will load with out errors
        And should render FlatList correctly when savedActivityPosts has items
        And I can select the button with with out errors
        And I can leave the screen with out errors
       
 Scenario: User navigates to SavedActivity screen
        Given I am a User loading SavedActivity
        When I navigate to the SavedActivity
        Then SavedActivity will load with out errors
        And I can leave the screen with out errors