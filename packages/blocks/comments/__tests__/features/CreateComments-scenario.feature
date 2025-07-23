Feature: CreateComment

    Scenario: User navigates to CreateComment with out web
        Given I am a User loading CreateComment
        When I navigate to the CreateComment
        Then CreateComment will load with out errors
        Then I can add comment with out errors
        And I can leave the screen with out errors
    
    Scenario: User navigates to CreateComment with web
        Given I am a User loading CreateComment
        When I navigate to the CreateComment
        Then CreateComment will load with out errors
        Then I can add comment with out errors
        And I can leave the screen with out errors