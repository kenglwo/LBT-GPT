import React, { useState, useRef, useEffect } from 'react'
import {
  setCookie,
  getCookie,
  registerUser
} from './components/misc/userManagement'
import WelcomeScreen from './components/mturk/welcome'
import WelcomeScreenControl from './components/mturk/welcomeControl'
import WelcomeScreenQA from './components/mturk/welcomeQA'
import LBTApplication from './components/app/LBTApp'
import LBTApplicationControl from './components/app/LBTAppControl'
import LBTApplicationQA from './components/app/LBTAppQA'
import LBTApplicationQABot from './components/app/LBTAppQABot'
import ReadingScreen from './components/app/ReadingScreen'
import KnowledgeScreen from './components/mturk/knowledge'
import SurveyScreen from './components/mturk/survey'
import SurveyScreenControl from './components/mturk/surveyControl'
import SurveyScreenQA from './components/mturk/surveyQA'
import DemographicScreen from './components/mturk/demographics'
import ConsentForm from './components/mturk/consentForm'
import KeyScreen from './components/mturk/key'
import MobileScreen from './components/mturk/mobile'
import InitializationScreen from './components/mturk/initialization'
import Modal from './components/app/Modal'
import ReturnModal from './components/app/ReturnModal'
import ReturnedScreen from './components/mturk/returned'
import { logData } from './components/misc/userManagement'
import { v4 as uuidv4 } from 'uuid'
import {
  QATopicsHuman,
  QATopicsLLM
} from './components/4-3-eukaryotic-cells/eukaryoticCellText_v2'
import VisTestIndex from './components/vis_test/VisTestIndex'

// identify worker with unique ID
let userID = getCookie('uuid')
//if (userID === "") {
userID = uuidv4()
setCookie('uuid', userID)
//}

const warningStates = ['main', 'knowledge', 'survey', 'demographics']
let hasRegistered = false // global flag

const App = () => {
  const [screenState, setState] = useState('intialization')
  const [screenSubState, setSubState] = useState('read')
  const [showModal, setShowModal] = useState(false)
  const [showReturn, setShowReturn] = useState(false)

  const returnSurvey = () => {
    setShowReturn(true)
  }

  const terminateSurvey = () => {
    sInfo.current.optOut = true
    logData(sInfo)
    setShowReturn(false)
    setState('returned')
  }

  const time = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York'
  })
  const sInfo = useRef({
    // contains info we want to track during session
    uuid: userID,
    timestamps: { creation: time },
    localCreationTime: new Date().toLocaleString(),
    userAgent: navigator.userAgent,
    isMobile: /mobile/i.test(navigator.userAgent),
    tabSwitches: [],
    blurTimes: [],
    focusTimes: [],
    modalTimes: [],
    lessonModalTimes: [],
    scrollLogs: [],
    scrollLogsRead: [],
    optOut: false,
    state: 'consent',
    substate: 'read'
  })

  useEffect(() => {
    if (!hasRegistered) {
      // check global flag
      if (!sInfo.current.isMobile) {
        // assign user to condition
        console.log('registering user')
        registerUser(sInfo)
          .then(() => {
            hasRegistered = true // set global flag to true
            sInfo.current.state = 'main'
            setState(sInfo.current.state)
            setSubState('practice')
          })
          .catch(() => {
            console.log('registration error')
          })
      }
    }
  }, [])

  // NOTE: TEMPORARY CONDITION ASSIGNMENT OVERRIDE
  // llm-chatbot  //  teacher-qa-bot  // llm-qa-bot  // reading
  sInfo.current.condition = 'llm-chatbot'
  ////////////////////////////////////////////////

  // track if worker shifts focus
  useEffect(() => {
    // Write this to sInfo on change.
    const handleVisibilityChange = () => {
      const time = new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York'
      })
      if (document.hidden) {
        sInfo.current.tabSwitches.push(['exit', time])
        if (warningStates.includes(screenState)) {
          sInfo.current.modalTimes.push(['exit', time])
          // setShowModal(true);
        }
      } else {
        sInfo.current.tabSwitches.push(['enter', time])
      }
    }
    const handleBlur = () => {
      const time = new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York'
      })
      sInfo.current.blurTimes.push(time)
    }
    const handleFocus = () => {
      const time = new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York'
      })
      sInfo.current.focusTimes.push(time)
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    document.addEventListener('blur', handleBlur)
    document.addEventListener('focus', handleFocus)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.removeEventListener('blur', handleBlur)
      document.removeEventListener('focus', handleFocus)
    }
  }, [screenState])

  // controls user workflow
  let currentScreen
  switch (screenState) {
    case 'intialization':
      if (!sInfo.current.isMobile) {
        // avoid mobile devices
        currentScreen = <InitializationScreen />
      } else {
        currentScreen = <MobileScreen />
      }
      break
    case 'consent': // consent form is the same for all conditions
      currentScreen = <ConsentForm setState={setState} sInfo={sInfo} />
      break
    case 'welcome': // condition-specific instructions
      switch (sInfo.current.condition) {
        case 'llm-chatbot':
          currentScreen = (
            <WelcomeScreen
              setState={setState}
              sInfo={sInfo}
              returnSurvey={returnSurvey}
            />
          )
          break
        case 'teacher-qa':
          currentScreen = (
            <WelcomeScreenQA
              setState={setState}
              sInfo={sInfo}
              returnSurvey={returnSurvey}
            />
          )
          break
        case 'teacher-qa-bot':
          currentScreen = (
            <WelcomeScreenQA
              setState={setState}
              sInfo={sInfo}
              returnSurvey={returnSurvey}
            />
          )
          break
        case 'llm-qa-bot':
          currentScreen = (
            <WelcomeScreenQA
              setState={setState}
              sInfo={sInfo}
              returnSurvey={returnSurvey}
            />
          )
          break
        case 'reading':
          currentScreen = (
            <WelcomeScreenControl
              setState={setState}
              sInfo={sInfo}
              returnSurvey={returnSurvey}
            />
          )
          break
        default: // error state
          currentScreen = null
          console.error(
            'Encountered invalid condition',
            sInfo.current.condition
          )
          break
      }
      break
    case 'main': // learning session
      switch (sInfo.current.condition) {
        case 'llm-chatbot':
          if (screenSubState === 'read') {
            currentScreen = (
              <ReadingScreen
                setSubState={setSubState}
                sInfo={sInfo}
                returnSurvey={returnSurvey}
              />
            )
          } else {
            currentScreen = (
              <LBTApplication
                setState={setState}
                sInfo={sInfo}
                returnSurvey={returnSurvey}
              />
            )
          }
          break
        case 'teacher-qa':
          currentScreen = (
            <LBTApplicationQA
              setState={setState}
              sInfo={sInfo}
              returnSurvey={returnSurvey}
            />
          )
          break
        case 'teacher-qa-bot':
          if (screenSubState === 'read') {
            currentScreen = (
              <ReadingScreen
                setSubState={setSubState}
                sInfo={sInfo}
                returnSurvey={returnSurvey}
              />
            )
          } else {
            currentScreen = (
              <LBTApplicationQABot
                setState={setState}
                sInfo={sInfo}
                returnSurvey={returnSurvey}
                QATopics={QATopicsHuman}
              />
            )
          }
          break
        case 'llm-qa-bot':
          if (screenSubState === 'read') {
            currentScreen = (
              <ReadingScreen
                setSubState={setSubState}
                sInfo={sInfo}
                returnSurvey={returnSurvey}
              />
            )
          } else {
            currentScreen = (
              <LBTApplicationQABot
                setState={setState}
                sInfo={sInfo}
                returnSurvey={returnSurvey}
                QATopics={QATopicsLLM}
              />
            )
          }
          break
        case 'reading':
          currentScreen = (
            <LBTApplicationControl
              setState={setState}
              sInfo={sInfo}
              returnSurvey={returnSurvey}
            />
          )
          break
        default: // error state
          currentScreen = null
          console.error(
            'Encountered invalid condition',
            sInfo.current.condition
          )
          break
      }
      break
    case 'knowledge': // post-test (same for all conditions)
      currentScreen = (
        <KnowledgeScreen
          setState={setState}
          sInfo={sInfo}
          returnSurvey={returnSurvey}
        />
      )
      break
    case 'survey': // UX survey (chatbot or basic version)
      switch (sInfo.current.condition) {
        case 'llm-chatbot':
          currentScreen = (
            <SurveyScreen
              setState={setState}
              sInfo={sInfo}
              returnSurvey={returnSurvey}
            />
          )
          break
        case 'teacher-qa':
          currentScreen = (
            <SurveyScreenQA
              setState={setState}
              sInfo={sInfo}
              returnSurvey={returnSurvey}
            />
          )
          break
        case 'teacher-qa-bot':
          currentScreen = (
            <SurveyScreenQA
              setState={setState}
              sInfo={sInfo}
              returnSurvey={returnSurvey}
            />
          )
          break
        case 'llm-qa-bot':
          currentScreen = (
            <SurveyScreenQA
              setState={setState}
              sInfo={sInfo}
              returnSurvey={returnSurvey}
            />
          )
          break
        case 'reading':
          currentScreen = (
            <SurveyScreenControl
              setState={setState}
              sInfo={sInfo}
              returnSurvey={returnSurvey}
            />
          )
          break
        default: // error state
          currentScreen = null
          console.error(
            'Encountered invalid condition',
            sInfo.current.condition
          )
          break
      }
      break
    case 'demographics': // demographic survey (same for all conditions)
      currentScreen = (
        <DemographicScreen
          setState={setState}
          sInfo={sInfo}
          returnSurvey={returnSurvey}
        />
      )
      break
    case 'key': // task completion key (same for all conditions)
      currentScreen = <KeyScreen sInfo={sInfo} />
      break
    case 'returned': // participant returned the survey
      currentScreen = <ReturnedScreen />
      break
    default: // error state
      currentScreen = null
      console.error('Error in state transition:', screenState)
      break
  }

  // return (
  //   <div>
  //     {currentScreen}
  //     <Modal
  //       show={showModal}
  //       setShow={setShowModal}
  //       screenState={screenState}
  //     />
  //     <ReturnModal
  //       show={showReturn}
  //       setShow={setShowReturn}
  //       terminateSurvey={terminateSurvey}
  //     />
  //   </div>
  // )

  return <VisTestIndex />
}

export default App
