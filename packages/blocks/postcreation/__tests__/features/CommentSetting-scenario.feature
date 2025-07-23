Feature: CommentSetting

    Scenario: User navigates to CommentSetting
        Given I am a User loading CommentSetting
        When I navigate to the CommentSetting
        Then CommentSetting will load with out errors
        And I can select back button with with out errors
        And I can select set comment button with out errors

       