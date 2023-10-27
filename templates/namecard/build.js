'use strict'

const chalk = require('chalk')
const boxen = require('boxen')
const fs = require('fs')
const path = require('path')
const namecardData = require('./namecardData.js')

const options = {
  padding: 2,
  margin: 2,
  borderStyle: 'round',
  textAlignment: 'center'
}

const data = {
  name: chalk.green.bold(namecardData.fullname),
  handle: chalk.white.bold(namecardData.website),
  work: chalk.white.bold(namecardData.work),
  github: chalk.gray('github.com/') + chalk.white(namecardData.githubusername),
  linkedin: chalk.gray('linkedin.com/in/') + chalk.white(namecardData.linkedin),
  twitter: chalk.gray('twitter.com/') + chalk.white(namecardData.twitter),
  card: chalk.gray('npx ') + chalk.green.bold(namecardData.githubusername),
  labelWork: chalk.white.bold('Work 👔 '),
  labelGitHub: chalk.white.bold('GitHub 🐙 '),
  labelLinkedIn: chalk.white.bold('LinkedIn 🔗 '),
  labelTwitter: chalk.white.bold('Twitter 🐦 '),
  labelCard: chalk.white.bold('Card 📇 ')
}

const newline = '\n'
const heading = `${data.name}`
const headingwebsite = `${data.handle}`
const working = `${data.labelWork}  ${data.work}`
const githubing = `${data.labelGitHub}  ${data.github}`
const linkedining = `${data.labelLinkedIn}  ${data.linkedin}`
const twittering = `${data.labelTwitter}  ${data.twitter}`
const carding = `${data.labelCard}  ${data.card}`

const output = heading + newline +
               headingwebsite +
               newline + newline + newline +
               working + newline + newline +
               githubing + newline +
               linkedining + newline +
               twittering +
               newline + newline + newline +
               carding

fs.writeFileSync(path.join(__dirname, 'bin/output'), chalk.gray.bold(boxen(output, options)))
