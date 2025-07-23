Feature: EditProfile

    Scenario: User navigates to EditProfile
        Given I am a User loading EditProfile
        When I navigate to the EditProfile
        Then EditProfile will load with out errors
        And I can enter text with out errors
        And I can select name button with with out errors
        And I can leave the screen with out errors
   
    Scenario: User navigates to EditProfile and 
        Given I am a User loading EditProfile
        When I navigate to the EditProfile
        Then EditProfile will load with out errors
        And I can select userName button with with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to EditProfile screen 
        Given I am a User loading EditProfile
        When I navigate to the EditProfile
        Then EditProfile will load with out errors
        And I can select bio button with with out errors
        And I can leave the screen with out errors

        Scenario: User navigates to EditProfile screen and 
        Given I am a User loading EditProfile
        When I navigate to the EditProfile
        Then EditProfile will load with out errors
        And I can select photo button with with out errors
        And I can leave the screen with out errors