Feature: PostSubmit

    Scenario: User navigates to PostSubmit
        Given I am a User loading PostSubmit
        When I navigate to the PostSubmit
        Then PostSubmit will load with out errors
        And I can select back button with out errors
        And I can add discription with errors
        And I can add discription with out errors
        And I can select buttons with out errors
        And I can select upload button with out errors

    Scenario: User navigates to PostSubmit with selection 0
        Given I am a User loading PostSubmit
        When I navigate to the PostSubmit
        Then PostSubmit will load with out errors
        Then I can select back button with out errors

    Scenario: User navigates to PostSubmit with selection 1
        Given I am a User loading PostSubmit
        When I navigate to the PostSubmit
        Then PostSubmit will load with out errors

       