Feature: CommentActivity

    Scenario: User navigates to CommentActivity
        Given I am a User loading CommentActivity
        When I navigate to the CommentActivity
        Then CommentActivity will load with out errors
        And should render FlatList correctly when CommentActivity has items
        And I can select the button with with out errors 
        And I can leave the screen with out errors
 Scenario: User navigates to CommentActivity and
        Given I am a User loading CommentActivity
        When I navigate to the CommentActivity
        Then CommentActivity will load with out errors
        And I can leave the screen with out errors