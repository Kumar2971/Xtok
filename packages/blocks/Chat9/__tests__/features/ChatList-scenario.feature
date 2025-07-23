Feature: ChatList

    Scenario: User navigates to ChatList
        Given I am a User loading ChatList
        When I navigate to the ChatList
        Then ChatList will load with out errors
        And I can leave the screen with out errors
