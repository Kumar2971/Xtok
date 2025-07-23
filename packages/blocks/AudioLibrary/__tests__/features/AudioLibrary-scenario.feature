Feature: AudioLibrary

    Scenario: User navigates to AudioLibrary
        Given I am a User loading AudioLibrary
        When I navigate to the AudioLibrary
        Then AudioLibrary will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors