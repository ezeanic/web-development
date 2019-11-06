Ability: Voting Directly on a Question

Scenario: Should be able to `Up Vote` a question
  Given John, a new voter, wants to `Up Vote` a question
  When John indicates he wants to `Up Vote`
  Then the up vote count increases by one.
