Feature: PostsByLocationScreen

    Scenario: User navigates to PostsByLocationScreen
        Given I am a User loading PostsByLocationScreen
        When I navigate to the PostsByLocationScreen
        Then PostsByLocationScreen will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can get all trending posts
        And I can get all top posts
        And I can do search
        And I can do search hashtag
        And I can do search audio
        And Get audio post
        And I can do recent search
        And I can delete item
        And I can delete all items
        And I can leave the screen with out errors
