Feature: ForgotPassword

    Scenario: User navigates to ForgotPassword
        Given I am a User loading ForgotPassword
        When I navigate to the ForgotPassword
        Then ForgotPassword will load with out errors
        Then Renders mobileNo error message when present
        And Renders FlatList with data correctly
        Then Does not render mobileNo error message when not present
        Then Does not render mobileNo error message when not present and undefined
        And I can enter text with out errors
        And I can select remember check box with out errors
        And Get OTP token
        And Get OTP token undefined
        And Check email before sending email and response is success
        And Check email before sending email and response is with error
        And Handle error for sending otp on email
        And Check mobile number before sending sms and response is success
        And Check mobile number before sending sms and response is with error
        And Handle error for sending otp on phone
        And Confirm otp with server
        And Confirm otp with server and get error
        And Confirm otp with server and server error
        And I can not go to OTP screen with wrong credential
        And I can go to OTP screen after phone number validation
        And Should return false if password validation fails
        And I can leave the screen with out errors
