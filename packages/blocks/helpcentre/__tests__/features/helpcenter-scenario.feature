Feature: helpcenter

    Scenario: User navigates to helpcenter
        Given I am a User loading helpcenter
        When I navigate to the helpcenter
        Then helpcenter will load with out errors
        And I can leave the screen with out errors