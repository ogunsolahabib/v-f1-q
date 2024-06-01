import { useEffect, useState } from 'react';


const defaultArr = [
'What is Computational Mathematics? Machine Learning ',
'How many other schools did you apply to? Why this school over others?',
'What have you been doing since graduation',
'Where do you work',
"Why did you choose Lamar University for your MSc in Computational and Applied Mathematics?",
"How did you hear about Lamar University?",
"Why are you interested in studying Computational and Applied Mathematics?",
"What is the scope of Computational and Applied Mathematics in your home country, Nigeria?",
"How do you plan to apply your degree after graduation?",
"Can you explain your current job responsibilities in the UK?",
"How long have you been living and working in the UK?",
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
"How do you plan to cope with the academic challenges in a new educational system?",
"Tell us about your academic background and what motivated you to pursue a Master's degree in Computational and Applied Mathematics at Lamar University?",
"Why did you choose Lamar University for this specific program? What aspects of the program align with your academic goals?",
"Can you describe some coursework you've taken that prepared you for the rigors of this Master's program?",
"According to your I-20, the estimated cost of attendance is $28,346. How will you finance your studies?",
"You mentioned having a Graduate Assistantship (GA) position that covers $13,000. Can you elaborate on the responsibilities of this position and how it relates to your field of study?",
"Do you have any additional sources of financial support to cover the remaining program costs? (Scholarships, personal savings, etc.)",
"What are your career aspirations after completing this Master's program? How will this degree help you achieve your goals?",
"Do you plan to return to Nigeria after graduation, or do you have any interest in pursuing employment opportunities in the US? 1 (Considering your current location in UK): How does studying in the US compare to the options available in the UK for your field?",
"Are you familiar with the faculty members at Lamar University who specialize in your area of interest?",
"How do you plan to contribute to the academic and social life at Lamar University?",
"What are your long-term career goals after completing your MSc in Computational and Applied Mathematics? How will this degree program help you achieve those goals?",
"Tell me about your academic background and why you chose this specific field of study.",
"What are your academic goals for this program? How will this degree help you achieve your long-term career aspirations?",
"How will your studies at Lamar University contribute to your professional development and your home country (Nigeria)?",
"You currently reside and work in the UK. Can you explain the reason for pursuing studies in the US while residing there?",

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
