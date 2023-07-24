import { test, expect, type Page } from '@playwright/test'
import { AiChatbotPage } from './aiChatbotPage'

export interface PersonalInfo {
  name: string
  email: string
  phone: string
  address: string
}

interface PersonalAnswers {
  aboriginalIdentity: string
  english2Language: string
  ageGroup: string
}

export const step_inputPersonalInfo = async (
  aiChatbotPage: AiChatbotPage,
  personalInfo: PersonalInfo
) => {
  await test.step(`I input my personal info`, async () => {
    await aiChatbotPage.waitForTyping()
    await aiChatbotPage.verifyLastText(
      'Before we get started, can I get your first name and last name?'
    )
    await aiChatbotPage.respond(personalInfo.name, 'name')
    await aiChatbotPage.verifyLastText('Thanks! And your email?')
    await aiChatbotPage.respond(personalInfo.email, 'email')
    await aiChatbotPage.verifyLastText('Great, and your phone number?')
    await aiChatbotPage.respond(personalInfo.phone, 'phone')
    await aiChatbotPage.verifyLastText(
      'Just one more thing, where do you live?'
    )
    await aiChatbotPage.respond(personalInfo.address, 'address')
    await aiChatbotPage.verifySecondLastText(
      'Please check your personal information above and click the Accept button if everything is correct. Please note, once you click Accept, you won’t be able to edit your personal information.'
    )
    await aiChatbotPage.selectFromOptions('Accept')
  })
}

export const step_answerBehaviouralQuestions = async (
  aiChatbotPage: AiChatbotPage,
  answers: string[]
) => {
  await test.step('I answer the first question', async () => {
    await aiChatbotPage.verifyLastText(
      'Customers are our number one priority, it’s all about making sure the customer has the best shopping experience. Tell us about a time you went out of your way to make a difference to someone that improved their day?'
    )
    await aiChatbotPage.respond(answers[0], 'answer')
  })
  await test.step('I answer the second question', async () => {
    await aiChatbotPage.verifyLastText(
      'Describe a time when you missed a deadline or personal commitment. How did that make you feel?'
    )
    await aiChatbotPage.respond(answers[1], 'answer')
  })
  await test.step('I answer the third question', async () => {
    await aiChatbotPage.verifyLastText(
      'We are always hungry to learn and do things differently. Give an example of a time you have had to deal with change, professionally or personally?'
    )
    await aiChatbotPage.respond(answers[2], 'answer')
  })
  await test.step('I answer the fourth question', async () => {
    await aiChatbotPage.verifyLastText(
      'We believe that we are better together. Tell us about a time when you have rolled up your sleeves to help out your team or someone else?'
    )
    await aiChatbotPage.respond(answers[3], 'answer')
  })
  await test.step('I answer the fifth question', async () => {
    await aiChatbotPage.verifyLastText(
      'Have you ever dealt with someone difficult? How did you handle the situation? You can draw on your experiences at work, at school or any group activity'
    )
    await aiChatbotPage.respond(answers[4], 'answer')
  })
}

export const step_answerPersonalQuestions = async (
  aiChatbotPage: AiChatbotPage,
  answers: PersonalAnswers
) => {
  await test.step('I answer the personal questions', async () => {
    await aiChatbotPage.verifySecondLastText(
      'Do you identify as Aboriginal or Torres Strait Islander?'
    )
    await aiChatbotPage.selectFromOptions(answers.aboriginalIdentity)
    await aiChatbotPage.verifySecondLastText('Is English your second language?')
    await aiChatbotPage.selectFromOptions(answers.english2Language)
    await aiChatbotPage.verifySecondLastText('Please select your age group')
    await aiChatbotPage.selectFromOptions(answers.ageGroup)
  })
}

export const step_submitResponseAndRating = async (
  aiChatbotPage: AiChatbotPage
) => {
  await test.step('I submit my response and rating', async () => {
    await aiChatbotPage.verifySecondLastText(
      'Great! That’s all the questions we have. Click the button below to submit your responses, and keep an eye out in your inbox for your personality profile.'
    )
    await aiChatbotPage.selectFromOptions('SUBMIT')
    await aiChatbotPage.submitRating()
  })
}

export const step_shareFeedback = async (
  aiChatbotPage: AiChatbotPage,
  feedback: string
) => {
  await test.step('I share my feedback', async () => {
    await aiChatbotPage.verifyLastText(
      'Your feedback matters to us, share a few comments about your application and first interview experience.'
    )
    await aiChatbotPage.respond(feedback, 'answer')
    await aiChatbotPage.verifyLastText(
      'Your interview is now finished and your answers have been submitted.'
    )
  })
}
