Feature: PrivacySettings

    Scenario: User navigates to PrivacySettings
        Given I am a User loading PrivacySettings
        When I navigate to the PrivacySettings
        Then PrivacySettings will load with out errors
        Then Render one of the privacy settings without errors
        Then Render one of the privacy settings item without errors
        Then Change state language from Arabic to English
        Then Change state language from English to Arabic
        Then Mock OS as iOS
        Then Mock OS as Android
        And I can leave the screen with out errors