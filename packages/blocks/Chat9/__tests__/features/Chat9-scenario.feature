Feature: Chat9

    Scenario: User navigates to Chat9
        Given I am a User loading Chat9
        When I navigate to the Chat9
        Then Chat9 will load with out errors
        And I can enter text with out errors
        And I can select the cross button with out errors
        And I can select the smile button with out errors
        And I can select the smileIcon button with out errors
        And I can select the button with with out errors
        And I can select the capture photo button with with out errors
        And I can render chat with out errors
        And I can open report modal with out errors
        And I can open render Option modal with out errors
        And I can open emoji modal with out errors
        And I can load userChat list with out errors
        Then restAPI will return token
        And I can load followers list with out errors
        Then restAPI will return token
        And I can fetch matching user list with out errors
        Then restAPI will return token
        And I can load previousChat List with out errors
        Then restAPI will return token
        And I can check wheather chat exist with out errors
        Then restAPI will return token
        And I can check the success response createRoom is receiving without error
        Then RestAPI will post data
        And I can delete message with out errors
        Then RestAPI will post data
        And I can report user with out errors
        Then RestAPI will post data
        And I can leave the screen with out errors
