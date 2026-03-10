from playwright.sync_api import sync_playwright, expect
import time

def test_terminal_ui(page):
    page.goto("http://localhost:4321/")

    # Wait for hydration
    time.sleep(1)

    # Take screenshot of the terminal area
    page.screenshot(path="terminal_before_close.png")

    # Find the close button
    close_btn = page.locator("button[aria-label='Cerrar terminal']")

    # Take screenshot highlighting the close button
    close_btn.hover()
    page.screenshot(path="terminal_close_hover.png")

    # Click it
    close_btn.click()

    # Take screenshot to verify it's closed
    page.screenshot(path="terminal_after_close.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_terminal_ui(page)
        finally:
            browser.close()
