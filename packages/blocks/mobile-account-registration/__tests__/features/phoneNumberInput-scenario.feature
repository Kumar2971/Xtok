Feature: Mobile Phone Account Registration

    Scenario: User navigates to Mobile Phone Number Registration
        Given I am a User attempting to Register with a Mobile Phone Number
        When I navigate to the Registration Screen
        Then I can go back with out errors
        And I can enter details with errors
        And I can enter details with out errors
        And I can select a Date of Birth with out errors
        And I can select a Country Code with out errors
        And I can view terms and conditon with out errors
        And I can select the Submit button with out errors
        And I can select verify with button and send otp button with out errors
        And I can select the skip button with out error
        And I can leave the screen with out errors

   Scenario: User verify account
       Given I am a User attempting to Register with a Mobile Phone Number
        When I navigate to the Registration Screen
        And I can enter details with out errors
        And I can select the Submit button with out errors
        And I can select arrow button with out errors
        And I can leave the screen with out errors

    Scenario: Empty Mobile Phone Number
        Given I am a User attempting to Register with a Mobile Phone
        When I Register with an empty Mobile Phone Number
        And RestAPI will return an error

    Scenario: Mobile Phone Number and have not selected a Country Code
        Given I am a User attempting to Register with a Mobile Phone
        When I Register with a Mobile Phone Number and empty Country Code
        And RestAPI will return an error

    Scenario: Mobile Phone Number and have selected a Country Code
        Given I am User attempting to Register with a Mobile Phone
        When I Registration with Mobile Phone Number and have a Country Code
        And RestAPI will return token