Feature: LanguageSupport

    Scenario: User navigates to LanguageSupport
        Given I am a User loading LanguageSupport
        When I navigate to the LanguageSupport
        Then LanguageSupport will load with out errors
        And I can leave the screen with out errors 

        
