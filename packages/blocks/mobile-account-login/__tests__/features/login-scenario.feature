Feature: Login

  Scenario: LoginController componentDidMount should attach event listener for Apple credential revocation
    Given I am a user loading login
    When I am inside

  Scenario: User navigates to Login
    Given I am a User loading Login
    When I navigate to the Login
    Then Login will load without errors
    And I can select Log In button
    And I can select terms and condition button without error
    And I can select privacy policy button without error
    And I can help center button without error
    And I can select sign up button without error
    And I can leave the screen without errors

  Scenario: User navigates to Login with invalid navigation
    Given I am a User loading Login
    When I navigate to the Login with invalid parameters
    Then I should see an error message

  Scenario: User selects Log In button without filling required fields
    Given I am a User loading Login
    When I select the Log In button without filling required fields
    Then I should see validation errors

  Scenario: User selects Log In button with valid credentials
    Given I am a User loading Login
    When I select the Log In button with valid credentials
    Then I should be logged in

  Scenario: User navigates to Login with different operating systems
    Given I am a User loading Login
    When I navigate to the Login on different operating systems
    Then I should see platform-specific elements

  Scenario: User performs Google login with already signed-in user
    Given I am a User loading Login
    Given I am a signed-in user
    When I perform Google login
    Then I should sign out successfully

  Scenario: User performs Google login with invalid email
    Given I am a User loading Login
    Given I perform Google login with invalid email
    When I perform Google login
    Then I should see an error message