  <body >
  <h2 align="center">Sing Me A Song</h2>
  <h3 align="center">Youtube Videos Recommendation App</h3>

</br>
</br>

# What does it do?

<div align="rigth"> This server allows you and anyone who uses it to add music recommendatiosn thru YouTube links. Those recommendations are showed up on the main page and can be interacted with thru up and downvotes.
</br>
The routes here presented allow you to get a list of recommendations, add a new recommendation as well as get a random recommendation, where the randomization is already done by the server.</div>

</br>
</br>

# Routes and Usage

## Add a new recommendation

```http
  POST /recommendations/
```

| Parameters to send | Type     | Description                                                             |
| :----------------- | :------- | :---------------------------------------------------------------------- |
| `name`             | `string` | **Obrigatório**. Title of the video you want to add as a recommendation |
| `youtubeLink`      | `string` | Valid link for video on YouTube. Default: 0                             |

</br>
</br>

## Get Current Recommendations

```http
  GET /recommendations/
```

| Response Data     | Type               | Description                                 |
| :---------------- | :----------------- | :------------------------------------------ |
| `recommendations` | `array of objects` | Return the 10 latests added recommendations |

</br>
</br>

## Get A Random Recommendation

```http
  GET /recommendations/random
```

| Response Data    | Type     | Description                          |
| :--------------- | :------- | :----------------------------------- |
| `recommendation` | `object` | Return the one random recommendation |

</br>
</br>

## Get A Random Recommendation

```http
  GET /recommendations/top/:amount
```

| Response Data                           | Params Data                            | Type               | Description                                                                                                                |
| :-------------------------------------- | :------------------------------------- | :----------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `defined amount of top recommendations` | `amount of top recommendations wanted` | `array of objects` | Receives a amount -number- of recommendations desired and returns it in order os recommendations scores from most to least |

---

<h4 align="right" color="blue"> The randomness of the recommendation takes into account the recommendations score</h4>
</br>
</br>

## Get A Specific Recommendation

```http
  GET /recommendations/:id
```

| Response Data              | Params Data                   | Type               | Description                                                           |
| :------------------------- | :---------------------------- | :----------------- | --------------------------------------------------------------------- |
| `specific recommendation ` | `id of wanted recommendation` | `array of objects` | Receives an id and returns the recommendation related to the given id |

---

<h4 align="right" color="blue"> If the given id on the request url is not valid, an error is returned</h4>
</br>
</br>

```http
  POST /recommendations/:id/upvote or /recommendations/:id/downvote
```

| Response Data              | Params Data                   | Type  | Description                                                                                                                        |
| :------------------------- | :---------------------------- | :---- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `specific recommendation ` | `id of wanted recommendation` | `n/a` | Receives an id on either the "upvote" or "downvote" route, and then either add or subtracts from the selected recommendation score |

---

<h4 align="right" color="blue"> Each downvote reduces the recommendation score by one. Once the score gets lower than -5, the recommendation is removed from the database</h4>
</br>
</br>

</br>

## TOOLBOX

---

| Language and tools |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |                                                                                                                                                                                                                          |
| :----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Tools              |                                                                                                                                                                                                                                                                            <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> | <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> |
| Language           | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> |
| Testing            |                                                                                                                                                                                                                                                                                                                            <a href="https://jestjs.io" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg" alt="jest" width="40" height="40"/> </a> |                                                                                                                                                                                                                          |
| Database           |                                                                                                                                                                                                                                                               <a href="https://www.postgresql.org" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a> |

</br>
</br>

## Testing Features

---

<div align="rigth"> This application contains both integration and unit testing done with jest and supertest. Those tests, however, don't guarantee front-end  sucess of usage, as they simply check up the routes responses for aproppriate requests and the services logic.
</br>
If during usage you faces up a situation not covered on the current tests, please open an issue so that it can be addressed.</div>

</br>
</br>

## Run Locally

---

Clone the project

```bash
  git clone git@github.com:ThaisFrancaG/TEST_SingMeASong_Back.git
```

Enter the project repository and install the needed dependencies

```bash
  npm install
```

Start up the server

```bash
  npm run dev
```
