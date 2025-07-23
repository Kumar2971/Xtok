Feature: VolumeButton

    Scenario: User navigates to VolumeButton
        Given I am a User loading VolumeButton
        When I navigate to the VolumeButton
        Then VolumeButton will load with out errors
        And I can select mute button with out errors
