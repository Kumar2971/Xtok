Feature: LiveEvent

    Scenario: User navigates to LiveEvent
        Given I am a User loading LiveEvent
        When I navigate to the LiveEvent
        Then LiveEvent will load with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors