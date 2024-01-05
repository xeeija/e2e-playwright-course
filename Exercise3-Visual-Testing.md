# Exercise 3: Visual Regression Testing

Make sure you have installed Playwright before starting.

In this exercise, we use the Playwright demo as our web application to test: https://demo.playwright.dev/todomvc

Once again, the **Visual Testing** section of the handout or the **Playwright Advanded (Lab Session)** course is useful for these tests.


## Setup

In this exercise we will enhance the first exercise from the course with visual testing!

Before we continue, let's enable videos of the tests, so that we can see what's wrong if a test fails. For this, update the Playwright config in the `use` block and add the following:

```ts
use: {
  // ...
  video: 'on-first-retry',
}
```

Videos will now be recorded when a test is first retried because an attempt failed.

## Your turn

Open the `visual-testing.spec.ts` file. This is the first test "New Todo" from the course with some slight modifications.
You can run the test to check if the pass now.

Your task is to add visual testing to this test.
Compare the page visually in the default state (after loading), after the first item is added and finally after the second added item is added.

When you are finished, you can run the test with
```bash
npx playwright test tests/visual-testing.spec.ts
```

When you run the tests for the first time, they will fail with the following message. This is because there is now reference screenshot to compare yet. After that, the tests should pass.

```
Error: A snapshot doesn't exist at tests\visual-testing.spec.ts-snapshots\New-Todo-with-visual-testing-should-allow-me-to-add-todo-items-1-chromium-win32.png, writing actual.
```

## Changing the page

Once your tests pass, you can simulate changes to the styling or content of the page, by changing the `indexToAdd` variable at the top of the file.

Inspet the test results after chaning the index.
