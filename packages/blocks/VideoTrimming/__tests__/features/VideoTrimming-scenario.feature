Feature: VideoTrimming

    Scenario: User navigates to VideoTrimming
        Given I am a User loading VideoTrimming
        When I navigate to the VideoTrimming
        Then VideoTrimming will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can choose the filter with out errors
        And I can leave the screen with out errors

    Scenario: Select the Video Effects
        Given I am a User loading Video Effects
        When I navigate to the Video Effects
        Then I can choose the effects with out errors
    
    Scenario: Select the Time Magic
        Given I am a User loading Time Magic
        When I navigate to the Time Magic
        Then I can choose the Time Magic with out errors
    
     Scenario: Select the Video Graffiti
        Given I am a User loading Video Graffiti
        When I navigate to the Video Graffiti
        Then I can choose the video graffiti with out errors

    Scenario: Select the Video Edit
        Given I am a User loading Video Edit
        When I navigate to the Video Edit
        Then I can choose the video Edit AudioOption
        Then I can choose the video Edit CanvasOption
        Then I can choose the video Edit CopyOption
        Then I can choose the video Edit FreezeOption
        Then I can choose the video Edit MirrorOption
        Then I can choose the video Edit RotateOption
        Then I can choose the video Edit SortOption
        Then I can choose the video Edit SpeedOption
        Then I can choose the video Edit SplitOption
        Then I can choose the video Edit TransitionOptions
        Then I can choose the video Edit with out errors

    Scenario: Select the Video Cover
        Given I am a User loading Video Cover
        When I navigate to the Video Cover
        Then I can choose the Cover with out errors

    Scenario: Select the Video Record
        Given I am a User loading Video Record
        When I navigate to the Video Record
        Then I can choose the Record with out errors

    Scenario: Select the Video Subtitle
        Given I am a User loading Video Subtitle
        When I navigate to the Video Subtitle
        Then I can choose the Subtitle with out errors
        Then I can load the Video player