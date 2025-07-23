Feature: Theme

    Scenario: User navigates to Theme
        Given I am a User loading Theme
        When I navigate to the Theme
        Then Theme will load with out errors
        And toggles Theme switch when clicked
        And I can leave the screen with out errors