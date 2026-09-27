# Kinfolio 앱 (PC·안드로이드)

가족 은퇴자금 장부 Kinfolio를 Chrome 앱(PWA)으로 쓰기 위한 파일입니다. 이 저장소에는 **프로그램만** 있고, 장부 데이터는 들어 있지 않습니다. 데이터는 각 기기(브라우저)에 저장되고, 본인의 구글 드라이브 `Kinfolio/Kinfolio 데이터.json` 파일로 기기 간에 맞춥니다.

## 설정
1. `config.js`의 `googleClientId`에 Google Cloud에서 만든 OAuth 웹 클라이언트 ID를 넣습니다. (공개돼도 되는 값입니다. 등록한 주소에서만 로그인에 쓸 수 있습니다.)
2. 이 저장소의 **Settings → Pages**에서 `main` 브랜치의 `/ (root)`로 배포합니다.
3. `https://<GitHub 아이디>.github.io/<저장소 이름>/`을 Chrome으로 열고 앱으로 설치합니다.

## 파일
- `index.html` 앱 화면 (claude.ai 아티팩트와 같은 코드)
- `config.js` 구글 로그인 설정
- `sw.js` 오프라인에서도 열리게 하는 서비스 워커
- `manifest.webmanifest`, `icons/` 앱 이름·아이콘
