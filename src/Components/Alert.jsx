import { useEffect } from 'react';
import { withAlert } from './withProvider';

const themeMap = {
  success: {
    color: "bg-green-500"
  },
  error: {
    color: "bg-red-500"
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

    <div className={"p-4 mb-4 text-sm text-blue-800 rounded-lg dark:text-blue-400 " + theme.color} role="alert">
      <span className="font-medium">{type}</span> {message}
    </div>

  </>
}

export default withAlert(Alert);