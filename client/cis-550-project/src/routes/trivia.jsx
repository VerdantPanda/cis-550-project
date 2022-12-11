// Please see the following links:
// https://v2.grommet.io/components
// Also see songs.jsx

import {
  Box,
  Button,
  TextInput,
  InfiniteScroll,
  Text,
  TableRow,
  TableBody,
  Table,
  TableHeader,
  TableCell,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Paragraph,
  RadioButtonGroup,
  Spinner,
} from 'grommet';

import { trivia_question, trivia_info } from '../network.js';

import { trivia_answers_1, trivia_answers_2, trivia_answers_3, trivia_answers_4 } from '../network.js';

import { trivia_answers_5, trivia_answers_6, trivia_answers_7, trivia_answers_8 } from '../network.js';

import { trivia_answers_9, trivia_answers_10 } from '../network.js';

import { React, useState, useEffect } from 'react';

var answer_functions = [
  trivia_answers_1, trivia_answers_2, trivia_answers_3, trivia_answers_4, trivia_answers_5,
  trivia_answers_6, trivia_answers_7, trivia_answers_8, trivia_answers_9, trivia_answers_10
]

export default function Trivia() {
  const [value, setValue] = useState('');

  const [trivia_q, setTriviaQuestion] = useState([]);
  const [trivia_i, setTriviaInfo] = useState([]);
  const [trivia_answer_list, setTriviaAnswerList] = useState([]);
  const isCorrect = (choice) => choice === "Correct";
  const [feedback, setFeedback] = useState('')
  const [trivia_correct_answer, setTriviaCorrectAnswer] = useState([]);
  const [num, setNum] = useState(1);

  useEffect(() => {
    const fechData = async () => {
      console.log('useEffectCalled');

      let temp1 = await trivia_question(num);
      console.log('TEMP1 DATA:');
      setTriviaQuestion(temp1);
      console.log(temp1);

      let temp2 = await trivia_info(num);
      console.log('TEMP2 DATA:');
      setTriviaInfo(temp2);
      console.log(temp2);

      let temp3 = await answer_functions[num-1]();
      console.log('TEMP3 DATA:');
      setTriviaAnswerList(temp3);
      console.log(temp3);   

      setTriviaCorrectAnswer(temp3.filter(c => isCorrect(c.answer_choice)));
      console.log(temp3.filter(c => isCorrect(c.answer_choice)));
      setNum(num+1);
     };
    fechData();
  }, []);

  return (
    <div>

    <Box pad="large" margin={{right: "xlarge"}}>

    <Text size="xlarge" weight="bold">
      Play the Music Matcher Trivia Game!
    </Text>
    <br></br> 

    <Text size="medium" weight="bold">
      Test your knowledge about Billboard Top 100 songs, soundtracks, artists and genres.
    </Text>
    <br></br><br></br>

    <Text textAlign="start" size="medium" margin={{right: "xlarge"}}>
      {trivia_q.map(item => item.question_text)}
    </Text>
    <br></br><br></br>

    <RadioButtonGroup
      name="doc"
      options={trivia_answer_list.map(item => item.artist_name)}
      value={value}
      onChange={(event) => 
       {setValue(event.target.value);
        setFeedback((event.target.value === (trivia_correct_answer.map(item2 => item2.artist_name)).at(0)) ? "Awesome!" : "You can do better!"); 
      }}
    />

      <br></br><br></br>
      <Text textAlign="start">
        {feedback}&nbsp;
      </Text>
      <br></br><br></br> 

      <Box height="xsmall" flex={false}> 
        <Text textAlign="start" margin={{right: "xlarge"}}> 
          <i>{trivia_i.map(item => item.question_info)}</i>
        </Text>
      </Box>  
  
      <br></br><br></br>
      <Box size="small">
        <Button alignSelf="center" active size="medium" label="Next" onClick={async () => {setNum(((num+1)%11)||1); 
          setTriviaAnswerList(['','','','']);
          setTriviaQuestion([]);
          setFeedback('');
          let temp1 = await trivia_question(num);
          setTriviaQuestion(temp1);
          let temp2 = await trivia_info(num);
          setTriviaInfo(temp2);
          let temp3 = await answer_functions[num-1]();
          setTriviaAnswerList(temp3);
          setValue('');
          setTriviaCorrectAnswer(temp3.filter(c => isCorrect(c.answer_choice)));
          setFeedback('')}}>
        </Button>
      </Box>

    </Box>

    </div>
  );
}

