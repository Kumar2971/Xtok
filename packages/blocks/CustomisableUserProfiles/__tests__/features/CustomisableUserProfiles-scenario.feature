Feature: CustomisableUserProfiles

    Scenario: User navigates to CustomisableUserProfiles
        Given I am a User loading CustomisableUserProfiles
        When I navigate to the CustomisableUserProfiles
        Then CustomisableUserProfiles will load with out errors
        Then Instance can run utility functions with out errors
        Then Instance can run utility functions with out errors
        Then CustomisableUserProfiles should fetch attributes data from REST Api client
        Then CustomisableUserProfiles should fetch user data from REST Api client
        Then I can enter text with out errors
        Then CustomisableUserProfiles should fetch attributes data from REST Api client
        Then CustomisableUserProfiles should fetch user data from REST Api client
        Then CustomisableUserProfiles can update profile by using the REST Api client
        Then CustomisableUserProfiles would receive null data from REST Api client
        Then CustomisableUserProfiles would receive null data from REST Api client after updating
        Then I can leave the screen with out errors
