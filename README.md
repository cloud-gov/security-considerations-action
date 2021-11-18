security considerations action
==============================

This is a Github action to ensure the "Security Consideration" heading with
a description exists in a PR.

# Using the Action in your Github Repo

Add the following as a file to your repo at `.github/workflows/security-considerations.yml`

```yml
name: Security Considerations

on:
  pull_request:
    types: [opened, edited, reopened]

jobs:
  security-considerations:
    runs-on: ubuntu-latest
    steps:
      - uses: cloud-gov/security-considerations-action
```
