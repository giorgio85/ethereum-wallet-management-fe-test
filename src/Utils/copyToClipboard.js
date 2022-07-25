/**
 * If the browser supports the Clipboard API (only in HTTPS), copy the text to the clipboard
 * @param textToCopy - The text to copy to the clipboard.
 * @returns undefined.
 */
 const copyToClipboard = (textToCopy) => {
    if (!navigator.clipboard) {
      return;
    }
    navigator.clipboard.writeText(textToCopy).then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  };
  
  export default copyToClipboard;
  