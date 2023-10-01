import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { generateList } from "./HelperFunctions/GenerateList";
import { queryChecker } from  "./HelperFunctions/QueryChecker";
import { flightSearch } from './HelperFunctions/FindFlights';


import './App.css';


function App() {

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY,
    organization: process.env.REACT_APP_ORG_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const TravelBot = `
  You will play the role of TravelBot
  You will be listening a chat convorsation between multiple users.
  When called, you will answer the latest question to the best of you ability.
  You're will answer will be short and to the point.
  `

  const [dipslayFlights, setDisplayFlights] = useState(false);
  const [displayMess, setDisplayMess] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [messages, setMesssages] = useState([
    {"role": "system", "content": TravelBot},
    {"role": "user", "content": "what are some fun things to do in france?"},
    {"role": "assistant", "content": "France is well known for it's food, tourism, and beautiful countryside"},
  ]);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      let newMess = [messages, displayMess];
      newMess[0].push({"role": "user", "content": userInput},);
      newMess[1].push({"role": "user", "content": userInput},);
      const queryCheck = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.2, 
        messages: queryChecker(userInput),
        presence_penalty: 0.6,
      });

      const data = queryCheck.data.choices[0].message.content;
      
      if(data === 'YES') {
        const travelQuery = await openai.createChatCompletion({
          model: "gpt-3.5-turbo-0613",
          temperature: 0.3, 
          messages: newMess[0],
          presence_penalty: 0.3,
          functions: [
            {
                "name": "flightSearch",
                "description": "Search for flights between two airports.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "from": {
                            "type": "string",
                            "description": "The departure airport of the flight. Must be a valid iata airport code.",
                        },
                        "to": {
                          "type": "string",
                          "description": "The arrival airport of the flight. Must be a valid iata airport code.",
                        },
                        "passengers": {
                          "type": "string",
                          "description": "A string in the form X-Y-Z where X is the number of adult passengers (over 11), Y is the number of children (2-11 years old) and Z is the number of infant passengers (under 2 years old)."
                        },
                        "bags": {
                          "type": "string",
                          "description": "A string in the form X.Y where X is the number cabin bags (max 1), Y is number of checked bags (max 2)"
                        },
                    },
                    "required": ["from", "to"],
                },
            }
        ],
          
        });
        const result = travelQuery.data.choices[0].message;
        if(result.function_call) {
          const call = JSON.parse(result.function_call.arguments)
          console.log(call);
          flightSearch(
            call.from, 
            call.to, 
            (call.passengers) ? call.passengers : "1-0-0",
            (call.bags) ? call.bags : "1.0"
          );
        }
        newMess[0].push({"role": "assistant", "content": result.content},);
        newMess[1].push({"role": "assistant", "content": result.content},);
        setDisplayFlights(true);
      }
      setMesssages(newMess[0]);
      setDisplayMess(newMess[1]);
      setUserInput("");
    } catch(error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  }



  

  return (
    <div className="App">
      <div id="widget-holder"></div>
      <div id="chat">
        <ul>
            {generateList(displayMess)}
          </ul>
          <form id="chatForm" onSubmit={onSubmit}>
            <input
              id="chatText"
              type="text"
              name="animal"
              placeholder="Type"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
    </div>
  );
}

export default App;
