'use strict'

// Pull in our modules
const chalk = require('chalk')
const boxen = require('boxen')
const fs = require('fs')
const path = require('path')
const namecardData = require('./namecardData.js')

// Define options for Boxen
const options = {
  padding: 2,
  margin: 2,
  borderStyle: 'round'
}

// Text + chalk definitions
const data = {
  name: chalk.green.bold(namecardData.fullname),
  handle: chalk.white.bold(namecardData.website),
  work: chalk.white.bold(namecardData.work),
  github: chalk.gray('github.com/') + chalk.white(namecardData.githubusername),
  linkedin: chalk.gray('linkedin.com/in/') + chalk.white(namecardData.linkedin),
  twitter: chalk.gray('twitter.com/') + chalk.white(namecardData.twitter),
  card: chalk.red.bold('npx ') + chalk.green.bold(namecardData.githubusername),
  labelWork: chalk.white.bold('     Work 👔 '),
  labelGitHub: chalk.white.bold('   GitHub 🐙 '),
  labelLinkedIn: chalk.white.bold(' LinkedIn 🔗 '),
  labelTwitter: chalk.white.bold('  Twitter 🐦 '),
  labelCard: chalk.white.bold('     Card 📇 ')
}

// Actual strings we're going to output
const newline = '\n'
const heading = `${data.name} ${data.handle}`
const working = `${data.labelWork}  ${data.work}`
const githubing = `${data.labelGitHub}  ${data.github}`
const linkedining = `${data.labelLinkedIn}  ${data.linkedin}`
const twittering = `${data.labelTwitter}  ${data.twitter}`
const carding = `${data.labelCard}  ${data.card}`

// Put all our output together into a single variable so we can use boxen effectively
const output = heading + // data.name + data.handle
               newline + newline + newline + // Add one whole blank line
               working + newline + newline + // data.labelWork + data.work
               githubing + newline + // data.labelGitHub + data.github
               linkedining + newline + // data.labelLinkedIn + data.linkedin
               twittering +
               newline + newline + newline + // Add one whole blank line
               carding

fs.writeFileSync(path.join(__dirname, 'bin/output'), chalk.green(boxen(output, options)))