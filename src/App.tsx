import { useEffect, useState } from 'react';


const defaultArr = [
  'Why you chose US for Masters and not UK',
  'Why you chose Lamar University?',
  'How did you find the school',
  'What is Computational Mathematics? Machine Learning ',
  'Why Computational Maths? What will it do for you? Tell me about your interest in CS Maths?',
  'What courses/modules would you be offering? What’s your project topic?',
  'Tell me about your Graduate Assistantship position',
  'How many other schools did you apply to? Why this school over others?',
  'What have you been doing since graduation',
  'Who’s paying your deficit and what does he do',
  'Where do you work',
  'How big is your company?',
  'What would you be doing after your program?',
];
function App() {
  const [questionsArr, setQuestionsArr] = useState(
    new Array(defaultArr.length).fill('').map((_, i) => i)
  );

  const [unanswered, setUnanswred] = useState<Array<Number>>([]);

  const [current, setCurrent] = useState(-1);

  const randomize = () => {
    let arrCopy = [...questionsArr];
    arrCopy = arrCopy.sort(() => 0.5 - Math.random());
    setCurrent(arrCopy[0]);
    setQuestionsArr(arrCopy);
    setUnanswred(arrCopy);
  };

  const init = () => {
    randomize();
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    setUnanswred((arr) => arr.filter((ans) => ans !== current));
  }, [current]);

  const next = () => {
    if (unanswered.length > 0) {
      const currIndex = questionsArr.indexOf(current);
      setCurrent(questionsArr[currIndex + 1]);
    } else {
      init();
    }
  };

  return (
    <div className="container">
      <div className="question-area">
        <h1>{defaultArr[current]}</h1>
      </div>
      <button onClick={next}>Next</button>
    </div>
  );
}

export default App;
