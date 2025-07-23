Feature: comments

    Scenario: User navigates to Comments
        Given I am a User loading Comments
        When I navigate to the Comments
        Then Comments will load with out errors
        Then should call the appropriate methods based on the route params type
        And I can leave the screen with out errors

    Scenario: User navigates to Comments with params type profile
        Given I am a User loading Comments
        When I navigate to the Comments
        Then Comments will load with out errors
        And I can select following button without error
        And I can leave the screen with out errors
    
    Scenario: User navigates to Comments with params type post
        Given I am a User loading Comments
        When I navigate to the Comments
        Then Comments will load with out errors
        And I can select back button without error
        And I can leave the screen with out errors
    
    Scenario: User navigates to Comments with params type LikeActivity
        Given I am a User loading Comments
        When I navigate to the Comments
        And I can select back button without error
        And I can leave the screen with out errors
    
    Scenario: User navigates to Comments with params type CommentActivity
        Given I am a User loading Comments
        When I navigate to the Comments
        And I can select back button without error
        And I can load comments and reply with out error
        And I can leave the screen with out errors

    Scenario: User navigates to Comments with params type NotInterestedActivity
        Given I am a User loading Comments
        When I navigate to the Comments
        And I can select back button without error

    Scenario: User navigates to Comments with params type SavedActivity
        Given I am a User loading Comments
        When I navigate to the Comments
        And I can select back button without error

    Scenario: User navigates to Comments with params type SearchActivity
        Given I am a User loading Comments
        When I navigate to the Comments
        And I can select back button without error

    Scenario: User navigates to Comments with params type Notification
        Given I am a User loading Comments
        When I navigate to the Comments
        And I can select back button without error
     
    Scenario: User navigates to Comments with params type Notification with isFromNotification
        Given I am a User loading Comments
        When I navigate to the Comments
        And I can select back button without error

    Scenario: User navigates to Comments with params type bookmark
        Given I am a User loading Comments
        When I navigate to the Comments
        And I can select back button without error

    Scenario: User navigates to Comments with params type isCommentOn
        Given I am a User loading Comments
        When I navigate to the Comments
        And I can select back button without error

    Scenario: User navigates to Comments with params type SearchActivity with search trending
        Given I am a User loading Comments
        When I navigate to the Comments
        And I can select back button without error
    
    Scenario: User navigates to Comments with params type SearchActivity with search hastag
        Given I am a User loading Comments
        When I navigate to the Comments
        And I can select back button without error
    
    Scenario: User navigates to Comments with params type SearchActivity with search location top
        Given I am a User loading Comments
        When I navigate to the Comments
        And I can select back button without error
    
    Scenario: User navigates to Comments with params type SearchActivity with search location trending
        Given I am a User loading Comments
        When I navigate to the Comments
        And I can select back button without error

    Scenario: User navigates to Comments with params type SearchActivity with search location recent
        Given I am a User loading Comments
        When I navigate to the Comments
        And I can select back button without error