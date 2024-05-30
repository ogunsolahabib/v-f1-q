import { useEffect, useState } from 'react';


const defaultArr = [
  // 'Why you chose US for Masters and not UK',
  // 'Why you chose Lamar University?',
  // 'How did you find the school',
  // 'What is Computational Mathematics? Machine Learning ',
  // 'Why Computational Maths? What will it do for you? Tell me about your interest in CS Maths?',
  // 'What courses/modules would you be offering? What’s your project topic?',
  // 'Tell me about your Graduate Assistantship position',
  // 'How many other schools did you apply to? Why this school over others?',
  // 'What have you been doing since graduation',
  // 'Who’s paying your deficit and what does he do',
  // 'Where do you work',
  // 'How big is your company?',
  // 'What would you be doing after your program?',
"Why did you choose Lamar University for your MSc in Computational and Applied Mathematics?",
"How did you hear about Lamar University?",
"Why are you interested in studying Computational and Applied Mathematics?",
"What is the scope of Computational and Applied Mathematics in your home country, Nigeria?",
"How do you plan to apply your degree after graduation?",
"Can you explain your current job responsibilities in the UK?",
"How long have you been living and working in the UK?",
"What are your plans after completing your degree in the USA?",
"How will you manage the remaining expenses that are not covered by your GA position and tuition waiver?",
"Can you tell me more about your Graduate Assistant position and the duties involved?",
"How do you plan to handle the cultural differences between the UK and the USA?",
"Why did you choose to study in the USA rather than the UK or Nigeria?",
"Can you explain how your course aligns with your career goals?",
"What do you know about the city of Beaumont, Texas, where Lamar University is located?",
"Who is sponsoring the rest of your education expenses?",
"What is the reason for your move from Nigeria to the UK?",
"Do you have any family or relatives in the USA?",
"What kind of research or projects do you plan to undertake during your MSc program?",
"How do you think your education in the USA will benefit your home country, Nigeria?",
"How do you plan to cope with the academic challenges in a new educational system?"
];

const formatSec=(val:number)=>+val <10? `0${val}`: val

function Timer({ question }: { question: number }) {
  const [min, setMin] = useState(1);
  const [sec, setSec] = useState(0);

  const startTimer = () => {
    setMin(1);
    setSec(0);
  };

  useEffect(() => {
    startTimer();
  }, [question]);

  useEffect(() => {
    let timer = setInterval(() => {
      if (+min === 0 && +sec === 0) return;

      if (+sec === 0) {
        setSec(59);
        setMin(min - 1);
      } else {
        setSec(sec - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [sec, min]);
  return (
    <div
      className={['timer', +sec > 20 ? 'timer--green' : 'timer--red'].join(' ')}
    >
      {min}:{formatSec(sec)}
    </div>
  );
}
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
      <Timer question={current} />

      <button onClick={next}>Next</button>
    </div>
  );
}

export default App;
