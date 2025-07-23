Feature: EndLive

    Scenario: User navigates to EndLive
        Given I am a User loading EndLive
        When I navigate to the EndLive
        Then get all summery data
        Then component will unmount

    Scenario: User navigates to EndLive no params
        Given I am a User loading EndLive
        When I navigate to the EndLive
        Then get all summery data
        Then component will unmount