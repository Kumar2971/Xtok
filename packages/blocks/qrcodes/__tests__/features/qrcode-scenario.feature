Feature: qrcodes

    Scenario: User navigates to qrcodes
        Given I am a User loading qrcodes
        When I navigate to the qrcodes
        Then qrcodes will load with out errors
        And I can leave the screen with out errors