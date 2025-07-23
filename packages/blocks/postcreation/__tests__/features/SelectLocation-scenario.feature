Feature: SelectLocation

    Scenario: User navigates to SelectLocation
        Given I am a User loading SelectLocation
        When I navigate to the SelectLocation
        Then SelectLocation will load with out errors
        And I can select back button with out errors
        And I can select GooglePlaceAutocomplete with out errors    