Feature: UserProfileBasicBlock

    Scenario: User navigates to UserProfileBasicBlock
        Given I am a User loading UserProfileBasicBlock
        When I navigate to the UserProfileBasicBlock
        Then UserProfileBasicBlock will load with out errors
        Then I can press the buttons
        And I can leave the screen with out errors

    Scenario: User navigates to UserProfileBasicBlock with comments
        Given I am a User loading UserProfileBasicBlock
        When I navigate to the UserProfileBasicBlock
        Then UserProfileBasicBlock will load with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to UserProfileBasicBlock without params
        Given I am a User loading UserProfileBasicBlock
        When I navigate to the UserProfileBasicBlock
        Then UserProfileBasicBlock will load with out errors
        And I can leave the screen with out errors