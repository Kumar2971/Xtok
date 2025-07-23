Feature: NotificationAmazonIvs

    Scenario: User navigates to NotificationAmazonIvs
        Given I am a User loading NotificationAmazonIvs
        When I navigate to the NotificationAmazonIvs
        Then get notification api gets failed
        And get notification api runs successfully
        And get stages api gets failed
        And get stages api runs successfully
        And get stages api runs successfully but return empty array
        And update invite api fails to run successfully
        And update invite api runs successfully
        And user can click on go live button and start live stream
        And I can leave the screen with out errors