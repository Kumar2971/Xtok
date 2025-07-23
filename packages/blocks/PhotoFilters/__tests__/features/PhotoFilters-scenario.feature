Feature: PhotoFilters

    Scenario: User navigates to PhotoFilters
        Given I am a User loading PhotoFilters
        When I navigate to the PhotoFilters
        Then PhotoFilters will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors