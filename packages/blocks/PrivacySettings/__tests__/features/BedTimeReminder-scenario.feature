Feature: BedTimeReminder

    Scenario: User navigates to BedTimeReminder
        Given I am a User loading BedTimeReminder
        When I navigate to the BedTimeReminder
        Then BedTimeReminder will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors   
        And I can leave the screen with out errors 

    Scenario: User navigates to BedTimeReminder for IOS
        Given I am a User loading BedTimeReminder
        When I navigate to the BedTimeReminder
        Then BedTimeReminder will load with out errors
        And I can leave the screen with out errors