Feature: PostDetails

    Scenario: User navigates to PostDetails
        Given I am a User loading PostDetails
        When I navigate to the PostDetails
        Then PostDetails will load with out errors
        And I can select back button with with out errors
        And I can select next button with out errors

       