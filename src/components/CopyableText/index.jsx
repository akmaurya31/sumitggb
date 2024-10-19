import React, { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ClickAwayListener, Tooltip } from '@mui/material';

const CopyableText = ({ text }) => {
  const [copySuccess, setCopySuccess] = useState('');

  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleCopy = () => {
    setOpen(true);
    // Create a temporary textarea element
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Append the textarea to the document body
    document.body.appendChild(textArea);

    // Select the content of the textarea
    textArea.select();

    // Execute the copy command
    document.execCommand('copy');

    // Remove the textarea from the DOM
    document.body.removeChild(textArea);

    // Set the copy success message
    setCopySuccess('Copied!');
  };

  return (
    <>
      {/* <div onClick={handleCopy}>{text}</div> */}
      {/* <button onClick={handleCopy}><ContentCopyIcon className='w-4' /></button> */}
      {/* {copySuccess && <div>{copySuccess}</div>} */}

      <ClickAwayListener onClickAway={handleTooltipClose} >
        <div className='flex gap-2 items-center'>
          <div onClick={handleCopy} className='cursor-pointer'>{text}</div>
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={copySuccess && copySuccess}
            placement="top"
            arrow>
            <button onClick={handleCopy}><ContentCopyIcon style={{ width: 14 }} /></button>
          </Tooltip>
        </div>
      </ClickAwayListener>
    </>
  );
};

export default CopyableText;
