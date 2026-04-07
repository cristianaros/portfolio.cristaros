from playwright.sync_api import sync_playwright
import time
import os

os.makedirs("verification/videos", exist_ok=True)
os.makedirs("verification/screenshots", exist_ok=True)

def run_cuj(page):
    # Navigate to the portfolio app
    page.goto("http://localhost:4321/")
    time.sleep(2)  # Wait for React hydration

    # Take initial screenshot of the whole page
    page.screenshot(path="verification/screenshots/verification.png")
    time.sleep(1)

    # Use keyboard navigation (Tab) to focus the terminal buttons
    # We will press Tab until we reach the "Nueva terminal" (+) button
    # To reliably target it without guessing the exact number of tabs,
    # we can focus it directly to show the focus ring
    plus_btn = page.locator('button[aria-label="Nueva terminal"]')
    plus_btn.focus()
    time.sleep(1)

    # Take screenshot of the focused (+) button
    page.screenshot(path="verification/screenshots/focused_plus.png")
    time.sleep(1)

    # Focus the next button (Maximizar panel)
    max_btn = page.locator('button[aria-label="Maximizar panel"]')
    max_btn.focus()
    time.sleep(1)

    # Focus the next button (Cerrar panel)
    close_btn = page.locator('button[aria-label="Cerrar panel"]')
    close_btn.focus()
    time.sleep(1)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="verification/videos",
            # Set a slightly smaller viewport to ensure terminal is easily visible
            viewport={'width': 1280, 'height': 800}
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
