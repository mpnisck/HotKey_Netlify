import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const textToType = "HotKey가 당신의 작업을 더욱 쉽게 만들어 드릴게요!";
  const [displayText, setDisplayText] = useState(" ");
  const [isTyping, setIsTyping] = useState(true);
  const [counter, setCounter] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const typeJs = () => {
      if (isTyping) {
        if (counter < textToType.length) {
          setDisplayText((prev) => prev + textToType.charAt(counter));
          setCounter((prev) => prev + 1);
        } else {
          setIsTyping(false);
        }
      } else {
        if (counter > 0) {
          setDisplayText((prev) => prev.slice(0, -1));
          setCounter((prev) => prev - 1);
        } else {
          setIsTyping(true);
          setCounter(0);
        }
      }
    };

    const intervalId = setInterval(typeJs, 100);

    return () => clearInterval(intervalId);
  }, [isTyping, counter, textToType]);

  const handleDownload = () => {
    window.open("https://github.com/mpnisck/HotKey/releases/download/hotkey/HotKey-1.0.0-arm64-mac.zip", "_blank");

    const copyText = "xattr -c /Applications/[...directory]/HotKey-1.0.0-arm64-mac.zip";
    navigator.clipboard.writeText(copyText).then(() => {
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    });
  };

  return (
    <>
      <div className="typeJsWrapper">
        <img src="src/assets/hotkey.png" alt="hotkey_logo" className="logo" />
        <h1 className="typeJsText">{displayText}</h1>
      </div>
      <div className="buttonWrapper">
        <a
          href="https://github.com/mpnisck/HotKey/releases/download/hotkey/HotKey-1.0.0-arm64-mac.zip"
          download="HotKeyApp"
          onClick={handleDownload}
        >
          <span>HotKey 앱 다운로드</span>
          <button className="guide" onClick={handleDownload}>?</button>
        </a>

        {showAlert && (
          <div
            style={{
              position: "fixed",
              left: "50%",
              bottom: "50px",
              transform: "translateX(-50%)",
              backgroundColor: "rgba(0,0,0,0.7",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "10px",
              zIndex: "99"
            }}
          >
            터미널 명령어가 클립보드에 복사되었어요! 붙여넣기 해보세요!
          </div>
        )}

        <div className="popup">
          <div className="iconWrapper">
            <h3>macOS 앱 설치 가이드</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" x2="12" y1="15" y2="3"/>
            </svg>
          </div>
          <ul>
            <li>
              <span>1</span>
            </li>
            <li>
              <p>Spotlight 검색 <b>Command + Space</b> 을 열고<br/> <b>"터미널"</b>을 입력하여 실행해 보아요!</p>
            </li>
          </ul>
          <ul>
            <li>
              <span>2</span>
            </li>
            <li>
              <p>다음 명령어를 터미널에 <b>붙여넣기</b> : <br />  xattr -c /Applications/[...directory]/HotKey-1.0.0-arm64-mac.zip<br />
                <b>Tip! 다운로드 버튼 클릭 후 상단의 팝업 차단 허용을 해 주세요!</b>
              </p>
            </li>
          </ul>
          <ul>
            <li>
              <span>3</span>
            </li>
            <li>
              <p>이제 모든 준비가 완료되었어요! <br /> <b>앱을 실행해 볼까요?</b></p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
