Feature: SearchUserList

    Scenario: User navigates to SearchUserList
        Given I am a User loading SearchUserList
        When I navigate to the SearchUserList
        Then SearchUserList will load with out errors
        And i can backpress with out errors
        And I can leave the screen with out errors
