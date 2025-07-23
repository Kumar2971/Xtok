Feature: PostCreation

    Scenario: User navigates to PostCreation
        Given I am a User loading PostCreation
        When I navigate to the PostCreation
        Then PostCreation will load with out errors
        And I can select seconds button with out errors
        And I can select timing button with out errors

    Scenario: User navigates to PostCreation with effect
        Given I am a User loading PostCreation
        When I navigate to the PostCreation
        Then PostCreation will load with out errors
        And I can select effect button with out errors

    Scenario: User navigates to PostCreation with Timer
        Given I am a User loading PostCreation
        When I navigate to the PostCreation
        Then PostCreation will load with out errors
        And I can select timer button with out errors
    Scenario: User navigate to LiveStream
        Given I am a User clicking on live
        When I click on live text
        Then I can add title and topic and I can navigate to Live
    Scenario: User navigate to LiveStream with IOS
        Given Post creation rendered without errors
        When I click on live text
        Then I can add title topic and image then I can navigate to the LiveStream
    
