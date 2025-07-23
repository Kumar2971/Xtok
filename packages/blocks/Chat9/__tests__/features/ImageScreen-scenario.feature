Feature: ImageScreen

    Scenario: User navigates to ImageScreen
        Given I am a User loading ImageScreen
        When I navigate to the ImageScreen
        Then ImageScreen will load with out errors
        And I can leave the screen with out errors
