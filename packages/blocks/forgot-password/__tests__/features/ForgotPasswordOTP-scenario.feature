Feature: ForgotPasswordOTP

    Scenario: User navigates to ForgotPasswordOTP
        Given I am a User loading ForgotPasswordOTP
        When I navigate to the ForgotPasswordOTP
        Then ForgotPasswordOTP will load with out errors
        Then renders TouchableOpacity when remainingTime is <= 0
        Then does not render TouchableOpacity when remainingTime is > 0
        Then calls onPressResend when TouchableOpacity is pressed
        Then displays error message when there is an otp error
        Then renders an empty View when there is no otp error
        Then Displays error message when state has an error from call
        Then Renders an empty View when there is no error in state call
        Then ResendOTP when user clicks
        And I can leave the screen with out errors
