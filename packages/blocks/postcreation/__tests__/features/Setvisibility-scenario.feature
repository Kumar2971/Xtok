Feature: Setvisibility

    Scenario: User navigates to Setvisibility
        Given I am a User loading Setvisibility
        When I navigate to the Setvisibility
        Then Setvisibility will load with out errors
        And I can select back button with out errors
        And I can select visibility with out errors

    Scenario: User navigates to Setvisibility with private
        Given I am a User loading Setvisibility
        When I navigate to the Setvisibility
        Then Setvisibility will load with out errors
        And I can select back button with out errors
        And I can select visibility with out errors 