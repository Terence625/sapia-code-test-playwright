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

const behaviouralAnswerLessThan50Words = 'answer '.repeat(49)
const behaviouralAnswerMoreThan50Words = 'answer '.repeat(50)
const behaviouralAnswerMoreThan150Words = 'answer '.repeat(151)

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

  test("I'm a candidate and answer the first behavioural question with less than 50 words, then edit", async ({
    aiChatbotPage,
  }) => {
    await aiChatbotStep.step_input_my_personal_info(aiChatbotPage, personalInfo)
    await aiChatbotStep.step_answer_first_behavioural_question_with_less_than_50_words(
      aiChatbotPage,
      behaviouralAnswerLessThan50Words
    )
    await aiChatbotStep.step_verify_alert_popup_and_edit(
      aiChatbotPage,
      'You’ve entered less than the recommended 50 words',
      behaviouralAnswerLessThan50Words,
      behaviouralAnswerMoreThan50Words
    )
  })

  test("I'm a candidate and answer the first behavioural question with more than 150 words, then continue", async ({
    aiChatbotPage,
  }) => {
    await aiChatbotStep.step_input_my_personal_info(aiChatbotPage, personalInfo)
    await aiChatbotStep.step_answer_first_behavioural_question_with_more_than_150_words(
      aiChatbotPage,
      behaviouralAnswerMoreThan150Words
    )
    await aiChatbotStep.step_verify_alert_popup_and_continue(
      aiChatbotPage,
      'You’ve entered more than the recommended 150 words',
      behaviouralAnswerMoreThan150Words
    )
  })
})
