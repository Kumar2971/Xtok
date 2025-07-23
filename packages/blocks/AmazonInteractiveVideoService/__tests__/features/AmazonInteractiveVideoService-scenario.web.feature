Feature: AmazonInteractiveVideoService

    Scenario: User navigates to AmazonInteractiveVideoService
        Given I am a User loading AmazonInteractiveVideoService
        When I navigate to the AmazonInteractiveVideoService
        Then AmazonInteractiveVideoService will load with out errors
        And I can leave the screen with out errors