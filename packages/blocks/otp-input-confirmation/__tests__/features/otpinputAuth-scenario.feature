Feature: OTP InputAuth

    Scenario: User navigates to OTPInputAuth
            Given I am a User attempting to enter OTP Number
            When I navigate to the OTPInputAuth Screen
            Then I can enter OTP
            Then I can submit my OTP
            And I can submit OTP with Error