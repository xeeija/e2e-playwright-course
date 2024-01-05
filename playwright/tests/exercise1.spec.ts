import { Page, expect, test } from "@playwright/test";

const TODO_ITEMS = [
  "Go to the food store",
  "Buy some food",
  "book a doctors appointment"
];

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
});

test.describe("New Todo", () => {
  test("should allow me to add todo items", async ({ page }) => {
    // The first action in a test is usually navigating to the page. This is done with page.goto
    await page.goto("https://demo.playwright.dev/todomvc");

    // create a new todo locator
    // Since the input has a placeholder, we can get the locator by placeholder
    const newTodo = page.getByPlaceholder("What needs to be done?");

    // Create 1st todo
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press("Enter");

    // Check that the list only has one todo item
    const todoItems = page.getByTestId("todo-title")
    await expect(todoItems).toHaveText([TODO_ITEMS[0]]);

    // Note that we pass an array with one item, to make sure, that only one item was created

    // Create 2nd todo.
    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press("Enter");

    // Check that the list now has two todo items
    await expect(page.getByTestId("todo-title")).toHaveText([
      TODO_ITEMS[0],
      TODO_ITEMS[1],
    ]);

    // The Todo App saves the items into local storage of the browser.
    // Finally, we check if there are two items in the local storage of the browser now
    // We can assert this with page.waitForFunction
    await page.waitForFunction(e => {
      return JSON.parse(localStorage["react-todos"]).length === e;
    }, 2)
  })

  test("should clear text input field when an item is added", async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder("What needs to be done?");

    // Create one todo item.
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press("Enter");

    // Check that input is empty.
    await expect(newTodo).toBeEmpty();
  });
})

test.describe("Mark all as completed", () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTodos(page);
  });


  test("should allow me to mark items as complete", async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder("What needs to be done?");

    // Create two items.
    for (const item of TODO_ITEMS.slice(0, 2)) {
      await newTodo.fill(item);
      await newTodo.press("Enter");
    }

    // Check first item.
    const firstTodo = page.getByTestId("todo-item").nth(0);
    await firstTodo.getByRole("checkbox").check();
    await expect(firstTodo).toHaveClass("completed");

    // Check second item.
    const secondTodo = page.getByTestId("todo-item").nth(1);
    await expect(secondTodo).not.toHaveClass("completed");
    await secondTodo.getByRole("checkbox").check();

    // Assert completed class.
    await expect(firstTodo).toHaveClass("completed");
    await expect(secondTodo).toHaveClass("completed");
  });

  test("should allow me to mark all items as completed", async ({ page }) => {
    // Complete all todos.
    await page.getByLabel("Mark all as complete").check();

    // Ensure all todos have "completed" class.
    await expect(page.getByTestId("todo-item")).toHaveClass(TODO_ITEMS.map(x => "completed"));
  });

})

async function createDefaultTodos(page: Page) {
  const newTodo = page.getByPlaceholder("What needs to be done?");

  for (const item of TODO_ITEMS) {
    await newTodo.fill(item);
    await newTodo.press("Enter");
  }
}
