import { useEffect } from 'react';
import { withAlert } from './withProvider';

const themeMap = {
  success: {
    color: "bg-green-500",
    textColor:"text-white"
  },
  error: {
    color: "bg-red-500",
    textColor:"text-white"
  }
}
function Alert({ alert, removeAlert }) {

  useEffect(function () {
    if (alert) {
      const timer = setTimeout(removeAlert, 3 * 1000);
      return function () {
        clearTimeout(timer);
      };
    }
  }, [alert]);

  if (!alert) {
    return;
  }
  const { message, type } = alert;
  const theme = themeMap[type];

  if (!theme) {
    return;
  }

  return <>

    <div className={"p-4 mb-4 text-sm rounded-lg " + theme.color + " " +  theme.textColor} role="alert">
      <span className="font-medium">{type}</span> {message}
    </div>

  </>
}

export default withAlert(Alert);