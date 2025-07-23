

Feature: CFSoloLiveviewer

    Scenario: User navigates to CFSoloLiveviewer
        Given I am a User loading CFSoloLiveviewer
        When I navigate to the CFSoloLiveviewer
        Then CFSoloLiveviewer will load with out errors
        And I can leave the screen with out errors
