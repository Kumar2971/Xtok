Feature: GiftModel

    Scenario: User navigates to GiftModel
        Given I am a User loading GiftModel
        When I navigate to the GiftModel
        Then get catalogue and coin data
        And close gift model