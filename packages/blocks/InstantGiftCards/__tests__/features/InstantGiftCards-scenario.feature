Feature: InstantGiftCards

    Scenario: User navigates to InstantGiftCards
        Given I am a User loading InstantGiftCards
        When I navigate to the InstantGiftCards
        Then InstantGiftCards will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors