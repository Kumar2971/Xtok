    Feature: PerformanceTracker

    Scenario: User navigates to PerformanceTracker
        Given I am a User loading PerformanceTracker
        When I navigate to the PerformanceTracker
        Then PerformanceTracker will load with out errors
        And I can leave the screen with out errors
