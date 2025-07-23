Feature: PostsByAudioScreen

    Scenario: User navigates to PostsByAudioScreen
        Given I am a User loading PostsByAudioScreen
        When I navigate to the PostsByAudioScreen
        And I can view top posts
        And I can view recent post
        And I can view trending post
        And PostsByAudioScreen will show the audio title correctly
        And I can able to view twenty posts
        And PostsByAudioScreen will render without data
        And I can leave the screen with out errors