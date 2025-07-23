Feature: inapppurchasing

    Scenario: User navigates to inapppurchasing without prop details
        Given I am a User loading inapppurchasing
    
    Scenario: User navigates to inapppurchasing with prop details
        Given I am a User loading inapppurchasing
        When I navigate to the inapppurchasing
        Then I can see the product details with out error
        Then I can leave the screen with out errors
