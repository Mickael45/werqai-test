'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function Portal({ children }: PropsWithChildren) {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const elementId = 'popup-root';

  useEffect(() => {
    let portalContainer = document.getElementById(elementId);

    if (!portalContainer) {
      portalContainer = document.createElement('div');
      portalContainer.id = elementId;
      document.body.appendChild(portalContainer);
    }

    setElement(portalContainer);
  }, [elementId]);

  return element ? createPortal(children, element) : null;
}

export default Portal;
