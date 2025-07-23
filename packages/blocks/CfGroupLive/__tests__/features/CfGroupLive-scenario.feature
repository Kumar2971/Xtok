Feature: CfGroupLive

    Scenario: User navigates to CfGroupLive
        Given I am a User loading CfGroupLive
        When I navigate to the CfGroupLive
        Then CfGroupLive will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors