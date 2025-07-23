Feature: DraftScreen

    Scenario: User navigates to DraftScreen
        Given I am a User loading DraftScreen
        When I navigate to the DraftScreen
        Then DraftScreen will load with out errors
        Then I can check the success response getAccountDraftsId is receiving without error
        Then I can check the success response getAccountDraftsId is receiving with error
        Then I can check the success response getAccountDraftsId is receiving with fail
        Then I can check the success response getAccountDraftsId is receiving with undefined
        Then I can check the success response getDeleteDraftsId is receiving without error
        Then I can check the success response getUploadDraftsId is receiving without error
        And I can leave the screen with out errors

    Scenario: User navigates to DraftScreen with param1
        Given I am a User loading DraftScreen
        When I navigate to the DraftScreen
        Then DraftScreen will load with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to DraftScreen with param2
        Given I am a User loading DraftScreen
        When I navigate to the DraftScreen
        Then DraftScreen will load with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to DraftScreen with param3
        Given I am a User loading DraftScreen
        When I navigate to the DraftScreen
        Then DraftScreen will load with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to DraftScreen with param4
        Given I am a User loading DraftScreen
        When I navigate to the DraftScreen
        Then DraftScreen will load with out errors
        And I can leave the screen with out errors
