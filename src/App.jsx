import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const textToType = "HotKey가 당신의 작업을 더욱 쉽게 만들어 드릴게요!";
  const [displayText, setDisplayText] = useState(" ");
  const [isTyping, setIsTyping] = useState(true);
  const [counter, setCounter] = useState(0);

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

  return (
    <>
      <div className="typeJsWrapper">
        <img src="src/assets/hotkey.png" alt="hotkey_logo" class="logo" />
          <h1 className="typeJsText">{displayText}</h1>
      </div>
      <div className="buttonWrapper">
        <a href="./download/HotKey-1.0.0-arm64-mac.zip" download="HotKeyApp">
          <span>HotKey 앱 다운로드</span>
          <button className="guide">?</button>
        </a>
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
          <em>앱을 원활하게 사용하기 위해 아래 간단한 단계를 따라주세요.</em>
          <ul>
            <li>
              <span>1</span>
            </li>
            <li>
              <p>Spotlight 검색 <b>Command + Space</b> 을 열고<br/> <b>"터미널"</b>을 입력하여 실행합니다.</p>
            </li>
          </ul>
          <ul>
            <li>
              <span>2</span>
            </li>
            <li>
              <p>다음 명령어를 터미널에 <b>붙여넣기</b> 합니다 : <br />  xattr -c /Applications/[...directory]/AutoPage.app</p>
            </li>
          </ul>
          <ul>
            <li>
              <span>3</span>
            </li>
            <li>
              <p>이제 모든 준비가 완료되었습니다! <br /> <b>앱을 실행해 볼까요?</b></p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default App;
