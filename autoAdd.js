const waitForElement = (selector) => {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
};

const findButtonAndSend = (sendModal) => {
  const sendButton = sendModal.querySelector('[aria-label="Send now"]');
  if (sendButton) {
    sendButton.click();
  }
  if (!sendButton) {
    const otherButton = sendModal.querySelector('[aria-label="Other"]');
    otherButton.click();
    const connectButton = sendModal.querySelector('[aria-label="Connect"]');
    connectButton.click();
  }
};

const handleConnect = () => {
  const actionButtons = document.querySelectorAll('.artdeco-button');
  actionButtons.forEach((button, i) => {
    if (button.ariaLabel?.includes('Invite')) {
      setTimeout(() => {
        button.click();
        waitForElement('[data-test-modal-id="send-invite-modal"]').then(findButtonAndSend);
      }, 100 * i);
    }
  });
};

const addButton = (container) => {
  const addButton = document.createElement('button');
  addButton.innerText = 'Connect all';
  addButton.className = 'add-all-button';
  addButton.addEventListener('click', handleConnect);
  container.prepend(addButton);
}

const observer = new MutationObserver(() => {
  const container = document.querySelector('.search-results-container');
  const button = document.querySelector('.add-all-button');
  if (container && !button) {
    addButton(container)
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

addButton(document.querySelector('.search-results-container'));


