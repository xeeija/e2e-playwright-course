# Exercise 2: Mocking

Make sure you have installed Playwright before starting.

In this exercise, we use the Playwright demo as our API to test: https://demo.playwright.dev/api-mocking

The **Mocking** section of the handout or the **Playwright Advanded (Lab Session)** course is useful for these tests.

## Setup

Create a new file named `mocking.spec.ts` in the `tests` folder.
Your task is to write tests for mocking and intercepting requests from a Fruit API.

## Test without mocking

First, write a test that does not alter the request in any way and just calls the API. Your test should check that 17 fruits are returned and that the result contains Strawberry, Watermelon and Lime.

```ts
test.describe('Making an API call', () => {
  test('should call the API', async ({ page }) => {
    // your code here
  });
});
```

> Hint: The `page.getByRole('list')` and "listitem" locators might be useful.

## Replacing a request

Now that we know, which fruits are returned, we can start to mock the request. When a request is made to `*/**/api/v1/fruits`, return your own list of fruits instead of the original response. Return a list with only a **Strawberry**, which has ID **42**.

A fruit object has a `name` and an `id`.

Check that Strawberry is in the response, but other fruits, like Watermelon or Lime are not present.

```ts
test.describe('Mocking an API call', () => {
  test('should mock a fruit and dont call the API', async ({ page }) => {
    // your code here
  });
});
```

## Updating a request

Finally, we want to update the request and add our own data to the response, instead of replacing it. For requests to `*/**/api/v1/fruits` add a **Papaya** which has id **100**.

Afterwards, check that the Papaya is present in the response.

```ts
test('should get the response from the API and add a new fruit', async ({ page }) => {
  // your code here
});
```
