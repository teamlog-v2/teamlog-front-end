const data = [
  {
      "id": 1,
      "contents": "재밌어요!!!!!!",
      "writer_user_id": "jini",
      "access_modifier": "PUBLIC",
      "comment_modifier": "PUBLIC",
      "latitude": 127.0,
      "longitude": 37.0,
      "write_time": "2021-04-15T09:00:00",
      "media_list": [
          {
              "path": "/image/cat1.PNG",
              "type": "IMAGE"
          },
          {
              "path": "/image/cat2.PNG",
              "type": "IMAGE"
          },
          {
              "path": "/image/cat3.PNG",
              "type": "IMAGE"
          }
      ],
      "post_liker_count": 3,
      "comment_count": 2,
      "comment_list": [
          {
              "id": 1,
              "contents": "댓글111111",
              "writer_user_id": "jduck1024",
              "write_time": "2021-04-27T09:00:00",
              "comment_mention_list": [
                  {
                      "id": 1,
                      "target_user_id": "dfsfs"
                  },
                  {
                      "id": 2,
                      "target_user_id": "jduck1024"
                  },
                  {
                      "id": 3,
                      "target_user_id": "jini"
                  }
              ]
          },
          {
              "id": 2,
              "contents": "대댓글222222",
              "writer_user_id": "jini",
              "write_time": "2021-04-28T09:00:00",
              "comment_mention_list": []
          },
          {
            "id": 3,
            "contents": "헤헤헤헤헤헤헤ㅔ헤헿",
            "writer_user_id": "jini",
            "write_time": "2021-04-28T09:00:00",
            "comment_mention_list": []
        }
      ],
      "tag_list": [
          {
              "id": 3,
              "name": "태그1"
          },
          {
              "id": 4,
              "name": "태그2"
          },
          {
              "id": 5,
              "name": "태그3"
          }
      ]
  },
  {
      "id": 2,
      "contents": "저희 학생회 지시에 잘 따라주신 우리 멋쟁이 컴소공 여러분들 모두 진심으로 감사합니다!!! 교수님들과도 함께 즐길 수 있어 너무 영광이었습니다 ㅎㅎ",
      "writer_user_id": "jduck1024",
      "access_modifier": "PUBLIC",
      "comment_modifier": "PUBLIC",
      "latitude": 36.813683,
      "longitude": 128.626556,
      "write_time": "2021-04-27T09:00:00",
      "media_list": [],
      "post_liker_count": 0,
      "comment_count": 0,
      "comment_list": [],
      "tag_list": []
  },
  {
      "id": 3,
      "contents": "내용",
      "writer_user_id": "jduck1024",
      "access_modifier": "PUBLIC",
      "comment_modifier": "PUBLIC",
      "latitude": 128.888,
      "longitude": 0.0,
      "write_time": "2021-04-28T01:10:30",
      "media_list": [],
      "post_liker_count": 0,
      "comment_count": 0,
      "comment_list": [],
      "tag_list": []
  },
  {
      "id": 4,
      "contents": "게시물게시물게시물게시물",
      "writer_user_id": "jduck1024",
      "access_modifier": "PUBLIC",
      "comment_modifier": "PUBLIC",
      "latitude": 128.888,
      "longitude": 0.0,
      "write_time": "2021-04-28T18:13:47",
      "media_list": [
          {
            "path": "/image/cat1.PNG",
            "type": "IMAGE"
          },
          {
            "path": "/image/cat1.PNG",
            "type": "IMAGE"
          },
          {
            "path": "/image/cat1.PNG",
            "type": "IMAGE"
          }
      ],
      "post_liker_count": 0,
      "comment_count": 0,
      "comment_list": [],
      "tag_list": [
          {
              "id": 6,
              "name": "3"
          },
          {
              "id": 7,
              "name": "4"
          }
      ]
  }
]

export default data;