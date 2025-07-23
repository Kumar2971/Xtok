Feature: LiveRecording

    Scenario: User navigates to LiveRecording
        Given I am a User loading LiveRecording
        When I navigate to the LiveRecording
        Then LiveRecording will load with out errors
        And I can load record list
        And I can leave the screen with out errors

    Scenario: User navigates to LiveRecording with empty List
        Given I am a User loading LiveRecording
        When I navigate to the LiveRecording
        Then LiveRecording will load with out errors
        And I can load record list
        And I can leave the screen with out errors