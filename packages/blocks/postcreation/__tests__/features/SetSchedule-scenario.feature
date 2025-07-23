Feature: SetSchedule

    Scenario: User navigates to SetSchedule
        Given I am a User loading SetSchedule
        When I navigate to the SetSchedule
        Then SetSchedule will load with out errors
        And I can select back button with out errors
        And I can select timing with out errors
        And I can select submit button with out errors