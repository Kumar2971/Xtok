Feature: ContentFlag

    Scenario: User navigates to ContentFlag
        Given I am a User loading ContentFlag
        When I navigate to the ContentFlag
        Then ContentFlag will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors