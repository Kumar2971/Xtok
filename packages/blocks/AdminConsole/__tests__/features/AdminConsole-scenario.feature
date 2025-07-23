Feature: AdminConsole

    Scenario: User navigates to AdminConsole
        Given I am a User loading AdminConsole
        When I navigate to the AdminConsole
        Then AdminConsole will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors