Feature: YourActivity

    Scenario: User navigates to YourActivity
        Given I am a User loading YourActivity
        When I navigate to the YourActivity
        Then YourActivity will load with out errors
        And I can enter text with out errors
        And I can press comment button with out errors
        And I can leave the screen with out errors