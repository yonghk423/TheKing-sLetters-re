import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Portal({ children, elementId }) {
  const [targetElement, setTargetElement] = useState(null);
  useEffect(() => {
    setTargetElement(() => document.getElementById(elementId));
  }, [children, elementId]);

  if (!targetElement) return null;
  return createPortal(children, targetElement);
}

export default Portal;