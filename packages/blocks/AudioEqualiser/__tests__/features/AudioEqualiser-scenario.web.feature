Feature: AudioEqualiser

    Scenario: User navigates to AudioEqualiser
        Given I am a User loading AudioEqualiser
        When I navigate to the AudioEqualiser
        Then AudioEqualiser will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors