import { test as base } from '@playwright/test'
import * as aiChatbotStep from './aiChatbot-step-definitions'
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

const behaviouralAnswerLessThan50Words = 'answer1 '.repeat(49)

test.describe('ai interview chatbot', () => {
  test("I'm a candidate and complete an interview", async ({
    aiChatbotPage,
  }) => {
    await aiChatbotStep.step_input_my_personal_info(aiChatbotPage, personalInfo)
    await aiChatbotStep.step_answer_behavioural_questions(
      aiChatbotPage,
      behaviouralAnswers
    )
    await aiChatbotStep.step_answer_personal_questions(
      aiChatbotPage,
      personalAnswers
    )
    await aiChatbotStep.step_submit_response_and_rating(aiChatbotPage)
    await aiChatbotStep.step_share_feedback(aiChatbotPage, feedback)
  })

  test("I'm a candidate and answer the first behavioural question with less than 50 words", async ({
    aiChatbotPage,
  }) => {
    await aiChatbotStep.step_input_my_personal_info(aiChatbotPage, personalInfo)
    await aiChatbotStep.step_answer_first_behaviouralQuestion(
      aiChatbotPage,
      behaviouralAnswerLessThan50Words,
      { isFail: true }
    )
  })
})
