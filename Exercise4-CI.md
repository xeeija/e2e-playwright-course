# Exercise 4: CI

Make sure you have installed Playwright before starting.

In this exercise, we use the Playwright demo as our web application to test: https://demo.playwright.dev/todo-mvc

The **CI** section of the handout or the **Playwright Advanded (Lab Session)** course is useful for this exercise.

## Setup Github Actions

In order to run tests in the CI, we will use Github Actions. For this, you will need the repository forked, so that you can push to it.

Adding CI pipelines in Github Actions is done by creating workflow files in the `.github/workflows` folder.
Create a file named `tests.yaml` and add the following worflow template.

```yaml
name: Tests
on:
  push:
    branches: ["**"]
jobs:
  test:
    timeout-minutes: 10
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: 18

    - name: Install dependencies
      run: npm ci

    - name: Install Playwright Browsers
      run: npx playwright install --with-deps

    - name: Run Playwright tests
      run: npx playwright test

    - uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

This workflow is triggered whenever someone pushes to the repository on any branch, and will:

- setup the project and install dependencies
- install the browsers for Playwright
- run the tests and save the report

Finally, commit your changes and push it to Github. You should see the pipeline runs in the **Actions** tab on Github in your repository. You can download the test report as a test artifact.

Feel free to play around with the tests! Don't forget to push your changes to trigger the pipeline.
