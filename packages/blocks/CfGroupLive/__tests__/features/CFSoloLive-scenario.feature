Feature: CFSoloLive

    Scenario: User navigates to CFSoloLive
        Given I am a User loading CFSoloLive
        When I navigate to the CFSoloLive
        Then CFSoloLive will load with out errors
        And I can leave the screen with out errors
