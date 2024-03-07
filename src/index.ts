// 주의

// root가 null인 경우 document로 재설정이 필요함.
// 만약 root가 target을 감싸지 않으면 경고주기

//DONE

// 1. 현재 진행상황 rootBound에 대해서 나타내는 네모그리기 성공
// 2. bounding client 나타내기 성공

// TODO

// target에 대해서 threshold에 대응하는 elements만들기 -> 나중에 고민해야될 부분일수도..
// 만날때 (intersection) 특정 동작이 하도록 처리 // 간단할듯..?
// 네모를 사용자가 커스텀할 수 있도록 제어 -> intersection Observer 로직안에 window.xxx 등의 변수값을 설정하여 dev일때 커스텀으로 조정할 수 있도록 설정
// 스토리북처럼 관리할 수 있도록 추가 // server 와 iframe을 이용하여 구현해보자.

// intersection observer마다 hash id를 걸고 사용하는 url에 hash id를 통해 어떤 intersection observer를 활성화시킬지 확인
// intersection observer를 활성화를 시키면 네모네모표시를 활성화시키고 어떻게 그 intersection observer가 포함된 페이지를 부를 수 있을까..?ㄴ

// TODO:

// 1. 일단 localhost:6006번에 뭐가 나오게 해보자.
// 2. 그 부분에 iframe을 나타내도록 해보자.
// 3. 서버가 hmr을 지원하도록 해보자.
// 3. 어떻게 특정 컴포넌트를 통해서 그 페이지를 보여줄건지 고민해보자.
