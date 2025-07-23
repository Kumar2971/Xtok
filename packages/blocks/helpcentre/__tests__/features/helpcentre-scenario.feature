Feature: helpcentre

    Scenario: User navigates to helpcentre
        Given I am a User loading helpcentre
        When I navigate to the helpcentre
        Then helpcentre will load with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to helpcentreQA
        Given I am a User loading helpcentreQA
        When I navigate to the helpcentreQA
        Then helpcentreQA will load with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to helpcentreSub
        Given I am a User loading helpcentreSub
        When I navigate to the helpcentreSub
        Then helpcentreSub will load with out errors
        And I can leave the screen with out errors