Feature: DownloadOptions

    Scenario: User navigates to DownloadOptions
        Given I am a User loading DownloadOptions
        When I navigate to the DownloadOptions
        Then DownloadOptions will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors