# :grey_question: how to fully customize your card
the generated card styling is default, you can fully customize your own card. we're using [chalk](https://github.com/chalk/chalk) and [boxen](https://github.com/sindresorhus/boxen).

# example 1
if you want to change the styling, edit `build.js` file.
- for example if you want to change box color, you can change this line, \
  change the `gray` to `red`

```diff
- fs.writeFileSync(path.join(__dirname, 'bin/output'), chalk.gray.bold(boxen(output, options)))
+ fs.writeFileSync(path.join(__dirname, 'bin/output'), chalk.red.bold(boxen(output, options)))
```

to see the result, you can `build the project` and then `running it` using these steps:
```
npm run build
```
```
npm run dev
```

you will see the result
<p align="center">
<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/6134774/278927132-47f98bc5-ee25-452c-966e-b1c9d5e6535a.png"/>
</p>

# example 2
you can add/remove the information section by modify the `build.js` file, \
find this section
```javascript
const data = {
  name: chalk.green.bold(namecardData.fullname),
  ...
}
```

for example, I would like to remove the `website/blog` url from my card.
- remove this following code
```diff
- handle: chalk.white.bold(namecardData.website),
- const headingwebsite = `${data.handle}`
- headingwebsite +
```

to see the result, you can `build the project` and then `running it` using these steps:
```
npm run build
```
```
npm run dev
```

you will see the result
<p align="center">
<img src="https://user-images.githubusercontent.com/6134774/278934176-68759557-2a13-4638-9575-f0532fc55cef.png"/>
</p>

# example 3
another example is to add background color on the text. \
we will try to add background color on the name section
- change this line of code
```diff
- name: chalk.green.bold(namecardData.fullname),
+ name: chalk.white.bgRed.bold(namecardData.fullname),
```

to see the result, you can `build the project` and then `running it` using these steps:
```
npm run build
```
```
npm run dev
```

you will see the result
<p align="center">
<img src="https://user-images.githubusercontent.com/6134774/278935138-5abc6974-bc38-4128-85c2-b41ffafd5493.png"/>
</p>

# example 4
change the box styling
- change this line of code
```javascript
const options = {
  padding: 2,
  margin: 2,
  borderStyle: 'round',
  textAlignment: 'center'
}
```
into
```javascript
const options = {
  padding: 1,
  margin: 1,
  borderStyle: 'double',
  textAlignment: 'center'
}
```

to see the result, you can `build the project` and then `running it` using these steps:
```
npm run build
```
```
npm run dev
```

you will see the result
<p align="center">
<img src="https://user-images.githubusercontent.com/6134774/278935969-0213c78e-ee98-47b4-8788-30e3e3b84527.png"/>
</p>
