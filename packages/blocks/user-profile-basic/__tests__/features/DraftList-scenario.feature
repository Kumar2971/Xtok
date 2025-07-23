Feature: DraftList

    Scenario: User navigates to DraftList
        Given I am a User loading DraftList
        When I navigate to the DraftList
        Then DraftList will load with out errors
        And I can leave the screen with out errors
