Feature: HashTagScreen

    Scenario: User navigates to HashTagScreen
        Given I am a User loading HashTagScreen
        When I navigate to the HashTagScreen
        Then HashTagScreen will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And Get trending content with success
        And Get trending content with errors
        And Get recent content with success
        And Get recent content with errors
        And Get top content with errors
        And I can leave the screen with out errors
