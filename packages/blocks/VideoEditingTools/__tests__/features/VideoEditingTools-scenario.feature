Feature: VideoEditingTools

    Scenario: User navigates to VideoEditingTools
        Given I am a User loading VideoEditingTools
        When I navigate to the VideoEditingTools
        Then VideoEditingTools will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors