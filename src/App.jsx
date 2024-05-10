import { useState, createContext } from 'react'
import './App.css'

//components
import SnackbarContainer from './components/snackbar';
import ResizeableLayout from './components/resizable-layout';

//constants
import constants from './constants';
import { TOAST_SEVERITY } from './constants';

export const GlobalStates = createContext();

function App() {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState(TOAST_SEVERITY.info);
  const [toastPosition, setToastPosition] = useState(constants.TOAST_POSITION);
  const [toastAutoHideDuration, setToastAutoHideDuration] = useState(6000);
  const handleToast = ({ open, message, severity, position = constants.TOAST_POSITION, autoHideDuration = 6000 }) => {
    setIsToastOpen(open);
    setToastMessage(message);
    setToastSeverity(severity);
    setToastPosition(position);
    setToastAutoHideDuration(autoHideDuration);
  }
  const [globalStates, setGlobalStates] = useState({ handleToast });
  return (
    <>
      <GlobalStates.Provider value={{ globalStates, setGlobalStates }}>
        <ResizeableLayout />
      </GlobalStates.Provider>
      <SnackbarContainer
        open={isToastOpen}
        setOpen={setIsToastOpen}
        message={toastMessage}
        severity={toastSeverity}
        autoHideDuration={toastAutoHideDuration}
        vertical={toastPosition.vertical}
        horizontal={toastPosition.horizontal}
      />
    </>
  )
}

export default App