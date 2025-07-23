Feature: Subtitles

    Scenario: User navigates to Subtitles
        Given I am a User loading Subtitles
        When I navigate to the Subtitles
        Then Subtitles will load with out errors
        Then Connect to socket
        When I hit play button to start video
        Then Voice will start to record
        Then I get partial Speech Result
        Then I do not get partial Speech Result
        When Video is going to end
        Then Voice will stop to record
        Then I can leave the screen with out errors