const posts = [
  {
    id: '5363646',
    contents: '후지산은 일본의 혼슈 중앙부, 시즈오카현과 야마나시현의 경계에 있는 휴화산이며, 해발 3,776m로 일본에서 제일 높은 산이다.',
    writer_user_id: 'jduck1024',
    access_modifier: 'PUBLIC',
    comment_modifier: 'PUBLIC',
    latitude: 127.0,
    longitude: 37.0,
    location: '경상북도 구미시 대학로 61 금오공과대학교 디지털관',
    post_liker_count: 46,
    comment_count: 7,
    write_time: '2021-04-09T23:05:37.9795225',
    media_list: [
      {
          path: '../media/cat1.PNG',
          type: 'IMAGE',
      },
      {
          path: '../media/cat2.PNG',
          type: 'IMAGE',
      },
      {
          path: '../media/cat3.PNG',
          type: 'IMAGE',
      },
    ],
    comment_list: [
      {
          id: 1,
          contents: '헐 나도 가고싶었는데...ㅠ',
          writer_user_id: 'jini',
          write_time: '2021-04-27T09:00:00',
          comment_mention_list: [
              {
                  id: 1,
                  user_id: 'jduck1024',
              },
              {
                  id: '2',
                  user_id: 'jini',
              },
          ],
      },
      {
          id: 2,
          contents: 'ㅠㅠ 다음에는 꼭...',
          writer_user_id: 'jduck1024',
          write_time: '2021-04-28T09:00:00',
          comment_mention_list: [],
      },
  ],
  tag_list: [
    {
        id: 1,
        name: '스토리보드',
    },
    {
        id: 2,
        name: '용인',
    },
    {
        id: 3,
        name: '에버랜드',
    },
    {
        id: 4,
        name: 'MT',
    },
    ],
  },
  {
    id: '46461',
    contents: `도쿄 남단, 도쿄베이 지역에 세워진 계획 지구. 이곳에 자리한 자유의 여신상과 레인보우 브리지, 그리고 건담 조형물과 만나기 위해 온종일 수많은 여행자가 오다이바로 향한다. 이왕이면 도쿄의 다른 지역을 관광하고 일몰 무렵에 찾는 것을 추천한다. 아름다운 노을과 사진이 가장 잘 나온다는 일몰 직후의 매직아워, 그리고 분위기 있는 야경을 모두 만날 수 있기 때문이다. 주변에 분위기 있는 카페와 레스토랑, 쇼핑몰이 있어 함께 둘러보는 것을 추천한다. 
    `,
    writer_user_id: 'migu554',
    access_modifier: 'PUBLIC',
    comment_modifier: 'PRIVATE',
    latitude: 127.0,
    longitude: 37.0,
    location: '도쿄 오다이바',
    post_liker_count: 15,
    comment_count: 10,
    write_time: '2021-04-02T23:05:37.9795225',
  tag_list: [
    {
        id: 1,
        name: '도쿄',
    },
    {
        id: 2,
        name: '여행',
    },
    {
        id: 3,
        name: '꿀잼',
    },
    ],
  },
  {
    id: '46461',
    contents: `도쿄 북부에 자리한 명소. 도쿄 시민이 신성시 여기는 지역이라고도 볼 수 있다. 도쿄 최대 규모의 사찰인 센소지와 기미나리몬, 전통 거리 등은 ‘클래식 도쿄’의 진수를 보여준다. 이러한 분위기에 맞춰 실제로 전통 인력거에 오르거나 기모노를 입고 사진을 찍는 여행자도 상당히 많다. 제일 먼저 센소지를 둘러본 뒤, 주변 도쿄 스카이트리 타워나 우에노 공원 등으로 향하는 동선도 추천한다. 주변에 개성 넘치는 상점과 맛집이 즐비해 여행자에게 선택지가 많은 편이다. 

    `,
    writer_user_id: 'migu554',
    access_modifier: 'PUBLIC',
    comment_modifier: 'PRIVATE',
    latitude: 127.0,
    longitude: 37.0,
    location: '도쿄 아사쿠사',
    post_liker_count: 3,
    comment_count: 3,
    write_time: '2021-04-04T10:05:37.9795225',
    tag_list: [
    {
        id: 1,
        name: '도쿄',
    },
    {
        id: 2,
        name: '스토리보드',
    },
    {
        id: 3,
        name: '절',
    },
    {
        id: 3,
        name: '아사쿠사',
    },
    ],
  },
];

export default posts;
