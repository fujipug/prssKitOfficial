import { useState } from 'react';
import { PiShare } from 'react-icons/pi';

const ShareButton = ({ url, title, text }: { url?: string; title?: string; text?: string; }) => {
  const [, setIsCopied] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        // Mobile devices with Web Share API support
        await navigator.share({
          title: title || 'Check this out',
          text: text || 'I found this interesting and wanted to share it with you',
          url: url || window.location.href,
        });
      } else {
        // Fallback for desktop browsers
        copyToClipboard(url || window.location.href);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    // <button onClick={handleShare}>
    //   {isCopied ? 'Copied!' : 'Share'}
    // </button>

    <button className="btn btn-square btn-ghost" onClick={handleShare}>
      <PiShare size={22} />
    </button>
  );
};

export default ShareButton;