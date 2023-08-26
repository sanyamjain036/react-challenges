import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { FILE_EXPLORER, PAGINATION, PROGRESSBAR, SIMPLE_TO_DO, STOPWATCH } from './constants'
import ToDo from './challenges/Simple Todo/ToDo'
import StopWatch from './challenges/StopWatch/StopWatch'
import Pagination from './challenges/Pagination/Pagination'
import ProgressBar from './challenges/ProgressBar/ProgressBar'
import FileExplorer from './challenges/File Explorer/FileExplorer'
import plogo from './assets/plogo.svg'
import githubLogo from './assets/github.svg'

const options = [
  {
    name: "None",
    value: 0,
    compo: <></>
  },
  {
    name: SIMPLE_TO_DO,
    value: 1,
    compo: <ToDo />
  },
  {
    name: STOPWATCH,
    value: 2,
    compo: <StopWatch />
  },
  {
    name: PAGINATION,
    value: 3,
    compo: <Pagination />
  },
  {
    name: PROGRESSBAR,
    value: 4,
    compo: <ProgressBar />
  },
  {
    name: FILE_EXPLORER,
    value: 5,
    compo: <FileExplorer />
  },
]

const DEFAULT_VALUE = 0;
const PORTFOLIO="https://portfolio-eta-ashen-52.vercel.app/"
const GITHUB="https://github.com/sanyamjain036/react-challenges";

function App() {

  const [selectedChallenges, setSelectedChallenges] = useState(DEFAULT_VALUE);
  const handleChange = (e) => {
    setSelectedChallenges(e.target.value);
  }
  return (
    <div className="container mx-auto">
      <header>
        <div className='text-3xl py-5 flex justify-between items-center '>
          <div className='grow text-center'>
            <span>My React Challenges <img src={reactLogo} className='inline' alt="reactLogo" /></span>
          </div>
          <div className='flex justify-center items-center'>
           <a href={PORTFOLIO} target='_blank'> <img src={plogo} alt="portfolioLogo" className="w-14  cursor-pointer" /></a>
           <a href={GITHUB} target='_blank'> <img src={githubLogo} alt="githubLogo" className='w-12 h-12  cursor-pointer' /></a>
          </div>
        </div>
      </header>
      <section className='py-3 flex justify-center'>
        <label htmlFor="challenge">Choose a Challenge:</label> &nbsp;
        <select id="challenge" onChange={handleChange} defaultValue={DEFAULT_VALUE} className='w-1/4'>
          {
            options.map((item, i) => {
              return <option value={item.value} key={i}>{item.name}</option>
            })
          }
        </select>
      </section>
      <section className='py-5 mx-auto'>
        {options[selectedChallenges].compo}
      </section>
    </div>
  )
}

export default App
