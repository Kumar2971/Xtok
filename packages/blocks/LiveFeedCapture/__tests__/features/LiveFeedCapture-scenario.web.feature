Feature: LiveFeedCapture

    Scenario: User navigates to LiveFeedCapture
        Given I am a User loading LiveFeedCapture
        When I navigate to the LiveFeedCapture
        Then LiveFeedCapture will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors