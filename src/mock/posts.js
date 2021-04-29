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
        "id": 1,
        "name": "스토리보드"
    },
    {
        "id": 2,
        "name": "용인"
    },
    {
        "id": 3,
        "name": "에버랜드"
    },
    {
        "id": 4,
        "name": "MT"
    }
]
  },
];

export default posts;
