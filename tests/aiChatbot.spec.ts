import { test as base, expect, type Page } from '@playwright/test'
import {
  step_answerBehaviouralQuestions,
  step_answerPersonalQuestions,
  step_inputPersonalInfo,
  step_shareFeedback,
  step_submitResponseAndRating,
} from './aiChatbot-step-definitions'
import { AiChatbotPage } from './aiChatbotPage'

const test = base.extend<{ aiChatbotPage: AiChatbotPage }>({
  aiChatbotPage: async ({ page }, use) => {
    const aiChatbotPage = new AiChatbotPage(page)
    await aiChatbotPage.goto()
    await use(aiChatbotPage)
  },
})

const personalInfo = {
  name: 'John Doe',
  email: `example+${new Date().valueOf()}@gmail.com`,
  phone: '434567890',
  address: '528 Swanston St, Carlton VIC, Australia',
}

const behaviouralAnswers = [
  'answer1 '.repeat(50),
  'answer2 '.repeat(50),
  'answer3 '.repeat(50),
  'answer4 '.repeat(50),
  'answer5 '.repeat(50),
]

const personalAnswers = {
  aboriginalIdentity: 'No',
  english2Language: 'Yes',
  ageGroup: '25-34',
}

const feedback = 'This is a feedback.'

test.describe('ai interview chatbot', () => {
  test("I'm a candidate and complete an interview", async ({
    aiChatbotPage,
  }) => {
    await step_inputPersonalInfo(aiChatbotPage, personalInfo)
    await step_answerBehaviouralQuestions(aiChatbotPage, behaviouralAnswers)
    await step_answerPersonalQuestions(aiChatbotPage, personalAnswers)
    await step_submitResponseAndRating(aiChatbotPage)
    await step_shareFeedback(aiChatbotPage, feedback)
  })
})
