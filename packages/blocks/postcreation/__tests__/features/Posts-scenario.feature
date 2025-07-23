Feature: Posts

    Scenario: User navigates to Posts
        Given I am a User loading Posts
        When I navigate to the Posts
        Then Posts will load with out errors
        And I can render post list without error


       