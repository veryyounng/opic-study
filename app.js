'use strict';
function fitMobileReceipt(){
  const scale=Math.min(1,window.innerWidth/390,window.innerHeight/844);
  document.documentElement.style.setProperty('--frame-scale',String(scale));
}
fitMobileReceipt();
window.addEventListener('resize',fitMobileReceipt);
    // 서베이에 포함된 16개 주제마다 네 유형의 질문을 한 개씩 구성합니다.
    const topics = [
      {id:'movies',name:'영화',emoji:'🎬',flow:'🎬 영화 선택 → 🍿 분위기 → 👀 장면 → 💬 감상',q:[
        ['What kinds of movies do you enjoy watching these days? Describe the kind of movie you like and explain what makes it appealing to you.','요즘 좋아하는 영화의 종류를 묘사하고, 어떤 점이 마음에 드는지 설명하세요.'],
        ['Walk me through what you usually do when you watch a movie. How do you choose one, and what do you do before and after watching it?','영화를 고르는 과정부터 관람 전후까지 평소 루틴을 순서대로 말하세요.'],
        ['How has your taste in movies changed over time? What did you enjoy in the past, and what do you prefer now?','예전에 좋아하던 영화와 지금 선호하는 영화를 비교하세요.'],
        ['Tell me about a memorable movie you watched. Where and when did you see it, what happened, and why do you still remember it?','기억에 남는 영화 관람 경험의 시간·장소·내용·이유를 말하세요.']]},
      {id:'parks',name:'공원',emoji:'🌳',flow:'🌳 공원 입장 → 🚶 산책 → 🪑 쉬기 → 😌 기분',q:[
        ['Describe a park you like to visit. What does it look like, and what makes it a good place for you?','즐겨 가는 공원의 모습과 그곳을 좋아하는 이유를 묘사하세요.'],
        ['What do you usually do when you go to a park? Tell me about your routine from arrival until you leave.','공원에 도착해서 떠날 때까지의 평소 루틴을 말하세요.'],
        ['Has the way you spend time at parks changed over the years? Compare what you did in the past with what you do now.','과거와 현재의 공원 이용 방식이 어떻게 달라졌는지 비교하세요.'],
        ['Tell me about an unforgettable visit to a park. What happened, and how did you feel about it?','공원에서 있었던 잊지 못할 일과 그때의 감정을 말하세요.']]},
      {id:'concerts',name:'콘서트·공연',emoji:'🎤',flow:'🎫 예매 → 🚉 이동 → 🎤 공연 → 👏 여운',q:[
        ['What kind of concerts or performances do you like? Describe the atmosphere and the things you enjoy most.','좋아하는 콘서트·공연 종류와 현장 분위기를 묘사하세요.'],
        ['What do you normally do when you go to a concert or performance? Describe how you prepare and what you do afterward.','공연 전 준비부터 관람 후까지의 평소 과정을 말하세요.'],
        ['How have your preferences for concerts or performances changed? What did you enjoy before, and what do you like now?','예전과 지금의 공연 취향 차이를 설명하세요.'],
        ['Describe a concert or performance you will never forget. What made that experience so memorable?','잊지 못할 공연의 장면과 특별했던 이유를 말하세요.']]},
      {id:'shopping',name:'쇼핑',emoji:'🛍️',flow:'📝 필요한 것 → 🏬 매장 → 🔎 비교 → 🛍️ 구매',q:[
        ['Describe the places where you like to shop. What are they like, and what do you usually buy there?','좋아하는 쇼핑 장소의 모습과 주로 사는 물건을 설명하세요.'],
        ['Tell me about your usual shopping routine. How do you decide what to buy and complete your shopping?','살 물건을 정하고 구매를 마칠 때까지의 루틴을 말하세요.'],
        ['How have your shopping habits changed over time? Compare the way you shopped before with the way you shop now.','과거와 현재의 쇼핑 습관을 비교하세요.'],
        ['Tell me about a memorable shopping experience, such as finding something special or solving a problem with a purchase.','특별한 물건을 찾거나 구매 문제를 해결했던 쇼핑 경험을 말하세요.']]},
      {id:'music',name:'음악 듣기',emoji:'🎧',flow:'😫 지친 날 → 🎧 음악 → 🚶 걷기 → 😌 기분 전환',q:[
        ['What kind of music do you like to listen to? Describe its sound and explain why you enjoy it.','좋아하는 음악의 종류와 소리의 특징, 좋아하는 이유를 설명하세요.'],
        ['When and how do you usually listen to music? Describe your listening routine during a typical day.','하루 중 언제 어떻게 음악을 듣는지 평소 루틴을 말하세요.'],
        ['How has your taste in music changed over the years? What did you listen to before, and what do you listen to now?','예전에 듣던 음악과 지금 듣는 음악을 비교하세요.'],
        ['Tell me about an unforgettable moment connected to a song or a piece of music. What happened and why does it stay with you?','특정 노래나 음악과 관련된 잊지 못할 순간을 말하세요.']]},
      {id:'singing',name:'노래 부르기',emoji:'🎙️',flow:'🎵 노래 선택 → 🎙️ 따라 부르기 → 😅 실수 → 😄 즐거움',q:[
        ['What kinds of songs do you enjoy singing? Describe the songs and why they suit you.','즐겨 부르는 노래의 종류와 그 노래가 자신에게 잘 맞는 이유를 말하세요.'],
        ['Tell me how you usually sing for fun. Where do you sing, how do you choose a song, and what do you do next?','평소 어디서 어떻게 노래를 부르는지 순서대로 설명하세요.'],
        ['Has your attitude toward singing changed since you first started? Compare your early experiences with the way you sing now.','처음 노래하던 때와 지금의 태도나 방식이 어떻게 달라졌는지 말하세요.'],
        ['Tell me about a memorable time you sang a song. What happened, and how did you feel?','노래를 부르며 겪은 기억에 남는 일과 감정을 말하세요.']]},
      {id:'cooking',name:'요리',emoji:'🍳',flow:'🥕 재료 준비 → 🔪 손질 → 🍳 조리 → 😋 맛보기',q:[
        ['Describe a dish you enjoy cooking at home. What ingredients does it have, and what is it like?','집에서 즐겨 요리하는 음식과 재료, 맛과 모양을 묘사하세요.'],
        ['Walk me through your usual cooking routine at home, from choosing a dish to cleaning up afterward.','메뉴 선택부터 뒷정리까지의 평소 요리 과정을 말하세요.'],
        ['How has your cooking changed over time? What did you make when you first started, and what do you make now?','처음 요리할 때와 지금 만들 수 있는 음식이나 방식의 차이를 말하세요.'],
        ['Tell me about an unforgettable cooking experience. Did anything unexpected happen, and how did you handle it?','요리 중 생긴 예상 밖의 일과 해결 과정을 말하세요.']]},
      {id:'walking',name:'조깅·걷기',emoji:'🚶',flow:'👟 준비 → 🌿 경로 → 🚶 걷기·조깅 → 💧 휴식',q:[
        ['Describe a place where you like to walk or jog. What does the route look like, and why do you like it?','걷거나 조깅하기 좋은 장소와 경로의 모습을 묘사하세요.'],
        ['What is your usual routine when you go for a walk or a jog? Tell me what you do before, during, and after it.','걷기·조깅 전, 중, 후에 하는 일을 순서대로 말하세요.'],
        ['How have your walking or jogging habits changed? Compare what you used to do with what you do these days.','예전과 요즘의 걷기·조깅 습관을 비교하세요.'],
        ['Tell me about a memorable walk or jog. Where did you go, what happened, and why do you remember it?','기억에 남는 산책이나 조깅 경험을 장소·사건·이유와 함께 말하세요.']]},
      {id:'cycling',name:'자전거',emoji:'🚲',flow:'🚲 자전거 점검 → 🛣️ 경로 → 💨 라이딩 → 🧃 쉬기',q:[
        ['Describe a place where you like to ride a bicycle. What is the route like, and what do you see there?','자전거 타기 좋아하는 장소, 경로와 보이는 풍경을 묘사하세요.'],
        ['What do you usually do before, during, and after a bike ride? Describe your routine step by step.','자전거를 타기 전, 타는 동안, 탄 후의 루틴을 설명하세요.'],
        ['How has your experience with cycling changed since you first tried it? What was different then compared with now?','처음 자전거를 탔을 때와 현재의 경험 차이를 비교하세요.'],
        ['Tell me about an unforgettable bike ride. What happened along the way, and how did you deal with it?','잊지 못할 자전거 라이딩과 도중의 일, 대처 방법을 말하세요.']]},
      {id:'noexercise',name:'운동을 하지 않음',emoji:'🛋️',flow:'📅 바쁜 하루 → 🛋️ 휴식 → 🚶 가벼운 움직임 → 😌 재충전',q:[
        ['You mentioned that you do not exercise regularly. Describe how you usually relax and take care of yourself instead.','정기적으로 운동하지 않는 대신 평소 어떻게 쉬고 자신을 돌보는지 설명하세요.'],
        ['What do you normally do during the time when other people might work out? Walk me through a typical evening at home.','운동 대신 보내는 평소 저녁 시간을 순서대로 설명하세요.'],
        ['Has your attitude toward exercise changed over time? What did you think about it before, and how do you feel now?','운동에 대한 과거와 현재의 생각을 비교하세요.'],
        ['Tell me about a memorable time you decided to rest instead of exercise. What led to that decision, and what happened afterward?','운동 대신 휴식을 택했던 기억에 남는 상황과 그 후의 일을 말하세요.']]},
      {id:'domestic',name:'국내여행',emoji:'🧳',flow:'🗺️ 목적지 → 🚆 이동 → 📷 구경 → 🍽️ 식사 → 🏠 귀가',q:[
        ['Describe a place in your country you enjoy visiting. What does it look like, and what makes it special?','좋아하는 국내 여행지의 모습과 특별한 점을 묘사하세요.'],
        ['How do you usually plan and spend a trip within your country? Describe the steps from planning to returning home.','국내여행 계획부터 귀가까지의 과정을 말하세요.'],
        ['How has the way you travel within your country changed? Compare an earlier trip with the trips you take now.','예전 국내여행과 요즘 여행 방식의 차이를 설명하세요.'],
        ['Tell me about an unforgettable trip within your country. What happened, and why was it memorable?','잊지 못할 국내여행의 사건과 기억에 남는 이유를 말하세요.']]},
      {id:'international',name:'해외여행',emoji:'✈️',flow:'🛂 준비 → ✈️ 비행 → 🌆 새로운 곳 → 📷 추억',q:[
        ['Describe a country or city abroad that you enjoyed visiting. What was it like, and what stood out to you?','인상 깊었던 해외 도시나 나라의 모습과 특징을 묘사하세요.'],
        ['How do you usually prepare for an overseas trip? Explain your routine from planning to exploring the destination.','해외여행 계획부터 현지 탐방까지의 준비와 활동을 설명하세요.'],
        ['How have your preferences for overseas travel changed over time? What did you look for before, and what matters to you now?','예전과 지금 해외여행에서 중요하게 여기는 점을 비교하세요.'],
        ['Tell me about a memorable experience during an overseas trip. What happened, and how did you respond?','해외여행 중 겪은 기억에 남는 일과 대처 방법을 말하세요.']]},
      {id:'staycation',name:'집에서 보내는 휴가',emoji:'🏠',flow:'📴 일정 비우기 → 🍳 맛있는 식사 → 🎬 영화 → 😴 휴식',q:[
        ['Describe your ideal staycation at home. What is your home like during your vacation, and what makes it comfortable?','이상적인 집에서의 휴가와 편안한 집 분위기를 묘사하세요.'],
        ['What do you usually do during a staycation? Tell me about a typical day from morning to night.','집에서 쉬는 휴가의 아침부터 밤까지의 일과를 말하세요.'],
        ['How has the way you spend vacations at home changed? Compare your first staycations with the way you relax now.','처음 집에서 휴가를 보낼 때와 지금의 휴식 방식을 비교하세요.'],
        ['Tell me about a particularly memorable staycation. What made that time at home special?','특별히 기억에 남는 집에서의 휴가와 그 이유를 말하세요.']]},
      {id:'home',name:'집',emoji:'🏡',flow:'🚪 현관 → 🛋️ 공간 → 🪟 좋아하는 자리 → 😌 느낌',q:[
        ['You live alone in a house or apartment. Describe your home and your favorite part of it. What does it look like?','혼자 사는 집의 모습과 가장 좋아하는 공간을 묘사하세요.'],
        ['What is your usual routine when you come home? Describe what you do from entering the door until you settle in.','집에 들어온 뒤 자리를 잡을 때까지의 평소 루틴을 말하세요.'],
        ['How has your home or the way you use it changed over time? Compare your past living space with your home now.','예전 거주 공간과 지금 집 또는 집을 쓰는 방식의 변화를 비교하세요.'],
        ['Tell me about a memorable experience you had at home. What happened, and how did you handle the situation?','집에서 겪은 기억에 남는 사건과 대처 방법을 말하세요.']]},
      {id:'weather',name:'날씨·계절',emoji:'🌤️',flow:'🌤️ 날씨 확인 → 👕 준비 → 🚶 하루 활동 → 💭 기분',q:[
        ['Describe your favorite season and its typical weather. What does it look and feel like where you live?','좋아하는 계절의 날씨, 풍경과 느낌을 묘사하세요.'],
        ['How does the weather affect your daily routine? Describe what you do on a typical day in your favorite season.','좋아하는 계절의 평소 일과와 날씨가 일상에 미치는 영향을 말하세요.'],
        ['Have your feelings about different seasons changed over time? Which season did you prefer before, and which do you prefer now?','예전에 좋아하던 계절과 지금 좋아하는 계절을 비교하세요.'],
        ['Tell me about a memorable day when the weather changed your plans. What happened, and what did you do?','날씨 때문에 계획이 바뀐 기억에 남는 날과 대처 과정을 말하세요.']]},
      {id:'cafe',name:'카페',emoji:'☕',flow:'🚪 입장 → ☕ 주문 → 🪑 자리 → 📖 시간 보내기',q:[
        ['Describe a café you like. What does it look like, and what do you enjoy about its atmosphere?','좋아하는 카페의 모습과 분위기를 묘사하세요.'],
        ['What do you normally do when you visit a café? Describe your routine from ordering to leaving.','카페에서 주문부터 떠날 때까지의 평소 루틴을 말하세요.'],
        ['How have your café preferences changed? What kinds of places or drinks did you like before, and what do you prefer now?','예전과 지금의 카페 또는 음료 취향을 비교하세요.'],
        ['Tell me about a memorable experience at a café. What happened, and why do you remember it?','카페에서 겪은 기억에 남는 일과 그 이유를 말하세요.']]}
    ];
    const typeNames={1:'현재 묘사',2:'현재 루틴',3:'과거 변화',4:'인상적인 경험'};
    const tips={
      1:{title:'FACT → DETAIL → FEELING',lines:['먼저 한 문장으로 대상을 소개하세요.','눈에 보이는 특징 2~3개를 구체적으로 묘사하세요.','마지막에 왜 좋아하는지 감정을 붙이세요.']},
      2:{title:'BEFORE → DURING → AFTER',lines:['보통 언제·어디서 시작하는지 말하세요.','순서 표현(first, then, after that)을 써서 과정을 연결하세요.','at my own pace, sip water 같은 나만의 작은 습관을 더하세요.']},
      3:{title:'PAST → CHANGE → NOW',lines:['I used to…로 예전 취향이나 첫 경험을 시작하세요.','달라진 계기 한 가지를 이야기하세요.','Now I prefer…로 지금의 취향과 이유를 대비하세요.']},
      4:{title:'결론 먼저 → 사건 → 감정',lines:['It was unforgettable / memorable.로 핵심을 먼저 말하세요.','언제·어디서·무슨 일이 있었는지, 어떻게 대응했는지 설명하세요.','결과와 당시 감정으로 마무리하세요.']}
    };
    const pool=topics.flatMap(t=>t.q.map((q,i)=>({id:`${t.id}-${i+1}`,topic:t,type:i+1,prompt:q[0],ko:q[1]})));
    const $=id=>document.getElementById(id);
    const storage={
      read(key){try{const value=JSON.parse(localStorage.getItem(key));return Array.isArray(value)?value:[]}catch{return []}},
      write(key,value){try{localStorage.setItem(key,JSON.stringify(value))}catch{}}
    };
    let favorites=storage.read('opic-favorites-v1').filter(id=>pool.some(q=>q.id===id));
    let current=null,remaining=90,timerId=null,timerEnd=0;
    let recorder=null,stream=null,audioUrl=null,recording=false,requestingMic=false,recordingEpoch=0;

    topics.forEach(topic=>{
      const option=document.createElement('option');
      option.value=topic.id;
      option.textContent=topic.name;
      $('topicFilter').append(option);
    });

    function goToView(view){
      const practice=view==='practice';
      $('practiceView').hidden=!practice;
      $('favoritesView').hidden=practice;
      $('practiceNav').classList.toggle('active',practice);
      $('favoritesNav').classList.toggle('active',!practice);
      if(practice){$('practiceNav').setAttribute('aria-current','page');$('favoritesNav').removeAttribute('aria-current')}
      else{$('favoritesNav').setAttribute('aria-current','page');$('practiceNav').removeAttribute('aria-current');renderFavorites()}
      window.scrollTo({top:0,behavior:'smooth'});
    }

    function renderFavorites(){
      $('favoriteCount').textContent=String(favorites.length);
      const list=$('questionList');
      list.replaceChildren();
      if(!favorites.length){
        const item=document.createElement('li');
        item.className='empty-state';
        item.innerHTML='<span class="empty-heart" aria-hidden="true">♡</span><strong>아직 모아둔 질문이 없어요.</strong>마음에 드는 질문의 하트를 눌러 저장해 보세요.';
        list.append(item);
        return;
      }
      favorites.forEach(id=>{
        const question=pool.find(q=>q.id===id);
        if(!question)return;
        const item=document.createElement('li');
        const button=document.createElement('button');
        const meta=document.createElement('span');
        const title=document.createElement('span');
        button.type='button';button.className='favorite-item';
        button.setAttribute('aria-label',`${question.topic.name}, Type ${question.type} 질문 다시 연습하기`);
        meta.className='item-meta';meta.textContent=`${question.topic.emoji} ${question.topic.name}  ·  TYPE ${question.type}`;
        title.className='item-title';title.textContent=question.prompt;
        button.append(meta,title);
        button.addEventListener('click',()=>{showQuestion(question);goToView('practice')});
        item.append(button);list.append(item);
      });
    }

    function renderFavoriteButton(){
      const saved=favorites.includes(current.id);
      $('favoriteBtn').classList.toggle('active',saved);
      $('favoriteBtn').setAttribute('aria-pressed',String(saved));
      $('favoriteBtn').setAttribute('aria-label',saved?'즐겨찾기에서 제거':'즐겨찾기에 저장');
      $('favoriteBtn').firstElementChild.textContent=saved?'♥':'♡';
    }

    function renderTimer(){
      const seconds=Math.ceil(Math.max(0,remaining));
      const elapsed=90-seconds;
      $('timer').textContent=`${String(Math.floor(elapsed/60)).padStart(2,'0')}:${String(elapsed%60).padStart(2,'0')} / 01:30`;
      $('timer').classList.toggle('low',seconds<=20);
      $('timerStart').disabled=!!timerId;
      $('timerPause').disabled=!timerId;
      $('timerStart').textContent=seconds>0&&seconds<90?'계속':'시작';
    }
    function tick(){remaining=Math.max(0,(timerEnd-Date.now())/1000);if(remaining<=0){clearInterval(timerId);timerId=null;remaining=0}renderTimer()}
    function pauseTimer(){if(!timerId)return;remaining=Math.max(0,(timerEnd-Date.now())/1000);clearInterval(timerId);timerId=null;renderTimer()}
    function resetTimer(){if(timerId)clearInterval(timerId);timerId=null;remaining=90;renderTimer()}
    $('timerStart').addEventListener('click',()=>{if(remaining<=0)remaining=90;timerEnd=Date.now()+remaining*1000;timerId=setInterval(tick,200);renderTimer()});
    $('timerPause').addEventListener('click',pauseTimer);
    $('timerReset').addEventListener('click',resetPractice);

    function setRecordStatus(label,live=false){
      $('recordLabel').textContent=label;
      $('recordDot').classList.toggle('live',live);
      $('recordStart').disabled=live||requestingMic;
      $('recordStop').disabled=!live;
    }
    function clearAudio(){
      $('playback').pause();
      $('playback').removeAttribute('src');
      $('playback').hidden=true;
      if(audioUrl){URL.revokeObjectURL(audioUrl);audioUrl=null}
    }
    function stopRecording(){if(recorder&&recorder.state!=='inactive')recorder.stop()}
    function resetPractice(){
      recordingEpoch++;
      resetTimer();
      if(recording)stopRecording();
      clearAudio();
      $('recordError').hidden=true;
      setRecordStatus('준비됨');
    }

    function showQuestion(question){
      if(window.speechSynthesis)window.speechSynthesis.cancel();
      resetPractice();
      current=question;
      $('questionNumber').textContent=`${String(pool.indexOf(question)+1).padStart(2,'0')} / 64`;
      $('topicBadge').textContent=`${question.topic.emoji} ${question.topic.name}`;
      $('typeBadge').textContent=`TYPE ${question.type} · ${typeNames[question.type]}`;
      $('prompt').textContent=question.prompt;
      $('prompt').hidden=true;
      $('questionGuide').hidden=false;
      $('questionInstruction').hidden=false;
      $('storyFlow').textContent=question.topic.flow;
      $('tipTitle').textContent=tips[question.type].title;
      $('tipList').replaceChildren(...tips[question.type].lines.map(line=>{const item=document.createElement('li');item.textContent=line;return item}));
      $('translationBtn').setAttribute('aria-expanded','false');
      $('translationBtn').textContent='문장 확인';
      $('flowDetails').open=false;
      $('tipDetails').open=false;
      renderFavoriteButton();
    }
    function randomQuestion(){
      const type=$('typeFilter').value,topic=$('topicFilter').value;
      let options=pool.filter(q=>(type==='all'||q.type===Number(type))&&(topic==='all'||q.topic.id===topic));
      if(options.length>1&&current)options=options.filter(q=>q.id!==current.id);
      showQuestion(options[Math.floor(Math.random()*options.length)]);
    }

    $('randomBtn').addEventListener('click',randomQuestion);
    $('nextQuestion').addEventListener('click',randomQuestion);
    $('practiceReset').addEventListener('click',resetPractice);
    $('exampleListen').addEventListener('click',()=>{
      if(!('speechSynthesis'in window))return;
      window.speechSynthesis.cancel();
      const examples={
        1:'I really enjoy this in my free time. It helps me relax, and I especially like the atmosphere. I always feel refreshed afterward.',
        2:'I usually start by making a simple plan. Then I take my time and focus on what I enjoy most. Afterward, I feel relaxed and refreshed.',
        3:'In the past, I usually did this in a simple way. These days, I do it more often and enjoy it much more. My preferences have changed over time.',
        4:'One experience I remember clearly happened a while ago. I was surprised at first, but everything turned out well. It became a special memory for me.'
      };
      const speech=new SpeechSynthesisUtterance(examples[current.type]||examples[1]);
      speech.lang='en-US';speech.rate=.92;
      window.speechSynthesis.speak(speech);
    });
    $('favoriteBtn').addEventListener('click',()=>{
      if(!current)return;
      favorites=favorites.includes(current.id)?favorites.filter(id=>id!==current.id):[current.id,...favorites];
      storage.write('opic-favorites-v1',favorites);
      renderFavoriteButton();
      renderFavorites();
    });
    $('translationBtn').addEventListener('click',()=>{
      const open=$('prompt').hidden;
      $('prompt').hidden=!open;
      $('questionGuide').hidden=open;
      $('questionInstruction').hidden=open;
      $('translationBtn').setAttribute('aria-expanded',String(open));
      $('translationBtn').textContent=open?'문장 숨기기':'문장 확인';
    });
    $('speakBtn').addEventListener('click',()=>{
      if(!('speechSynthesis'in window))return;
      window.speechSynthesis.cancel();
      const speech=new SpeechSynthesisUtterance(current.prompt);
      speech.lang='en-US';speech.rate=.92;
      window.speechSynthesis.speak(speech);
    });
    if(!('speechSynthesis'in window)){$('speakBtn').disabled=true;$('speakBtn').title='이 브라우저에서는 질문 읽기를 지원하지 않습니다.'}
    $('practiceNav').addEventListener('click',()=>goToView('practice'));
    $('favoritesNav').addEventListener('click',()=>goToView('favorites'));

    $('recordStart').addEventListener('click',async()=>{
      if(requestingMic||recording)return;
      const epoch=recordingEpoch;
      requestingMic=true;
      setRecordStatus('마이크 연결 중…');
      clearAudio();$('recordError').hidden=true;
      if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){
        requestingMic=false;setRecordStatus('녹음 지원 안 됨');
        $('recordError').textContent='이 브라우저에서는 녹음을 지원하지 않습니다. HTTPS 또는 localhost에서 열어보세요.';
        $('recordError').hidden=false;return;
      }
      try{
        const obtained=await navigator.mediaDevices.getUserMedia({audio:true});
        if(epoch!==recordingEpoch){obtained.getTracks().forEach(track=>track.stop());return}
        stream=obtained;
        const chunks=[];
        const mediaRecorder=new MediaRecorder(obtained);
        recorder=mediaRecorder;
        mediaRecorder.ondataavailable=event=>{if(event.data.size)chunks.push(event.data)};
        mediaRecorder.onstop=()=>{
          obtained.getTracks().forEach(track=>track.stop());
          if(stream===obtained)stream=null;
          if(recorder===mediaRecorder)recorder=null;
          recording=false;
          if(epoch!==recordingEpoch){setRecordStatus('준비됨');return}
          setRecordStatus('녹음 완료 · 아래에서 다시 듣기');
          if(chunks.length){
            const blob=new Blob(chunks,{type:mediaRecorder.mimeType||'audio/webm'});
            audioUrl=URL.createObjectURL(blob);
            $('playback').src=audioUrl;
            $('playback').hidden=false;
          }
        };
        mediaRecorder.onerror=()=>{
          if(epoch!==recordingEpoch)return;
          $('recordError').textContent='녹음 중 오류가 발생했습니다. 다시 시도해 주세요.';
          $('recordError').hidden=false;
          obtained.getTracks().forEach(track=>track.stop());
          recording=false;setRecordStatus('녹음 오류');
        };
        mediaRecorder.start();recording=true;setRecordStatus('녹음 중…',true);
        if(!timerId)$('timerStart').click();
      }catch(error){
        if(epoch===recordingEpoch){
          $('recordError').textContent=error.name==='NotAllowedError'?'마이크 사용 권한을 허용해 주세요.':'마이크를 사용할 수 없습니다. 연결 상태와 브라우저 설정을 확인해 주세요.';
          $('recordError').hidden=false;setRecordStatus('녹음할 수 없음');
        }
      }finally{requestingMic=false;if(!recording)$('recordStart').disabled=false}
    });
    $('recordStop').addEventListener('click',()=>{pauseTimer();stopRecording()});
    window.addEventListener('beforeunload',()=>{
      if(timerId)clearInterval(timerId);
      if(window.speechSynthesis)window.speechSynthesis.cancel();
      if(stream)stream.getTracks().forEach(track=>track.stop());
      if(audioUrl)URL.revokeObjectURL(audioUrl);
    });

    renderTimer();setRecordStatus('준비됨');renderFavorites();randomQuestion();
