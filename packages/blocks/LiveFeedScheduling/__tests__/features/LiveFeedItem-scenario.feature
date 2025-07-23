Feature: LiveFeedItem

    Scenario: User navigates to LiveFeedItem
        Given I am a User loading LiveFeedItem
        When I navigate to the LiveFeedItem
        Then LiveFeedItem will load with out errors
        And I can enter text with out errors
        And I can select the like button with out errors
        And I can leave the screen with out errors