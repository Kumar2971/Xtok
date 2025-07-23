Feature: ManageAccount

    Scenario: User navigates to ManageAccount
        Given I am a User loading ManageAccount
        When I navigate to the ManageAccount
        Then ManageAccount will load with out errors
        And user can navigate to PersonalInformation
        And user can navigate to ChangePassword
        And user can navigate to BreakReminder
        And user can navigate to bedTimeReminder
        And user can add or Switch Account
        And user can log out 
        And user can logout All Accounts
        And user can delete Account
        And I can leave the screen with out errors