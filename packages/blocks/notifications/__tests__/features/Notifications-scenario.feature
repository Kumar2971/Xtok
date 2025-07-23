

        Feature: Notifications

    Scenario: User navigates to Notifications
        Given I am a User loading Notifications
        When I navigate to the Notifications
        Then Notifications will load with out errors
        And update invite api fails to run successfully
        And update invite api runs successfully
        And I can leave the screen with out errors

   