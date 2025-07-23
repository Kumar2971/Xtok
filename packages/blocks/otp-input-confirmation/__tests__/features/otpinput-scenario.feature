Feature: OTP Input and Auth

    Scenario: User navigates to OTPInput
        Given I am a User attempting to enter OTP Number
        When I navigate to the OTPInput Screen
        Then Token get expired
        Then I can enter OTP
        And I can get new OTP by click Resend
        Then I can submit my OTP
        And I can goto Login Page

    Scenario: User navigates to OTPInput with Email
        Given I am a User attempting to enter OTP Number
        When I navigate to the OTPInput Screen
        Then I can enter OTP
         And I can get new OTP by click Resend
        Then I can submit my OTP
        And I can goto Login Page