Feature: reportproblem

    Scenario: User navigates to reportproblem
        Given I am a User loading reportproblem
        When I navigate to the reportproblem
        Then reportproblem will load with out errors
        And I can enter comment with out error
        And I will upload Images without errors
        And I will delete Images without errors 
        And I can select send report button with out error
        And I can select send report with error
        And I can close popup with ok button
        And I can select send report button with image type
        And I can leave the screen with out errors

    Scenario: User navigates to reportproblem with error
        Given I am a User loading reportproblem with error
        When I navigate to the reportproblem with error
        Then reportproblem will load with errors
        