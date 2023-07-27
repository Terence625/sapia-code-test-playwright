import { expect, type Locator, type Page } from '@playwright/test'
import { PersonalInfo } from './aiChatbot-step-definitions'

type TextType = keyof PersonalInfo | 'answer'

export class AiChatbotPage {
  private readonly loadingIcon: Locator
  private readonly emailTextEditor: Locator
  private readonly sendButton: Locator
  private readonly textBubble: Locator
  private readonly textEditor: Locator
  private readonly phoneTextEditor: Locator
  private readonly spinner: Locator

  constructor(public readonly page: Page) {
    this.page = page
    this.loadingIcon = page.getByTestId('loading')
    this.textEditor = page.getByLabel('rdw-editor').locator('div').nth(2)
    this.emailTextEditor = page.getByTestId('editor-text-area')
    this.phoneTextEditor = page.getByTestId('text-editor')
    this.sendButton = page.getByTestId('send-circle-button')
    this.textBubble = page.getByTestId('text-bubble')
    this.spinner = page.getByTestId('fullscreen-spinner').locator('span')
  }

  async goto() {
    await this.page.goto('/ap-southeast-2/cohorts/623a9ab72ad0b2561fecc7ae')
    await this.page.waitForSelector('[data-testid="auto-scroll-text"]')
  }

  async waitForTyping() {
    await expect(this.loadingIcon).toBeVisible()
    await expect(this.loadingIcon).toBeVisible({
      timeout: 30000,
      visible: false,
    })
  }

  async verifyLastText(text: string) {
    await expect(this.textBubble.last()).toHaveText(text)
  }

  async verifySecondLastText(text: string) {
    await expect(this.textBubble.nth(-2)).toHaveText(text)
  }

  async respond(
    text: string,
    options?: {
      isFail?: boolean
      textType?: TextType
    }
  ) {
    function isTextType(type: TextType) {
      return !!options?.textType && options?.textType === type
    }
    isTextType('email')
      ? await this.emailTextEditor.fill(text)
      : isTextType('phone')
      ? await this.phoneTextEditor.fill(text)
      : await this.textEditor.fill(text)
    isTextType('address')
      ? await this.page.locator('.option-item').getByText(text).click()
      : await this.sendButton.click()
    if (options?.isFail) {
      await this.sendButton.isDisabled()
    } else {
      const expectedText = isTextType('phone') ? `+61${text}` : text
      await this.verifyLastText(expectedText)
      await this.waitForTyping()
    }
  }

  async selectFromOptions(text: string) {
    await this.page
      .locator('.option-item')
      .getByText(text, { exact: true })
      .click()
    await this.verifyLastText(text)
    if (text === 'SUBMIT') await this.waitForPageLoading()
    await this.waitForTyping()
  }

  async waitForPageLoading() {
    await expect(this.spinner).toBeVisible()
    await expect(this.spinner).toBeVisible({
      timeout: 10000,
      visible: false,
    })
  }

  async submitRating() {
    await this.page.getByRole('button', { name: 'SUBMIT RATING' }).click()
    await this.waitForTyping()
  }
}
